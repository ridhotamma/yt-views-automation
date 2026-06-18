let electron = require("electron");
let node_path = require("node:path");
let node_url = require("node:url");
//#region electron/main.js
var _0x1c37b1 = _0x38ed;
function _0x38ed(_0xf81613, _0x166cbf) {
	_0xf81613 = _0xf81613 - 167;
	return _0x5ecd()[_0xf81613];
}
(function(_0x193367, _0x1a3657) {
	const _0x543b27 = _0x38ed, _0x3c049a = _0x193367();
	while (true) try {
		if (parseInt(_0x543b27(172)) / 1 * (-parseInt(_0x543b27(177)) / 2) + -parseInt(_0x543b27(175)) / 3 * (-parseInt(_0x543b27(202)) / 4) + -parseInt(_0x543b27(203)) / 5 * (parseInt(_0x543b27(171)) / 6) + parseInt(_0x543b27(187)) / 7 * (parseInt(_0x543b27(220)) / 8) + parseInt(_0x543b27(213)) / 9 * (parseInt(_0x543b27(183)) / 10) + -parseInt(_0x543b27(197)) / 11 + -parseInt(_0x543b27(207)) / 12 * (-parseInt(_0x543b27(196)) / 13) === _0x1a3657) break;
		else _0x3c049a["push"](_0x3c049a["shift"]());
	} catch (_0xdac696) {
		_0x3c049a["push"](_0x3c049a["shift"]());
	}
})(_0x5ecd, 164013);
var currentDir = typeof __dirname !== _0x1c37b1(198) ? __dirname : (0, node_path.dirname)((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
process[_0x1c37b1(218)][_0x1c37b1(224)] = (0, node_path.join)(currentDir, "../dist"), process[_0x1c37b1(218)][_0x1c37b1(208)] = electron.app["isPackaged"] ? process.env["DIST"] : (0, node_path.join)(process.env["DIST"], _0x1c37b1(222)), electron.app[_0x1c37b1(211)](_0x1c37b1(229));
var win;
var VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function _0x5ecd() {
	const _0x1ffc82 = [
		"undefined",
		"quit",
		"/images/favicon.png",
		"setIcon",
		"16lqfcbt",
		"25PYZenX",
		"setAsDefaultProtocolClient",
		"handle",
		"argv",
		"12okHpjG",
		"VITE_PUBLIC",
		"getPrimaryDisplay",
		"loadURL",
		"setName",
		"requestSingleInstanceLock",
		"369itUAwy",
		"workAreaSize",
		"preload.js",
		"http://localhost/callback",
		"open-url",
		"env",
		"toLocaleString",
		"2090792jSxNWQ",
		"deep-link",
		"../public",
		"startsWith",
		"DIST",
		"youtumate://",
		"youtumate",
		"webContents",
		"will-navigate",
		"Youtumate",
		"loadFile",
		"will-redirect",
		"restore",
		"second-instance",
		"whenReady",
		"140172UraeRq",
		"16rXwUME",
		"darwin",
		"index.html",
		"87627GZYkZh",
		"main-process-message",
		"580MzwJVo",
		"[Proxy] Set ",
		"preventDefault",
		"account/sessions/oauth2",
		"defaultApp",
		"focus",
		"46180bnONwW",
		"activate",
		"reload",
		"execPath",
		"7pKCBVI",
		"window-all-closed",
		"fromPartition",
		"isMinimized",
		"floor",
		"send",
		"length",
		"then",
		"error",
		"84955NAExit",
		"3174545BeQjgm"
	];
	_0x5ecd = function() {
		return _0x1ffc82;
	};
	return _0x5ecd();
}
process[_0x1c37b1(181)] ? process[_0x1c37b1(206)][_0x1c37b1(193)] >= 2 && electron.app[_0x1c37b1(204)](_0x1c37b1(226), process[_0x1c37b1(186)], [(0, node_path.join)(process[_0x1c37b1(206)][1])]) : electron.app[_0x1c37b1(204)](_0x1c37b1(226));
var deepLinkUrl = null;
function handleDeepLink(_0xad6919) {
	const _0xca83a2 = _0x1c37b1;
	win && win["webContents"] ? win["webContents"][_0xca83a2(192)](_0xca83a2(221), _0xad6919) : deepLinkUrl = _0xad6919;
}
!electron.app[_0x1c37b1(212)]() ? electron.app[_0x1c37b1(199)]() : electron.app["on"](_0x1c37b1(169), (_0x423291, _0x2729c2, _0x5265a6) => {
	const _0x5a036e = _0x1c37b1;
	if (win) {
		if (win[_0x5a036e(190)]()) win[_0x5a036e(168)]();
		win[_0x5a036e(182)]();
		const _0x21216c = _0x2729c2["find"]((_0x3120a2) => _0x3120a2[_0x5a036e(223)](_0x5a036e(225)));
		_0x21216c && handleDeepLink(_0x21216c);
	}
});
electron.app["on"](_0x1c37b1(217), (_0xdd576a, _0x47c940) => {
	_0xdd576a[_0x1c37b1(179)](), handleDeepLink(_0x47c940);
});
function createWindow() {
	const _0x39ad1c = _0x1c37b1, { width: _0x35e0dc, height: _0x5e12b6 } = electron.screen[_0x39ad1c(209)]()[_0x39ad1c(214)], _0x34abfc = (0, node_path.join)(process[_0x39ad1c(218)][_0x39ad1c(208)], _0x39ad1c(200));
	process["platform"] === "darwin" && electron.app["dock"][_0x39ad1c(201)](_0x34abfc), win = new electron.BrowserWindow({
		"title": _0x39ad1c(229),
		"width": Math[_0x39ad1c(191)](_0x35e0dc / 2),
		"height": Math["floor"](_0x5e12b6 * .9),
		"minWidth": Math[_0x39ad1c(191)](_0x35e0dc / 2),
		"minHeight": 600,
		"icon": _0x34abfc,
		"webPreferences": {
			"preload": (0, node_path.join)(currentDir, _0x39ad1c(215)),
			"webviewTag": true
		}
	}), win[_0x39ad1c(227)]["on"]("did-finish-load", () => {
		const _0x4012c4 = _0x39ad1c;
		win?.[_0x4012c4(227)]["send"](_0x4012c4(176), (/* @__PURE__ */ new Date())[_0x4012c4(219)]()), deepLinkUrl && (win[_0x4012c4(227)]["send"](_0x4012c4(221), deepLinkUrl), deepLinkUrl = null);
	}), win["webContents"]["on"](_0x39ad1c(228), (_0x3f8f98, _0x5d157) => {
		const _0x554212 = _0x39ad1c;
		if ((VITE_DEV_SERVER_URL ? !_0x5d157[_0x554212(223)](VITE_DEV_SERVER_URL) : !_0x5d157[_0x554212(223)]("file://")) && _0x5d157["includes"](_0x554212(180))) {
			_0x3f8f98[_0x554212(179)]();
			const _0x404bfd = new electron.BrowserWindow({
				"width": 600,
				"height": 700,
				"webPreferences": {
					"nodeIntegration": false,
					"contextIsolation": true
				}
			});
			_0x404bfd[_0x554212(210)](_0x5d157);
			const _0x315ebf = (_0x3d79c4, _0x18de09) => {
				const _0x10416a = _0x554212;
				(VITE_DEV_SERVER_URL ? _0x18de09[_0x10416a(223)](VITE_DEV_SERVER_URL) : _0x18de09[_0x10416a(223)]("file://") || _0x18de09["startsWith"](_0x10416a(225)) || _0x18de09[_0x10416a(223)](_0x10416a(216))) && (_0x3d79c4[_0x10416a(179)](), _0x404bfd["close"](), win[_0x10416a(185)]());
			};
			_0x404bfd[_0x554212(227)]["on"](_0x554212(228), _0x315ebf), _0x404bfd[_0x554212(227)]["on"](_0x554212(167), _0x315ebf);
		}
	}), VITE_DEV_SERVER_URL ? win["loadURL"](VITE_DEV_SERVER_URL) : win[_0x39ad1c(230)]((0, node_path.join)(process[_0x39ad1c(218)]["DIST"], _0x39ad1c(174)));
}
electron.ipcMain[_0x1c37b1(205)]("set-proxy", async (_0x3b841e, _0x31b4a6, _0xfa15a9) => {
	const _0x70ef11 = _0x1c37b1;
	try {
		return await electron.session[_0x70ef11(189)](_0x31b4a6)["setProxy"]({ "proxyRules": _0xfa15a9 }), console["log"](_0x70ef11(178) + _0xfa15a9 + " for " + _0x31b4a6), true;
	} catch (_0x3c72a1) {
		return console[_0x70ef11(195)]("[Proxy] Failed to set proxy for " + _0x31b4a6 + ":", _0x3c72a1), false;
	}
}), electron.app["on"](_0x1c37b1(188), () => {
	const _0x494a8e = _0x1c37b1;
	process["platform"] !== _0x494a8e(173) && (electron.app["quit"](), win = null);
}), electron.app["on"](_0x1c37b1(184), () => {
	const _0x138c43 = _0x1c37b1;
	electron.BrowserWindow["getAllWindows"]()[_0x138c43(193)] === 0 && createWindow();
}), electron.app[_0x1c37b1(170)]()[_0x1c37b1(194)](() => {
	createWindow();
});
//#endregion
