let electron = require("electron");
let node_path = require("node:path");
let node_url = require("node:url");
//#region electron/main.js
var _0x1d5d2d = _0x2575;
(function(_0x485988, _0x43f2fd) {
	const _0x5624da = _0x2575, _0x4e40ef = _0x485988();
	while (true) try {
		if (-parseInt(_0x5624da(263)) / 1 * (parseInt(_0x5624da(289)) / 2) + -parseInt(_0x5624da(286)) / 3 + parseInt(_0x5624da(303)) / 4 + -parseInt(_0x5624da(325)) / 5 * (parseInt(_0x5624da(260)) / 6) + -parseInt(_0x5624da(322)) / 7 * (parseInt(_0x5624da(299)) / 8) + parseInt(_0x5624da(268)) / 9 * (-parseInt(_0x5624da(288)) / 10) + parseInt(_0x5624da(315)) / 11 === _0x43f2fd) break;
		else _0x4e40ef["push"](_0x4e40ef["shift"]());
	} catch (_0x349184) {
		_0x4e40ef["push"](_0x4e40ef["shift"]());
	}
})(_0x78b1, 715870);
function _0x78b1() {
	const _0x71e7a1 = [
		"toLocaleString",
		"reload",
		"restore",
		"main-process-message",
		"[Proxy] Failed to set proxy for ",
		"activate",
		"248OshQlg",
		"quit",
		"then",
		"platform",
		"4032568GJLoAS",
		"requestSingleInstanceLock",
		"file://",
		"log",
		"will-redirect",
		"send",
		" for ",
		"env",
		"loadFile",
		"/images/favicon.png",
		"workAreaSize",
		"will-navigate",
		"36615810cSwTtW",
		"length",
		"find",
		"setProxy",
		"startsWith",
		"preventDefault",
		"deep-link",
		"165452tgaFTC",
		"darwin",
		"setIcon",
		"2845OsAAtf",
		"did-finish-load",
		"[Proxy] Set ",
		"set-proxy",
		"window-all-closed",
		"14970KaUxPk",
		"setName",
		"whenReady",
		"4AuSWAP",
		"setAsDefaultProtocolClient",
		"VITE_PUBLIC",
		"includes",
		"Youtumate",
		"4428MUnnVV",
		"DIST",
		"dock",
		"youtumate://",
		"../dist",
		"focus",
		"../public",
		"getAllWindows",
		"close",
		"webContents",
		"handle",
		"argv",
		"defaultApp",
		"preload.js",
		"http://localhost/callback",
		"undefined",
		"second-instance",
		"fromPartition",
		"3605037gzfsnO",
		"execPath",
		"250HEQjvs",
		"127316KDiykF",
		"getPrimaryDisplay",
		"isPackaged",
		"error"
	];
	_0x78b1 = function() {
		return _0x71e7a1;
	};
	return _0x78b1();
}
var currentDir = typeof __dirname !== _0x1d5d2d(283) ? __dirname : (0, node_path.dirname)((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
process[_0x1d5d2d(310)]["DIST"] = (0, node_path.join)(currentDir, _0x1d5d2d(272)), process.env["VITE_PUBLIC"] = electron.app[_0x1d5d2d(291)] ? process.env[_0x1d5d2d(269)] : (0, node_path.join)(process[_0x1d5d2d(310)][_0x1d5d2d(269)], _0x1d5d2d(274)), electron.app[_0x1d5d2d(261)](_0x1d5d2d(267));
var win;
function _0x2575(_0x2c4c21, _0x403729) {
	_0x2c4c21 = _0x2c4c21 - 259;
	return _0x78b1()[_0x2c4c21];
}
var VITE_DEV_SERVER_URL = process[_0x1d5d2d(310)]["VITE_DEV_SERVER_URL"];
process[_0x1d5d2d(280)] ? process[_0x1d5d2d(279)]["length"] >= 2 && electron.app[_0x1d5d2d(264)]("youtumate", process[_0x1d5d2d(287)], [(0, node_path.join)(process[_0x1d5d2d(279)][1])]) : electron.app["setAsDefaultProtocolClient"]("youtumate");
var deepLinkUrl = null;
function handleDeepLink(_0x4af724) {
	const _0x2047e2 = _0x1d5d2d;
	win && win["webContents"] ? win[_0x2047e2(277)][_0x2047e2(308)](_0x2047e2(321), _0x4af724) : deepLinkUrl = _0x4af724;
}
!electron.app[_0x1d5d2d(304)]() ? electron.app[_0x1d5d2d(300)]() : electron.app["on"](_0x1d5d2d(284), (_0x7b9353, _0x3b221b, _0x48443d) => {
	const _0x5b1cec = _0x1d5d2d;
	if (win) {
		if (win["isMinimized"]()) win[_0x5b1cec(295)]();
		win[_0x5b1cec(273)]();
		const _0x4af5c3 = _0x3b221b[_0x5b1cec(317)]((_0x40e074) => _0x40e074[_0x5b1cec(319)](_0x5b1cec(271)));
		_0x4af5c3 && handleDeepLink(_0x4af5c3);
	}
});
electron.app["on"]("open-url", (_0x1d77e0, _0xb82a11) => {
	_0x1d77e0[_0x1d5d2d(320)](), handleDeepLink(_0xb82a11);
});
function createWindow() {
	const _0x9a0165 = _0x1d5d2d, { width: _0x2bcac0, height: _0x2c43fd } = electron.screen[_0x9a0165(290)]()[_0x9a0165(313)], _0x3a3d5c = (0, node_path.join)(process[_0x9a0165(310)][_0x9a0165(265)], _0x9a0165(312));
	process[_0x9a0165(302)] === _0x9a0165(323) && electron.app[_0x9a0165(270)][_0x9a0165(324)](_0x3a3d5c), win = new electron.BrowserWindow({
		"title": _0x9a0165(267),
		"width": Math["floor"](_0x2bcac0 / 2),
		"height": Math["floor"](_0x2c43fd * .9),
		"minWidth": Math["floor"](_0x2bcac0 / 2),
		"minHeight": 600,
		"icon": _0x3a3d5c,
		"webPreferences": {
			"preload": (0, node_path.join)(currentDir, _0x9a0165(281)),
			"webviewTag": true
		}
	}), win[_0x9a0165(277)]["on"](_0x9a0165(326), () => {
		const _0x1e8806 = _0x9a0165;
		win?.[_0x1e8806(277)][_0x1e8806(308)](_0x1e8806(296), (/* @__PURE__ */ new Date())[_0x1e8806(293)]()), deepLinkUrl && (win["webContents"][_0x1e8806(308)]("deep-link", deepLinkUrl), deepLinkUrl = null);
	}), win[_0x9a0165(277)]["on"]("will-navigate", (_0x573a42, _0x26b6bc) => {
		const _0x191290 = _0x9a0165;
		if ((VITE_DEV_SERVER_URL ? !_0x26b6bc[_0x191290(319)](VITE_DEV_SERVER_URL) : !_0x26b6bc[_0x191290(319)](_0x191290(305))) && _0x26b6bc[_0x191290(266)]("account/sessions/oauth2")) {
			_0x573a42[_0x191290(320)]();
			const _0xcf5cb3 = new electron.BrowserWindow({
				"width": 600,
				"height": 700,
				"webPreferences": {
					"nodeIntegration": false,
					"contextIsolation": true
				}
			});
			_0xcf5cb3["loadURL"](_0x26b6bc);
			const _0x1352c1 = (_0x5c3001, _0x5df7fb) => {
				const _0x4a5928 = _0x191290;
				(VITE_DEV_SERVER_URL ? _0x5df7fb[_0x4a5928(319)](VITE_DEV_SERVER_URL) : _0x5df7fb["startsWith"](_0x4a5928(305)) || _0x5df7fb[_0x4a5928(319)](_0x4a5928(271)) || _0x5df7fb[_0x4a5928(319)](_0x4a5928(282))) && (_0x5c3001[_0x4a5928(320)](), _0xcf5cb3[_0x4a5928(276)](), win[_0x4a5928(294)]());
			};
			_0xcf5cb3[_0x191290(277)]["on"](_0x191290(314), _0x1352c1), _0xcf5cb3[_0x191290(277)]["on"](_0x191290(307), _0x1352c1);
		}
	}), VITE_DEV_SERVER_URL ? win["loadURL"](VITE_DEV_SERVER_URL) : win[_0x9a0165(311)]((0, node_path.join)(process[_0x9a0165(310)][_0x9a0165(269)], "index.html"));
}
electron.ipcMain[_0x1d5d2d(278)](_0x1d5d2d(328), async (_0x29b4cf, _0xcc670a, _0x12c54c) => {
	const _0x1a4368 = _0x1d5d2d;
	try {
		return await electron.session[_0x1a4368(285)](_0xcc670a)[_0x1a4368(318)]({ "proxyRules": _0x12c54c }), console[_0x1a4368(306)](_0x1a4368(327) + _0x12c54c + _0x1a4368(309) + _0xcc670a), true;
	} catch (_0x572085) {
		return console[_0x1a4368(292)](_0x1a4368(297) + _0xcc670a + ":", _0x572085), false;
	}
}), electron.app["on"](_0x1d5d2d(259), () => {
	const _0x517078 = _0x1d5d2d;
	process[_0x517078(302)] !== _0x517078(323) && (electron.app["quit"](), win = null);
}), electron.app["on"](_0x1d5d2d(298), () => {
	const _0x260c4e = _0x1d5d2d;
	electron.BrowserWindow[_0x260c4e(275)]()[_0x260c4e(316)] === 0 && createWindow();
}), electron.app[_0x1d5d2d(262)]()[_0x1d5d2d(301)](() => {
	createWindow();
});
//#endregion
