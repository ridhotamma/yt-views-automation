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
var _0x44bd2a = _0x1f1f;
function _0x1f1f(_0x282762, _0x39a25b) {
	_0x282762 = _0x282762 - 317;
	return _0x1004()[_0x282762];
}
(function(_0xeae0cf, _0x3b6029) {
	const _0x294530 = _0x1f1f, _0x59abe2 = _0xeae0cf();
	while (true) try {
		if (-parseInt(_0x294530(317)) / 1 + -parseInt(_0x294530(329)) / 2 + parseInt(_0x294530(320)) / 3 * (parseInt(_0x294530(327)) / 4) + parseInt(_0x294530(322)) / 5 * (parseInt(_0x294530(326)) / 6) + -parseInt(_0x294530(328)) / 7 * (parseInt(_0x294530(319)) / 8) + -parseInt(_0x294530(323)) / 9 + parseInt(_0x294530(318)) / 10 === _0x3b6029) break;
		else _0x59abe2["push"](_0x59abe2["shift"]());
	} catch (_0xe14d22) {
		_0x59abe2["push"](_0x59abe2["shift"]());
	}
})(_0x1004, 583887);
function _0x1004() {
	const _0x378181 = [
		"send",
		"19938MFFRzB",
		"944RFBvVu",
		"69503ICLhSV",
		"1338420AzgSgU",
		"573534ybDIHb",
		"14426140ZEBMNt",
		"248SNAeXv",
		"2238nrgANS",
		"off",
		"1435UXiPOa",
		"3941469uOqobl",
		"ipcRenderer"
	];
	_0x1004 = function() {
		return _0x378181;
	};
	return _0x1004();
}
import_electron.contextBridge["exposeInMainWorld"](_0x44bd2a(324), {
	"on"(..._0xb8a395) {
		const [_0x2f24a5, _0x3787a8] = _0xb8a395;
		return import_electron.ipcRenderer["on"](_0x2f24a5, (_0x13d198, ..._0x28b5f2) => _0x3787a8(_0x13d198, ..._0x28b5f2));
	},
	"off"(..._0x4b0c64) {
		const _0x6d7957 = _0x44bd2a, [_0x8e9c22, ..._0x20bc10] = _0x4b0c64;
		return import_electron.ipcRenderer[_0x6d7957(321)](_0x8e9c22, ..._0x20bc10);
	},
	"send"(..._0x37d283) {
		const _0x130dc7 = _0x44bd2a, [_0x4d56ed, ..._0x58621c] = _0x37d283;
		return import_electron.ipcRenderer[_0x130dc7(325)](_0x4d56ed, ..._0x58621c);
	},
	"invoke"(..._0x5cb900) {
		const [_0x5bb689, ..._0x1ca5b9] = _0x5cb900;
		return import_electron.ipcRenderer["invoke"](_0x5bb689, ..._0x1ca5b9);
	}
});
//#endregion
