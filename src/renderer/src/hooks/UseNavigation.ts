import { NavigationContext, Routes } from '@renderer/context/NavigationContext';

export const useNavigation = () => {
	const [navigation, setNavigation] = NavigationContext.useContext();

	const navigate = <Route extends keyof Routes>(
		...args: Routes[Route] extends null ? [Route] : [Route, Routes[Route]]
	) => {
		const [route, params] = args;

		const newHistory = [
			...navigation.history,
			{
				route,
				params,
			},
		];

		setNavigation({
			route,
			params,
			history: newHistory,
			historyIndex: navigation.historyIndex + 1,
		});
	};

	const goBack = () => {
		if (navigation.historyIndex === 0) {
			return;
		}

		const newIndex = navigation.historyIndex - 1;
		const { route, params } = navigation.history[newIndex];
		setNavigation({
			route,
			params,
			history: navigation.history,
			historyIndex: newIndex,
		});
	};

	const getHistory = () => {
		return navigation.history;
	};

	const getParams = () => {
		return navigation.params;
	};

	const getRoute = () => {
		return navigation.route;
	};

	return {
		navigate,
		goBack,
		getHistory,
		getParams,
		getRoute,
	};
};
