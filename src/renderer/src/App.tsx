import { NavigationContext } from './context/NavigationContext';
import { WindowContext } from './context/WindowContext';
import Router from './router';
import { useEffect } from 'react';

function App(): JSX.Element {
	useEffect(() => {}, []);

	return (
		<NavigationContext.Provider>
			<WindowContext.Provider>
				<Router />
			</WindowContext.Provider>
		</NavigationContext.Provider>
	);
}

export default App;
