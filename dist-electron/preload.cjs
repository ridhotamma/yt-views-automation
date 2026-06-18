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
function _0x5b3f(_0x30ca13, _0x531b14) {
	_0x30ca13 = _0x30ca13 - 205;
	return _0xfb3a()[_0x30ca13];
}
var _0x38c4a6 = _0x5b3f;
(function(_0x5c592a, _0x2ea0fc) {
	const _0x3d6bac = _0x5b3f, _0x56f2bc = _0x5c592a();
	while (true) try {
		if (parseInt(_0x3d6bac(206)) / 1 * (-parseInt(_0x3d6bac(208)) / 2) + parseInt(_0x3d6bac(214)) / 3 + -parseInt(_0x3d6bac(210)) / 4 + -parseInt(_0x3d6bac(205)) / 5 + -parseInt(_0x3d6bac(215)) / 6 + -parseInt(_0x3d6bac(209)) / 7 + parseInt(_0x3d6bac(216)) / 8 === _0x2ea0fc) break;
		else _0x56f2bc["push"](_0x56f2bc["shift"]());
	} catch (_0xc3f527) {
		_0x56f2bc["push"](_0x56f2bc["shift"]());
	}
})(_0xfb3a, 616153);
function _0xfb3a() {
	const _0x5f1be7 = [
		"exposeInMainWorld",
		"ipcRenderer",
		"off",
		"1491081rhZSKA",
		"1665090ObXnmJ",
		"33304736jJIWNQ",
		"3826870JzFIwV",
		"277ViTxWr",
		"invoke",
		"6742nhvplv",
		"8274497BcxWDj",
		"3540956uCBRLD"
	];
	_0xfb3a = function() {
		return _0x5f1be7;
	};
	return _0xfb3a();
}
import_electron.contextBridge[_0x38c4a6(211)](_0x38c4a6(212), {
	"on"(..._0x568e79) {
		const [_0x51863d, _0x4e53fa] = _0x568e79;
		return import_electron.ipcRenderer["on"](_0x51863d, (_0x5b12de, ..._0x293237) => _0x4e53fa(_0x5b12de, ..._0x293237));
	},
	"off"(..._0x2b5de4) {
		const _0x1bf50c = _0x38c4a6, [_0x5f9c4, ..._0x3df486] = _0x2b5de4;
		return import_electron.ipcRenderer[_0x1bf50c(213)](_0x5f9c4, ..._0x3df486);
	},
	"send"(..._0x1150ff) {
		const [_0x4ab8d0, ..._0x533067] = _0x1150ff;
		return import_electron.ipcRenderer["send"](_0x4ab8d0, ..._0x533067);
	},
	"invoke"(..._0x539965) {
		const _0x24176f = _0x38c4a6, [_0xc3cd75, ..._0x2a01ac] = _0x539965;
		return import_electron.ipcRenderer[_0x24176f(207)](_0xc3cd75, ..._0x2a01ac);
	}
});
//#endregion
