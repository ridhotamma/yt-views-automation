import { app, BrowserWindow, ipcMain, screen, session } from "electron";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
// ... (rest remains unchanged)

process.env.DIST = join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
	? process.env.DIST
	: join(process.env.DIST, "../public");

app.setName("Youtumate");

let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

// Register deep link protocol
if (process.defaultApp) {
	if (process.argv.length >= 2) {
		app.setAsDefaultProtocolClient("youtumate", process.execPath, [
			join(process.argv[1]),
		]);
	}
} else {
	app.setAsDefaultProtocolClient("youtumate");
}

let deepLinkUrl = null;

function handleDeepLink(url) {
	if (win && win.webContents) {
		win.webContents.send("deep-link", url);
	} else {
		deepLinkUrl = url;
	}
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", (event, commandLine, workingDirectory) => {
		if (win) {
			if (win.isMinimized()) win.restore();
			win.focus();
			const url = commandLine.find((arg) => arg.startsWith("youtumate://"));
			if (url) {
				handleDeepLink(url);
			}
		}
	});
}

app.on("open-url", (event, url) => {
	event.preventDefault();
	handleDeepLink(url);
});

function createWindow() {
	const primaryDisplay = screen.getPrimaryDisplay();
	const { width, height } = primaryDisplay.workAreaSize;

	const iconPath = join(process.env.VITE_PUBLIC, "/images/favicon.png");

	if (process.platform === "darwin") {
		app.dock.setIcon(iconPath);
	}

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
		win?.webContents.send("main-process-message", new Date().toLocaleString());
		if (deepLinkUrl) {
			win.webContents.send("deep-link", deepLinkUrl);
			deepLinkUrl = null;
		}
	});

	// Intercept Appwrite OAuth navigation
	win.webContents.on("will-navigate", (event, url) => {
		const isExternal = VITE_DEV_SERVER_URL
			? !url.startsWith(VITE_DEV_SERVER_URL)
			: !url.startsWith("file://");

		if (isExternal && url.includes("account/sessions/oauth2")) {
			event.preventDefault();

			const authWin = new BrowserWindow({
				width: 600,
				height: 700,
				webPreferences: {
					nodeIntegration: false,
					contextIsolation: true,
				},
			});

			authWin.loadURL(url);

			const handleRedirect = (e, newUrl) => {
				const isInternal = VITE_DEV_SERVER_URL
					? newUrl.startsWith(VITE_DEV_SERVER_URL)
					: newUrl.startsWith("file://") || newUrl.startsWith("youtumate://");

				if (isInternal) {
					e.preventDefault();
					authWin.close();
					win.reload();
				}
			};

			authWin.webContents.on("will-navigate", handleRedirect);
			authWin.webContents.on("will-redirect", handleRedirect);
		}
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		win.loadFile(join(process.env.DIST, "index.html"));
	}
}

ipcMain.handle("set-proxy", async (event, partition, proxyRules) => {
	try {
		const ses = session.fromPartition(partition);
		await ses.setProxy({ proxyRules });
		console.log(`[Proxy] Set ${proxyRules} for ${partition}`);
		return true;
	} catch (err) {
		console.error(`[Proxy] Failed to set proxy for ${partition}:`, err);
		return false;
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(() => {
	createWindow();
});
