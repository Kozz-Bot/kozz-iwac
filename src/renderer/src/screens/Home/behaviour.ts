import { ChatContext } from '@renderer/context/ChatContext';
import { useForwardableEvent } from '@renderer/hooks/listenForwardableEvent';
import { useNavigation } from '@renderer/hooks/UseNavigation';

export const useHomeScreenBehaviour = () => {
	const { navigate } = useNavigation();
	const [chat] = ChatContext.useContext();

	const qrCodeString = chat.qrCodeString;

	const goToChat = () => navigate('chat');

	useForwardableEvent('chatready', () => {
		goToChat();
	});

	return {
		qrCodeString,
	};
};
