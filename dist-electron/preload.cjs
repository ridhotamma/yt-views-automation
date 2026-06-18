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
function _0x1675(_0x2f0cb7, _0x511635) {
	_0x2f0cb7 = _0x2f0cb7 - 332;
	return _0x542d()[_0x2f0cb7];
}
var _0x38ce37 = _0x1675;
(function(_0x21abb4, _0x43fdc0) {
	const _0x3b48f2 = _0x1675, _0x50059d = _0x21abb4();
	while (true) try {
		if (parseInt(_0x3b48f2(333)) / 1 * (parseInt(_0x3b48f2(334)) / 2) + -parseInt(_0x3b48f2(332)) / 3 + parseInt(_0x3b48f2(338)) / 4 * (parseInt(_0x3b48f2(339)) / 5) + parseInt(_0x3b48f2(337)) / 6 * (parseInt(_0x3b48f2(335)) / 7) + -parseInt(_0x3b48f2(342)) / 8 + parseInt(_0x3b48f2(344)) / 9 + parseInt(_0x3b48f2(340)) / 10 * (parseInt(_0x3b48f2(341)) / 11) === _0x43fdc0) break;
		else _0x50059d["push"](_0x50059d["shift"]());
	} catch (_0x2a440d) {
		_0x50059d["push"](_0x50059d["shift"]());
	}
})(_0x542d, 653076);
import_electron.contextBridge[_0x38ce37(336)]("ipcRenderer", {
	"on"(..._0x18ffec) {
		const [_0x94f78d, _0x2c7e96] = _0x18ffec;
		return import_electron.ipcRenderer["on"](_0x94f78d, (_0x2b09d7, ..._0x4019be) => _0x2c7e96(_0x2b09d7, ..._0x4019be));
	},
	"off"(..._0x208ce1) {
		const [_0x548d3a, ..._0x5176c5] = _0x208ce1;
		return import_electron.ipcRenderer["off"](_0x548d3a, ..._0x5176c5);
	},
	"send"(..._0x1055f8) {
		const [_0x234536, ..._0x2cc21e] = _0x1055f8;
		return import_electron.ipcRenderer["send"](_0x234536, ..._0x2cc21e);
	},
	"invoke"(..._0x128db0) {
		const _0x2a790f = _0x38ce37, [_0x4fdf9e, ..._0x148527] = _0x128db0;
		return import_electron.ipcRenderer[_0x2a790f(343)](_0x4fdf9e, ..._0x148527);
	}
});
function _0x542d() {
	const _0x11b66c = [
		"2krYPxO",
		"7EEvKZW",
		"exposeInMainWorld",
		"1317510MyHxfS",
		"192784dQeXwm",
		"55PmBTWm",
		"10VTsiQs",
		"3996399TioefA",
		"8826392BQXZah",
		"invoke",
		"3480138AEmGQV",
		"359376tMezfE",
		"376435sReqaF"
	];
	_0x542d = function() {
		return _0x11b66c;
	};
	return _0x542d();
}
//#endregion
