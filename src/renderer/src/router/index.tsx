import TerminalView from '@renderer/components/TerminalView';
import { ChatContext } from '@renderer/context/ChatContext';
import { Routes } from '@renderer/context/NavigationContext';
import { useChat } from '@renderer/hooks/useChat';
import { useNavigation } from '@renderer/hooks/UseNavigation';
import Home from '@renderer/screens/Home';
import Settings from '@renderer/screens/Chat';
import { useForwardableEvent } from '@renderer/hooks/listenForwardableEvent';
import { listenEvent } from '@renderer/hooks/useEvent';

const routeMap: {
	[Route in keyof Routes]: React.FC;
} = {
	home: Home,
	chat: Settings,
};

const Router = () => {
	const { getRoute } = useNavigation();
	const Component = routeMap[getRoute()];
	const { init } = useChat();
	const [_, setChat] = ChatContext.useContext();

	const onQr = (qr: string) => {
		console.log('got QR');
		setChat({
			qrCodeString: qr,
		});
	};

	useForwardableEvent('qrcode', onQr);

	listenEvent('kozzIwacIntroduction', payload => {
		init(payload);
	});

	return (
		<>
			<TerminalView />
			<Component />
		</>
	);
};

export default Router;
