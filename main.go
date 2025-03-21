// Moxtools is a web app for inspecting mail infrastructure, serving as a showcase
// for reusing Go packages from mox.
package main

import (
	"context"
	"crypto/tls"
	"embed"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"log/slog"
	"net"
	"net/http"
	"os"
	"runtime"
	"runtime/debug"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/prometheus/client_golang/prometheus/promhttp"

	"github.com/mjl-/adns"
	"github.com/mjl-/sherpa"
	"github.com/mjl-/sherpadoc"
	"github.com/mjl-/sherpaprom"

	"github.com/mjl-/mox/dkim"
	"github.com/mjl-/mox/dmarc"
	"github.com/mjl-/mox/dns"
	"github.com/mjl-/mox/mlog"
	"github.com/mjl-/mox/mtasts"
	"github.com/mjl-/mox/ratelimit"
	"github.com/mjl-/mox/smtpclient"
	"github.com/mjl-/mox/spf"
	"github.com/mjl-/mox/tlsrpt"
	"slices"
)

var listen string
var listenMetrics string
var hostname string
var dnsHostname dns.Domain
var ratelimiter bool

var version = "(devel)"
var metaBuf []byte // JSON object with version info.

var pkglog mlog.Log

var cidgen atomic.Int64

func init() {
	cidgen.Store(time.Now().UnixMicro())
}

var apiLimiter = ratelimit.Limiter{
	WindowLimits: []ratelimit.WindowLimit{
		{Window: time.Minute, Limits: [...]int64{10, 20, 30}},
		{Window: time.Hour, Limits: [...]int64{100, 200, 300}},
		{Window: 24 * time.Hour, Limits: [...]int64{1000, 2000, 3000}},
	},
}
var apiDomainLimiter = ratelimit.Limiter{
	WindowLimits: []ratelimit.WindowLimit{
		{Window: time.Minute, Limits: [...]int64{3, 20, 30}},
		{Window: time.Hour, Limits: [...]int64{20, 30, 40}},
		{Window: 24 * time.Hour, Limits: [...]int64{100, 200, 300}},
	},
}
var smtpDialLimiter = ratelimit.Limiter{
	WindowLimits: []ratelimit.WindowLimit{
		{Window: time.Minute, Limits: [...]int64{1, 3, 9}},
		{Window: time.Hour, Limits: [...]int64{10, 30, 90}},
		{Window: 24 * time.Hour, Limits: [...]int64{30, 90, 270}},
	},
}

//go:embed s/*
var files embed.FS

var resolver = dns.StrictResolver{}

func xcheck(err error, msg string) {
	if err != nil {
		pkglog.Fatalx(msg, err)
	}
}

func main() {
	mlog.Logfmt = true
	pkglog = mlog.New("moxtools", nil)

	var err error
	hostname, err = os.Hostname()
	xcheck(err, "get hostname")

	var goversion string
	buildInfo, ok := debug.ReadBuildInfo()
	if ok {
		goversion = buildInfo.GoVersion
		version = buildInfo.Main.Version
		if version == "(devel)" {
			for _, setting := range buildInfo.Settings {
				if setting.Key == "vcs.revision" {
					version = setting.Value
					break
				}
			}
		}
	}

	mlog.SetConfig(map[string]slog.Level{"smtpclient": mlog.LevelTrace})

	flag.BoolVar(&ratelimiter, "ratelimit", false, "enable ip-based rate limiter for incoming api requests (based on x-forwarded-for with fallback to connection ip) and outgoing smtp connections")
	flag.StringVar(&listen, "listen", ":8080", "address for serve http")
	flag.StringVar(&listenMetrics, "listen-metrics", ":8081", "address for serving prometheus metrics over http")
	flag.StringVar(&hostname, "hostname", hostname, "hostname to use when dialing smtp server")
	flag.Usage = func() {
		fmt.Println("usage: moxtools [flags]")
		flag.PrintDefaults()
		os.Exit(2)
	}
	flag.Parse()
	args := flag.Args()
	if len(args) != 0 {
		flag.Usage()
	}

	dnsHostname, err = dns.ParseDomain(hostname)
	xcheck(err, "parsing hostname")

	var docs sherpadoc.Section
	f, err := files.Open("s/api.json")
	xcheck(err, "open api docs")
	err = json.NewDecoder(f).Decode(&docs)
	xcheck(err, "parsing api docs")
	f.Close()
	collector, err := sherpaprom.NewCollector("moxtools", nil)
	xcheck(err, "creating sherpa prometheus collector")
	apiHandler, err := sherpa.NewHandler("/api/", version, API{}, &docs, &sherpa.HandlerOpts{Collector: collector, AdjustFunctionNames: "none"})
	xcheck(err, "making api handler")

	var meta = struct {
		Version   string
		GoVersion string
		GoOs      string
		GoArch    string
	}{version, goversion, runtime.GOOS, runtime.GOARCH}
	metaBuf, err = json.Marshal(meta)
	xcheck(err, "marshal meta")

	var static fs.FS
	var serveIndex func(w http.ResponseWriter, r *http.Request)
	_, err = os.Stat("s")
	if err == nil {
		static = os.DirFS("s")
		serveIndex = func(w http.ResponseWriter, r *http.Request) {
			httpError := func(err error, msg string) {
				pkglog.Errorx(msg, err)
				http.Error(w, "500 - internal server error", http.StatusInternalServerError)
			}

			fh, err := static.Open("index.html")
			if err != nil {
				httpError(err, "open index.html")
				return
			}
			defer fh.Close()
			fjs, err := static.Open("app.js")
			if err != nil {
				httpError(err, "open app.js")
				return
			}
			defer fjs.Close()
			html, mtime, err := prepareHTML(fh, fjs)
			if err != nil {
				httpError(err, "preparing html")
				return
			}
			http.ServeContent(w, r, "index.html", mtime, strings.NewReader(html))
		}
	} else {
		static, err = fs.Sub(files, "s")
		xcheck(err, "static files sub file system")
		fh, err := static.Open("index.html")
		xcheck(err, "open index.html")
		defer fh.Close()
		fjs, err := static.Open("app.js")
		xcheck(err, "open app.js")
		defer fjs.Close()
		html, mtime, err := prepareHTML(fh, fjs)
		xcheck(err, "preparing html")
		serveIndex = func(w http.ResponseWriter, r *http.Request) {
			http.ServeContent(w, r, "index.html", mtime, strings.NewReader(html))
		}
	}

	web := http.NewServeMux()
	web.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
		var ip net.IP
		xff := r.Header.Get("X-Forwarded-For")
		if xff == "" {
			host, _, err := net.SplitHostPort(r.RemoteAddr)
			pkglog.Check(err, "parsing remoteaddr", slog.String("remoteaddr", r.RemoteAddr))
			ip = net.ParseIP(host)
			if ip == nil {
				pkglog.Error("cannot parse ip from remoteaddr", slog.String("remoteaddr", r.RemoteAddr))
			}
		} else {
			t := strings.Split(xff, ",")
			ipstr := t[len(t)-1]
			ip = net.ParseIP(ipstr)
			if ip == nil {
				pkglog.Error("cannot parse ip from x-forwarded-for header", slog.String("ipstr", ipstr))
			}
		}
		r = r.WithContext(context.WithValue(r.Context(), keyIP, ip))
		apiHandler.ServeHTTP(w, r)
	})

	web.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			if r.Method != "GET" && r.Method != "HEAD" {
				http.Error(w, "405 - method not allowed", http.StatusMethodNotAllowed)
				return
			}
			serveIndex(w, r)
		} else {
			http.FileServer(http.FS(static))
		}
	})

	pkglog.Print("serving",
		slog.String("listen", listen),
		slog.String("listenmetrics", listenMetrics),
		slog.Any("hostname", dnsHostname),
		slog.String("version", version),
		slog.String("goversion", goversion),
		slog.String("goos", runtime.GOOS),
		slog.String("goarch", runtime.GOARCH))

	if listenMetrics != "" {
		go func() {
			metrics := http.NewServeMux()
			metrics.Handle("/metrics", promhttp.Handler())
			err := http.ListenAndServe(listenMetrics, metrics)
			xcheck(err, "listen and serve metrics")
		}()
	}

	err = http.ListenAndServe(listen, web)
	xcheck(err, "listen and serve")
}

func prepareHTML(fh, fjs fs.File) (string, time.Time, error) {
	index, err := io.ReadAll(fh)
	if err != nil {
		return "", time.Time{}, err
	}
	js, err := io.ReadAll(fjs)
	if err != nil {
		return "", time.Time{}, err
	}
	htmlinfo, err := fh.Stat()
	if err != nil {
		return "", time.Time{}, err
	}
	jsinfo, err := fjs.Stat()
	if err != nil {
		return "", time.Time{}, err
	}
	mtime := htmlinfo.ModTime()
	if t := jsinfo.ModTime(); t.Before(mtime) {
		mtime = t
	}

	html := string(index)
	html = strings.ReplaceAll(html, `<script src="app.js"></script>`, "<script>const meta = "+string(metaBuf)+"\n"+string(js)+"</script>")
	return html, mtime, nil
}

func newLog() mlog.Log {
	return mlog.New("moxtools", nil).With(slog.Int64("cid", cidgen.Add(1)))
}

type API struct{}

func xcheckuser(err error, msg string, attrs ...slog.Attr) {
	if err == nil {
		return
	}
	pkglog.Errorx(msg, err, attrs...)
	errmsg := fmt.Sprintf("%s: %s", msg, err)
	panic(&sherpa.Error{Code: "user:error", Message: errmsg})
}

type ctxKey string

var keyIP ctxKey = "ip"

func xlimit(ctx context.Context, r *ratelimit.Limiter) {
	if !ratelimiter {
		return
	}
	ip := ctx.Value(keyIP).(net.IP)
	if ip == nil || !r.Add(ip, time.Now(), 1) {
		xcheckuser(errors.New("too many requests from ip or subnet in window, try again soon"), "rate limiter", slog.Any("ip", ip))
	}
}

type SPFReceived struct {
	Status    string
	Mechanism string
}

func (API) SPFCheck(ctx context.Context, domain, ipstr string) (received SPFReceived, dom dns.Domain, explanation string, authentic bool) {
	log := newLog()

	xlimit(ctx, &apiLimiter)

	log.Debug("spfcheck call", slog.String("domain", domain), slog.String("ip", ipstr))

	dom, err := dns.ParseDomain(domain)
	xcheckuser(err, "parsing domain")

	ip := net.ParseIP(ipstr)
	if ip == nil {
		xcheckuser(errors.New("invalid ip"), "parsing ip")
	}

	opctx, cancel := context.WithTimeout(ctx, 15*time.Second)
	defer cancel()

	args := spf.Args{
		RemoteIP:    ip,
		HelloDomain: dns.IPDomain{Domain: dom},
	}
	var recv spf.Received
	recv, dom, explanation, authentic, err = spf.Verify(opctx, log.Logger, resolver, args)
	xcheckuser(err, "verifying spf")
	received = SPFReceived{string(recv.Result), recv.Mechanism}
	return
}

type DKIMStatus string

func (API) DKIMLookup(ctx context.Context, selector, domain string) (status DKIMStatus, record *dkim.Record, txt string, authentic bool) {
	log := newLog()

	xlimit(ctx, &apiLimiter)

	log.Debug("dkimlookup call", slog.String("selector", selector), slog.String("domain", domain))

	sel, err := dns.ParseDomain(selector)
	xcheckuser(err, "parsing selector")
	dom, err := dns.ParseDomain(domain)
	xcheckuser(err, "parsing domain")

	opctx, cancel := context.WithTimeout(ctx, 15*time.Second)
	defer cancel()

	var xstatus dkim.Status
	xstatus, record, txt, authentic, err = dkim.Lookup(opctx, log.Logger, resolver, sel, dom)
	xcheckuser(err, "looking up dkim record")
	status = DKIMStatus(string(xstatus))

	return
}

type DKIMResult struct {
	Status          DKIMStatus
	Sig             *dkim.Sig    // Parsed form of DKIM-Signature header. Can be nil for invalid DKIM-Signature header.
	Record          *dkim.Record // Parsed form of DKIM DNS record for selector and domain in Sig. Optional.
	RecordAuthentic bool         // Whether DKIM DNS record was DNSSEC-protected. Only valid if Sig is non-nil.
	Error           string       // If Status is not StatusPass, this error holds the details and can be checked using errors.Is.
}

func (API) DKIMVerify(ctx context.Context, message string) []DKIMResult {
	log := newLog()

	xlimit(ctx, &apiLimiter)

	log.Debug("dkimverify call")

	opctx, cancel := context.WithTimeout(ctx, 15*time.Second)
	defer cancel()

	message = strings.ReplaceAll(message, "\n", "\r\n")
	results, err := dkim.Verify(opctx, log.Logger, resolver, true, dkim.DefaultPolicy, strings.NewReader(message), false)
	xcheckuser(err, "verifying dkim signatures in message")

	l := make([]DKIMResult, len(results))
	for i, r := range results {
		var errmsg string
		if r.Err != nil {
			errmsg = r.Err.Error()
		}
		l[i] = DKIMResult{
			Status:          DKIMStatus(string(r.Status)),
			Sig:             r.Sig,
			Record:          r.Record,
			RecordAuthentic: r.RecordAuthentic,
			Error:           errmsg,
		}
	}
	return l
}

func logPanic(log mlog.Log) {
	x := recover()
	if x == nil {
		return
	}
	log.Error("uncaught panic", slog.Any("err", x))
	debug.PrintStack()
}

type SPFRecord struct {
	spf.Record
}

type DomainSPF struct {
	DurationMS int
	Status     string
	TXT        string
	Record     *SPFRecord
	Authentic  bool
	Error      string
}

type DMARCRecord struct {
	dmarc.Record
}

type DomainDMARC struct {
	DurationMS int
	Status     string
	Domain     dns.Domain
	Record     *DMARCRecord
	TXT        string
	Authentic  bool
	Error      string
}

type TLSRPTRecord struct {
	tlsrpt.Record
}

type DomainTLSRPT struct {
	DurationMS int
	Record     *TLSRPTRecord
	TXT        string
	Error      string
}

type MTASTSRecord struct {
	mtasts.Record
}

type DomainMTASTS struct {
	DurationMS  int
	Implemented bool
	Record      *MTASTSRecord
	Policy      *mtasts.Policy
	PolicyText  string
	Error       string
}

type DomainIP struct {
	DurationMS        int
	Authentic         bool
	ExpandedAuthentic bool
	ExpandedHost      dns.Domain
	IPs               []net.IP
	DualStack         bool
	Error             string
}

type TLSARecord struct {
	adns.TLSA
}

type DomainDANE struct {
	DurationMS     int
	Required       bool
	Records        []TLSARecord
	TLSABaseDomain dns.Domain
	Error          string
	VerifiedRecord *TLSARecord
}

type Proto struct {
	ClientWrite bool
	Text        string
}

type TLSConnectionState struct {
	Version            string
	CipherSuite        string
	NegotiatedProtocol string
	ServerName         string
}

type DomainSMTP struct {
	DurationMS            int
	Error                 string
	Supports8bitMIME      bool
	SupportsRequireTLS    bool
	SupportsSMTPUTF8      bool
	SupportsSTARTTLS      bool
	TLSConnectionState    *TLSConnectionState
	RecipientDomainResult *TLSRPTResult
	HostResult            *TLSRPTResult

	Trace []Proto
}

type TLSRPTResult struct {
	Policy         TLSRPTResultPolicy
	Summary        TLSRPTSummary
	FailureDetails []TLSRPTFailureDetails
}

type TLSRPTResultPolicy struct {
	Type   string
	String []string
	Domain string
	MXHost []string
}

type TLSRPTSummary struct {
	TotalSuccessfulSessionCount int64
	TotalFailureSessionCount    int64
}

type TLSRPTFailureDetails struct {
	ResultType            string
	SendingMTAIP          string
	ReceivingMXHostname   string
	ReceivingMXHelo       string
	ReceivingIP           string
	FailedSessionCount    int64
	AdditionalInformation string
	FailureReasonCode     string
}

func tlsrptResult(r tlsrpt.Result) *TLSRPTResult {
	p := r.Policy
	s := r.Summary
	failureDetails := make([]TLSRPTFailureDetails, len(r.FailureDetails))
	for i, fd := range r.FailureDetails {
		failureDetails[i] = TLSRPTFailureDetails{
			string(fd.ResultType),
			fd.SendingMTAIP,
			fd.ReceivingMXHostname,
			fd.ReceivingMXHelo,
			fd.ReceivingIP,
			fd.FailedSessionCount,
			fd.AdditionalInformation,
			fd.FailureReasonCode,
		}
	}
	return &TLSRPTResult{
		TLSRPTResultPolicy{string(p.Type), p.String, p.Domain, p.MXHost},
		TLSRPTSummary{s.TotalSuccessfulSessionCount, s.TotalFailureSessionCount},
		failureDetails,
	}
}

type DomainMX struct {
	DurationMS               int
	Have                     bool
	OrigNextHopAuthentic     bool
	ExpandedNextHopAuthentic bool
	ExpandedNextHop          dns.Domain
	Permanent                bool
	Error                    string
}

type DomainDial struct {
	DurationMS int
	IP         net.IP
	Error      string
}

type DomainMXHost struct {
	DurationMS  int
	Host        dns.IPDomain
	MTASTSError string
	IP          DomainIP
	DANE        DomainDANE
	Dial        DomainDial
	SMTP        DomainSMTP
}

type DomainResult struct {
	DurationMS int
	Domain     dns.Domain
	SPF        DomainSPF
	DMARC      DomainDMARC
	TLSRPT     DomainTLSRPT
	MTASTS     DomainMTASTS
	MX         DomainMX
	MXHosts    []DomainMXHost
}

func errmsg(err error) string {
	if err == nil {
		return ""
	}
	return err.Error()
}

func timeSince(t time.Time) int {
	return int(time.Since(t) / time.Millisecond)
}

func (API) DomainCheck(ctx context.Context, domain string) (dr DomainResult) {
	log := newLog()

	xlimit(ctx, &apiLimiter)
	xlimit(ctx, &apiDomainLimiter)

	log.Debug("domaincheck call", slog.String("domain", domain))

	dom, err := dns.ParseDomain(domain)
	xcheck(err, "parsing domain")

	start := time.Now()

	dr.Domain = dom

	opctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	var wg sync.WaitGroup

	// SPF.
	wg.Add(1)
	go func() {
		defer logPanic(log)
		defer wg.Done()

		t0 := time.Now()
		status, txt, record, authentic, err := spf.Lookup(opctx, log.Logger, resolver, dom)
		var spfRecord *SPFRecord
		if record != nil {
			spfRecord = &SPFRecord{*record}
		}
		dr.SPF = DomainSPF{timeSince(t0), string(status), txt, spfRecord, authentic, errmsg(err)}
	}()

	// DMARC.
	wg.Add(1)
	go func() {
		defer logPanic(log)
		defer wg.Done()

		t0 := time.Now()
		status, dmarcDom, record, txt, authentic, err := dmarc.Lookup(opctx, log.Logger, resolver, dom)
		var dmarcRecord *DMARCRecord
		if record != nil {
			dmarcRecord = &DMARCRecord{*record}
		}
		dr.DMARC = DomainDMARC{timeSince(t0), string(status), dmarcDom, dmarcRecord, txt, authentic, errmsg(err)}
	}()

	// TLSRPT.
	wg.Add(1)
	go func() {
		defer logPanic(log)
		defer wg.Done()

		t0 := time.Now()
		record, txt, err := tlsrpt.Lookup(opctx, log.Logger, resolver, dom)
		if err != nil && errors.Is(err, tlsrpt.ErrNoRecord) {
			err = nil
		}
		var tlsrptRecord *TLSRPTRecord
		if record != nil {
			tlsrptRecord = &TLSRPTRecord{*record}
		}
		dr.TLSRPT = DomainTLSRPT{timeSince(t0), tlsrptRecord, txt, errmsg(err)}
	}()

	checkMX := func(mx *DomainMXHost, dial, pkix bool) {
		wg.Add(1)
		go func() {
			defer logPanic(log)
			defer wg.Done()

			t0 := time.Now()
			defer func() {
				mx.DurationMS = timeSince(t0)
			}()

			dialedIPs := map[string][]net.IP{}
			authentic, expandedAuthentic, expandedHost, ips, dualstack, err := smtpclient.GatherIPs(opctx, log.Logger, resolver, "ip", mx.Host, dialedIPs)
			mx.IP = DomainIP{timeSince(t0), authentic, expandedAuthentic, expandedHost, ips, dualstack, errmsg(err)}
			if err != nil {
				return
			}

			var daneRecords []adns.TLSA
			var daneMoreHostnames []dns.Domain
			if dr.MX.OrigNextHopAuthentic && dr.MX.ExpandedNextHopAuthentic && authentic {
				t0dane := time.Now()
				var daneRequired bool
				var tlsaBaseDomain dns.Domain
				daneRequired, daneRecords, tlsaBaseDomain, err = smtpclient.GatherTLSA(opctx, log.Logger, resolver, mx.Host.Domain, expandedAuthentic, expandedHost)
				if err == nil {
					daneMoreHostnames = smtpclient.GatherTLSANames(dr.MX.Have, dr.MX.ExpandedNextHopAuthentic, expandedAuthentic, dom, dr.MX.ExpandedNextHop, mx.Host.Domain, tlsaBaseDomain)
				}
				tlsarecords := make([]TLSARecord, len(daneRecords))
				for i, r := range daneRecords {
					tlsarecords[i] = TLSARecord{r}
				}
				mx.DANE = DomainDANE{timeSince(t0dane), daneRequired, tlsarecords, tlsaBaseDomain, errmsg(err), nil}
			}

			if !dial {
				return
			}

			t0dial := time.Now()
			dialer := &limitDialer{}
			conn, ip, err := smtpclient.Dial(opctx, log.Logger, dialer, mx.Host, mx.IP.IPs, 25, dialedIPs, nil)
			mx.Dial = DomainDial{timeSince(t0dial), ip, errmsg(err)}
			if err != nil {
				return
			}
			defer conn.Close()

			tlsMode := smtpclient.TLSOpportunistic
			if pkix || mx.DANE.Required {
				tlsMode = smtpclient.TLSRequiredStartTLS
			}

			t0smtp := time.Now()
			var daneVerifiedRecord adns.TLSA
			var tlsrptRecipientDomainResult tlsrpt.Result
			var tlsrptHostResult tlsrpt.Result
			opts := smtpclient.Opts{
				DANERecords:           daneRecords,
				DANEMoreHostnames:     daneMoreHostnames,
				DANEVerifiedRecord:    &daneVerifiedRecord,
				IgnoreTLSVerifyErrors: true, // note: not generally safe
				RecipientDomainResult: &tlsrptRecipientDomainResult,
				HostResult:            &tlsrptHostResult,
			}
			th := traceHandler{Trace: []Proto{}}
			tracelog := slog.New(&th)
			client, err := smtpclient.New(opctx, tracelog, conn, tlsMode, pkix, dnsHostname, mx.Host.Domain, opts)
			mx.SMTP.Error = errmsg(err)
			if err != nil {
				return
			}
			cs := client.TLSConnectionState()
			client.Close()
			mx.SMTP.DurationMS = timeSince(t0smtp)

			if daneVerifiedRecord.CertAssoc != nil {
				mx.DANE.VerifiedRecord = &TLSARecord{daneVerifiedRecord}
			} else if mx.DANE.Required && mx.DANE.Error == "" {
				mx.DANE.Error = "no matching TLSA record"
			}

			mx.SMTP.Supports8bitMIME = client.Supports8BITMIME()
			mx.SMTP.SupportsRequireTLS = client.SupportsRequireTLS()
			mx.SMTP.SupportsSMTPUTF8 = client.SupportsSMTPUTF8()
			mx.SMTP.SupportsSTARTTLS = client.SupportsStartTLS()
			if cs != nil {
				mx.SMTP.TLSConnectionState = &TLSConnectionState{
					Version:            tls.VersionName(cs.Version),
					CipherSuite:        tls.CipherSuiteName(cs.CipherSuite),
					NegotiatedProtocol: cs.NegotiatedProtocol,
					ServerName:         cs.ServerName,
				}
			}
			mx.SMTP.RecipientDomainResult = tlsrptResult(tlsrptRecipientDomainResult)
			mx.SMTP.HostResult = tlsrptResult(tlsrptHostResult)
			mx.SMTP.Trace = th.Trace
		}()
	}

	// MX.
	wg.Add(1)
	go func() {
		defer logPanic(log)
		defer wg.Done()

		var mtastswg sync.WaitGroup
		mtastswg.Add(1)
		go func() {
			defer logPanic(log)
			defer mtastswg.Done()

			t0 := time.Now()
			record, policy, policyText, err := mtasts.Get(opctx, log.Logger, resolver, dom)
			implemented := err == nil || !(errors.Is(err, mtasts.ErrNoRecord) || errors.Is(err, mtasts.ErrMultipleRecords) || errors.Is(err, mtasts.ErrRecordSyntax) || errors.Is(err, mtasts.ErrNoPolicy) || errors.Is(err, mtasts.ErrPolicyFetch) || errors.Is(err, mtasts.ErrPolicySyntax))
			if errors.Is(err, mtasts.ErrNoRecord) {
				err = nil
			}
			var mtastsRecord *MTASTSRecord
			if record != nil {
				mtastsRecord = &MTASTSRecord{*record}
			}
			dr.MTASTS = DomainMTASTS{timeSince(t0), implemented, mtastsRecord, policy, policyText, errmsg(err)}
		}()

		t0 := time.Now()

		var hosts []dns.IPDomain
		var err error
		dr.MX.Have, dr.MX.OrigNextHopAuthentic, dr.MX.ExpandedNextHopAuthentic, dr.MX.ExpandedNextHop, hosts, dr.MX.Permanent, err = smtpclient.GatherDestinations(opctx, log.Logger, resolver, dns.IPDomain{Domain: dom})
		dr.MX.Error = errmsg(err)
		dr.MX.DurationMS = timeSince(t0)

		mtastswg.Wait()

		dr.MXHosts = make([]DomainMXHost, len(hosts))
		for i, h := range hosts {
			dr.MXHosts[i].Host = h
			var pkix bool
			if dr.MTASTS.Policy != nil && dr.MTASTS.Policy.Mode != mtasts.ModeNone {
				pkix = true
				if !dr.MTASTS.Policy.Matches(h.Domain) {
					dr.MXHosts[i].MTASTSError = "MX target does not match MTA-STS policy"
				}
			}
			checkMX(&dr.MXHosts[i], i < 2, pkix)
		}
	}()

	wg.Wait()
	dr.DurationMS = timeSince(start)
	return
}

type traceHandler struct {
	Attrs []slog.Attr
	Trace []Proto
}

func (h *traceHandler) Enabled(ctx context.Context, level slog.Level) bool {
	return level <= mlog.LevelTrace || pkglog.Handler().Enabled(ctx, level)
}

func (h *traceHandler) Handle(ctx context.Context, r slog.Record) error {
	if r.Level <= mlog.LevelTrace {
		p := Proto{strings.HasPrefix(r.Message, "LC: "), strings.TrimPrefix(strings.TrimPrefix(r.Message, "LC: "), "RS: ")}
		h.Trace = append(h.Trace, p)
		return nil
	}
	return pkglog.Handler().Handle(ctx, r)
}

func (h *traceHandler) WithAttrs(attrs []slog.Attr) slog.Handler {
	// We keep the same traceHandler instance so we can get the trace after logging.
	h.Attrs = slices.Clone(append(h.Attrs, attrs...))
	return h
}

func (h *traceHandler) WithGroup(name string) slog.Handler {
	// Not used, so not implemented.
	return h
}

type limitDialer struct {
}

func (d *limitDialer) DialContext(ctx context.Context, network, addr string) (c net.Conn, err error) {
	host, _, err := net.SplitHostPort(addr)
	if err != nil {
		return nil, err
	}
	ip := net.ParseIP(host)
	if ip == nil {
		return nil, fmt.Errorf("address not an ip: %q", host)
	}
	if ratelimiter && !smtpDialLimiter.Add(ip, time.Now(), 1) {
		return nil, fmt.Errorf("rate limited: reached max number of smtp connections to ip in window, try again soon")
	}
	nd := &net.Dialer{}
	return nd.DialContext(ctx, network, addr)
}
