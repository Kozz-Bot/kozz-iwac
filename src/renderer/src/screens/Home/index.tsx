import { useForwardableEvent } from '@renderer/hooks/listenForwardableEvent';
import { useChat } from '@renderer/hooks/useChat';
import { listenEvent } from '@renderer/hooks/useEvent';
import { useNavigation } from '@renderer/hooks/UseNavigation';
import React, { useEffect } from 'react';

const Home: React.FC = () => {
	const { navigate } = useNavigation();
	const { init } = useChat();

	const onQr = (qr: string) => {
		console.log('GOT QR', qr);
	};

	useForwardableEvent('qrcode', onQr);

	listenEvent('kozzIwacIntroduction', payload => {
		init(payload);
	});

	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<p>This is a sample home page for your application.</p>
			<button onClick={() => navigate('settings')}>Go to Settings</button>
		</div>
	);
};

export default Home;
