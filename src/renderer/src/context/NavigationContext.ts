import { createContext } from '.';

export const RouteMap = {
	home: null,
	settings: null,
};

export type Routes = typeof RouteMap;

export const NavigationContext = createContext({
	route: 'home' as keyof Routes,
	params: null as Record<string, any> | null,
	history: [] as {
		route: keyof Routes;
		params: Record<string, any> | null;
	}[],
	historyIndex: 0,
});
