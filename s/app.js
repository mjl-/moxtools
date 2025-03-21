"use strict";
// Javascript is generated from typescript, do not modify generated javascript because changes will be overwritten.
const [dom, style, attr, prop] = (function () {
	// Start of unicode block (rough approximation of script), from https://www.unicode.org/Public/UNIDATA/Blocks.txt
	const scriptblocks = [0x0000, 0x0080, 0x0100, 0x0180, 0x0250, 0x02B0, 0x0300, 0x0370, 0x0400, 0x0500, 0x0530, 0x0590, 0x0600, 0x0700, 0x0750, 0x0780, 0x07C0, 0x0800, 0x0840, 0x0860, 0x0870, 0x08A0, 0x0900, 0x0980, 0x0A00, 0x0A80, 0x0B00, 0x0B80, 0x0C00, 0x0C80, 0x0D00, 0x0D80, 0x0E00, 0x0E80, 0x0F00, 0x1000, 0x10A0, 0x1100, 0x1200, 0x1380, 0x13A0, 0x1400, 0x1680, 0x16A0, 0x1700, 0x1720, 0x1740, 0x1760, 0x1780, 0x1800, 0x18B0, 0x1900, 0x1950, 0x1980, 0x19E0, 0x1A00, 0x1A20, 0x1AB0, 0x1B00, 0x1B80, 0x1BC0, 0x1C00, 0x1C50, 0x1C80, 0x1C90, 0x1CC0, 0x1CD0, 0x1D00, 0x1D80, 0x1DC0, 0x1E00, 0x1F00, 0x2000, 0x2070, 0x20A0, 0x20D0, 0x2100, 0x2150, 0x2190, 0x2200, 0x2300, 0x2400, 0x2440, 0x2460, 0x2500, 0x2580, 0x25A0, 0x2600, 0x2700, 0x27C0, 0x27F0, 0x2800, 0x2900, 0x2980, 0x2A00, 0x2B00, 0x2C00, 0x2C60, 0x2C80, 0x2D00, 0x2D30, 0x2D80, 0x2DE0, 0x2E00, 0x2E80, 0x2F00, 0x2FF0, 0x3000, 0x3040, 0x30A0, 0x3100, 0x3130, 0x3190, 0x31A0, 0x31C0, 0x31F0, 0x3200, 0x3300, 0x3400, 0x4DC0, 0x4E00, 0xA000, 0xA490, 0xA4D0, 0xA500, 0xA640, 0xA6A0, 0xA700, 0xA720, 0xA800, 0xA830, 0xA840, 0xA880, 0xA8E0, 0xA900, 0xA930, 0xA960, 0xA980, 0xA9E0, 0xAA00, 0xAA60, 0xAA80, 0xAAE0, 0xAB00, 0xAB30, 0xAB70, 0xABC0, 0xAC00, 0xD7B0, 0xD800, 0xDB80, 0xDC00, 0xE000, 0xF900, 0xFB00, 0xFB50, 0xFE00, 0xFE10, 0xFE20, 0xFE30, 0xFE50, 0xFE70, 0xFF00, 0xFFF0, 0x10000, 0x10080, 0x10100, 0x10140, 0x10190, 0x101D0, 0x10280, 0x102A0, 0x102E0, 0x10300, 0x10330, 0x10350, 0x10380, 0x103A0, 0x10400, 0x10450, 0x10480, 0x104B0, 0x10500, 0x10530, 0x10570, 0x10600, 0x10780, 0x10800, 0x10840, 0x10860, 0x10880, 0x108E0, 0x10900, 0x10920, 0x10980, 0x109A0, 0x10A00, 0x10A60, 0x10A80, 0x10AC0, 0x10B00, 0x10B40, 0x10B60, 0x10B80, 0x10C00, 0x10C80, 0x10D00, 0x10E60, 0x10E80, 0x10EC0, 0x10F00, 0x10F30, 0x10F70, 0x10FB0, 0x10FE0, 0x11000, 0x11080, 0x110D0, 0x11100, 0x11150, 0x11180, 0x111E0, 0x11200, 0x11280, 0x112B0, 0x11300, 0x11400, 0x11480, 0x11580, 0x11600, 0x11660, 0x11680, 0x11700, 0x11800, 0x118A0, 0x11900, 0x119A0, 0x11A00, 0x11A50, 0x11AB0, 0x11AC0, 0x11B00, 0x11C00, 0x11C70, 0x11D00, 0x11D60, 0x11EE0, 0x11F00, 0x11FB0, 0x11FC0, 0x12000, 0x12400, 0x12480, 0x12F90, 0x13000, 0x13430, 0x14400, 0x16800, 0x16A40, 0x16A70, 0x16AD0, 0x16B00, 0x16E40, 0x16F00, 0x16FE0, 0x17000, 0x18800, 0x18B00, 0x18D00, 0x1AFF0, 0x1B000, 0x1B100, 0x1B130, 0x1B170, 0x1BC00, 0x1BCA0, 0x1CF00, 0x1D000, 0x1D100, 0x1D200, 0x1D2C0, 0x1D2E0, 0x1D300, 0x1D360, 0x1D400, 0x1D800, 0x1DF00, 0x1E000, 0x1E030, 0x1E100, 0x1E290, 0x1E2C0, 0x1E4D0, 0x1E7E0, 0x1E800, 0x1E900, 0x1EC70, 0x1ED00, 0x1EE00, 0x1F000, 0x1F030, 0x1F0A0, 0x1F100, 0x1F200, 0x1F300, 0x1F600, 0x1F650, 0x1F680, 0x1F700, 0x1F780, 0x1F800, 0x1F900, 0x1FA00, 0x1FA70, 0x1FB00, 0x20000, 0x2A700, 0x2B740, 0x2B820, 0x2CEB0, 0x2F800, 0x30000, 0x31350, 0xE0000, 0xE0100, 0xF0000, 0x100000];
	// Find block code belongs in.
	const findBlock = (code) => {
		let s = 0;
		let e = scriptblocks.length;
		while (s < e - 1) {
			let i = Math.floor((s + e) / 2);
			if (code < scriptblocks[i]) {
				e = i;
			}
			else {
				s = i;
			}
		}
		return s;
	};
	// formatText adds s to element e, in a way that makes switching unicode scripts
	// clear, with alternating DOM TextNode and span elements with a "switchscript"
	// class. Useful for highlighting look alikes, e.g. a (ascii 0x61) and а (cyrillic
	// 0x430).
	//
	// This is only called one string at a time, so the UI can still display strings
	// without highlighting switching scripts, by calling formatText on the parts.
	const formatText = (e, s) => {
		// Handle some common cases quickly.
		if (!s) {
			return;
		}
		let ascii = true;
		for (const c of s) {
			const cp = c.codePointAt(0); // For typescript, to check for undefined.
			if (cp !== undefined && cp >= 0x0080) {
				ascii = false;
				break;
			}
		}
		if (ascii) {
			e.appendChild(document.createTextNode(s));
			return;
		}
		// todo: handle grapheme clusters? wait for Intl.Segmenter?
		let n = 0; // Number of text/span parts added.
		let str = ''; // Collected so far.
		let block = -1; // Previous block/script.
		let mod = 1;
		const put = (nextblock) => {
			if (n === 0 && nextblock === 0) {
				// Start was non-ascii, second block is ascii, we'll start marked as switched.
				mod = 0;
			}
			if (n % 2 === mod) {
				const x = document.createElement('span');
				x.classList.add('scriptswitch');
				x.appendChild(document.createTextNode(str));
				e.appendChild(x);
			}
			else {
				e.appendChild(document.createTextNode(str));
			}
			n++;
			str = '';
		};
		for (const c of s) {
			// Basic whitespace does not switch blocks. Will probably need to extend with more
			// punctuation in the future. Possibly for digits too. But perhaps not in all
			// scripts.
			if (c === ' ' || c === '\t' || c === '\r' || c === '\n') {
				str += c;
				continue;
			}
			const code = c.codePointAt(0);
			if (block < 0 || !(code >= scriptblocks[block] && (code < scriptblocks[block + 1] || block === scriptblocks.length - 1))) {
				const nextblock = code < 0x0080 ? 0 : findBlock(code);
				if (block >= 0) {
					put(nextblock);
				}
				block = nextblock;
			}
			str += c;
		}
		put(-1);
	};
	const _domKids = (e, l) => {
		l.forEach((c) => {
			const xc = c;
			if (typeof c === 'string') {
				formatText(e, c);
			}
			else if (c instanceof String) {
				// String is an escape-hatch for text that should not be formatted with
				// unicode-block-change-highlighting, e.g. for textarea values.
				e.appendChild(document.createTextNode('' + c));
			}
			else if (c instanceof Element) {
				e.appendChild(c);
			}
			else if (c instanceof Function) {
				if (!c.name) {
					throw new Error('function without name');
				}
				e.addEventListener(c.name, c);
			}
			else if (Array.isArray(xc)) {
				_domKids(e, c);
			}
			else if (xc._class) {
				for (const s of xc._class) {
					e.classList.toggle(s, true);
				}
			}
			else if (xc._attrs) {
				for (const k in xc._attrs) {
					e.setAttribute(k, xc._attrs[k]);
				}
			}
			else if (xc._styles) {
				for (const k in xc._styles) {
					const estyle = e.style;
					estyle[k] = xc._styles[k];
				}
			}
			else if (xc._props) {
				for (const k in xc._props) {
					const eprops = e;
					eprops[k] = xc._props[k];
				}
			}
			else if (xc.root) {
				e.appendChild(xc.root);
			}
			else {
				console.log('bad kid', c);
				throw new Error('bad kid');
			}
		});
		return e;
	};
	const dom = {
		_kids: function (e, ...kl) {
			while (e.firstChild) {
				e.removeChild(e.firstChild);
			}
			_domKids(e, kl);
		},
		_attrs: (x) => { return { _attrs: x }; },
		_class: (...x) => { return { _class: x }; },
		// The createElement calls are spelled out so typescript can derive function
		// signatures with a specific HTML*Element return type.
		div: (...l) => _domKids(document.createElement('div'), l),
		span: (...l) => _domKids(document.createElement('span'), l),
		a: (...l) => _domKids(document.createElement('a'), l),
		input: (...l) => _domKids(document.createElement('input'), l),
		textarea: (...l) => _domKids(document.createElement('textarea'), l),
		select: (...l) => _domKids(document.createElement('select'), l),
		option: (...l) => _domKids(document.createElement('option'), l),
		clickbutton: (...l) => _domKids(document.createElement('button'), [attr.type('button'), ...l]),
		submitbutton: (...l) => _domKids(document.createElement('button'), [attr.type('submit'), ...l]),
		form: (...l) => _domKids(document.createElement('form'), l),
		fieldset: (...l) => _domKids(document.createElement('fieldset'), l),
		table: (...l) => _domKids(document.createElement('table'), l),
		thead: (...l) => _domKids(document.createElement('thead'), l),
		tbody: (...l) => _domKids(document.createElement('tbody'), l),
		tr: (...l) => _domKids(document.createElement('tr'), l),
		td: (...l) => _domKids(document.createElement('td'), l),
		th: (...l) => _domKids(document.createElement('th'), l),
		datalist: (...l) => _domKids(document.createElement('datalist'), l),
		h1: (...l) => _domKids(document.createElement('h1'), l),
		h2: (...l) => _domKids(document.createElement('h2'), l),
		h3: (...l) => _domKids(document.createElement('h3'), l),
		h4: (...l) => _domKids(document.createElement('h4'), l),
		br: (...l) => _domKids(document.createElement('br'), l),
		hr: (...l) => _domKids(document.createElement('hr'), l),
		pre: (...l) => _domKids(document.createElement('pre'), l),
		label: (...l) => _domKids(document.createElement('label'), l),
		ul: (...l) => _domKids(document.createElement('ul'), l),
		li: (...l) => _domKids(document.createElement('li'), l),
		iframe: (...l) => _domKids(document.createElement('iframe'), l),
		b: (...l) => _domKids(document.createElement('b'), l),
		img: (...l) => _domKids(document.createElement('img'), l),
		style: (...l) => _domKids(document.createElement('style'), l),
		search: (...l) => _domKids(document.createElement('search'), l),
	};
	const _attr = (k, v) => { const o = {}; o[k] = v; return { _attrs: o }; };
	const attr = {
		title: (s) => _attr('title', s),
		value: (s) => _attr('value', s),
		type: (s) => _attr('type', s),
		tabindex: (s) => _attr('tabindex', s),
		src: (s) => _attr('src', s),
		placeholder: (s) => _attr('placeholder', s),
		href: (s) => _attr('href', s),
		checked: (s) => _attr('checked', s),
		selected: (s) => _attr('selected', s),
		id: (s) => _attr('id', s),
		datalist: (s) => _attr('datalist', s),
		rows: (s) => _attr('rows', s),
		target: (s) => _attr('target', s),
		rel: (s) => _attr('rel', s),
		required: (s) => _attr('required', s),
		multiple: (s) => _attr('multiple', s),
		download: (s) => _attr('download', s),
		disabled: (s) => _attr('disabled', s),
		draggable: (s) => _attr('draggable', s),
		rowspan: (s) => _attr('rowspan', s),
		colspan: (s) => _attr('colspan', s),
		for: (s) => _attr('for', s),
		role: (s) => _attr('role', s),
		arialabel: (s) => _attr('aria-label', s),
		arialive: (s) => _attr('aria-live', s),
		name: (s) => _attr('name', s)
	};
	const style = (x) => { return { _styles: x }; };
	const prop = (x) => { return { _props: x }; };
	return [dom, style, attr, prop];
})();
// NOTE: GENERATED by github.com/mjl-/sherpats, DO NOT MODIFY
var api;
(function (api) {
	// TLSAUsage indicates which certificate/public key verification must be done.
	let TLSAUsage;
	(function (TLSAUsage) {
		// PKIX/WebPKI, certificate must be valid (name, expiry, signed by CA, etc) and
		// signed by the trusted-anchor (TA) in this record.
		TLSAUsage[TLSAUsage["TLSAUsagePKIXTA"] = 0] = "TLSAUsagePKIXTA";
		// PKIX/WebPKI, certificate must be valid (name, expiry, signed by CA, etc) and
		// match the certificate in the record.
		TLSAUsage[TLSAUsage["TLSAUsagePKIXEE"] = 1] = "TLSAUsagePKIXEE";
		// Certificate must be signed by trusted-anchor referenced in record, with matching
		// name, non-expired, etc.
		TLSAUsage[TLSAUsage["TLSAUsageDANETA"] = 2] = "TLSAUsageDANETA";
		// Certificate must match the record. No further requirements on name, expiration
		// or who signed it.
		TLSAUsage[TLSAUsage["TLSAUsageDANEEE"] = 3] = "TLSAUsageDANEEE";
	})(TLSAUsage = api.TLSAUsage || (api.TLSAUsage = {}));
	// TLSASelecter indicates the data the "certificate association" field is based on.
	let TLSASelector;
	(function (TLSASelector) {
		TLSASelector[TLSASelector["TLSASelectorCert"] = 0] = "TLSASelectorCert";
		TLSASelector[TLSASelector["TLSASelectorSPKI"] = 1] = "TLSASelectorSPKI";
	})(TLSASelector = api.TLSASelector || (api.TLSASelector = {}));
	// TLSAMatchType indicates in which form the data as indicated by the selector
	// is stored in the record as certificate association.
	let TLSAMatchType;
	(function (TLSAMatchType) {
		TLSAMatchType[TLSAMatchType["TLSAMatchTypeFull"] = 0] = "TLSAMatchTypeFull";
		TLSAMatchType[TLSAMatchType["TLSAMatchTypeSHA256"] = 1] = "TLSAMatchTypeSHA256";
		TLSAMatchType[TLSAMatchType["TLSAMatchTypeSHA512"] = 2] = "TLSAMatchTypeSHA512";
	})(TLSAMatchType = api.TLSAMatchType || (api.TLSAMatchType = {}));
	// Policy as used in DMARC DNS record for "p=" or "sp=".
	let DMARCPolicy;
	(function (DMARCPolicy) {
		DMARCPolicy["PolicyEmpty"] = "";
		DMARCPolicy["PolicyNone"] = "none";
		DMARCPolicy["PolicyQuarantine"] = "quarantine";
		DMARCPolicy["PolicyReject"] = "reject";
	})(DMARCPolicy = api.DMARCPolicy || (api.DMARCPolicy = {}));
	// Align specifies the required alignment of a domain name.
	let Align;
	(function (Align) {
		Align["AlignStrict"] = "s";
		Align["AlignRelaxed"] = "r";
	})(Align = api.Align || (api.Align = {}));
	// Mode indicates how the policy should be interpreted.
	let Mode;
	(function (Mode) {
		Mode["ModeEnforce"] = "enforce";
		Mode["ModeTesting"] = "testing";
		Mode["ModeNone"] = "none";
	})(Mode = api.Mode || (api.Mode = {}));
	api.structTypes = { "DKIMResult": true, "DMARCRecord": true, "Directive": true, "Domain": true, "DomainDANE": true, "DomainDMARC": true, "DomainDial": true, "DomainIP": true, "DomainMTASTS": true, "DomainMX": true, "DomainMXHost": true, "DomainResult": true, "DomainSMTP": true, "DomainSPF": true, "DomainTLSRPT": true, "Extension": true, "IPDomain": true, "Identity": true, "MTASTSRecord": true, "MX": true, "Modifier": true, "Pair": true, "Policy": true, "Proto": true, "Record": true, "SPFReceived": true, "SPFRecord": true, "Sig": true, "TLSARecord": true, "TLSConnectionState": true, "TLSRPTFailureDetails": true, "TLSRPTRecord": true, "TLSRPTResult": true, "TLSRPTResultPolicy": true, "TLSRPTSummary": true, "URI": true };
	api.stringsTypes = { "Align": true, "DKIMStatus": true, "DMARCPolicy": true, "IP": true, "Localpart": true, "Mode": true, "RUA": true };
	api.intsTypes = { "TLSAMatchType": true, "TLSASelector": true, "TLSAUsage": true };
	api.types = {
		"SPFReceived": { "Name": "SPFReceived", "Docs": "", "Fields": [{ "Name": "Status", "Docs": "", "Typewords": ["string"] }, { "Name": "Mechanism", "Docs": "", "Typewords": ["string"] }] },
		"Domain": { "Name": "Domain", "Docs": "", "Fields": [{ "Name": "ASCII", "Docs": "", "Typewords": ["string"] }, { "Name": "Unicode", "Docs": "", "Typewords": ["string"] }] },
		"Record": { "Name": "Record", "Docs": "", "Fields": [{ "Name": "Version", "Docs": "", "Typewords": ["string"] }, { "Name": "Hashes", "Docs": "", "Typewords": ["[]", "string"] }, { "Name": "Key", "Docs": "", "Typewords": ["string"] }, { "Name": "Notes", "Docs": "", "Typewords": ["string"] }, { "Name": "Pubkey", "Docs": "", "Typewords": ["nullable", "string"] }, { "Name": "Services", "Docs": "", "Typewords": ["[]", "string"] }, { "Name": "Flags", "Docs": "", "Typewords": ["[]", "string"] }] },
		"DKIMResult": { "Name": "DKIMResult", "Docs": "", "Fields": [{ "Name": "Status", "Docs": "", "Typewords": ["DKIMStatus"] }, { "Name": "Sig", "Docs": "", "Typewords": ["nullable", "Sig"] }, { "Name": "Record", "Docs": "", "Typewords": ["nullable", "Record"] }, { "Name": "RecordAuthentic", "Docs": "", "Typewords": ["bool"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }] },
		"Sig": { "Name": "Sig", "Docs": "", "Fields": [{ "Name": "Version", "Docs": "", "Typewords": ["int32"] }, { "Name": "AlgorithmSign", "Docs": "", "Typewords": ["string"] }, { "Name": "AlgorithmHash", "Docs": "", "Typewords": ["string"] }, { "Name": "Signature", "Docs": "", "Typewords": ["nullable", "string"] }, { "Name": "BodyHash", "Docs": "", "Typewords": ["nullable", "string"] }, { "Name": "Domain", "Docs": "", "Typewords": ["Domain"] }, { "Name": "SignedHeaders", "Docs": "", "Typewords": ["[]", "string"] }, { "Name": "Selector", "Docs": "", "Typewords": ["Domain"] }, { "Name": "Canonicalization", "Docs": "", "Typewords": ["string"] }, { "Name": "Length", "Docs": "", "Typewords": ["int64"] }, { "Name": "Identity", "Docs": "", "Typewords": ["nullable", "Identity"] }, { "Name": "QueryMethods", "Docs": "", "Typewords": ["[]", "string"] }, { "Name": "SignTime", "Docs": "", "Typewords": ["int64"] }, { "Name": "ExpireTime", "Docs": "", "Typewords": ["int64"] }, { "Name": "CopiedHeaders", "Docs": "", "Typewords": ["[]", "string"] }] },
		"Identity": { "Name": "Identity", "Docs": "", "Fields": [{ "Name": "Localpart", "Docs": "", "Typewords": ["nullable", "Localpart"] }, { "Name": "Domain", "Docs": "", "Typewords": ["Domain"] }] },
		"DomainResult": { "Name": "DomainResult", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Domain", "Docs": "", "Typewords": ["Domain"] }, { "Name": "SPF", "Docs": "", "Typewords": ["DomainSPF"] }, { "Name": "DMARC", "Docs": "", "Typewords": ["DomainDMARC"] }, { "Name": "TLSRPT", "Docs": "", "Typewords": ["DomainTLSRPT"] }, { "Name": "MTASTS", "Docs": "", "Typewords": ["DomainMTASTS"] }, { "Name": "MX", "Docs": "", "Typewords": ["DomainMX"] }, { "Name": "MXHosts", "Docs": "", "Typewords": ["[]", "DomainMXHost"] }] },
		"DomainSPF": { "Name": "DomainSPF", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Status", "Docs": "", "Typewords": ["string"] }, { "Name": "TXT", "Docs": "", "Typewords": ["string"] }, { "Name": "Record", "Docs": "", "Typewords": ["nullable", "SPFRecord"] }, { "Name": "Authentic", "Docs": "", "Typewords": ["bool"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }] },
		"SPFRecord": { "Name": "SPFRecord", "Docs": "", "Fields": [{ "Name": "Version", "Docs": "", "Typewords": ["string"] }, { "Name": "Directives", "Docs": "", "Typewords": ["[]", "Directive"] }, { "Name": "Redirect", "Docs": "", "Typewords": ["string"] }, { "Name": "Explanation", "Docs": "", "Typewords": ["string"] }, { "Name": "Other", "Docs": "", "Typewords": ["[]", "Modifier"] }] },
		"Directive": { "Name": "Directive", "Docs": "", "Fields": [{ "Name": "Qualifier", "Docs": "", "Typewords": ["string"] }, { "Name": "Mechanism", "Docs": "", "Typewords": ["string"] }, { "Name": "DomainSpec", "Docs": "", "Typewords": ["string"] }, { "Name": "IPstr", "Docs": "", "Typewords": ["string"] }, { "Name": "IP4CIDRLen", "Docs": "", "Typewords": ["nullable", "int32"] }, { "Name": "IP6CIDRLen", "Docs": "", "Typewords": ["nullable", "int32"] }] },
		"Modifier": { "Name": "Modifier", "Docs": "", "Fields": [{ "Name": "Key", "Docs": "", "Typewords": ["string"] }, { "Name": "Value", "Docs": "", "Typewords": ["string"] }] },
		"DomainDMARC": { "Name": "DomainDMARC", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Status", "Docs": "", "Typewords": ["string"] }, { "Name": "Domain", "Docs": "", "Typewords": ["Domain"] }, { "Name": "Record", "Docs": "", "Typewords": ["nullable", "DMARCRecord"] }, { "Name": "TXT", "Docs": "", "Typewords": ["string"] }, { "Name": "Authentic", "Docs": "", "Typewords": ["bool"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }] },
		"DMARCRecord": { "Name": "DMARCRecord", "Docs": "", "Fields": [{ "Name": "Version", "Docs": "", "Typewords": ["string"] }, { "Name": "Policy", "Docs": "", "Typewords": ["DMARCPolicy"] }, { "Name": "SubdomainPolicy", "Docs": "", "Typewords": ["DMARCPolicy"] }, { "Name": "AggregateReportAddresses", "Docs": "", "Typewords": ["[]", "URI"] }, { "Name": "FailureReportAddresses", "Docs": "", "Typewords": ["[]", "URI"] }, { "Name": "ADKIM", "Docs": "", "Typewords": ["Align"] }, { "Name": "ASPF", "Docs": "", "Typewords": ["Align"] }, { "Name": "AggregateReportingInterval", "Docs": "", "Typewords": ["int32"] }, { "Name": "FailureReportingOptions", "Docs": "", "Typewords": ["[]", "string"] }, { "Name": "ReportingFormat", "Docs": "", "Typewords": ["[]", "string"] }, { "Name": "Percentage", "Docs": "", "Typewords": ["int32"] }] },
		"URI": { "Name": "URI", "Docs": "", "Fields": [{ "Name": "Address", "Docs": "", "Typewords": ["string"] }, { "Name": "MaxSize", "Docs": "", "Typewords": ["uint64"] }, { "Name": "Unit", "Docs": "", "Typewords": ["string"] }] },
		"DomainTLSRPT": { "Name": "DomainTLSRPT", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Record", "Docs": "", "Typewords": ["nullable", "TLSRPTRecord"] }, { "Name": "TXT", "Docs": "", "Typewords": ["string"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }] },
		"TLSRPTRecord": { "Name": "TLSRPTRecord", "Docs": "", "Fields": [{ "Name": "Version", "Docs": "", "Typewords": ["string"] }, { "Name": "RUAs", "Docs": "", "Typewords": ["[]", "[]", "RUA"] }, { "Name": "Extensions", "Docs": "", "Typewords": ["[]", "Extension"] }] },
		"Extension": { "Name": "Extension", "Docs": "", "Fields": [{ "Name": "Key", "Docs": "", "Typewords": ["string"] }, { "Name": "Value", "Docs": "", "Typewords": ["string"] }] },
		"DomainMTASTS": { "Name": "DomainMTASTS", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Implemented", "Docs": "", "Typewords": ["bool"] }, { "Name": "Record", "Docs": "", "Typewords": ["nullable", "MTASTSRecord"] }, { "Name": "Policy", "Docs": "", "Typewords": ["nullable", "Policy"] }, { "Name": "PolicyText", "Docs": "", "Typewords": ["string"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }] },
		"MTASTSRecord": { "Name": "MTASTSRecord", "Docs": "", "Fields": [{ "Name": "Version", "Docs": "", "Typewords": ["string"] }, { "Name": "ID", "Docs": "", "Typewords": ["string"] }, { "Name": "Extensions", "Docs": "", "Typewords": ["[]", "Pair"] }] },
		"Pair": { "Name": "Pair", "Docs": "", "Fields": [{ "Name": "Key", "Docs": "", "Typewords": ["string"] }, { "Name": "Value", "Docs": "", "Typewords": ["string"] }] },
		"Policy": { "Name": "Policy", "Docs": "", "Fields": [{ "Name": "Version", "Docs": "", "Typewords": ["string"] }, { "Name": "Mode", "Docs": "", "Typewords": ["Mode"] }, { "Name": "MX", "Docs": "", "Typewords": ["[]", "MX"] }, { "Name": "MaxAgeSeconds", "Docs": "", "Typewords": ["int32"] }, { "Name": "Extensions", "Docs": "", "Typewords": ["[]", "Pair"] }] },
		"MX": { "Name": "MX", "Docs": "", "Fields": [{ "Name": "Wildcard", "Docs": "", "Typewords": ["bool"] }, { "Name": "Domain", "Docs": "", "Typewords": ["Domain"] }] },
		"DomainMX": { "Name": "DomainMX", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Have", "Docs": "", "Typewords": ["bool"] }, { "Name": "OrigNextHopAuthentic", "Docs": "", "Typewords": ["bool"] }, { "Name": "ExpandedNextHopAuthentic", "Docs": "", "Typewords": ["bool"] }, { "Name": "ExpandedNextHop", "Docs": "", "Typewords": ["Domain"] }, { "Name": "Permanent", "Docs": "", "Typewords": ["bool"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }] },
		"DomainMXHost": { "Name": "DomainMXHost", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Host", "Docs": "", "Typewords": ["IPDomain"] }, { "Name": "MTASTSError", "Docs": "", "Typewords": ["string"] }, { "Name": "IP", "Docs": "", "Typewords": ["DomainIP"] }, { "Name": "DANE", "Docs": "", "Typewords": ["DomainDANE"] }, { "Name": "Dial", "Docs": "", "Typewords": ["DomainDial"] }, { "Name": "SMTP", "Docs": "", "Typewords": ["DomainSMTP"] }] },
		"IPDomain": { "Name": "IPDomain", "Docs": "", "Fields": [{ "Name": "IP", "Docs": "", "Typewords": ["IP"] }, { "Name": "Domain", "Docs": "", "Typewords": ["Domain"] }] },
		"DomainIP": { "Name": "DomainIP", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Authentic", "Docs": "", "Typewords": ["bool"] }, { "Name": "ExpandedAuthentic", "Docs": "", "Typewords": ["bool"] }, { "Name": "ExpandedHost", "Docs": "", "Typewords": ["Domain"] }, { "Name": "IPs", "Docs": "", "Typewords": ["[]", "IP"] }, { "Name": "DualStack", "Docs": "", "Typewords": ["bool"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }] },
		"DomainDANE": { "Name": "DomainDANE", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Required", "Docs": "", "Typewords": ["bool"] }, { "Name": "Records", "Docs": "", "Typewords": ["[]", "TLSARecord"] }, { "Name": "TLSABaseDomain", "Docs": "", "Typewords": ["Domain"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }, { "Name": "VerifiedRecord", "Docs": "", "Typewords": ["nullable", "TLSARecord"] }] },
		"TLSARecord": { "Name": "TLSARecord", "Docs": "", "Fields": [{ "Name": "Usage", "Docs": "", "Typewords": ["TLSAUsage"] }, { "Name": "Selector", "Docs": "", "Typewords": ["TLSASelector"] }, { "Name": "MatchType", "Docs": "", "Typewords": ["TLSAMatchType"] }, { "Name": "CertAssoc", "Docs": "", "Typewords": ["nullable", "string"] }] },
		"DomainDial": { "Name": "DomainDial", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "IP", "Docs": "", "Typewords": ["IP"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }] },
		"DomainSMTP": { "Name": "DomainSMTP", "Docs": "", "Fields": [{ "Name": "DurationMS", "Docs": "", "Typewords": ["int32"] }, { "Name": "Error", "Docs": "", "Typewords": ["string"] }, { "Name": "Supports8bitMIME", "Docs": "", "Typewords": ["bool"] }, { "Name": "SupportsRequireTLS", "Docs": "", "Typewords": ["bool"] }, { "Name": "SupportsSMTPUTF8", "Docs": "", "Typewords": ["bool"] }, { "Name": "SupportsSTARTTLS", "Docs": "", "Typewords": ["bool"] }, { "Name": "TLSConnectionState", "Docs": "", "Typewords": ["nullable", "TLSConnectionState"] }, { "Name": "RecipientDomainResult", "Docs": "", "Typewords": ["nullable", "TLSRPTResult"] }, { "Name": "HostResult", "Docs": "", "Typewords": ["nullable", "TLSRPTResult"] }, { "Name": "Trace", "Docs": "", "Typewords": ["[]", "Proto"] }] },
		"TLSConnectionState": { "Name": "TLSConnectionState", "Docs": "", "Fields": [{ "Name": "Version", "Docs": "", "Typewords": ["string"] }, { "Name": "CipherSuite", "Docs": "", "Typewords": ["string"] }, { "Name": "NegotiatedProtocol", "Docs": "", "Typewords": ["string"] }, { "Name": "ServerName", "Docs": "", "Typewords": ["string"] }] },
		"TLSRPTResult": { "Name": "TLSRPTResult", "Docs": "", "Fields": [{ "Name": "Policy", "Docs": "", "Typewords": ["TLSRPTResultPolicy"] }, { "Name": "Summary", "Docs": "", "Typewords": ["TLSRPTSummary"] }, { "Name": "FailureDetails", "Docs": "", "Typewords": ["[]", "TLSRPTFailureDetails"] }] },
		"TLSRPTResultPolicy": { "Name": "TLSRPTResultPolicy", "Docs": "", "Fields": [{ "Name": "Type", "Docs": "", "Typewords": ["string"] }, { "Name": "String", "Docs": "", "Typewords": ["[]", "string"] }, { "Name": "Domain", "Docs": "", "Typewords": ["string"] }, { "Name": "MXHost", "Docs": "", "Typewords": ["[]", "string"] }] },
		"TLSRPTSummary": { "Name": "TLSRPTSummary", "Docs": "", "Fields": [{ "Name": "TotalSuccessfulSessionCount", "Docs": "", "Typewords": ["int64"] }, { "Name": "TotalFailureSessionCount", "Docs": "", "Typewords": ["int64"] }] },
		"TLSRPTFailureDetails": { "Name": "TLSRPTFailureDetails", "Docs": "", "Fields": [{ "Name": "ResultType", "Docs": "", "Typewords": ["string"] }, { "Name": "SendingMTAIP", "Docs": "", "Typewords": ["string"] }, { "Name": "ReceivingMXHostname", "Docs": "", "Typewords": ["string"] }, { "Name": "ReceivingMXHelo", "Docs": "", "Typewords": ["string"] }, { "Name": "ReceivingIP", "Docs": "", "Typewords": ["string"] }, { "Name": "FailedSessionCount", "Docs": "", "Typewords": ["int64"] }, { "Name": "AdditionalInformation", "Docs": "", "Typewords": ["string"] }, { "Name": "FailureReasonCode", "Docs": "", "Typewords": ["string"] }] },
		"Proto": { "Name": "Proto", "Docs": "", "Fields": [{ "Name": "ClientWrite", "Docs": "", "Typewords": ["bool"] }, { "Name": "Text", "Docs": "", "Typewords": ["string"] }] },
		"TLSAUsage": { "Name": "TLSAUsage", "Docs": "", "Values": [{ "Name": "TLSAUsagePKIXTA", "Value": 0, "Docs": "" }, { "Name": "TLSAUsagePKIXEE", "Value": 1, "Docs": "" }, { "Name": "TLSAUsageDANETA", "Value": 2, "Docs": "" }, { "Name": "TLSAUsageDANEEE", "Value": 3, "Docs": "" }] },
		"TLSASelector": { "Name": "TLSASelector", "Docs": "", "Values": [{ "Name": "TLSASelectorCert", "Value": 0, "Docs": "" }, { "Name": "TLSASelectorSPKI", "Value": 1, "Docs": "" }] },
		"TLSAMatchType": { "Name": "TLSAMatchType", "Docs": "", "Values": [{ "Name": "TLSAMatchTypeFull", "Value": 0, "Docs": "" }, { "Name": "TLSAMatchTypeSHA256", "Value": 1, "Docs": "" }, { "Name": "TLSAMatchTypeSHA512", "Value": 2, "Docs": "" }] },
		"DKIMStatus": { "Name": "DKIMStatus", "Docs": "", "Values": null },
		"Localpart": { "Name": "Localpart", "Docs": "", "Values": null },
		"DMARCPolicy": { "Name": "DMARCPolicy", "Docs": "", "Values": [{ "Name": "PolicyEmpty", "Value": "", "Docs": "" }, { "Name": "PolicyNone", "Value": "none", "Docs": "" }, { "Name": "PolicyQuarantine", "Value": "quarantine", "Docs": "" }, { "Name": "PolicyReject", "Value": "reject", "Docs": "" }] },
		"Align": { "Name": "Align", "Docs": "", "Values": [{ "Name": "AlignStrict", "Value": "s", "Docs": "" }, { "Name": "AlignRelaxed", "Value": "r", "Docs": "" }] },
		"RUA": { "Name": "RUA", "Docs": "", "Values": null },
		"Mode": { "Name": "Mode", "Docs": "", "Values": [{ "Name": "ModeEnforce", "Value": "enforce", "Docs": "" }, { "Name": "ModeTesting", "Value": "testing", "Docs": "" }, { "Name": "ModeNone", "Value": "none", "Docs": "" }] },
		"IP": { "Name": "IP", "Docs": "", "Values": [] },
	};
	api.parser = {
		SPFReceived: (v) => api.parse("SPFReceived", v),
		Domain: (v) => api.parse("Domain", v),
		Record: (v) => api.parse("Record", v),
		DKIMResult: (v) => api.parse("DKIMResult", v),
		Sig: (v) => api.parse("Sig", v),
		Identity: (v) => api.parse("Identity", v),
		DomainResult: (v) => api.parse("DomainResult", v),
		DomainSPF: (v) => api.parse("DomainSPF", v),
		SPFRecord: (v) => api.parse("SPFRecord", v),
		Directive: (v) => api.parse("Directive", v),
		Modifier: (v) => api.parse("Modifier", v),
		DomainDMARC: (v) => api.parse("DomainDMARC", v),
		DMARCRecord: (v) => api.parse("DMARCRecord", v),
		URI: (v) => api.parse("URI", v),
		DomainTLSRPT: (v) => api.parse("DomainTLSRPT", v),
		TLSRPTRecord: (v) => api.parse("TLSRPTRecord", v),
		Extension: (v) => api.parse("Extension", v),
		DomainMTASTS: (v) => api.parse("DomainMTASTS", v),
		MTASTSRecord: (v) => api.parse("MTASTSRecord", v),
		Pair: (v) => api.parse("Pair", v),
		Policy: (v) => api.parse("Policy", v),
		MX: (v) => api.parse("MX", v),
		DomainMX: (v) => api.parse("DomainMX", v),
		DomainMXHost: (v) => api.parse("DomainMXHost", v),
		IPDomain: (v) => api.parse("IPDomain", v),
		DomainIP: (v) => api.parse("DomainIP", v),
		DomainDANE: (v) => api.parse("DomainDANE", v),
		TLSARecord: (v) => api.parse("TLSARecord", v),
		DomainDial: (v) => api.parse("DomainDial", v),
		DomainSMTP: (v) => api.parse("DomainSMTP", v),
		TLSConnectionState: (v) => api.parse("TLSConnectionState", v),
		TLSRPTResult: (v) => api.parse("TLSRPTResult", v),
		TLSRPTResultPolicy: (v) => api.parse("TLSRPTResultPolicy", v),
		TLSRPTSummary: (v) => api.parse("TLSRPTSummary", v),
		TLSRPTFailureDetails: (v) => api.parse("TLSRPTFailureDetails", v),
		Proto: (v) => api.parse("Proto", v),
		TLSAUsage: (v) => api.parse("TLSAUsage", v),
		TLSASelector: (v) => api.parse("TLSASelector", v),
		TLSAMatchType: (v) => api.parse("TLSAMatchType", v),
		DKIMStatus: (v) => api.parse("DKIMStatus", v),
		Localpart: (v) => api.parse("Localpart", v),
		DMARCPolicy: (v) => api.parse("DMARCPolicy", v),
		Align: (v) => api.parse("Align", v),
		RUA: (v) => api.parse("RUA", v),
		Mode: (v) => api.parse("Mode", v),
		IP: (v) => api.parse("IP", v),
	};
	let defaultOptions = { slicesNullable: true, mapsNullable: true, nullableOptional: true };
	class Client {
		constructor() {
			this.authState = {};
			this.options = { ...defaultOptions };
			this.baseURL = this.options.baseURL || api.defaultBaseURL;
		}
		withAuthToken(token) {
			const c = new Client();
			c.authState.token = token;
			c.options = this.options;
			return c;
		}
		withOptions(options) {
			const c = new Client();
			c.authState = this.authState;
			c.options = { ...this.options, ...options };
			return c;
		}
		async SPFCheck(domain, ipstr) {
			const fn = "SPFCheck";
			const paramTypes = [["string"], ["string"]];
			const returnTypes = [["SPFReceived"], ["Domain"], ["string"], ["bool"]];
			const params = [domain, ipstr];
			return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params);
		}
		async DKIMLookup(selector, domain) {
			const fn = "DKIMLookup";
			const paramTypes = [["string"], ["string"]];
			const returnTypes = [["DKIMStatus"], ["nullable", "Record"], ["string"], ["bool"]];
			const params = [selector, domain];
			return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params);
		}
		async DKIMVerify(message) {
			const fn = "DKIMVerify";
			const paramTypes = [["string"]];
			const returnTypes = [["[]", "DKIMResult"]];
			const params = [message];
			return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params);
		}
		async DomainCheck(domain) {
			const fn = "DomainCheck";
			const paramTypes = [["string"]];
			const returnTypes = [["DomainResult"]];
			const params = [domain];
			return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params);
		}
	}
	api.Client = Client;
	api.defaultBaseURL = (function () {
		let p = location.pathname;
		if (p && p[p.length - 1] !== '/') {
			let l = location.pathname.split('/');
			l = l.slice(0, l.length - 1);
			p = '/' + l.join('/') + '/';
		}
		return location.protocol + '//' + location.host + p + 'api/';
	})();
	// NOTE: code below is shared between github.com/mjl-/sherpaweb and github.com/mjl-/sherpats.
	// KEEP IN SYNC.
	api.supportedSherpaVersion = 1;
	// verifyArg typechecks "v" against "typewords", returning a new (possibly modified) value for JSON-encoding.
	// toJS indicate if the data is coming into JS. If so, timestamps are turned into JS Dates. Otherwise, JS Dates are turned into strings.
	// allowUnknownKeys configures whether unknown keys in structs are allowed.
	// types are the named types of the API.
	api.verifyArg = (path, v, typewords, toJS, allowUnknownKeys, types, opts) => {
		return new verifier(types, toJS, allowUnknownKeys, opts).verify(path, v, typewords);
	};
	api.parse = (name, v) => api.verifyArg(name, v, [name], true, false, api.types, defaultOptions);
	class verifier {
		constructor(types, toJS, allowUnknownKeys, opts) {
			this.types = types;
			this.toJS = toJS;
			this.allowUnknownKeys = allowUnknownKeys;
			this.opts = opts;
		}
		verify(path, v, typewords) {
			typewords = typewords.slice(0);
			const ww = typewords.shift();
			const error = (msg) => {
				if (path != '') {
					msg = path + ': ' + msg;
				}
				throw new Error(msg);
			};
			if (typeof ww !== 'string') {
				error('bad typewords');
				return; // should not be necessary, typescript doesn't see error always throws an exception?
			}
			const w = ww;
			const ensure = (ok, expect) => {
				if (!ok) {
					error('got ' + JSON.stringify(v) + ', expected ' + expect);
				}
				return v;
			};
			switch (w) {
				case 'nullable':
					if (v === null || v === undefined && this.opts.nullableOptional) {
						return v;
					}
					return this.verify(path, v, typewords);
				case '[]':
					if (v === null && this.opts.slicesNullable || v === undefined && this.opts.slicesNullable && this.opts.nullableOptional) {
						return v;
					}
					ensure(Array.isArray(v), "array");
					return v.map((e, i) => this.verify(path + '[' + i + ']', e, typewords));
				case '{}':
					if (v === null && this.opts.mapsNullable || v === undefined && this.opts.mapsNullable && this.opts.nullableOptional) {
						return v;
					}
					ensure(v !== null || typeof v === 'object', "object");
					const r = {};
					for (const k in v) {
						r[k] = this.verify(path + '.' + k, v[k], typewords);
					}
					return r;
			}
			ensure(typewords.length == 0, "empty typewords");
			const t = typeof v;
			switch (w) {
				case 'any':
					return v;
				case 'bool':
					ensure(t === 'boolean', 'bool');
					return v;
				case 'int8':
				case 'uint8':
				case 'int16':
				case 'uint16':
				case 'int32':
				case 'uint32':
				case 'int64':
				case 'uint64':
					ensure(t === 'number' && Number.isInteger(v), 'integer');
					return v;
				case 'float32':
				case 'float64':
					ensure(t === 'number', 'float');
					return v;
				case 'int64s':
				case 'uint64s':
					ensure(t === 'number' && Number.isInteger(v) || t === 'string', 'integer fitting in float without precision loss, or string');
					return '' + v;
				case 'string':
					ensure(t === 'string', 'string');
					return v;
				case 'timestamp':
					if (this.toJS) {
						ensure(t === 'string', 'string, with timestamp');
						const d = new Date(v);
						if (d instanceof Date && !isNaN(d.getTime())) {
							return d;
						}
						error('invalid date ' + v);
					}
					else {
						ensure(t === 'object' && v !== null, 'non-null object');
						ensure(v.__proto__ === Date.prototype, 'Date');
						return v.toISOString();
					}
			}
			// We're left with named types.
			const nt = this.types[w];
			if (!nt) {
				error('unknown type ' + w);
			}
			if (v === null) {
				error('bad value ' + v + ' for named type ' + w);
			}
			if (api.structTypes[nt.Name]) {
				const t = nt;
				if (typeof v !== 'object') {
					error('bad value ' + v + ' for struct ' + w);
				}
				const r = {};
				for (const f of t.Fields) {
					r[f.Name] = this.verify(path + '.' + f.Name, v[f.Name], f.Typewords);
				}
				// If going to JSON also verify no unknown fields are present.
				if (!this.allowUnknownKeys) {
					const known = {};
					for (const f of t.Fields) {
						known[f.Name] = true;
					}
					Object.keys(v).forEach((k) => {
						if (!known[k]) {
							error('unknown key ' + k + ' for struct ' + w);
						}
					});
				}
				return r;
			}
			else if (api.stringsTypes[nt.Name]) {
				const t = nt;
				if (typeof v !== 'string') {
					error('mistyped value ' + v + ' for named strings ' + t.Name);
				}
				if (!t.Values || t.Values.length === 0) {
					return v;
				}
				for (const sv of t.Values) {
					if (sv.Value === v) {
						return v;
					}
				}
				error('unknown value ' + v + ' for named strings ' + t.Name);
			}
			else if (api.intsTypes[nt.Name]) {
				const t = nt;
				if (typeof v !== 'number' || !Number.isInteger(v)) {
					error('mistyped value ' + v + ' for named ints ' + t.Name);
				}
				if (!t.Values || t.Values.length === 0) {
					return v;
				}
				for (const sv of t.Values) {
					if (sv.Value === v) {
						return v;
					}
				}
				error('unknown value ' + v + ' for named ints ' + t.Name);
			}
			else {
				throw new Error('unexpected named type ' + nt);
			}
		}
	}
	const _sherpaCall = async (baseURL, authState, options, paramTypes, returnTypes, name, params) => {
		if (!options.skipParamCheck) {
			if (params.length !== paramTypes.length) {
				return Promise.reject({ message: 'wrong number of parameters in sherpa call, saw ' + params.length + ' != expected ' + paramTypes.length });
			}
			params = params.map((v, index) => api.verifyArg('params[' + index + ']', v, paramTypes[index], false, false, api.types, options));
		}
		const simulate = async (json) => {
			const config = JSON.parse(json || 'null') || {};
			const waitMinMsec = config.waitMinMsec || 0;
			const waitMaxMsec = config.waitMaxMsec || 0;
			const wait = Math.random() * (waitMaxMsec - waitMinMsec);
			const failRate = config.failRate || 0;
			return new Promise((resolve, reject) => {
				if (options.aborter) {
					options.aborter.abort = () => {
						reject({ message: 'call to ' + name + ' aborted by user', code: 'sherpa:aborted' });
						reject = resolve = () => { };
					};
				}
				setTimeout(() => {
					const r = Math.random();
					if (r < failRate) {
						reject({ message: 'injected failure on ' + name, code: 'server:injected' });
					}
					else {
						resolve();
					}
					reject = resolve = () => { };
				}, waitMinMsec + wait);
			});
		};
		// Only simulate when there is a debug string. Otherwise it would always interfere
		// with setting options.aborter.
		let json = '';
		try {
			json = window.localStorage.getItem('sherpats-debug') || '';
		}
		catch (err) { }
		if (json) {
			await simulate(json);
		}
		const fn = (resolve, reject) => {
			let resolve1 = (v) => {
				resolve(v);
				resolve1 = () => { };
				reject1 = () => { };
			};
			let reject1 = (v) => {
				if ((v.code === 'user:noAuth' || v.code === 'user:badAuth') && options.login) {
					const login = options.login;
					if (!authState.loginPromise) {
						authState.loginPromise = new Promise((aresolve, areject) => {
							login(v.code === 'user:badAuth' ? (v.message || '') : '')
								.then((token) => {
								authState.token = token;
								authState.loginPromise = undefined;
								aresolve();
							}, (err) => {
								authState.loginPromise = undefined;
								areject(err);
							});
						});
					}
					authState.loginPromise
						.then(() => {
						fn(resolve, reject);
					}, (err) => {
						reject(err);
					});
					return;
				}
				reject(v);
				resolve1 = () => { };
				reject1 = () => { };
			};
			const url = baseURL + name;
			const req = new window.XMLHttpRequest();
			if (options.aborter) {
				options.aborter.abort = () => {
					req.abort();
					reject1({ code: 'sherpa:aborted', message: 'request aborted' });
				};
			}
			req.open('POST', url, true);
			if (options.csrfHeader && authState.token) {
				req.setRequestHeader(options.csrfHeader, authState.token);
			}
			if (options.timeoutMsec) {
				req.timeout = options.timeoutMsec;
			}
			req.onload = () => {
				if (req.status !== 200) {
					if (req.status === 404) {
						reject1({ code: 'sherpa:badFunction', message: 'function does not exist' });
					}
					else {
						reject1({ code: 'sherpa:http', message: 'error calling function, HTTP status: ' + req.status });
					}
					return;
				}
				let resp;
				try {
					resp = JSON.parse(req.responseText);
				}
				catch (err) {
					reject1({ code: 'sherpa:badResponse', message: 'bad JSON from server' });
					return;
				}
				if (resp && resp.error) {
					const err = resp.error;
					reject1({ code: err.code, message: err.message });
					return;
				}
				else if (!resp || !resp.hasOwnProperty('result')) {
					reject1({ code: 'sherpa:badResponse', message: "invalid sherpa response object, missing 'result'" });
					return;
				}
				if (options.skipReturnCheck) {
					resolve1(resp.result);
					return;
				}
				let result = resp.result;
				try {
					if (returnTypes.length === 0) {
						if (result) {
							throw new Error('function ' + name + ' returned a value while prototype says it returns "void"');
						}
					}
					else if (returnTypes.length === 1) {
						result = api.verifyArg('result', result, returnTypes[0], true, true, api.types, options);
					}
					else {
						if (result.length != returnTypes.length) {
							throw new Error('wrong number of values returned by ' + name + ', saw ' + result.length + ' != expected ' + returnTypes.length);
						}
						result = result.map((v, index) => api.verifyArg('result[' + index + ']', v, returnTypes[index], true, true, api.types, options));
					}
				}
				catch (err) {
					let errmsg = 'bad types';
					if (err instanceof Error) {
						errmsg = err.message;
					}
					reject1({ code: 'sherpa:badTypes', message: errmsg });
				}
				resolve1(result);
			};
			req.onerror = () => {
				reject1({ code: 'sherpa:connection', message: 'connection failed' });
			};
			req.ontimeout = () => {
				reject1({ code: 'sherpa:timeout', message: 'request timeout' });
			};
			req.setRequestHeader('Content-Type', 'application/json');
			try {
				req.send(JSON.stringify({ params: params }));
			}
			catch (err) {
				reject1({ code: 'sherpa:badData', message: 'cannot marshal to JSON' });
			}
		};
		return await new Promise(fn);
	};
})(api || (api = {}));
// All logging goes through log() instead of console.log, except "should not happen" logging.
let log = () => { };
try {
	if (localStorage.getItem('log') || location.hostname === 'localhost') {
		log = console.log;
	}
}
catch (err) { }
const client = new api.Client();
const domainName = (d) => {
	return d.Unicode || d.ASCII;
};
const domainString = (d) => {
	if (d.Unicode) {
		return d.Unicode + " (" + d.ASCII + ")";
	}
	return d.ASCII;
};
const ipdomainString = (v) => {
	if (v.IP) {
		return 'xxx ip';
	}
	return domainString(v.Domain);
};
const green = '#50c40f';
const red = '#e15d1c';
const blue = '#09f';
const grey = '#aaa';
const orange = 'orange';
const tag = (color, ...l) => dom.span(dom._class('tag'), style({ backgroundColor: color }), l);
const verbatim = (s) => dom.span(dom._class('mono'), style({ whiteSpace: 'pre-wrap' }), s);
const formatJSON = (v) => dom.div(dom._class('mono'), style({ whiteSpace: 'pre-wrap' }), JSON.stringify(v, undefined, '	 '));
const statusTag = (s) => tag(grey, s);
const errorTag = (s, ...l) => s ? dom.div(tag(red, 'error'), ' ', s, l) : [];
const dnsTXT = (s) => s ? verbatim(s) : [];
const dnssecTag = (authentic) => dom.div(authentic ? tag(green, 'dnssec', attr.title('DNS lookups protected with DNSSEC.')) : tag(red, 'no dnssec', attr.title('DNS lookups not protected with DNSSEC.')));
const detailsLink = (elem) => {
	let show;
	let hide;
	elem.style.display = 'none';
	return dom.div(show = dom.a(attr.href('#'), 'Show details...', function click(e) {
		e.preventDefault();
		show.style.display = 'none';
		elem.style.display = '';
		hide.style.display = '';
	}), hide = dom.a(attr.href('#'), 'Hide details', style({ display: 'none' }), function click(e) {
		e.preventDefault();
		show.style.display = '';
		elem.style.display = 'none';
		hide.style.display = 'none';
	}), elem);
};
const group = (...l) => dom.div(dom._class('group'), l);
const title = (...l) => dom.div(dom._class('title'), l);
const tlsaUsages = {
	0: 'PKIX-TA, verification through specific PKIX trusted CA',
	1: 'PKIX-EE, verification through PKIX (trusted CAs) and of specific certificate/SPKI',
	2: 'DANE-TA, verification through specific trusted CA certificate/SPKI, no PKIX',
	3: 'DANE-EE, verification of specific certificate/SPKI, no PKIX',
};
const tlsaSelectors = {
	0: 'Certificate, data covers the entire certificate',
	1: 'SPKI, subject public key info, data covers only the public key',
};
const tlsaMatchTypes = {
	0: 'Full, data represents all bytes of certificate/SPKI',
	1: 'data is SHA2-256 hash of certificate/SPKI',
	2: 'data is SHA2-512 hash of certificate/SPKI',
};
const formatDANERecord = (r) => {
	const assoc = window.atob(r.CertAssoc || '').split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
	const s = [r.Usage, r.Selector, r.MatchType, assoc].join(' ');
	const title = [
		'' + r.Usage + ', usage: ' + (tlsaUsages[r.Usage] || '(unknown)'),
		'' + r.Selector + ', selector: ' + (tlsaSelectors[r.Selector] || '(unknown)'),
		'' + r.MatchType + ', match type: ' + (tlsaMatchTypes[r.MatchType] || '(unknown)'),
		'Data: hex-encoded (hash of) certificate/SPKI bytes',
	].join('\n');
	return [s, dom.span(attr.title(title), s)];
};
const duration = (ms) => [' ', dom.span(dom._class('duration'), '' + ms + 'ms')];
const domainCheckResult = (dr) => {
	const mtastsExplain = 'MTA-STS protects MX records of domains without DNSSEC, and requires PKIX/WebPKI verification of MX host TLS certificates (the historical default "opportunistic TLS" does not verify at all). MTA-STS depends on PKIX/WebPKI	 (well-known Certificate Authorities) and trust-on-first-use ("TOFU"). DANE has similar goals and can coexist with MTA-STS.';
	const tlsrptExplain = 'TLSRPT is a mechanism to request reports about SMTP TLS connections, both success and failures, such as invalid certificates.';
	const daneExplain = 'DANE protects delivery to MX hosts by requiring verified TLS along with DNSSEC-protected MX records. TLS verification is most often using DANE-EE, which is based on only the public key (SPKI) of a certificate, without verification through PKIX/WebPKI (well-known Certificate Authorities).';
	return dom.div(dom.h3('Results for receiving from ', domainString(dr.Domain)), dom.div(dom._class('row'), dom.div(dom._class('result'), dom.h4('SPF', duration(dr.SPF.DurationMS)), (() => {
		const status = dr.SPF.Status;
		if (status === 'none' && !dr.SPF.Error) {
			return group(dom.div('Domain has an SPF record.', attr.title('An SPF record specifies a policy about which IP addresses are (not) allowed to send email from a domain.')));
		}
		else if (status === 'none') {
			return group(tag(orange, 'warning'), dom.div('Domain does not have SPF record. An SPF record specifies a policy about which IP addresses are (not) allowed to send email from a domain.'));
		}
		else {
			if (status === 'permerror') {
				return group(tag(red, 'permanent'), errorTag(dr.SPF.Error));
			}
			else if (status === 'temperror') {
				return group(tag(orange, 'temporary'), errorTag(dr.SPF.Error));
			}
			else {
				return group(tag(red, dr.SPF.Status), errorTag(dr.SPF.Error));
			}
		}
	})(), group(title('DNS TXT'), dom.div(dnsTXT(dr.SPF.TXT)), dnssecTag(dr.SPF.Authentic))), dom.div(dom._class('result'), dom.h4('DKIM'), group(dom.div('Not checked.', attr.title('Not checked because DKIM records (selectors) cannot typically be enumerated. A domain can publish DKIM public keys in DNS, under a selector, and add DKIM-Signature headers to outgoing messages for verification by a receiving mail server.')))), dom.div(dom._class('result'), dom.h4('DMARC', duration(dr.DMARC.DurationMS)), (() => {
		const status = dr.DMARC.Status;
		const explain = 'A DMARC record specifies a policy about messages with From header referencing the domain. The policy can ask receiving mail servers to reject or quarantine a message that does not have an aligned DKIM and/or SPF pass (both are mechanisms to associate a message/transaction with a domain).';
		if (status === 'none' && !dr.DMARC.Error && dr.DMARC.Record) {
			if (dr.DMARC.Record.Policy === api.DMARCPolicy.PolicyReject) {
				return group(tag(green, 'policy: reject'), dom.div('Domain has a DMARC policy rejecting unauthorized deliveries.', attr.title(explain)));
			}
			else if (dr.DMARC.Record.Policy === api.DMARCPolicy.PolicyQuarantine) {
				return group(tag(red, 'policy: quarantine'), dom.div('Domain has a DMARC policy marking unauthorized deliveries as spam. This can leave legitimate senders with accidental DMARC failures unaware of delivery problems.', attr.title(explain)));
			}
			else {
				return group(tag(orange, 'policy: ' + dr.DMARC.Record.Policy), dom.div('Domain has a DMARC record.', attr.title(explain)));
			}
		}
		else if (status === 'none') {
			return group(tag(red, 'not implemented'), dom.div('Domain does not implement DMARC, allowing unauthorized deliveries.', attr.title(explain)));
		}
		else {
			if (status === 'permerror') {
				return group(tag(red, 'permanent'), errorTag(dr.DMARC.Error));
			}
			else if (status === 'temperror') {
				return group(tag(orange, 'temporary'), errorTag(dr.DMARC.Error));
			}
			else {
				return group(tag(red, dr.DMARC.Status), errorTag(dr.DMARC.Error));
			}
		}
	})(), group(title('Domain with record'), dom.div(domainString(dr.DMARC.Domain))), group(title('DNS TXT'), dom.div(dnsTXT(dr.DMARC.TXT)), dnssecTag(dr.DMARC.Authentic)))), dom.h3('Results for sending to ', domainString(dr.Domain)), dom.div(dom._class('row'), dom.div(dom._class('result'), dom.h4('MX', duration(dr.MX.DurationMS)), errorTag(dr.MX.Error), dom.div(dr.MX.Error && dr.MX.Permanent ? tag(red, 'permanent') : []), group(title('Domain'), dom.div(domainString(dr.MX.ExpandedNextHop)), dnssecTag(dr.MX.OrigNextHopAuthentic && dr.MX.ExpandedNextHopAuthentic), dr.MX.Have ? [] : dom.span(tag(orange, 'no MX record'), ' deliveries will go directly to hostname')), group(title('Hosts'), (dr.MXHosts || []).map(mx => dom.div(ipdomainString(mx.Host))))), dom.div(dom._class('result'), dom.h4('MTA-STS', duration(dr.MTASTS.DurationMS)), errorTag(dr.MTASTS.Error), group(!dr.MTASTS.Implemented ? group(tag(red, 'not implemented'), dom.div('Domain does not implement MTA-STS.', attr.title(mtastsExplain))) : []), !dr.MTASTS.Implemented ? [] : [
		group(title('Policy ID'), dom.div(dr.MTASTS.Record ? dom.span(verbatim(dr.MTASTS.Record.ID), attr.title('Sending mail servers must keep track of the MTA-STS policy ID and fetch a new policy only when the ID has changed.')) : '-')),
		dr.MTASTS.Policy ?
			group(title('Policy Mode'), dom.div(tag(dr.MTASTS.Policy.Mode === api.Mode.ModeEnforce ? green : red, dr.MTASTS.Policy.Mode)), dr.MTASTS.Policy.Mode === api.Mode.ModeEnforce ? dom.div('MTA-STS policy is active, delivery is PKIX-protected.', attr.title(mtastsExplain)) : [], dr.MTASTS.Policy.Mode === api.Mode.ModeTesting ? dom.div('MTA-STS policy is in testing mode, delivery is not PKIX-protected.', attr.title(mtastsExplain)) : [], dr.MTASTS.Policy.Mode === api.Mode.ModeNone ? dom.div('MTA-STS policy of none provides no protection, delivery is not PKIX-protected..', attr.title(mtastsExplain)) : []) : [],
		group(title('MX hosts'), dom.div(dr.MTASTS.Policy ?
			(dr.MTASTS.Policy.MX || []).map(mx => dom.div((mx.Wildcard ? '*.' : '') + (mx.Domain.Unicode || mx.Domain.ASCII) + (mx.Domain.Unicode ? ' (' + (mx.Wildcard ? '*.' : '') + mx.Domain.ASCII + ')' : ''))) : '-')),
	], dr.MTASTS.PolicyText ? group(title('Raw policy'), dom.div(dom._class('mono'), style({ whiteSpace: 'pre-wrap' }), dr.MTASTS.PolicyText)) : []), dom.div(dom._class('result'), dom.h4('TLSRPT', duration(dr.TLSRPT.DurationMS)), (!dr.TLSRPT.Error && !dr.TLSRPT.Record) ?
		group(tag(orange, 'not implemented'), dom.div('Domain does not request reports about SMTP TLS connectivity.', attr.title(tlsrptExplain))) : [], (!dr.TLSRPT.Error && dr.TLSRPT.Record) ? [
		group(tag(green, 'implemented'), dom.div('Domain requests reports about SMTP TLS failures.', attr.title(tlsrptExplain))),
		group(title('DNS TXT'), dom.div(dnsTXT(dr.TLSRPT.TXT))),
	] : [], errorTag(dr.TLSRPT.Error, attr.title(tlsrptExplain))), (dr.MXHosts || []).map(mx => {
		let starttls = false;
		return dom.div(dom._class('result'), dom.h4('MX host: ' + ipdomainString(mx.Host), duration(mx.DurationMS)), group(title('MTA-STS'), errorTag(mx.MTASTSError), dom.div(!mx.MTASTSError && dr.MTASTS.Policy && dr.MTASTS.Policy.Mode === api.Mode.ModeEnforce ? tag(green, 'verified') : []), dom.div(!mx.MTASTSError && dr.MTASTS.Policy && dr.MTASTS.Policy.Mode === api.Mode.ModeTesting ? tag(red, 'unenforced') : []), dom.div(!mx.MTASTSError && (!dr.MTASTS.Policy || dr.MTASTS.Policy.Mode === api.Mode.ModeNone) ? tag(red, 'not implemented') : [])), group(title('IPs', duration(mx.IP.DurationMS)), dom.div(errorTag(mx.IP.Error), mx.IP.ExpandedHost.ASCII !== mx.Host.Domain.ASCII && mx.Host.Domain ? [
			dom.div('Expanded host: ', verbatim(domainString(mx.IP.ExpandedHost))),
			dnssecTag(mx.IP.ExpandedAuthentic)
		] : [], (mx.IP.IPs || []).map(ip => dom.div(ip)), dnssecTag(mx.IP.Authentic))), group(title('DANE', duration(mx.DANE.DurationMS)), dom.div(errorTag(mx.DANE.Error), dom.div(mx.DANE.Required ? tag(green, 'implemented') : tag(red, 'not implemented')), mx.DANE.Required ?
			dom.div('Delivery to this MX host is protected with verified TLS.', attr.title(daneExplain)) :
			dom.div('Delivery to this MX host is not protected with DANE-verified TLS.', attr.title(daneExplain)), mx.DANE.Required ? [
			mx.DANE.TLSABaseDomain.ASCII !== mx.Host.Domain.ASCII ? [
				title('TLSA base domain:'),
				dom.div(domainString(mx.DANE.TLSABaseDomain)),
			] : [],
			title('Records:', attr.title('Multiple records can be present: One for each certificate an MX host may present, and optionally for future keys to rotate to.')),
			(mx.DANE.Records || []).map(r => {
				const [s, e] = formatDANERecord(r);
				const [vrs, _] = mx.DANE.VerifiedRecord ? formatDANERecord(mx.DANE.VerifiedRecord) : ['', []];
				return dom.div(dom._class('mono'), tag(s === vrs ? green : grey, e));
			}),
		] : [])), group(title('Dial', duration(mx.Dial.DurationMS)), errorTag(mx.Dial.Error), dom.div('IP: ', mx.Dial.IP || '-')), group(title('SMTP', duration(mx.SMTP.DurationMS)), errorTag(mx.SMTP.Error), dom.div('Extensions: ', mx.Dial.IP && !mx.Dial.Error && !mx.SMTP.Error ? dom.div(tag(mx.SMTP.Supports8bitMIME ? green : red, '8BITMIME', attr.title('For sending messages that are not ASCII-only.')), tag(mx.SMTP.SupportsSMTPUTF8 ? green : red, 'SMTPUTF8', attr.title('For sending messages with UTF-8 in message headers, for internationalized messages.')), tag(mx.SMTP.SupportsSTARTTLS ? green : red, 'STARTTLS', attr.title('For adding TLS to a plain text SMTP session. The default is opportunistic TLS, without verification. With MTA-STS enabled, the TLS certificate must be verified with PKIX/WebPKI (common CAs). With DANE, the TLS certificate must be verified with TLSA records, typically based on public key (SPKI) of the certificate only (DANE-EE).')), tag(mx.SMTP.SupportsRequireTLS ? green : red, 'REQUIRETLS', attr.title('For sending messages where verified TLS is required along the entire delivery path, from submission to final delivery. Each SMTP server along the way must implement this extension. Also has a message header that indicates that TLS (verification) failure must be ignored.'))) : '-')), group(title('TLS'), dom.div('Version: ', mx.SMTP.TLSConnectionState ? verbatim(mx.SMTP.TLSConnectionState.Version) : '-'), dom.div('Ciphersuite: ', mx.SMTP.TLSConnectionState ? verbatim(mx.SMTP.TLSConnectionState.CipherSuite) : '-'), dom.div('PKIX verification: ', mx.SMTP.RecipientDomainResult ? (mx.SMTP.RecipientDomainResult.Summary.TotalSuccessfulSessionCount === 1 ? tag(green, 'yes') : tag(red, 'no')) : '-'), dom.div('DANE verification: ', mx.DANE.Required && mx.SMTP.HostResult ? (mx.SMTP.HostResult.Summary.TotalSuccessfulSessionCount === 1 ? tag(green, 'yes') : tag(red, 'no')) : '-')), !mx.SMTP.Trace ? [] : group(title('Transcript'), (mx.SMTP.Trace || []).map((l, index) => {
			const e = dom.div(dom._class('mono'), style({ paddingLeft: '.5em', whiteSpace: 'pre-wrap', color: l.ClientWrite ? '#e48b00' : blue }), starttls ? style({ borderLeft: '2px solid ' + green }) : [], l.Text);
			if (!starttls && !l.ClientWrite && l.Text.startsWith('2') && index > 0 && (mx.SMTP.Trace || [])[index - 1].ClientWrite && (mx.SMTP.Trace || [])[index - 1].Text === 'STARTTLS\r\n') {
				starttls = true;
			}
			return e;
		})));
	})), dom.br(), dom.div(dom.h4('Raw results as JSON'), detailsLink(dom.div(dom._class('result'), formatJSON(dr)))));
};
const showTimer = (result, left) => {
	let timer;
	const showTimeleft = () => {
		dom._kids(result, dom.div('Checking domain, max ', '' + left, ' seconds left...'));
		left -= 1;
		if (left === 0) {
			clearInterval(timer);
		}
	};
	timer = setInterval(showTimeleft, 1000);
	showTimeleft();
	return timer;
};
const init = async () => {
	let spfForm;
	let spfFieldset;
	let spfDomain;
	let spfIP;
	let dkimForm;
	let dkimFieldset;
	let dkimDomain;
	let dkimSelector;
	let dkimverifyFieldset;
	let dkimverifyMessage;
	let domainForm;
	let domainFieldset;
	let domainName;
	let result;
	dom._kids(document.body, dom.div(dom.div(style({ float: 'right', color: '#888' }), dom.div(meta?.Version, ' ', meta?.GoVersion, ' ', meta?.GoOs, '/', meta?.GoArch)), dom.h1('moxtools'), dom.div('Moxtools provides a few email-related tools, mostly as a showcase for the ', dom.a(attr.href('https://pkg.go.dev/github.com/mjl-/mox#section-directories'), 'Go packages'), ' of ', dom.a(attr.href('https://github.com/mjl-/mox'), 'mox'), '.'), dom.div('The public instance at ', dom.a(attr.href('https://tools.xmox.nl'), 'tools.xmox.nl'), ' has rate limiting enabled to prevent abuse, you can easily ', dom.a(attr.href('https://github.com/mjl-/moxtools'), 'run your own moxtools instance'), ' without limits.')), dom.br(), dom.div(dom._class('row'), dom.div(dom._class('inputs'), style({ width: '20em' }), dom.h2('Domain check'), domainForm = dom.form(async function submit(e) {
		e.preventDefault();
		e.stopPropagation();
		window.location.hash = ['#domain', encodeURIComponent(domainName.value)].join('/');
		const timer = showTimer(result, 30);
		try {
			domainFieldset.disabled = true;
			result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
			const results = await client.DomainCheck(domainName.value);
			clearInterval(timer);
			dom._kids(result, dom.div(dom._class('results'), domainCheckResult(results)));
			result.scrollIntoView({ block: 'nearest' });
		}
		catch (err) {
			dom._kids(result);
			window.alert('Error: ' + errmsg(err));
		}
		finally {
			clearInterval(timer);
			domainFieldset.disabled = false;
		}
	}, domainFieldset = dom.fieldset(dom.div(dom.label('Domain', dom.div(domainName = dom.input(attr.required(''))))), dom.div(dom.submitbutton('Verify')))), dom.div(dom._class('explanation'), 'Looks up MX records, and SPF, DMARC, TLSRPT, DANE and MTA-STS, with DNSSEC. Tries to connect to first 2 MX targets and negotiate TLS.')), dom.div(dom._class('inputs'), style({ width: '20em' }), dom.h2('Check SPF'), spfForm = dom.form(async function submit(e) {
		e.preventDefault();
		e.stopPropagation();
		window.location.hash = ['#spfcheck', encodeURIComponent(spfDomain.value), encodeURIComponent(spfIP.value)].join('/');
		const timer = showTimer(result, 15);
		try {
			spfFieldset.disabled = true;
			result.scrollIntoView({ block: 'nearest' });
			const [received, _, explanation, authentic] = await client.SPFCheck(spfDomain.value, spfIP.value);
			clearInterval(timer);
			dom._kids(result, dom.div(dom._class('results'), dom.h3('Results'), dom.div(dom._class('row'), dom.div(dom._class('result'), group(title('Status'), dom.div(received.Status)), group(title('Mechanism'), dom.div(received.Mechanism)), group(title('Explanation'), dom.div(explanation || '-')), dnssecTag(authentic)))));
			result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		}
		catch (err) {
			dom._kids(result);
			window.alert('Error: ' + errmsg(err));
		}
		finally {
			clearInterval(timer);
			spfFieldset.disabled = false;
		}
	}, spfFieldset = dom.fieldset(dom.div(dom.label('Domain', dom.div(spfDomain = dom.input(attr.required(''))))), dom.div(dom.label('IP', dom.div(spfIP = dom.input(attr.required(''))))), dom.div(dom.submitbutton('Check')))), dom.div(dom._class('explanation'), 'Evaluates the IP address against the SPF policy of the domain.')), dom.div(dom._class('inputs'), style({ width: '20em' }), dom.h2('Lookup DKIM record'), dkimForm = dom.form(async function submit(e) {
		e.preventDefault();
		e.stopPropagation();
		window.location.hash = ['#dkimlookup', encodeURIComponent(dkimSelector.value), encodeURIComponent(dkimDomain.value)].join('/');
		const timer = showTimer(result, 15);
		try {
			dkimFieldset.disabled = true;
			result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
			const [status, record, txt, authentic] = await client.DKIMLookup(dkimSelector.value, dkimDomain.value);
			clearInterval(timer);
			dom._kids(result, dom.div(dom._class('results'), dom.h3('Results'), dom.div(dom._class('row'), dom.div(dom._class('result'), group(title('Status'), dom.div(status)), group(title('DNS TXT'), dom.div(txt), dnssecTag(authentic)), group(title('Record in parsed form'), dom.div(record ? formatJSON(record) : '-'))))));
			result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		}
		catch (err) {
			dom._kids(result);
			window.alert('Error: ' + errmsg(err));
		}
		finally {
			clearInterval(timer);
			dkimFieldset.disabled = false;
		}
	}, dkimFieldset = dom.fieldset(dom.div(dom.label('Selector', dom.div(dkimSelector = dom.input(attr.required(''))))), dom.div(dom.label('Domain', dom.div(dkimDomain = dom.input(attr.required(''))))), dom.div(dom.submitbutton('Lookup')))), dom.div(dom._class('explanation'), 'Looks up the DKIM record for the selector at the domain.')), dom.div(dom._class('inputs'), style({ flexGrow: '1', maxWidth: '80em' }), dom.h2('Verify DKIM signatures in message'), dom.form(async function submit(e) {
		e.preventDefault();
		e.stopPropagation();
		const timer = showTimer(result, 15);
		try {
			dkimverifyFieldset.disabled = true;
			result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
			const results = await client.DKIMVerify(dkimverifyMessage.value);
			clearInterval(timer);
			dom._kids(result, dom.div(dom._class('results'), dom.h3('Results'), dom.div(dom._class('row'), (results || []).length === 0 ? dom.div(dom._class('result'), 'No DKIM signatures') : [], (results || []).map(r => dom.div(dom._class('result'), dom.h4('Signature'), errorTag(r.Error), group(title('Status'), r.Status), group(title('Signature'), dom.div(r.Sig ? formatJSON(r.Sig) : '-')), group(title('Record'), dom.div(r.Record ? formatJSON(r.Record) : '-'), r.Record ? dnssecTag(r.RecordAuthentic) : []))))));
			result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		}
		catch (err) {
			dom._kids(result);
			window.alert('Error: ' + errmsg(err));
		}
		finally {
			clearInterval(timer);
			dkimverifyFieldset.disabled = false;
		}
	}, dkimverifyFieldset = dom.fieldset(dom.div(dom.label('Message', dom.div(dkimverifyMessage = dom.textarea(attr.rows('10'), attr.required(''))))), dom.div(dom.submitbutton('Verify')))), dom.div(dom._class('explanation'), 'Parses the email message, finds all DKIM-Signature headers, and looks up their DKIM record and verifies their signature. Keep in mind that old messages can reference DKIM selectors that no longer exist in DNS and will not verify successfully anymore.'))), result = dom.div());
	const h = window.location.hash.substring(1);
	if (h) {
		const t = h.split('/');
		for (let i = 1; i < t.length; i++) {
			t[i] = decodeURIComponent(t[i]);
		}
		if (t[0] === 'domain' && t.length === 2) {
			domainName.value = t[1];
			domainForm.requestSubmit();
		}
		else if (t[0] === 'spfcheck' && t.length === 3) {
			spfDomain.value = t[1];
			spfIP.value = t[2];
			spfForm.requestSubmit();
		}
		else if (t[0] === 'dkimlookup' && t.length === 3) {
			dkimSelector.value = t[1];
			dkimDomain.value = t[2];
			dkimForm.requestSubmit();
		}
		else {
			window.location.hash = '';
		}
	}
};
window.addEventListener('load', async () => {
	try {
		await init();
	}
	catch (err) {
		window.alert('Error: ' + errmsg(err));
	}
});
// Errors in catch statements are of type unknown, we normally want its
// message.
const errmsg = (err) => '' + (err.message || '(no error message)');
