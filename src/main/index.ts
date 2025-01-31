import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { eventMap } from './BaileysCommunication';
import { installIwacBackEnd } from './BaileysCommunication/installIwacBackEnd';
import keytar from 'keytar';

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,
		},
	});

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.webContents.setWindowOpenHandler(details => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}

	return mainWindow;
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId('com.electron');
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	// IPC test
	Object.entries(eventMap).forEach(([evName, handler]) => {
		ipcMain.addListener(evName, async (ev, ...args) => {
			try {
				// @ts-ignore
				const result = await handler(ev, ...args);
				console.log(result);
			} catch (e) {
				console.warn(e);
			}
		});
	});

	const window = createWindow();

	installIwacBackEnd(window);

	window.webContents.openDevTools();

	setTimeout(async () => {
		const payload = await keytar.getPassword('kozz-iwac', 'introduction');

		window.webContents.send('kozzIwacIntroduction', JSON.parse(payload!));
	}, 3000);

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
