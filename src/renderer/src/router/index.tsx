import TerminalView from '@renderer/components/TerminalView';
import { Routes } from '@renderer/context/NavigationContext';
import { useNavigation } from '@renderer/hooks/UseNavigation';
import Home from '@renderer/screens/Home';
import Settings from '@renderer/screens/Settings';

const routeMap: {
	[Route in keyof Routes]: React.FC;
} = {
	home: Home,
	settings: Settings,
};

const Router = () => {
	const { getRoute } = useNavigation();

	const Component = routeMap[getRoute()];

	return (
		<>
			<TerminalView />
			<Component />
		</>
	);
};

export default Router;
