let electron = require("electron");
let node_path = require("node:path");
let node_url = require("node:url");
//#region electron/main.js
var _0x8067e1 = _0x3fe4;
(function(_0x21bba8, _0x11f872) {
	const _0x4663fd = _0x3fe4, _0x30982a = _0x21bba8();
	while (true) try {
		if (parseInt(_0x4663fd(355)) / 1 + -parseInt(_0x4663fd(372)) / 2 * (-parseInt(_0x4663fd(319)) / 3) + -parseInt(_0x4663fd(342)) / 4 * (-parseInt(_0x4663fd(357)) / 5) + parseInt(_0x4663fd(351)) / 6 + -parseInt(_0x4663fd(328)) / 7 * (parseInt(_0x4663fd(318)) / 8) + -parseInt(_0x4663fd(374)) / 9 + -parseInt(_0x4663fd(354)) / 10 === _0x11f872) break;
		else _0x30982a["push"](_0x30982a["shift"]());
	} catch (_0x54d222) {
		_0x30982a["push"](_0x30982a["shift"]());
	}
})(_0xc512, 594889);
function _0x3fe4(_0x4dce7b, _0x1025ed) {
	_0x4dce7b = _0x4dce7b - 316;
	return _0xc512()[_0x4dce7b];
}
var currentDir = typeof __dirname !== _0x8067e1(326) ? __dirname : (0, node_path.dirname)((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
process.env[_0x8067e1(334)] = (0, node_path.join)(currentDir, _0x8067e1(341)), process[_0x8067e1(340)][_0x8067e1(352)] = electron.app[_0x8067e1(321)] ? process.env[_0x8067e1(334)] : (0, node_path.join)(process[_0x8067e1(340)][_0x8067e1(334)], "../public"), electron.app[_0x8067e1(360)](_0x8067e1(331));
var win;
var VITE_DEV_SERVER_URL = process.env[_0x8067e1(347)];
process[_0x8067e1(330)] ? process[_0x8067e1(320)]["length"] >= 2 && electron.app[_0x8067e1(333)]("youtumate", process[_0x8067e1(363)], [(0, node_path.join)(process[_0x8067e1(320)][1])]) : electron.app[_0x8067e1(333)]("youtumate");
var deepLinkUrl = null;
function handleDeepLink(_0x3c86bf) {
	const _0x34e782 = _0x8067e1;
	win && win[_0x34e782(350)] ? win[_0x34e782(350)]["send"](_0x34e782(362), _0x3c86bf) : deepLinkUrl = _0x3c86bf;
}
!electron.app[_0x8067e1(339)]() ? electron.app[_0x8067e1(365)]() : electron.app["on"](_0x8067e1(364), (_0x2e1498, _0x48ee0b, _0x340aea) => {
	const _0x4772c7 = _0x8067e1;
	if (win) {
		if (win[_0x4772c7(332)]()) win[_0x4772c7(367)]();
		win[_0x4772c7(358)]();
		const _0x192b16 = _0x48ee0b["find"]((_0x1c7f8d) => _0x1c7f8d["startsWith"]("youtumate://"));
		_0x192b16 && handleDeepLink(_0x192b16);
	}
});
function _0xc512() {
	const _0x5b8414 = [
		"preventDefault",
		" for ",
		"platform",
		"2BguHNb",
		"loadURL",
		"9673749sRrnxc",
		"activate",
		"preload.js",
		"8gGJwkP",
		"777813VMuJbt",
		"argv",
		"isPackaged",
		"fromPartition",
		"handle",
		"file://",
		"window-all-closed",
		"undefined",
		"whenReady",
		"3299226zKdVIC",
		"set-proxy",
		"defaultApp",
		"Youtumate",
		"isMinimized",
		"setAsDefaultProtocolClient",
		"DIST",
		"account/sessions/oauth2",
		"[Proxy] Failed to set proxy for ",
		"/images/favicon.png",
		"will-navigate",
		"requestSingleInstanceLock",
		"env",
		"../dist",
		"10012YLRjkK",
		"dock",
		"youtumate://",
		"length",
		"getPrimaryDisplay",
		"VITE_DEV_SERVER_URL",
		"will-redirect",
		"startsWith",
		"webContents",
		"6409500Bwexsz",
		"VITE_PUBLIC",
		"reload",
		"4502240BWkIqv",
		"990944MmXUNv",
		"floor",
		"545zwpgXU",
		"focus",
		"getAllWindows",
		"setName",
		"workAreaSize",
		"deep-link",
		"execPath",
		"second-instance",
		"quit",
		"send",
		"restore",
		"darwin"
	];
	_0xc512 = function() {
		return _0x5b8414;
	};
	return _0xc512();
}
electron.app["on"]("open-url", (_0x17cb1b, _0x11f368) => {
	_0x17cb1b["preventDefault"](), handleDeepLink(_0x11f368);
});
function createWindow() {
	const _0x2cd464 = _0x8067e1, { width: _0x4617d8, height: _0x1c6860 } = electron.screen[_0x2cd464(346)]()[_0x2cd464(361)], _0x3ba6cc = (0, node_path.join)(process[_0x2cd464(340)][_0x2cd464(352)], _0x2cd464(337));
	process[_0x2cd464(371)] === _0x2cd464(368) && electron.app[_0x2cd464(343)]["setIcon"](_0x3ba6cc), win = new electron.BrowserWindow({
		"title": "Youtumate",
		"width": Math[_0x2cd464(356)](_0x4617d8 / 2),
		"height": Math[_0x2cd464(356)](_0x1c6860 * .9),
		"minWidth": Math[_0x2cd464(356)](_0x4617d8 / 2),
		"minHeight": 600,
		"icon": _0x3ba6cc,
		"webPreferences": {
			"preload": (0, node_path.join)(currentDir, _0x2cd464(317)),
			"webviewTag": true
		}
	}), win[_0x2cd464(350)]["on"]("did-finish-load", () => {
		const _0x2799b4 = _0x2cd464;
		win?.[_0x2799b4(350)][_0x2799b4(366)]("main-process-message", (/* @__PURE__ */ new Date())["toLocaleString"]()), deepLinkUrl && (win[_0x2799b4(350)]["send"]("deep-link", deepLinkUrl), deepLinkUrl = null);
	}), win[_0x2cd464(350)]["on"](_0x2cd464(338), (_0x4ddb8a, _0x517cda) => {
		const _0x45c21e = _0x2cd464;
		if ((VITE_DEV_SERVER_URL ? !_0x517cda["startsWith"](VITE_DEV_SERVER_URL) : !_0x517cda[_0x45c21e(349)](_0x45c21e(324))) && _0x517cda["includes"](_0x45c21e(335))) {
			_0x4ddb8a[_0x45c21e(369)]();
			const _0x2f6e08 = new electron.BrowserWindow({
				"width": 600,
				"height": 700,
				"webPreferences": {
					"nodeIntegration": false,
					"contextIsolation": true
				}
			});
			_0x2f6e08[_0x45c21e(373)](_0x517cda);
			const _0x1a4c7c = (_0x2926c8, _0x3b59e9) => {
				const _0x3a36e3 = _0x45c21e;
				(VITE_DEV_SERVER_URL ? _0x3b59e9[_0x3a36e3(349)](VITE_DEV_SERVER_URL) : _0x3b59e9[_0x3a36e3(349)](_0x3a36e3(324)) || _0x3b59e9["startsWith"](_0x3a36e3(344))) && (_0x2926c8["preventDefault"](), _0x2f6e08["close"](), win[_0x3a36e3(353)]());
			};
			_0x2f6e08["webContents"]["on"](_0x45c21e(338), _0x1a4c7c), _0x2f6e08["webContents"]["on"](_0x45c21e(348), _0x1a4c7c);
		}
	}), VITE_DEV_SERVER_URL ? win["loadURL"](VITE_DEV_SERVER_URL) : win["loadFile"]((0, node_path.join)(process[_0x2cd464(340)][_0x2cd464(334)], "index.html"));
}
electron.ipcMain[_0x8067e1(323)](_0x8067e1(329), async (_0x31b528, _0x34f4c8, _0x55124f) => {
	const _0x68836d = _0x8067e1;
	try {
		return await electron.session[_0x68836d(322)](_0x34f4c8)["setProxy"]({ "proxyRules": _0x55124f }), console["log"]("[Proxy] Set " + _0x55124f + _0x68836d(370) + _0x34f4c8), true;
	} catch (_0x2de11b) {
		return console["error"](_0x68836d(336) + _0x34f4c8 + ":", _0x2de11b), false;
	}
}), electron.app["on"](_0x8067e1(325), () => {
	const _0x29e321 = _0x8067e1;
	process[_0x29e321(371)] !== _0x29e321(368) && (electron.app[_0x29e321(365)](), win = null);
}), electron.app["on"](_0x8067e1(316), () => {
	const _0x2dbdd6 = _0x8067e1;
	electron.BrowserWindow[_0x2dbdd6(359)]()[_0x2dbdd6(345)] === 0 && createWindow();
}), electron.app[_0x8067e1(327)]()["then"](() => {
	createWindow();
});
//#endregion
