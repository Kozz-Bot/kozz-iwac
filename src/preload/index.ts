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

let evIndex = 0;

contextBridge.exposeInMainWorld('onEvent', ({ evName, callback }) => {
	const evId = `${evName}-${evIndex++}`;

	const handler = (_event, value) => {
		callback(value);
	};

	handler.evId = evId;

	ipcRenderer.on(evName, handler);

	return evId;
});

contextBridge.exposeInMainWorld('offEvent', (evId: string) => {
	const [evType] = evId.split('-');

	console.log('removing listener for evId', evId);

	const handler = ipcRenderer
		.listeners(evType)
		//@ts-ignore
		.find(handler => handler.evId === evId);
	if (!handler) {
		return;
	}

	//@ts-ignore
	ipcRenderer.removeListener(evType, handler);
});

contextBridge.exposeInMainWorld(
	'sendEvent',
	(evType: string, evName: string, data: any) => {
		ipcRenderer.send(evType, { name: evName, data });
	}
);
