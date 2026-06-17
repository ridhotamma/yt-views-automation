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
var _0x90640b = _0x5a9c;
function _0x5ba2() {
	const _0x32a761 = [
		"mJmWodeYnvbry0HnqW",
		"mty5otvqCw52v2O",
		"mZK1mZyXnKrSuxzdwa",
		"ntm1odK1mK5kEKr6Ba",
		"nJK2CfPvqunv",
		"mJa0nJbjALrRv3e",
		"ntqWmtjfvLnnDLO",
		"mtbpqunJuMq",
		"B2zM",
		"AxbJuMvUzgvYzxi",
		"mte4BuLiA2Dv",
		"mti1mtjMtuTfvgq",
		"nwPOA3nmDW",
		"zxHWB3nLsw5nywLUv29YBgq",
		"Aw52B2TL",
		"oty0ote1mNndA291uq"
	];
	_0x5ba2 = function() {
		return _0x32a761;
	};
	return _0x5ba2();
}
(function(_0x30e3fe, _0x3769ba) {
	const _0xa232c1 = _0x5a9c, _0x1eea47 = _0x30e3fe();
	while (true) try {
		if (-parseInt(_0xa232c1(212)) / 1 * (parseInt(_0xa232c1(211)) / 2) + -parseInt(_0xa232c1(201)) / 3 + parseInt(_0xa232c1(203)) / 4 * (-parseInt(_0xa232c1(213)) / 5) + parseInt(_0xa232c1(205)) / 6 * (parseInt(_0xa232c1(207)) / 7) + parseInt(_0xa232c1(204)) / 8 + -parseInt(_0xa232c1(200)) / 9 * (parseInt(_0xa232c1(208)) / 10) + -parseInt(_0xa232c1(202)) / 11 * (-parseInt(_0xa232c1(206)) / 12) === _0x3769ba) break;
		else _0x1eea47["push"](_0x1eea47["shift"]());
	} catch (_0x59de20) {
		_0x1eea47["push"](_0x1eea47["shift"]());
	}
})(_0x5ba2, 631035);
function _0x5a9c(_0x241a27, _0x131dee) {
	_0x241a27 = _0x241a27 - 199;
	const _0x5ba23b = _0x5ba2();
	let _0x5a9cc5 = _0x5ba23b[_0x241a27];
	if (_0x5a9c["wsYSUN"] === void 0) {
		var _0x3d6b95 = function(_0x1411a9) {
			const _0x13abaa = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
			let _0x5bbb2f = "", _0x514480 = "";
			for (let _0x49a3b9 = 0, _0xacc9bc, _0x4429aa, _0x26b812 = 0; _0x4429aa = _0x1411a9["charAt"](_0x26b812++); ~_0x4429aa && (_0xacc9bc = _0x49a3b9 % 4 ? _0xacc9bc * 64 + _0x4429aa : _0x4429aa, _0x49a3b9++ % 4) && (_0x5bbb2f += String["fromCharCode"](255 & _0xacc9bc >> (-2 * _0x49a3b9 & 6)))) _0x4429aa = _0x13abaa["indexOf"](_0x4429aa);
			for (let _0x6fe9e2 = 0, _0x5116fd = _0x5bbb2f["length"]; _0x6fe9e2 < _0x5116fd; _0x6fe9e2++) _0x514480 += "%" + ("00" + _0x5bbb2f["charCodeAt"](_0x6fe9e2)["toString"](16))["slice"](-2);
			return decodeURIComponent(_0x514480);
		};
		_0x5a9c["mMPqiC"] = _0x3d6b95, _0x5a9c["TvUZfz"] = {}, _0x5a9c["wsYSUN"] = true;
	}
	const _0x56abed = _0x5ba23b[0], _0x122ad6 = _0x241a27 + _0x56abed, _0x4dd3c2 = _0x5a9c["TvUZfz"][_0x122ad6];
	return !_0x4dd3c2 ? (_0x5a9cc5 = _0x5a9c["mMPqiC"](_0x5a9cc5), _0x5a9c["TvUZfz"][_0x122ad6] = _0x5a9cc5) : _0x5a9cc5 = _0x4dd3c2, _0x5a9cc5;
}
import_electron.contextBridge[_0x90640b(214)](_0x90640b(210), {
	"on"(..._0x2d4f4f) {
		const [_0x5842f6, _0x57dd81] = _0x2d4f4f;
		return import_electron.ipcRenderer["on"](_0x5842f6, (_0x3b917a, ..._0x43e105) => _0x57dd81(_0x3b917a, ..._0x43e105));
	},
	"off"(..._0x28e018) {
		const _0x943b5a = _0x90640b, [_0x560c81, ..._0x32fad8] = _0x28e018;
		return import_electron.ipcRenderer[_0x943b5a(209)](_0x560c81, ..._0x32fad8);
	},
	"send"(..._0x2f7b7f) {
		const [_0x31c6e9, ..._0x52606d] = _0x2f7b7f;
		return import_electron.ipcRenderer["send"](_0x31c6e9, ..._0x52606d);
	},
	"invoke"(..._0x45dec7) {
		const _0x324fa8 = _0x90640b, [_0xe7038a, ..._0x29ab30] = _0x45dec7;
		return import_electron.ipcRenderer[_0x324fa8(199)](_0xe7038a, ..._0x29ab30);
	}
});
//#endregion
