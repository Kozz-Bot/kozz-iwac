import { createContext } from '.';
import { Socket } from 'socket.io-client';

export const ChatContext = createContext({
	socket: null as null | Socket,
	qrCodeString: null as null | string,
	ready: false,
});
