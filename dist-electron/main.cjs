let electron = require("electron");
let node_path = require("node:path");
let node_url = require("node:url");
//#region electron/main.js
var _0x14b962 = _0x5723;
(function(_0x2d3e01, _0x11d02d) {
	const _0x3d9af9 = _0x5723, _0x14743e = _0x2d3e01();
	while (true) try {
		if (-parseInt(_0x3d9af9(445)) / 1 * (parseInt(_0x3d9af9(422)) / 2) + parseInt(_0x3d9af9(460)) / 3 * (parseInt(_0x3d9af9(455)) / 4) + parseInt(_0x3d9af9(448)) / 5 * (parseInt(_0x3d9af9(447)) / 6) + parseInt(_0x3d9af9(453)) / 7 * (parseInt(_0x3d9af9(468)) / 8) + parseInt(_0x3d9af9(441)) / 9 + parseInt(_0x3d9af9(451)) / 10 * (-parseInt(_0x3d9af9(442)) / 11) + parseInt(_0x3d9af9(461)) / 12 * (parseInt(_0x3d9af9(443)) / 13) === _0x11d02d) break;
		else _0x14743e["push"](_0x14743e["shift"]());
	} catch (_0x5a6bd4) {
		_0x14743e["push"](_0x14743e["shift"]());
	}
})(_0x1bbe, 392976);
var currentDir = typeof __dirname !== _0x14b962(440) ? __dirname : (0, node_path.dirname)((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
process.env[_0x14b962(444)] = (0, node_path.join)(currentDir, _0x14b962(472)), process.env["VITE_PUBLIC"] = electron.app["isPackaged"] ? process.env[_0x14b962(444)] : (0, node_path.join)(process.env[_0x14b962(444)], _0x14b962(459)), electron.app[_0x14b962(481)](_0x14b962(435));
function _0x5723(_0x4c1726, _0x4e1b08) {
	_0x4c1726 = _0x4c1726 - 422;
	return _0x1bbe()[_0x4c1726];
}
var win;
var VITE_DEV_SERVER_URL = process[_0x14b962(433)]["VITE_DEV_SERVER_URL"];
process[_0x14b962(449)] ? process[_0x14b962(480)][_0x14b962(464)] >= 2 && electron.app[_0x14b962(474)](_0x14b962(432), process["execPath"], [(0, node_path.join)(process[_0x14b962(480)][1])]) : electron.app[_0x14b962(474)](_0x14b962(432));
var deepLinkUrl = null;
function _0x1bbe() {
	const _0x5bf3e7 = [
		"preventDefault",
		"window-all-closed",
		"send",
		"youtumate",
		"env",
		" for ",
		"Youtumate",
		"index.html",
		"loadURL",
		"platform",
		"youtumate://",
		"undefined",
		"7068078JbeUao",
		"10956aSbaPW",
		"13hIFvva",
		"DIST",
		"91maLKTR",
		"getAllWindows",
		"273126qzTOjq",
		"10PKakWr",
		"defaultApp",
		"floor",
		"1370UajItT",
		"then",
		"42371ppJqxj",
		"getPrimaryDisplay",
		"36JhmEbz",
		"will-navigate",
		"deep-link",
		"darwin",
		"../public",
		"87nUgMXk",
		"1051212nMbFYX",
		"quit",
		"requestSingleInstanceLock",
		"length",
		"workAreaSize",
		"account/sessions/oauth2",
		"/images/favicon.png",
		"136myYOEX",
		"VITE_PUBLIC",
		"close",
		"handle",
		"../dist",
		"[Proxy] Set ",
		"setAsDefaultProtocolClient",
		"webContents",
		"setIcon",
		"startsWith",
		"loadFile",
		"did-finish-load",
		"argv",
		"setName",
		"setProxy",
		"restore",
		"11818pvODQO",
		"find",
		"will-redirect",
		"set-proxy",
		"activate",
		"log",
		"file://"
	];
	_0x1bbe = function() {
		return _0x5bf3e7;
	};
	return _0x1bbe();
}
function handleDeepLink(_0x144451) {
	const _0x252bdb = _0x14b962;
	win && win[_0x252bdb(475)] ? win[_0x252bdb(475)][_0x252bdb(431)](_0x252bdb(457), _0x144451) : deepLinkUrl = _0x144451;
}
!electron.app[_0x14b962(463)]() ? electron.app[_0x14b962(462)]() : electron.app["on"]("second-instance", (_0x555f3f, _0x783879, _0x2b107b) => {
	const _0x241b9a = _0x14b962;
	if (win) {
		if (win["isMinimized"]()) win[_0x241b9a(483)]();
		win["focus"]();
		const _0x5a6321 = _0x783879[_0x241b9a(423)]((_0x5a8fcc) => _0x5a8fcc[_0x241b9a(477)]("youtumate://"));
		_0x5a6321 && handleDeepLink(_0x5a6321);
	}
});
electron.app["on"]("open-url", (_0x5e3028, _0x3ab99a) => {
	_0x5e3028[_0x14b962(429)](), handleDeepLink(_0x3ab99a);
});
function createWindow() {
	const _0x16c9c5 = _0x14b962, { width: _0xf14c14, height: _0x17784e } = electron.screen[_0x16c9c5(454)]()[_0x16c9c5(465)], _0x4fff1d = (0, node_path.join)(process[_0x16c9c5(433)][_0x16c9c5(469)], _0x16c9c5(467));
	process[_0x16c9c5(438)] === _0x16c9c5(458) && electron.app["dock"][_0x16c9c5(476)](_0x4fff1d), win = new electron.BrowserWindow({
		"title": _0x16c9c5(435),
		"width": Math[_0x16c9c5(450)](_0xf14c14 / 2),
		"height": Math[_0x16c9c5(450)](_0x17784e * .9),
		"minWidth": Math[_0x16c9c5(450)](_0xf14c14 / 2),
		"minHeight": 600,
		"icon": _0x4fff1d,
		"webPreferences": {
			"preload": (0, node_path.join)(currentDir, "preload.js"),
			"webviewTag": true
		}
	}), win[_0x16c9c5(475)]["on"](_0x16c9c5(479), () => {
		const _0x5c9db0 = _0x16c9c5;
		win?.[_0x5c9db0(475)][_0x5c9db0(431)]("main-process-message", (/* @__PURE__ */ new Date())["toLocaleString"]()), deepLinkUrl && (win[_0x5c9db0(475)]["send"](_0x5c9db0(457), deepLinkUrl), deepLinkUrl = null);
	}), win[_0x16c9c5(475)]["on"](_0x16c9c5(456), (_0x52aa2c, _0x282e6b) => {
		const _0x42f816 = _0x16c9c5;
		if ((VITE_DEV_SERVER_URL ? !_0x282e6b[_0x42f816(477)](VITE_DEV_SERVER_URL) : !_0x282e6b[_0x42f816(477)](_0x42f816(428))) && _0x282e6b["includes"](_0x42f816(466))) {
			_0x52aa2c[_0x42f816(429)]();
			const _0x23dc2c = new electron.BrowserWindow({
				"width": 600,
				"height": 700,
				"webPreferences": {
					"nodeIntegration": false,
					"contextIsolation": true
				}
			});
			_0x23dc2c[_0x42f816(437)](_0x282e6b);
			const _0x118af5 = (_0x4669ca, _0x1b93ad) => {
				const _0x4eabfc = _0x42f816;
				(VITE_DEV_SERVER_URL ? _0x1b93ad[_0x4eabfc(477)](VITE_DEV_SERVER_URL) : _0x1b93ad[_0x4eabfc(477)]("file://") || _0x1b93ad["startsWith"](_0x4eabfc(439))) && (_0x4669ca[_0x4eabfc(429)](), _0x23dc2c[_0x4eabfc(470)](), win["reload"]());
			};
			_0x23dc2c[_0x42f816(475)]["on"](_0x42f816(456), _0x118af5), _0x23dc2c["webContents"]["on"](_0x42f816(424), _0x118af5);
		}
	}), VITE_DEV_SERVER_URL ? win[_0x16c9c5(437)](VITE_DEV_SERVER_URL) : win[_0x16c9c5(478)]((0, node_path.join)(process.env["DIST"], _0x16c9c5(436)));
}
electron.ipcMain[_0x14b962(471)](_0x14b962(425), async (_0x2f116a, _0x470c8b, _0x5407c9) => {
	const _0x39d23e = _0x14b962;
	try {
		return await electron.session["fromPartition"](_0x470c8b)[_0x39d23e(482)]({ "proxyRules": _0x5407c9 }), console[_0x39d23e(427)](_0x39d23e(473) + _0x5407c9 + _0x39d23e(434) + _0x470c8b), true;
	} catch (_0x353c39) {
		return console["error"]("[Proxy] Failed to set proxy for " + _0x470c8b + ":", _0x353c39), false;
	}
}), electron.app["on"](_0x14b962(430), () => {
	const _0x5b57f8 = _0x14b962;
	process["platform"] !== _0x5b57f8(458) && (electron.app[_0x5b57f8(462)](), win = null);
}), electron.app["on"](_0x14b962(426), () => {
	electron.BrowserWindow[_0x14b962(446)]()["length"] === 0 && createWindow();
}), electron.app["whenReady"]()[_0x14b962(452)](() => {
	createWindow();
});
//#endregion
