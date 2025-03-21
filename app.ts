// Filled in when serving html.
declare let meta: {
	Version: string
	GoVersion: string
	GoOs: string
	GoArch: string
}

// All logging goes through log() instead of console.log, except "should not happen" logging.
let log: (...args: any[]) => void = () => {}
try {
	if (localStorage.getItem('log') || location.hostname === 'localhost') {
		log = console.log
	}
} catch (err) {}

const client = new api.Client()

const domainName = (d: api.Domain) => {
	return d.Unicode || d.ASCII
}

const domainString = (d: api.Domain) => {
	if (d.Unicode) {
		return d.Unicode+" ("+d.ASCII+")"
	}
	return d.ASCII
}

const ipdomainString = (v: api.IPDomain) => {
	if (v.IP) {
		return 'xxx ip'
	}
	return domainString(v.Domain)
}

const green = '#50c40f'
const red = '#e15d1c'
const blue = '#09f'
const grey = '#aaa'
const orange = 'orange'

const tag = (color: string, ...l: ElemArg[]) => dom.span(dom._class('tag'), style({backgroundColor: color}), l)
const verbatim = (s: string) => dom.span(dom._class('mono'), style({whiteSpace: 'pre-wrap'}), s)
const formatJSON = (v: any) => dom.div(dom._class('mono'), style({whiteSpace: 'pre-wrap'}), JSON.stringify(v, undefined, '  '))
const statusTag = (s: string) => tag(grey, s)
const errorTag = (s: string, ...l: ElemArg[]) => s ? dom.div(tag(red, 'error'), ' ', s, l) : []
const dnsTXT = (s: string) => s ? verbatim(s) : []
const dnssecTag = (authentic: boolean) => dom.div(authentic ? tag(green, 'dnssec', attr.title('DNS lookups protected with DNSSEC.')) : tag(red, 'no dnssec', attr.title('DNS lookups not protected with DNSSEC.')))
const detailsLink = (elem: HTMLElement) => {
	let show: HTMLElement
	let hide: HTMLElement
	elem.style.display = 'none'
	return dom.div(
		show=dom.a(attr.href('#'), 'Show details...', function click(e: Event) {
			e.preventDefault()
			show.style.display = 'none'
			elem.style.display = ''
			hide.style.display = ''
		}),
		hide=dom.a(attr.href('#'), 'Hide details', style({display: 'none'}), function click(e: Event) {
			e.preventDefault()
			show.style.display = ''
			elem.style.display = 'none'
			hide.style.display = 'none'
		}),
		elem,
	)
}
const group = (...l: ElemArg[]) => dom.div(dom._class('group'), l)
const title = (...l: ElemArg[]) => dom.div(dom._class('title'), l)

const tlsaUsages = {
	0: 'PKIX-TA, verification through specific PKIX trusted CA',
	1: 'PKIX-EE, verification through PKIX (trusted CAs) and of specific certificate/SPKI',
	2: 'DANE-TA, verification through specific trusted CA certificate/SPKI, no PKIX',
	3: 'DANE-EE, verification of specific certificate/SPKI, no PKIX',
}
const tlsaSelectors = {
	0: 'Certificate, data covers the entire certificate',
	1: 'SPKI, subject public key info, data covers only the public key',
}
const tlsaMatchTypes = {
	0: 'Full, data represents all bytes of certificate/SPKI',
	1: 'data is SHA2-256 hash of certificate/SPKI',
	2: 'data is SHA2-512 hash of certificate/SPKI',
}

const formatDANERecord = (r: api.TLSARecord) => {
	const assoc = window.atob(r.CertAssoc || '').split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
	const s = [r.Usage, r.Selector, r.MatchType, assoc].join(' ')
	const title = [
		'' + r.Usage + ', usage: ' + (tlsaUsages[r.Usage] || '(unknown)'),
		'' + r.Selector + ', selector: ' + (tlsaSelectors[r.Selector] || '(unknown)'),
		'' + r.MatchType + ', match type: ' + (tlsaMatchTypes[r.MatchType] || '(unknown)'),
		'Data: hex-encoded (hash of) certificate/SPKI bytes',
	].join('\n')
	return [s, dom.span(attr.title(title), s)]
}

const duration = (ms: number) => [' ', dom.span(dom._class('duration'), ''+ms+'ms')]

const domainCheckResult = (dr: api.DomainResult) => {
	const mtastsExplain = 'MTA-STS protects MX records of domains without DNSSEC, and requires PKIX/WebPKI verification of MX host TLS certificates (the historical default "opportunistic TLS" does not verify at all). MTA-STS depends on PKIX/WebPKI  (well-known Certificate Authorities) and trust-on-first-use ("TOFU"). DANE has similar goals and can coexist with MTA-STS.'
	const tlsrptExplain = 'TLSRPT is a mechanism to request reports about SMTP TLS connections, both success and failures, such as invalid certificates.'
	const daneExplain = 'DANE protects delivery to MX hosts by requiring verified TLS along with DNSSEC-protected MX records. TLS verification is most often using DANE-EE, which is based on only the public key (SPKI) of a certificate, without verification through PKIX/WebPKI (well-known Certificate Authorities).'

	return dom.div(
		dom.h3('Results for receiving from ', domainString(dr.Domain)),
		dom.div(dom._class('row'),
			dom.div(dom._class('result'),
				dom.h4('SPF', duration(dr.SPF.DurationMS)),
				(() => {
					const status = dr.SPF.Status
					if (status === 'none' && !dr.SPF.Error) {
						return group(
							dom.div('Domain has an SPF record.', attr.title('An SPF record specifies a policy about which IP addresses are (not) allowed to send email from a domain.'))
						)
					} else if(status === 'none') {
						return group(
							tag(orange, 'warning'),
							dom.div('Domain does not have SPF record. An SPF record specifies a policy about which IP addresses are (not) allowed to send email from a domain.'),
						)
					} else {
						if (status === 'permerror') {
							return group(
								tag(red, 'permanent'),
								errorTag(dr.SPF.Error),
							)
						} else if (status === 'temperror') {
							return group(
								tag(orange, 'temporary'),
								errorTag(dr.SPF.Error),
							)
						} else {
							return group(
								tag(red, dr.SPF.Status),
								errorTag(dr.SPF.Error),
							)
						}
					}
				})(),
				group(
					title('DNS TXT'),
					dom.div(dnsTXT(dr.SPF.TXT)),
					dnssecTag(dr.SPF.Authentic),
				),
			),
			dom.div(dom._class('result'),
				dom.h4('DKIM'),
				group(
					dom.div('Not checked.', attr.title('Not checked because DKIM records (selectors) cannot typically be enumerated. A domain can publish DKIM public keys in DNS, under a selector, and add DKIM-Signature headers to outgoing messages for verification by a receiving mail server.')),
				),
			),
			dom.div(dom._class('result'),
				dom.h4('DMARC', duration(dr.DMARC.DurationMS)),
				(() => {
					const status = dr.DMARC.Status
					const explain = 'A DMARC record specifies a policy about messages with From header referencing the domain. The policy can ask receiving mail servers to reject or quarantine a message that does not have an aligned DKIM and/or SPF pass (both are mechanisms to associate a message/transaction with a domain).'
					if (status === 'none' && !dr.DMARC.Error && dr.DMARC.Record) {
						if (dr.DMARC.Record.Policy === api.DMARCPolicy.PolicyReject) {
							return group(
								tag(green, 'policy: reject'),
								dom.div('Domain has a DMARC policy rejecting unauthorized deliveries.', attr.title(explain)),
							)
						} else if (dr.DMARC.Record.Policy === api.DMARCPolicy.PolicyQuarantine) {
							return group(
								tag(red, 'policy: quarantine'),
								dom.div('Domain has a DMARC policy marking unauthorized deliveries as spam. This can leave legitimate senders with accidental DMARC failures unaware of delivery problems.', attr.title(explain)),
							)
						} else {
							return group(
								tag(orange, 'policy: '+dr.DMARC.Record.Policy),
								dom.div('Domain has a DMARC record.', attr.title(explain)),
							)
						}
					} else if(status === 'none') {
						return group(
							tag(red, 'not implemented'),
							dom.div('Domain does not implement DMARC, allowing unauthorized deliveries.', attr.title(explain)),
						)
					} else {
						if (status === 'permerror') {
							return group(
								tag(red, 'permanent'),
								errorTag(dr.DMARC.Error),
							)
						} else if (status === 'temperror') {
							return group(
								tag(orange, 'temporary'),
								errorTag(dr.DMARC.Error),
							)
						} else {
							return group(
								tag(red, dr.DMARC.Status),
								errorTag(dr.DMARC.Error),
							)
						}
					}
				})(),
				group(
					title('Domain with record'),
					dom.div(domainString(dr.DMARC.Domain)),
				),
				group(
					title('DNS TXT'),
					dom.div(dnsTXT(dr.DMARC.TXT)),
					dnssecTag(dr.DMARC.Authentic),
				),
			),
		),

		dom.h3('Results for sending to ', domainString(dr.Domain)),
		dom.div(dom._class('row'),
			dom.div(dom._class('result'),
				dom.h4('MX', duration(dr.MX.DurationMS)),
				errorTag(dr.MX.Error),
				dom.div(dr.MX.Error && dr.MX.Permanent ? tag(red, 'permanent') : []),
				group(
					title('Domain'),
					dom.div(domainString(dr.MX.ExpandedNextHop)),
					dnssecTag(dr.MX.OrigNextHopAuthentic && dr.MX.ExpandedNextHopAuthentic),
					dr.MX.Have ? [] : dom.span(tag(orange, 'no MX record'), ' deliveries will go directly to hostname'),
				),
				group(
					title('Hosts'),
					(dr.MXHosts || []).map(mx => dom.div(ipdomainString(mx.Host))),
				),
			),
			dom.div(dom._class('result'),
				dom.h4('MTA-STS', duration(dr.MTASTS.DurationMS)),
				errorTag(dr.MTASTS.Error),
				group(
					!dr.MTASTS.Implemented ? group(
						tag(red, 'not implemented'),
						dom.div('Domain does not implement MTA-STS.', attr.title(mtastsExplain)),
					) : [],
				),
				!dr.MTASTS.Implemented ? [] : [
					group(
						title('Policy ID'),
						dom.div(dr.MTASTS.Record ? dom.span(verbatim(dr.MTASTS.Record.ID), attr.title('Sending mail servers must keep track of the MTA-STS policy ID and fetch a new policy only when the ID has changed.')) : '-'),
					),
					dr.MTASTS.Policy ?
						group(
							title('Policy Mode'),
							dom.div(
									tag(dr.MTASTS.Policy.Mode === api.Mode.ModeEnforce ? green : red, dr.MTASTS.Policy.Mode),
							),
							dr.MTASTS.Policy.Mode === api.Mode.ModeEnforce ? dom.div('MTA-STS policy is active, delivery is PKIX-protected.', attr.title(mtastsExplain)) : [],
							dr.MTASTS.Policy.Mode === api.Mode.ModeTesting ? dom.div('MTA-STS policy is in testing mode, delivery is not PKIX-protected.', attr.title(mtastsExplain)) : [],
							dr.MTASTS.Policy.Mode === api.Mode.ModeNone ? dom.div('MTA-STS policy of none provides no protection, delivery is not PKIX-protected..', attr.title(mtastsExplain)) : [],
						) : [],
					group(
						title('MX hosts'),
						dom.div(
							dr.MTASTS.Policy ?
								(dr.MTASTS.Policy.MX || []).map(mx =>
									dom.div((mx.Wildcard ? '*.' : '') + (mx.Domain.Unicode || mx.Domain.ASCII) + (mx.Domain.Unicode ? ' (' + (mx.Wildcard ? '*.' : '') + mx.Domain.ASCII + ')' : '')),
								) : '-',
						),
					),
				],
				dr.MTASTS.PolicyText ? group(
					title('Raw policy'),
					dom.div(dom._class('mono'), style({whiteSpace: 'pre-wrap'}), dr.MTASTS.PolicyText),
				) : [],
			),
			dom.div(dom._class('result'),
				dom.h4('TLSRPT', duration(dr.TLSRPT.DurationMS)),
				(!dr.TLSRPT.Error && !dr.TLSRPT.Record) ?
					group(
						tag(orange, 'not implemented'),
						dom.div('Domain does not request reports about SMTP TLS connectivity.', attr.title(tlsrptExplain)),
					) : [],
				(!dr.TLSRPT.Error && dr.TLSRPT.Record) ? [
					group(
						tag(green, 'implemented'),
						dom.div('Domain requests reports about SMTP TLS failures.', attr.title(tlsrptExplain)),
					),
					group(
						title('DNS TXT'),
						dom.div(dnsTXT(dr.TLSRPT.TXT)),
					),
				] : [],
				errorTag(dr.TLSRPT.Error, attr.title(tlsrptExplain)),
			),
			(dr.MXHosts || []).map(mx => {
				let starttls = false
				return dom.div(dom._class('result'),
					dom.h4('MX host: ' + ipdomainString(mx.Host), duration(mx.DurationMS)),
					group(
						title('MTA-STS'),
						errorTag(mx.MTASTSError),
						dom.div(!mx.MTASTSError && dr.MTASTS.Policy && dr.MTASTS.Policy.Mode === api.Mode.ModeEnforce ? tag(green, 'verified') : []),
						dom.div(!mx.MTASTSError && dr.MTASTS.Policy && dr.MTASTS.Policy.Mode === api.Mode.ModeTesting ? tag(red, 'unenforced') : []),
						dom.div(!mx.MTASTSError && (!dr.MTASTS.Policy || dr.MTASTS.Policy.Mode === api.Mode.ModeNone) ? tag(red, 'not implemented') : []),
					),
					group(
						title('IPs', duration(mx.IP.DurationMS)),
						dom.div(
							errorTag(mx.IP.Error),
							mx.IP.ExpandedHost.ASCII !== mx.Host.Domain.ASCII && mx.Host.Domain ? [
								dom.div('Expanded host: ', verbatim(domainString(mx.IP.ExpandedHost))),
								dnssecTag(mx.IP.ExpandedAuthentic)
							] : [],
							(mx.IP.IPs || []).map(ip => dom.div(ip)),
							dnssecTag(mx.IP.Authentic),
						),
					),
					group(
						title('DANE', duration(mx.DANE.DurationMS)),
						dom.div(
							errorTag(mx.DANE.Error),
							dom.div(mx.DANE.Required ? tag(green, 'implemented') : tag(red, 'not implemented')),
							mx.DANE.Required ?
								dom.div('Delivery to this MX host is protected with verified TLS.', attr.title(daneExplain)) :
								dom.div('Delivery to this MX host is not protected with DANE-verified TLS.', attr.title(daneExplain)),
							mx.DANE.Required ? [
								mx.DANE.TLSABaseDomain.ASCII !== mx.Host.Domain.ASCII ? [
									title('TLSA base domain:'),
									dom.div(domainString(mx.DANE.TLSABaseDomain)),
								] : [],
								title('Records:', attr.title('Multiple records can be present: One for each certificate an MX host may present, and optionally for future keys to rotate to.')),
								(mx.DANE.Records || []).map(r => {
									const [s, e] = formatDANERecord(r)
									const [vrs, _] = mx.DANE.VerifiedRecord ? formatDANERecord(mx.DANE.VerifiedRecord) : ['', []]
									return dom.div(dom._class('mono'), tag(s === vrs ? green : grey, e))
								}),
							] : [],
						),
					),
					group(
						title('Dial', duration(mx.Dial.DurationMS)),
						errorTag(mx.Dial.Error),
						dom.div('IP: ', mx.Dial.IP || '-'),
					),
					group(
						title('SMTP', duration(mx.SMTP.DurationMS)),
						errorTag(mx.SMTP.Error),
						dom.div('Extensions: ',
							mx.Dial.IP && !mx.Dial.Error && !mx.SMTP.Error ? dom.div(
								tag(mx.SMTP.Supports8bitMIME ? green : red, '8BITMIME', attr.title('For sending messages that are not ASCII-only.')),
								tag(mx.SMTP.SupportsSMTPUTF8 ? green : red, 'SMTPUTF8', attr.title('For sending messages with UTF-8 in message headers, for internationalized messages.')),
								tag(mx.SMTP.SupportsSTARTTLS ? green : red, 'STARTTLS', attr.title('For adding TLS to a plain text SMTP session. The default is opportunistic TLS, without verification. With MTA-STS enabled, the TLS certificate must be verified with PKIX/WebPKI (common CAs). With DANE, the TLS certificate must be verified with TLSA records, typically based on public key (SPKI) of the certificate only (DANE-EE).')),
								tag(mx.SMTP.SupportsRequireTLS ? green : red, 'REQUIRETLS', attr.title('For sending messages where verified TLS is required along the entire delivery path, from submission to final delivery. Each SMTP server along the way must implement this extension. Also has a message header that indicates that TLS (verification) failure must be ignored.')),
							) : '-',
						),
					),
					group(
						title('TLS'),
						dom.div('Version: ', mx.SMTP.TLSConnectionState ? verbatim(mx.SMTP.TLSConnectionState.Version) : '-'),
						dom.div('Ciphersuite: ', mx.SMTP.TLSConnectionState ? verbatim(mx.SMTP.TLSConnectionState.CipherSuite) : '-'),
						dom.div('PKIX verification: ', mx.SMTP.RecipientDomainResult ? (mx.SMTP.RecipientDomainResult.Summary.TotalSuccessfulSessionCount === 1 ? tag(green, 'yes') : tag(red, 'no')) : '-'),
						dom.div('DANE verification: ',  mx.DANE.Required && mx.SMTP.HostResult ? (mx.SMTP.HostResult.Summary.TotalSuccessfulSessionCount === 1 ? tag(green, 'yes') : tag(red, 'no')) : '-'),
					),
					!mx.SMTP.Trace ? [] : group(
						title('Transcript'),
						(mx.SMTP.Trace || []).map((l, index) => {
							const e = dom.div(dom._class('mono'), style({paddingLeft: '.5em', whiteSpace: 'pre-wrap', color: l.ClientWrite ? '#e48b00' : blue}), starttls ? style({borderLeft: '2px solid '+green}) : [], l.Text)
							if (!starttls && !l.ClientWrite && l.Text.startsWith('2') && index > 0 && (mx.SMTP.Trace || [])[index-1].ClientWrite && (mx.SMTP.Trace || [])[index-1].Text === 'STARTTLS\r\n') {
								starttls = true
							}
							return e
						}),
					),
				)
			}),
		),
		dom.br(),

		dom.div(
			dom.h4('Raw results as JSON'),
			detailsLink(
				dom.div(dom._class('result'), formatJSON(dr)),
			),
		)
	)
}

const showTimer = (result: HTMLElement, left: number): number => {
	let timer: number
	const showTimeleft = () => {
		dom._kids(result, dom.div('Checking domain, max ', ''+left, ' seconds left...'))
		left -= 1
		if (left === 0) {
			clearInterval(timer)
		}
	}
	timer = setInterval(showTimeleft, 1000)
	showTimeleft()
	return timer
}

const init = async () => {
	let spfForm: HTMLFormElement
	let spfFieldset: HTMLFieldSetElement
	let spfDomain: HTMLInputElement
	let spfIP: HTMLInputElement

	let dkimForm: HTMLFormElement
	let dkimFieldset: HTMLFieldSetElement
	let dkimDomain: HTMLInputElement
	let dkimSelector: HTMLInputElement

	let dkimverifyFieldset: HTMLFieldSetElement
	let dkimverifyMessage: HTMLTextAreaElement

	let domainForm: HTMLFormElement
	let domainFieldset: HTMLFieldSetElement
	let domainName: HTMLInputElement

	let result: HTMLElement

	dom._kids(document.body,
		dom.div(
			dom.div(style({float: 'right', color: '#888'}), dom.div(meta?.Version, ' ', meta?.GoVersion, ' ', meta?.GoOs, '/', meta?.GoArch)),
			dom.h1('moxtools'),
			dom.div('Moxtools provides a few email-related tools, mostly as a showcase for the ', dom.a(attr.href('https://pkg.go.dev/github.com/mjl-/mox#section-directories'), 'Go packages'), ' of ', dom.a(attr.href('https://github.com/mjl-/mox'), 'mox'), '.'),
			dom.div('The public instance at ', dom.a(attr.href('https://tools.xmox.nl'), 'tools.xmox.nl'), ' has rate limiting enabled to prevent abuse, you can easily ', dom.a(attr.href('https://github.com/mjl-/moxtools'), 'run your own moxtools instance'), ' without limits.'),
		),
		dom.br(),

		dom.div(dom._class('row'),
			dom.div(dom._class('inputs'), style({width: '20em'}),
				dom.h2('Domain check'),
				domainForm=dom.form(
					async function submit(e: SubmitEvent) {
						e.preventDefault()
						e.stopPropagation()

						window.location.hash = ['#domain', encodeURIComponent(domainName.value)].join('/')

						const timer = showTimer(result, 30)
						try {
							domainFieldset.disabled = true
							result.scrollIntoView({block: 'nearest', behavior: 'smooth'})
							const results = await client.DomainCheck(domainName.value)
							clearInterval(timer)
							dom._kids(result,
								dom.div(
									dom._class('results'),
									domainCheckResult(results),
								),
							)
							result.scrollIntoView({block: 'nearest'})
						} catch (err) {
							dom._kids(result)
							window.alert('Error: '+errmsg(err))
						} finally {
							clearInterval(timer)
							domainFieldset.disabled = false
						}
					},
					domainFieldset=dom.fieldset(
						dom.div(
							dom.label(
								'Domain',
								dom.div(domainName=dom.input(attr.required(''))),
							),
						),
						dom.div(
							dom.submitbutton('Verify'),
						),
					),
				),
				dom.div(dom._class('explanation'), 'Looks up MX records, and SPF, DMARC, TLSRPT, DANE and MTA-STS, with DNSSEC. Tries to connect to first 2 MX targets and negotiate TLS.'),
			),

			dom.div(dom._class('inputs'), style({width: '20em'}),
				dom.h2('Check SPF'),
				spfForm=dom.form(
					async function submit(e: SubmitEvent) {
						e.preventDefault()
						e.stopPropagation()

						window.location.hash = ['#spfcheck', encodeURIComponent(spfDomain.value), encodeURIComponent(spfIP.value)].join('/')

						const timer = showTimer(result, 15)
						try {
							spfFieldset.disabled = true
							result.scrollIntoView({block: 'nearest'})
							const [received, _, explanation, authentic] = await client.SPFCheck(spfDomain.value, spfIP.value)
							clearInterval(timer)
							dom._kids(result,
								dom.div(
									dom._class('results'),
									dom.h3('Results'),
									dom.div(dom._class('row'),
										dom.div(dom._class('result'),
											group(
												title('Status'),
												dom.div(received.Status),
											),
											group(
												title('Mechanism'),
												dom.div(received.Mechanism),
											),
											group(
												title('Explanation'),
												dom.div(explanation || '-'),
											),
											dnssecTag(authentic),
										),
									),
								),
							)
							result.scrollIntoView({block: 'nearest', behavior: 'smooth'})
						} catch (err) {
							dom._kids(result)
							window.alert('Error: '+errmsg(err))
						} finally {
							clearInterval(timer)
							spfFieldset.disabled = false
						}
					},
					spfFieldset=dom.fieldset(
						dom.div(
							dom.label(
								'Domain',
								dom.div(spfDomain=dom.input(attr.required(''))),
							),
						),
						dom.div(
							dom.label(
								'IP',
								dom.div(spfIP=dom.input(attr.required(''))),
							),
						),
						dom.div(
							dom.submitbutton('Check'),
						),
					),
				),
				dom.div(dom._class('explanation'), 'Evaluates the IP address against the SPF policy of the domain.'),
			),

			dom.div(dom._class('inputs'), style({width: '20em'}),
				dom.h2('Lookup DKIM record'),
				dkimForm=dom.form(
					async function submit(e: SubmitEvent) {
						e.preventDefault()
						e.stopPropagation()

						window.location.hash = ['#dkimlookup', encodeURIComponent(dkimSelector.value), encodeURIComponent(dkimDomain.value)].join('/')

						const timer = showTimer(result, 15)
						try {
							dkimFieldset.disabled = true
							result.scrollIntoView({block: 'nearest', behavior: 'smooth'})
							const [status, record, txt, authentic] = await client.DKIMLookup(dkimSelector.value, dkimDomain.value)
							clearInterval(timer)
							dom._kids(result,
								dom.div(
									dom._class('results'),
									dom.h3('Results'),
									dom.div(dom._class('row'),
										dom.div(dom._class('result'),
											group(
												title('Status'),
												dom.div(status),
											),
											group(
												title('DNS TXT'),
												dom.div(txt),
												dnssecTag(authentic),
											),
											group(
												title('Record in parsed form'),
												dom.div(record ? formatJSON(record) : '-'),
											),
										),
									),
								),
							)
							result.scrollIntoView({block: 'nearest', behavior: 'smooth'})
						} catch (err) {
							dom._kids(result)
							window.alert('Error: '+errmsg(err))
						} finally {
							clearInterval(timer)
							dkimFieldset.disabled = false
						}
					},
					dkimFieldset=dom.fieldset(
						dom.div(
							dom.label(
								'Selector',
								dom.div(dkimSelector=dom.input(attr.required(''))),
							),
						),
						dom.div(
							dom.label(
								'Domain',
								dom.div(dkimDomain=dom.input(attr.required(''))),
							),
						),
						dom.div(
							dom.submitbutton('Lookup'),
						),
					),
				),
				dom.div(dom._class('explanation'), 'Looks up the DKIM record for the selector at the domain.'),
			),

			dom.div(dom._class('inputs'), style({flexGrow: '1', maxWidth: '80em'}),
				dom.h2('Verify DKIM signatures in message'),
				dom.form(
					async function submit(e: SubmitEvent) {
						e.preventDefault()
						e.stopPropagation()

						const timer = showTimer(result, 15)
						try {
							dkimverifyFieldset.disabled = true
							result.scrollIntoView({block: 'nearest', behavior: 'smooth'})
							const results = await client.DKIMVerify(dkimverifyMessage.value)
							clearInterval(timer)
							dom._kids(result,
								dom.div(
									dom._class('results'),
									dom.h3('Results'),
									dom.div(dom._class('row'),
										(results || []).length === 0 ? dom.div(dom._class('result'), 'No DKIM signatures') : [],
										(results || []).map(r =>
											dom.div(dom._class('result'),
												dom.h4('Signature'),
												errorTag(r.Error),
												group(
													title('Status'),
													r.Status,
												),
												group(
													title('Signature'),
													dom.div(r.Sig ? formatJSON(r.Sig) : '-'),
												),
												group(
													title('Record'),
													dom.div(r.Record ? formatJSON(r.Record) : '-'),
													r.Record ? dnssecTag(r.RecordAuthentic) : [],
												),
											),
										),
									),
								),
							)
							result.scrollIntoView({block: 'nearest', behavior: 'smooth'})
						} catch (err) {
							dom._kids(result)
							window.alert('Error: '+errmsg(err))
						} finally {
							clearInterval(timer)
							dkimverifyFieldset.disabled = false
						}
					},
					dkimverifyFieldset=dom.fieldset(
						dom.div(
							dom.label(
								'Message',
								dom.div(dkimverifyMessage=dom.textarea(attr.rows('10'), attr.required(''))),
							),
						),
						dom.div(
							dom.submitbutton('Verify'),
						),
					),
				),
				dom.div(dom._class('explanation'), 'Parses the email message, finds all DKIM-Signature headers, and looks up their DKIM record and verifies their signature. Keep in mind that old messages can reference DKIM selectors that no longer exist in DNS and will not verify successfully anymore.'),
			),
		),
		result=dom.div(),
	)

	const h = window.location.hash.substring(1)
	if (h) {
		const t = h.split('/')
		for (let i = 1; i < t.length; i++) {
			t[i] = decodeURIComponent(t[i])
		}
		if (t[0] === 'domain' && t.length === 2) {
			domainName.value = t[1]
			domainForm.requestSubmit()
		} else if (t[0] === 'spfcheck' && t.length === 3) {
			spfDomain.value = t[1]
			spfIP.value = t[2]
			spfForm.requestSubmit()
		} else if (t[0] === 'dkimlookup' && t.length === 3) {
			dkimSelector.value = t[1]
			dkimDomain.value = t[2]
			dkimForm.requestSubmit()
		} else {
			window.location.hash = ''
		}
	}
}

window.addEventListener('load', async () => {
	try {
		await init()
	} catch (err) {
		window.alert('Error: ' + errmsg(err))
	}
})

// Errors in catch statements are of type unknown, we normally want its
// message.
const errmsg = (err: unknown) => ''+((err as any).message || '(no error message)')
