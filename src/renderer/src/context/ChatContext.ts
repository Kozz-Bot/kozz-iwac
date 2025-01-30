import { Introduction } from 'kozz-types';
import { createContext } from '.';
import { Socket } from 'socket.io-client';

export const ChatContext = createContext({
	introductionPayload: null as Introduction | null,
	socket: null as null | Socket,
});
