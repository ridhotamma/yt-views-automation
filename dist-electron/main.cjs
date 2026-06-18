let electron = require("electron");
let node_path = require("node:path");
let node_url = require("node:url");
//#region electron/main.js
var _0x8c23d5 = _0x5f01;
(function(_0x5bd1cc, _0x59c2df) {
	const _0x5ac503 = _0x5f01, _0x127583 = _0x5bd1cc();
	while (true) try {
		if (-parseInt(_0x5ac503(502)) / 1 * (parseInt(_0x5ac503(470)) / 2) + -parseInt(_0x5ac503(467)) / 3 + -parseInt(_0x5ac503(464)) / 4 + parseInt(_0x5ac503(498)) / 5 * (-parseInt(_0x5ac503(518)) / 6) + -parseInt(_0x5ac503(462)) / 7 * (parseInt(_0x5ac503(523)) / 8) + -parseInt(_0x5ac503(521)) / 9 * (-parseInt(_0x5ac503(482)) / 10) + -parseInt(_0x5ac503(489)) / 11 * (-parseInt(_0x5ac503(492)) / 12) === _0x59c2df) break;
		else _0x127583["push"](_0x127583["shift"]());
	} catch (_0x4dff9c) {
		_0x127583["push"](_0x127583["shift"]());
	}
})(_0x208b, 567388);
function _0x5f01(_0x411984, _0x10137d) {
	_0x411984 = _0x411984 - 455;
	return _0x208b()[_0x411984];
}
var currentDir = typeof __dirname !== _0x8c23d5(465) ? __dirname : (0, node_path.dirname)((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
process[_0x8c23d5(488)][_0x8c23d5(471)] = (0, node_path.join)(currentDir, _0x8c23d5(507)), process.env[_0x8c23d5(490)] = electron.app[_0x8c23d5(524)] ? process.env[_0x8c23d5(471)] : (0, node_path.join)(process[_0x8c23d5(488)][_0x8c23d5(471)], "../public"), electron.app[_0x8c23d5(501)](_0x8c23d5(494));
var win;
var VITE_DEV_SERVER_URL = process[_0x8c23d5(488)][_0x8c23d5(456)];
function _0x208b() {
	const _0x32e0b7 = [
		"env",
		"6721qTwDAP",
		"VITE_PUBLIC",
		"activate",
		"45324gxJuPL",
		"restore",
		"Youtumate",
		"workAreaSize",
		"error",
		"darwin",
		"6950DyFdOI",
		"close",
		"youtumate",
		"setName",
		"1kwrcyI",
		"window-all-closed",
		"open-url",
		"startsWith",
		"did-finish-load",
		"../dist",
		"loadFile",
		"execPath",
		"/images/favicon.png",
		"defaultApp",
		"reload",
		"preventDefault",
		"floor",
		"setIcon",
		" for ",
		"second-instance",
		"42WhHOwM",
		"webContents",
		"requestSingleInstanceLock",
		"1118862fzYlNb",
		"includes",
		"1304nyPraB",
		"isPackaged",
		"[Proxy] Failed to set proxy for ",
		"dock",
		"VITE_DEV_SERVER_URL",
		"setProxy",
		"platform",
		"find",
		"index.html",
		"argv",
		"10787rJcnhR",
		"isMinimized",
		"4140056gsgDNY",
		"undefined",
		"http://localhost/callback",
		"2575518zpEzDB",
		"focus",
		"setAsDefaultProtocolClient",
		"663668PEsjKo",
		"DIST",
		"file://",
		"whenReady",
		"account/sessions/oauth2",
		"set-proxy",
		"[Proxy] Set ",
		"youtumate://",
		"getAllWindows",
		"loadURL",
		"send",
		"then",
		"60lkXrZo",
		"will-redirect",
		"main-process-message",
		"length",
		"quit",
		"deep-link"
	];
	_0x208b = function() {
		return _0x32e0b7;
	};
	return _0x208b();
}
process[_0x8c23d5(511)] ? process[_0x8c23d5(461)]["length"] >= 2 && electron.app[_0x8c23d5(469)](_0x8c23d5(500), process[_0x8c23d5(509)], [(0, node_path.join)(process["argv"][1])]) : electron.app[_0x8c23d5(469)](_0x8c23d5(500));
var deepLinkUrl = null;
function handleDeepLink(_0x94f12b) {
	const _0x456dc4 = _0x8c23d5;
	win && win[_0x456dc4(519)] ? win["webContents"][_0x456dc4(480)](_0x456dc4(487), _0x94f12b) : deepLinkUrl = _0x94f12b;
}
!electron.app[_0x8c23d5(520)]() ? electron.app[_0x8c23d5(486)]() : electron.app["on"](_0x8c23d5(517), (_0x48b09a, _0x4025cc, _0x5a07ca) => {
	const _0x3c6197 = _0x8c23d5;
	if (win) {
		if (win[_0x3c6197(463)]()) win[_0x3c6197(493)]();
		win[_0x3c6197(468)]();
		const _0x4b8d15 = _0x4025cc[_0x3c6197(459)]((_0x1f87b5) => _0x1f87b5[_0x3c6197(505)](_0x3c6197(477)));
		_0x4b8d15 && handleDeepLink(_0x4b8d15);
	}
});
electron.app["on"](_0x8c23d5(504), (_0xc2082f, _0x22a342) => {
	_0xc2082f[_0x8c23d5(513)](), handleDeepLink(_0x22a342);
});
function createWindow() {
	const _0x106e03 = _0x8c23d5, { width: _0x369538, height: _0x581621 } = electron.screen["getPrimaryDisplay"]()[_0x106e03(495)], _0x4540d5 = (0, node_path.join)(process.env["VITE_PUBLIC"], _0x106e03(510));
	process[_0x106e03(458)] === _0x106e03(497) && electron.app[_0x106e03(455)][_0x106e03(515)](_0x4540d5), win = new electron.BrowserWindow({
		"title": _0x106e03(494),
		"width": Math[_0x106e03(514)](_0x369538 / 2),
		"height": Math[_0x106e03(514)](_0x581621 * .9),
		"minWidth": Math["floor"](_0x369538 / 2),
		"minHeight": 600,
		"icon": _0x4540d5,
		"webPreferences": {
			"preload": (0, node_path.join)(currentDir, "preload.js"),
			"webviewTag": true
		}
	}), win[_0x106e03(519)]["on"](_0x106e03(506), () => {
		const _0x8f5997 = _0x106e03;
		win?.[_0x8f5997(519)][_0x8f5997(480)](_0x8f5997(484), (/* @__PURE__ */ new Date())["toLocaleString"]()), deepLinkUrl && (win[_0x8f5997(519)][_0x8f5997(480)](_0x8f5997(487), deepLinkUrl), deepLinkUrl = null);
	}), win[_0x106e03(519)]["on"]("will-navigate", (_0x27806a, _0x22aea9) => {
		const _0x2e413e = _0x106e03;
		if ((VITE_DEV_SERVER_URL ? !_0x22aea9[_0x2e413e(505)](VITE_DEV_SERVER_URL) : !_0x22aea9[_0x2e413e(505)](_0x2e413e(472))) && _0x22aea9[_0x2e413e(522)](_0x2e413e(474))) {
			_0x27806a[_0x2e413e(513)]();
			const _0x445c34 = new electron.BrowserWindow({
				"width": 600,
				"height": 700,
				"webPreferences": {
					"nodeIntegration": false,
					"contextIsolation": true
				}
			});
			_0x445c34[_0x2e413e(479)](_0x22aea9);
			const _0x133a00 = (_0x223549, _0x57c89a) => {
				const _0x405bc8 = _0x2e413e;
				(VITE_DEV_SERVER_URL ? _0x57c89a[_0x405bc8(505)](VITE_DEV_SERVER_URL) : _0x57c89a[_0x405bc8(505)](_0x405bc8(472)) || _0x57c89a[_0x405bc8(505)]("youtumate://") || _0x57c89a["startsWith"](_0x405bc8(466))) && (_0x223549[_0x405bc8(513)](), _0x445c34[_0x405bc8(499)](), win[_0x405bc8(512)]());
			};
			_0x445c34["webContents"]["on"]("will-navigate", _0x133a00), _0x445c34["webContents"]["on"](_0x2e413e(483), _0x133a00);
		}
	}), VITE_DEV_SERVER_URL ? win[_0x106e03(479)](VITE_DEV_SERVER_URL) : win[_0x106e03(508)]((0, node_path.join)(process[_0x106e03(488)][_0x106e03(471)], _0x106e03(460)));
}
electron.ipcMain["handle"](_0x8c23d5(475), async (_0x267d69, _0x474f43, _0x4252ff) => {
	const _0x1031c8 = _0x8c23d5;
	try {
		return await electron.session["fromPartition"](_0x474f43)[_0x1031c8(457)]({ "proxyRules": _0x4252ff }), console["log"](_0x1031c8(476) + _0x4252ff + _0x1031c8(516) + _0x474f43), true;
	} catch (_0x57d7c4) {
		return console[_0x1031c8(496)](_0x1031c8(525) + _0x474f43 + ":", _0x57d7c4), false;
	}
}), electron.app["on"](_0x8c23d5(503), () => {
	const _0x4d7025 = _0x8c23d5;
	process["platform"] !== "darwin" && (electron.app[_0x4d7025(486)](), win = null);
}), electron.app["on"](_0x8c23d5(491), () => {
	const _0x2ca4d4 = _0x8c23d5;
	electron.BrowserWindow[_0x2ca4d4(478)]()[_0x2ca4d4(485)] === 0 && createWindow();
}), electron.app[_0x8c23d5(473)]()[_0x8c23d5(481)](() => {
	createWindow();
});
//#endregion
