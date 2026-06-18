//#region \0rolldown/runtime.js
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
//#endregion
//#region electron/preload.js
var import_electron = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { spawnSync } = require("child_process");
	var fs = require("fs");
	var path = require("path");
	var pathFile = path.join(__dirname, "path.txt");
	function downloadElectron() {
		console.log("Downloading Electron binary...");
		if (spawnSync(process.execPath, [path.join(__dirname, "install.js")], { stdio: "inherit" }).status !== 0) throw new Error("Electron failed to install correctly. Please delete `node_modules/electron` and run \"npx install-electron --no\" manually.");
	}
	/**
	* Fetches the path to the Electron executable to use in development mode.
	* If the executable is missing, attempt to download it first.
	*
	* @returns the path to the Electron executable to run
	*/
	function getElectronPath() {
		let executablePath;
		if (fs.existsSync(pathFile)) executablePath = fs.readFileSync(pathFile, "utf-8");
		if (process.env.ELECTRON_OVERRIDE_DIST_PATH) return path.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath || "electron");
		if (executablePath) {
			const fullPath = path.join(__dirname, "dist", executablePath);
			if (!fs.existsSync(fullPath)) downloadElectron();
			return fullPath;
		} else {
			try {
				downloadElectron();
			} catch {
				throw new Error("Electron failed to install correctly. Please delete `node_modules/electron` and run \"npx install-electron --no\" manually.");
			}
			executablePath = fs.readFileSync(pathFile, "utf-8");
			return path.join(__dirname, "dist", executablePath);
		}
	}
	module.exports = getElectronPath();
})))();
function _0x4339() {
	const _0x54d33b = [
		"send",
		"2038720yAHhwI",
		"10305080SDNClJ",
		"5118333ntVwmW",
		"invoke",
		"154729JCgsYx",
		"off",
		"2787490ZTxaWL",
		"835355AcYRVf",
		"2wAxHPz",
		"ipcRenderer",
		"24oIvyxR",
		"9vshTsx",
		"10927700PKEZTK",
		"exposeInMainWorld"
	];
	_0x4339 = function() {
		return _0x54d33b;
	};
	return _0x4339();
}
var _0x333fb9 = _0x5a5e;
(function(_0x5a0daf, _0x5e755d) {
	const _0x177468 = _0x5a5e, _0x4a5dc8 = _0x5a0daf();
	while (true) try {
		if (-parseInt(_0x177468(492)) / 1 + -parseInt(_0x177468(496)) / 2 * (-parseInt(_0x177468(505)) / 3) + -parseInt(_0x177468(503)) / 4 + parseInt(_0x177468(495)) / 5 * (-parseInt(_0x177468(498)) / 6) + parseInt(_0x177468(500)) / 7 + parseInt(_0x177468(504)) / 8 * (-parseInt(_0x177468(499)) / 9) + parseInt(_0x177468(494)) / 10 === _0x5e755d) break;
		else _0x4a5dc8["push"](_0x4a5dc8["shift"]());
	} catch (_0x3e3e88) {
		_0x4a5dc8["push"](_0x4a5dc8["shift"]());
	}
})(_0x4339, 925132);
function _0x5a5e(_0x197f8a, _0x1ccf92) {
	_0x197f8a = _0x197f8a - 492;
	return _0x4339()[_0x197f8a];
}
import_electron.contextBridge[_0x333fb9(501)](_0x333fb9(497), {
	"on"(..._0x4a084c) {
		const [_0xa322e5, _0x46be6b] = _0x4a084c;
		return import_electron.ipcRenderer["on"](_0xa322e5, (_0x346441, ..._0x5588c1) => _0x46be6b(_0x346441, ..._0x5588c1));
	},
	"off"(..._0x2e2655) {
		const _0x2002dd = _0x333fb9, [_0x4dc0c4, ..._0x2f35b7] = _0x2e2655;
		return import_electron.ipcRenderer[_0x2002dd(493)](_0x4dc0c4, ..._0x2f35b7);
	},
	"send"(..._0x3dbcb6) {
		const _0xde68bc = _0x333fb9, [_0x115b90, ..._0x250225] = _0x3dbcb6;
		return import_electron.ipcRenderer[_0xde68bc(502)](_0x115b90, ..._0x250225);
	},
	"invoke"(..._0x2b9aa3) {
		const _0x3104ac = _0x333fb9, [_0xb6df7b, ..._0x1e923c] = _0x2b9aa3;
		return import_electron.ipcRenderer[_0x3104ac(506)](_0xb6df7b, ..._0x1e923c);
	}
});
//#endregion
