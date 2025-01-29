import { listenEvent } from '@renderer/hooks/useEvent';
import { useNavigation } from '@renderer/hooks/UseNavigation';
import React from 'react';

const Home: React.FC = () => {
	const { navigate } = useNavigation();

	listenEvent('iwacData', data => {
		console.log(data);
	});

	// listenEvent('testEv', data => {
	// 	console.log(data);
	// });

	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<p>This is a sample home page for your application.</p>
			<button onClick={() => navigate('settings')}>Go to Settings</button>
		</div>
	);
};

export default Home;
