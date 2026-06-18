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
var _0x412c62 = _0x3234;
(function(_0xf8775f, _0x25a4f4) {
	const _0x1c519a = _0x3234, _0x7633d0 = _0xf8775f();
	while (true) try {
		if (-parseInt(_0x1c519a(103)) / 1 + parseInt(_0x1c519a(109)) / 2 + -parseInt(_0x1c519a(108)) / 3 + -parseInt(_0x1c519a(105)) / 4 * (parseInt(_0x1c519a(112)) / 5) + -parseInt(_0x1c519a(115)) / 6 + -parseInt(_0x1c519a(110)) / 7 * (-parseInt(_0x1c519a(104)) / 8) + parseInt(_0x1c519a(114)) / 9 * (parseInt(_0x1c519a(113)) / 10) === _0x25a4f4) break;
		else _0x7633d0["push"](_0x7633d0["shift"]());
	} catch (_0x633fb1) {
		_0x7633d0["push"](_0x7633d0["shift"]());
	}
})(_0x4859, 632295);
function _0x3234(_0x621417, _0xe60bbc) {
	_0x621417 = _0x621417 - 103;
	return _0x4859()[_0x621417];
}
import_electron.contextBridge[_0x412c62(116)](_0x412c62(111), {
	"on"(..._0xc5cbef) {
		const [_0x168b69, _0x337981] = _0xc5cbef;
		return import_electron.ipcRenderer["on"](_0x168b69, (_0x229386, ..._0x47f912) => _0x337981(_0x229386, ..._0x47f912));
	},
	"off"(..._0x3464de) {
		const _0x415449 = _0x412c62, [_0x31ef76, ..._0xad5572] = _0x3464de;
		return import_electron.ipcRenderer[_0x415449(107)](_0x31ef76, ..._0xad5572);
	},
	"send"(..._0x9887f3) {
		const _0x1325c2 = _0x412c62, [_0x1a28a4, ..._0xed39f4] = _0x9887f3;
		return import_electron.ipcRenderer[_0x1325c2(106)](_0x1a28a4, ..._0xed39f4);
	},
	"invoke"(..._0x45bac0) {
		const [_0x1884d2, ..._0xb62b9e] = _0x45bac0;
		return import_electron.ipcRenderer["invoke"](_0x1884d2, ..._0xb62b9e);
	}
});
function _0x4859() {
	const _0x481b4a = [
		"253012dhYMOG",
		"send",
		"off",
		"3364674cHIdqA",
		"1309406AwzAfJ",
		"14OieWOV",
		"ipcRenderer",
		"90wlbRJq",
		"2314910OtMoFh",
		"63dVBSDw",
		"216720ZjpYUc",
		"exposeInMainWorld",
		"552215DWIvMc",
		"4822408eObIKl"
	];
	_0x4859 = function() {
		return _0x481b4a;
	};
	return _0x4859();
}
//#endregion
