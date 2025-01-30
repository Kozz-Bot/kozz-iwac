import { io } from 'socket.io-client';
import { EventDispatchMap, EventMap, Introduction_Ack } from '@renderer/models/Kozz';
import { ChatContext } from '@renderer/context/ChatContext';
import { Introduction } from 'kozz-types';

export const useChat = () => {
	const [chat, setChat] = ChatContext.useContext();

	const init = async (payload: Introduction) => {
		let socket = io('ws://localhost:4521');

		socket.on('connect', () => {
			socket.emit('introduction', payload);
		});

		socket.on('introduction_ack', (payload: Introduction_Ack) => {
			if (!payload.success) {
				console.log(`[CHAT]: NOT CONNECTED`, payload);
			} else {
				console.log(`[CHAT]: CONNECTED`);
				setChat({
					socket: socket,
				});
			}
		});

		socket.on('disconnect', (reason, details) => {
			if (reason !== 'io client disconnect' && reason !== 'io server disconnect') {
				console.warn('[SOCKET DISCONNECTED]', { reason, details });
				init(payload);
			} else {
				console.error('[SOCKET DISCONNECTED]', { reason, details });
			}
		});
	};

	const addEventHandler = <EventName extends keyof EventMap>(
		eventName: EventName,
		handler: (payload: EventMap[EventName]) => any
	) => {
		console.log('ADDING HANDLER FOR EVENT', eventName);
		chat.socket?.on(eventName as string, handler!);
		return handler;
	};

	const removeEventHandler = <EventName extends keyof EventMap>(
		eventName: EventName,
		handler: (payload: EventMap[EventName]) => any
	) => {
		console.log('REMOVING HANDLER FOR EVENT ' + eventName, { handler });
		chat.socket?.off(eventName as string, handler);
		return handler;
	};

	const getEventHandler = <EventName extends keyof EventMap>(
		eventName: EventName
	): EventMap[EventName][] => {
		return chat.socket?.listeners(eventName) as EventMap[EventName][];
	};

	const disconnect = () => chat.socket?.disconnect();

	const emitEvent = <EventName extends keyof EventDispatchMap>(
		eventName: EventName,
		payload: EventDispatchMap[EventName]
	) => {
		chat.socket?.emit(eventName, payload);
	};

	return {
		getEventHandler,
		addEventHandler,
		removeEventHandler,
		disconnect,
		init,
		emitEvent,
	};
};
