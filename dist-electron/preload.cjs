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
function _0x392a() {
	const _0x37d48a = [
		"2936pMIOzk",
		"2645nIWLeC",
		"send",
		"438814ICzeQg",
		"77MRaHID",
		"1wdzRlu",
		"825590ACfhsa",
		"227064SczMQg",
		"invoke",
		"946488CuoBqS",
		"1346445RXFlsS",
		"7yBohzU",
		"1127130CVrwdF",
		"off"
	];
	_0x392a = function() {
		return _0x37d48a;
	};
	return _0x392a();
}
function _0x2879(_0x37ca15, _0x5d9b95) {
	_0x37ca15 = _0x37ca15 - 457;
	return _0x392a()[_0x37ca15];
}
(function(_0x376ab0, _0x102dfc) {
	const _0x1f70ef = _0x2879, _0x40657c = _0x376ab0();
	while (true) try {
		if (parseInt(_0x1f70ef(462)) / 1 * (parseInt(_0x1f70ef(460)) / 2) + parseInt(_0x1f70ef(464)) / 3 + -parseInt(_0x1f70ef(457)) / 4 * (parseInt(_0x1f70ef(458)) / 5) + parseInt(_0x1f70ef(469)) / 6 * (-parseInt(_0x1f70ef(468)) / 7) + parseInt(_0x1f70ef(466)) / 8 + -parseInt(_0x1f70ef(467)) / 9 + -parseInt(_0x1f70ef(463)) / 10 * (-parseInt(_0x1f70ef(461)) / 11) === _0x102dfc) break;
		else _0x40657c["push"](_0x40657c["shift"]());
	} catch (_0x235299) {
		_0x40657c["push"](_0x40657c["shift"]());
	}
})(_0x392a, 265573);
import_electron.contextBridge["exposeInMainWorld"]("ipcRenderer", {
	"on"(..._0x1e23f0) {
		const [_0x1124ef, _0x30a377] = _0x1e23f0;
		return import_electron.ipcRenderer["on"](_0x1124ef, (_0x4dfbbd, ..._0x3145a2) => _0x30a377(_0x4dfbbd, ..._0x3145a2));
	},
	"off"(..._0x1e018a) {
		const _0x315ac1 = _0x2879, [_0x11812d, ..._0x45b01d] = _0x1e018a;
		return import_electron.ipcRenderer[_0x315ac1(470)](_0x11812d, ..._0x45b01d);
	},
	"send"(..._0x2fd51c) {
		const _0x290717 = _0x2879, [_0x239d41, ..._0x2b19b4] = _0x2fd51c;
		return import_electron.ipcRenderer[_0x290717(459)](_0x239d41, ..._0x2b19b4);
	},
	"invoke"(..._0x37eb9d) {
		const _0x209b0f = _0x2879, [_0x1b9117, ..._0x1e9c33] = _0x37eb9d;
		return import_electron.ipcRenderer[_0x209b0f(465)](_0x1b9117, ..._0x1e9c33);
	}
});
//#endregion
