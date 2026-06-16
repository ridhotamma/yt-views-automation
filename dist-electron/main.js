import { BrowserWindow, app, screen } from "electron";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
//#region electron/main.js
var __dirname = dirname(fileURLToPath(import.meta.url));
process.env.DIST = join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
	? process.env.DIST
	: join(process.env.DIST, "../public");
app.setName("Youtumate");
var win;
var VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
if (process.defaultApp) {
	if (process.argv.length >= 2)
		app.setAsDefaultProtocolClient("youtumate", process.execPath, [
			join(process.argv[1]),
		]);
} else app.setAsDefaultProtocolClient("youtumate");
var deepLinkUrl = null;
function handleDeepLink(url) {
	if (win && win.webContents) win.webContents.send("deep-link", url);
	else deepLinkUrl = url;
}
if (!app.requestSingleInstanceLock()) app.quit();
else
	app.on("second-instance", (event, commandLine, workingDirectory) => {
		if (win) {
			if (win.isMinimized()) win.restore();
			win.focus();
			const url = commandLine.find((arg) => arg.startsWith("youtumate://"));
			if (url) handleDeepLink(url);
		}
	});
app.on("open-url", (event, url) => {
	event.preventDefault();
	handleDeepLink(url);
});
function createWindow() {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const iconPath = join(process.env.VITE_PUBLIC, "/images/favicon.png");
	if (process.platform === "darwin") app.dock.setIcon(iconPath);
	win = new BrowserWindow({
		width: Math.floor(width / 2),
		height: Math.floor(height * 0.9),
		minWidth: Math.floor(width / 2),
		minHeight: 600,
		icon: iconPath,
		webPreferences: {
			preload: join(__dirname, "preload.mjs"),
			webviewTag: true,
		},
	});
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send(
			"main-process-message",
			/* @__PURE__ */ new Date().toLocaleString(),
		);
		if (deepLinkUrl) {
			win.webContents.send("deep-link", deepLinkUrl);
			deepLinkUrl = null;
		}
	});
	if (VITE_DEV_SERVER_URL) win.loadURL(VITE_DEV_SERVER_URL);
	else win.loadFile(join(process.env.DIST, "index.html"));
}
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.whenReady().then(() => {
	createWindow();
});
//#endregion
export {};
