import { useEffect } from 'react';

function App(): JSX.Element {
	useEffect(() => {
		window.sendEvent = window.electron.ipcRenderer.send;
	}, []);

	const ipcHandle = (): void => {
		window.sendEvent('isInstalled', 'ffmpeg');
	};

	useEffect(() => {
		window.onTestEvent((ev, value) => {
			console.log({ ev, value });
		});
	}, []);

	return (
		<>
			<h1>Hello, world!</h1>
			<button onClick={ipcHandle}>Teste</button>
			<button onClick={() => console.log(window)}>Log window</button>
		</>
	);
}

export default App;
