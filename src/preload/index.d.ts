import { ElectronAPI } from '@electron-toolkit/preload';
import { EventArgs } from '../main/BaileysCommunication';

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
				? [evType: string, evName: EvName]
				: [evType: string, evName: EvName, EventArgs[EvName]]
		) => any;

		onEvent: (evData: { evName: string; callback: (data: any) => void }) => string;

		offEvent: (evId: string) => void;
	}
}
