import { ForwardableEvent, ForwardedEvent } from '@renderer/models/Kozz';
import { useChat } from './useChat';
import { useCallback, useEffect } from 'react';
import { ChatContext } from '@renderer/context/ChatContext';

/**
 * Listens to a forwardable event. Automatically request the forwarding of
 * the event to the gateway
 * @param evName
 * @param handler
 */
export const useForwardableEvent = <EventName extends keyof ForwardableEvent>(
	evName: EventName,
	handler: (data: ForwardedEvent<EventName>['payload']) => any
) => {
	const [chat] = ChatContext.useContext();

	const { addEventHandler, emitEvent } = useChat();

	const forwardableEventHandler = useCallback((event: ForwardedEvent<EventName>) => {
		console.log(event);
		const { eventName, payload } = event;

		if (evName === eventName) {
			handler(payload);
		}
	}, []);

	useEffect(() => {
		if (!chat.ready) {
			return;
		}

		emitEvent('event_forward_request', {
			sourceId: 'kozz-baileys',
			eventName: evName,
			destination: {
				id: 'kozz-iwac',
				type: 'Handler',
			},
		});

		const _evHandler = addEventHandler('forwarded_event', forwardableEventHandler);
	}, [chat.ready]);
};
