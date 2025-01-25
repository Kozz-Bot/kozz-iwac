import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {};

const expose = (key: string, value: any) => {
	try {
		if (process.contextIsolated) {
			contextBridge.exposeInMainWorld(key, value);
		} else {
			window[key] = value;
		}
	} catch (e) {
		console.warn(`Error while trying to expose API ${key}: ${e}`);
	}
};

expose('electron', electronAPI);
expose('api', api);

contextBridge.exposeInMainWorld('onTestEvent', callback =>
	ipcRenderer.on('testEv', (_event, value) => callback(value))
);
