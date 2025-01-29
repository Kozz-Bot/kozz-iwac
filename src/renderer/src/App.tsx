import { NavigationContext } from './context/NavigationContext';
import Router from './router';

function App(): JSX.Element {
	return (
		<NavigationContext.Provider>
			<Router />
		</NavigationContext.Provider>
	);
}

export default App;
