import { BrowserWindow as e, app as t, ipcMain as n, screen as r, session as i } from "electron";
import { dirname as a, join as o } from "node:path";
import { fileURLToPath as s } from "node:url";
//#region electron/main.js
var c = a(s(import.meta.url));
process.env.DIST = o(c, "../dist"), process.env.VITE_PUBLIC = t.isPackaged ? process.env.DIST : o(process.env.DIST, "../public"), t.setName("Youtumate");
var l, u = process.env.VITE_DEV_SERVER_URL;
process.defaultApp ? process.argv.length >= 2 && t.setAsDefaultProtocolClient("youtumate", process.execPath, [o(process.argv[1])]) : t.setAsDefaultProtocolClient("youtumate");
var d = null;
function f(e) {
	l && l.webContents ? l.webContents.send("deep-link", e) : d = e;
}
t.requestSingleInstanceLock() ? t.on("second-instance", (e, t, n) => {
	if (l) {
		l.isMinimized() && l.restore(), l.focus();
		let e = t.find((e) => e.startsWith("youtumate://"));
		e && f(e);
	}
}) : t.quit(), t.on("open-url", (e, t) => {
	e.preventDefault(), f(t);
});
function p() {
	let { width: n, height: i } = r.getPrimaryDisplay().workAreaSize, a = o(process.env.VITE_PUBLIC, "/images/favicon.png");
	process.platform === "darwin" && t.dock.setIcon(a), l = new e({
		width: Math.floor(n / 2),
		height: Math.floor(i * .9),
		minWidth: Math.floor(n / 2),
		minHeight: 600,
		icon: a,
		webPreferences: {
			preload: o(c, "preload.mjs"),
			webviewTag: !0
		}
	}), l.webContents.on("did-finish-load", () => {
		l?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString()), d &&= (l.webContents.send("deep-link", d), null);
	}), l.webContents.on("will-navigate", (t, n) => {
		if ((u ? !n.startsWith(u) : !n.startsWith("file://")) && n.includes("account/sessions/oauth2")) {
			t.preventDefault();
			let r = new e({
				width: 600,
				height: 700,
				webPreferences: {
					nodeIntegration: !1,
					contextIsolation: !0
				}
			});
			r.loadURL(n);
			let i = (e, t) => {
				(u ? t.startsWith(u) : t.startsWith("file://") || t.startsWith("youtumate://")) && (e.preventDefault(), r.close(), l.reload());
			};
			r.webContents.on("will-navigate", i), r.webContents.on("will-redirect", i);
		}
	}), u ? l.loadURL(u) : l.loadFile(o(process.env.DIST, "index.html"));
}
n.handle("set-proxy", async (e, t, n) => {
	try {
		return await i.fromPartition(t).setProxy({ proxyRules: n }), console.log(`[Proxy] Set ${n} for ${t}`), !0;
	} catch (e) {
		return console.error(`[Proxy] Failed to set proxy for ${t}:`, e), !1;
	}
}), t.on("window-all-closed", () => {
	process.platform !== "darwin" && (t.quit(), l = null);
}), t.on("activate", () => {
	e.getAllWindows().length === 0 && p();
}), t.whenReady().then(() => {
	p();
});
//#endregion
export {};
