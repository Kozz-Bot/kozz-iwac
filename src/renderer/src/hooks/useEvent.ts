import { useCallback, useEffect } from 'react';
import { EventArgs } from 'src/main/BaileysCommunication';

export const listenEvent = (evName: string, callback: (data: any) => void) => {
	useEffect(() => {
		const evId = window.onEvent({
			evName,
			callback,
		});
		console.log('listening to event', evId);

		return () => {
			console.log('stopped listening to event', evId);
			window.offEvent(evId);
		};
	}, []);
};

export const useEvent = <EvName extends keyof EventArgs>(
	...args: EventArgs[EvName] extends undefined
		? [evType: string, evName: EvName]
		: [evType: string, evName: EvName, EventArgs[EvName]]
) => {
	const sender = useCallback(() => {
		const [evType, evName, data] = args;
		// @ts-ignore
		window.sendEvent(evType, evName, data);
	}, [...args]);

	return {
		dispatchEvent: sender,
	};
};
