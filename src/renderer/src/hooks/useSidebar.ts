import { WindowContext } from '@renderer/context/WindowContext';

export const useSidebar = () => {
	const [_, setWindowContext] = WindowContext.useContext();

	const openSidebar = () => {
		setWindowContext({
			sidebarOpen: true,
		});
	};

	const closeSidebar = () => {
		setWindowContext({
			sidebarOpen: false,
		});
	};

	return {
		openSidebar,
		closeSidebar,
	};
};
