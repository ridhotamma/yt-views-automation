let electron = require("electron");
let node_path = require("node:path");
let node_url = require("node:url");
//#region electron/main.js
var _0x1f39ec = _0x522b;
(function(_0x264117, _0x31d5a3) {
	const _0x1b4400 = _0x522b, _0x215b7a = _0x264117();
	while (true) try {
		if (parseInt(_0x1b4400(502)) / 1 + -parseInt(_0x1b4400(485)) / 2 * (-parseInt(_0x1b4400(506)) / 3) + parseInt(_0x1b4400(496)) / 4 + -parseInt(_0x1b4400(507)) / 5 + parseInt(_0x1b4400(497)) / 6 + parseInt(_0x1b4400(499)) / 7 + parseInt(_0x1b4400(518)) / 8 * (-parseInt(_0x1b4400(491)) / 9) === _0x31d5a3) break;
		else _0x215b7a["push"](_0x215b7a["shift"]());
	} catch (_0x130339) {
		_0x215b7a["push"](_0x215b7a["shift"]());
	}
})(_0x11d4, 615552);
var currentDir = typeof __dirname !== _0x1f39ec(512) ? __dirname : (0, node_path.dirname)((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
process[_0x1f39ec(480)]["DIST"] = (0, node_path.join)(currentDir, _0x1f39ec(517)), process[_0x1f39ec(480)][_0x1f39ec(521)] = electron.app[_0x1f39ec(488)] ? process[_0x1f39ec(480)][_0x1f39ec(519)] : (0, node_path.join)(process[_0x1f39ec(480)][_0x1f39ec(519)], _0x1f39ec(537)), electron.app[_0x1f39ec(543)](_0x1f39ec(481));
var win;
var VITE_DEV_SERVER_URL = process[_0x1f39ec(480)][_0x1f39ec(523)];
function _0x522b(_0x5d99b6, _0x330ca6) {
	_0x5d99b6 = _0x5d99b6 - 480;
	return _0x11d4()[_0x5d99b6];
}
function _0x11d4() {
	const _0x3fe886 = [
		"loadFile",
		"length",
		"1030246DJHnDm",
		"[Proxy] Set ",
		"floor",
		"open-url",
		"3vYGdOH",
		"4810515XYsCdY",
		"dock",
		"did-finish-load",
		"close",
		"preload.js",
		"undefined",
		"loadURL",
		"index.html",
		"then",
		"send",
		"../dist",
		"624tgNcTw",
		"DIST",
		"platform",
		"VITE_PUBLIC",
		"account/sessions/oauth2",
		"VITE_DEV_SERVER_URL",
		"window-all-closed",
		"preventDefault",
		"will-redirect",
		"handle",
		"requestSingleInstanceLock",
		"setIcon",
		"quit",
		" for ",
		"defaultApp",
		"reload",
		"error",
		"set-proxy",
		"toLocaleString",
		"../public",
		"includes",
		"fromPartition",
		"log",
		"getPrimaryDisplay",
		"argv",
		"setName",
		"getAllWindows",
		"will-navigate",
		"darwin",
		"startsWith",
		"env",
		"Youtumate",
		"/images/favicon.png",
		"deep-link",
		"http://localhost/callback",
		"1874168EsmErt",
		"[Proxy] Failed to set proxy for ",
		"youtumate://",
		"isPackaged",
		"isMinimized",
		"activate",
		"385821pxoYmn",
		"setAsDefaultProtocolClient",
		"find",
		"file://",
		"focus",
		"4513416RbSgNz",
		"4270572soyTEi",
		"webContents",
		"7797937pLdVmG"
	];
	_0x11d4 = function() {
		return _0x3fe886;
	};
	return _0x11d4();
}
process[_0x1f39ec(532)] ? process[_0x1f39ec(542)]["length"] >= 2 && electron.app["setAsDefaultProtocolClient"]("youtumate", process["execPath"], [(0, node_path.join)(process["argv"][1])]) : electron.app[_0x1f39ec(492)]("youtumate");
var deepLinkUrl = null;
function handleDeepLink(_0xadee80) {
	const _0x5a4bd0 = _0x1f39ec;
	win && win[_0x5a4bd0(498)] ? win[_0x5a4bd0(498)][_0x5a4bd0(516)](_0x5a4bd0(483), _0xadee80) : deepLinkUrl = _0xadee80;
}
!electron.app[_0x1f39ec(528)]() ? electron.app[_0x1f39ec(530)]() : electron.app["on"]("second-instance", (_0x3f614e, _0x530df9, _0x57f6f9) => {
	const _0x107a59 = _0x1f39ec;
	if (win) {
		if (win[_0x107a59(489)]()) win["restore"]();
		win[_0x107a59(495)]();
		const _0x1791a3 = _0x530df9[_0x107a59(493)]((_0x418b11) => _0x418b11[_0x107a59(547)](_0x107a59(487)));
		_0x1791a3 && handleDeepLink(_0x1791a3);
	}
});
electron.app["on"](_0x1f39ec(505), (_0x5e06f6, _0x4479bc) => {
	_0x5e06f6["preventDefault"](), handleDeepLink(_0x4479bc);
});
function createWindow() {
	const _0xb393c5 = _0x1f39ec, { width: _0x4f313b, height: _0x1f4e8a } = electron.screen[_0xb393c5(541)]()["workAreaSize"], _0x3f11da = (0, node_path.join)(process.env[_0xb393c5(521)], _0xb393c5(482));
	process["platform"] === "darwin" && electron.app[_0xb393c5(508)][_0xb393c5(529)](_0x3f11da), win = new electron.BrowserWindow({
		"title": _0xb393c5(481),
		"width": Math["floor"](_0x4f313b / 2),
		"height": Math["floor"](_0x1f4e8a * .9),
		"minWidth": Math[_0xb393c5(504)](_0x4f313b / 2),
		"minHeight": 600,
		"icon": _0x3f11da,
		"webPreferences": {
			"preload": (0, node_path.join)(currentDir, _0xb393c5(511)),
			"webviewTag": true
		}
	}), win[_0xb393c5(498)]["on"](_0xb393c5(509), () => {
		const _0xe27ec0 = _0xb393c5;
		win?.[_0xe27ec0(498)][_0xe27ec0(516)]("main-process-message", (/* @__PURE__ */ new Date())[_0xe27ec0(536)]()), deepLinkUrl && (win[_0xe27ec0(498)][_0xe27ec0(516)](_0xe27ec0(483), deepLinkUrl), deepLinkUrl = null);
	}), win[_0xb393c5(498)]["on"](_0xb393c5(545), (_0x96d4a5, _0x3e3452) => {
		const _0xd0f122 = _0xb393c5;
		if ((VITE_DEV_SERVER_URL ? !_0x3e3452[_0xd0f122(547)](VITE_DEV_SERVER_URL) : !_0x3e3452[_0xd0f122(547)](_0xd0f122(494))) && _0x3e3452[_0xd0f122(538)](_0xd0f122(522))) {
			_0x96d4a5[_0xd0f122(525)]();
			const _0x592079 = new electron.BrowserWindow({
				"width": 600,
				"height": 700,
				"webPreferences": {
					"nodeIntegration": false,
					"contextIsolation": true
				}
			});
			_0x592079[_0xd0f122(513)](_0x3e3452);
			const _0x18a329 = (_0x4fb253, _0x674024) => {
				const _0x23c47e = _0xd0f122;
				(VITE_DEV_SERVER_URL ? _0x674024[_0x23c47e(547)](VITE_DEV_SERVER_URL) : _0x674024["startsWith"](_0x23c47e(494)) || _0x674024[_0x23c47e(547)](_0x23c47e(487)) || _0x674024["startsWith"](_0x23c47e(484))) && (_0x4fb253[_0x23c47e(525)](), _0x592079[_0x23c47e(510)](), win[_0x23c47e(533)]());
			};
			_0x592079["webContents"]["on"](_0xd0f122(545), _0x18a329), _0x592079[_0xd0f122(498)]["on"](_0xd0f122(526), _0x18a329);
		}
	}), VITE_DEV_SERVER_URL ? win["loadURL"](VITE_DEV_SERVER_URL) : win[_0xb393c5(500)]((0, node_path.join)(process[_0xb393c5(480)][_0xb393c5(519)], _0xb393c5(514)));
}
electron.ipcMain[_0x1f39ec(527)](_0x1f39ec(535), async (_0x562255, _0x41655f, _0x558631) => {
	const _0x5c2305 = _0x1f39ec;
	try {
		return await electron.session[_0x5c2305(539)](_0x41655f)["setProxy"]({ "proxyRules": _0x558631 }), console[_0x5c2305(540)](_0x5c2305(503) + _0x558631 + _0x5c2305(531) + _0x41655f), true;
	} catch (_0xa87ffc) {
		return console[_0x5c2305(534)](_0x5c2305(486) + _0x41655f + ":", _0xa87ffc), false;
	}
}), electron.app["on"](_0x1f39ec(524), () => {
	const _0xb14015 = _0x1f39ec;
	process[_0xb14015(520)] !== _0xb14015(546) && (electron.app[_0xb14015(530)](), win = null);
}), electron.app["on"](_0x1f39ec(490), () => {
	const _0x5a642d = _0x1f39ec;
	electron.BrowserWindow[_0x5a642d(544)]()[_0x5a642d(501)] === 0 && createWindow();
}), electron.app["whenReady"]()[_0x1f39ec(515)](() => {
	createWindow();
});
//#endregion
