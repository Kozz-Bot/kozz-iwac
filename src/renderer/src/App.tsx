import { NavigationContext } from './context/NavigationContext';
import Router from './router';
import { useEffect } from 'react';

function App(): JSX.Element {
	useEffect(() => {}, []);

	return (
		<NavigationContext.Provider>
			<Router />
		</NavigationContext.Provider>
	);
}

export default App;
