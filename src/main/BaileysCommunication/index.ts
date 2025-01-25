import { exec } from 'child_process';
import { stderr, stdout } from 'process';
import { BrowserWindow } from 'electron';

const isLibInstalled = async (libName: string) => {
	console.log('getting version of', libName);

	return new Promise((resolve, reject) => {
		exec(`whereis ${libName}`, (error, stdout, stderr) => {
			if (error) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
};

export const createEvents = (mainWindow: BrowserWindow) => {
	const emitTestEvent = () => mainWindow.webContents.send('testEv', 'FooBarCaraioo');

	return {
		emitTestEvent,
	};
};

export type EventHandler<EventName extends keyof EventArgs> = (
	ev: Event,
	args: EventArgs[EventName]
) => any;

export type EventArgs = {
	ping: undefined;
	foo: undefined;
	isInstalled: string;
};

export type EventMap = {
	[key in keyof EventArgs]: EventHandler<key>;
};

export const eventMap: EventMap = {
	ping: () => 'pong',
	foo: () => 'bar',
	isInstalled: (_, libName) => isLibInstalled(libName),
};
