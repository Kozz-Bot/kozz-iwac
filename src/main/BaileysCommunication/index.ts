import { BrowserWindow } from 'electron';

export const createEvents = (mainWindow: BrowserWindow) => {
	const emitTestEvent = () =>
		mainWindow.webContents.send('testEv', {
			test: 'aa',
			foo: 'bar',
		});

	return {
		emitTestEvent,
	};
};

export type EventHandler<EventName extends keyof EventArgs> = (
	ev: Event,
	args: EventArgs[EventName]
) => any;

export type EventArgs = {};

export type EventMap = {
	[key in keyof EventArgs]: EventHandler<key>;
};

export const eventMap: EventMap = {};
