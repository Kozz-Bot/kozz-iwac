import { ElectronAPI } from '@electron-toolkit/preload';
import { EventArgs } from '../main/BaileysCommunication';

type EventHandler<EvName extends keyof EventArgs> =
	EventArgs[EvName] extends undefined
		? (name: EvName) => any
		: (name: EvName, args: EventArgs[EvName]) => any;

declare global {
	interface Window {
		electron: ElectronAPI & {
			ipcRenderer: {
				send: <EvName extends keyof EventArgs>(
					name: EvName,
					args: EventArgs[EvName]
				) => any;
			};
		};
		sendEvent: <EvName extends keyof EventArgs>(
			...args: EventArgs[EvName] extends undefined
				? [evName: EvName]
				: [evName: EvName, args: EventArgs[EvName]]
		) => any;
	}
}
