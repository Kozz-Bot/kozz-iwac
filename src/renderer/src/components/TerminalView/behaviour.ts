import { WindowContext } from '@renderer/context/WindowContext';
import { listenEvent } from '@renderer/hooks/useEvent';
import { useState } from 'react';

export const useSidebarBehavior = () => {
	const [lines, setLines] = useState<string[]>([]);
	const [windowContext, setWindowContext] = WindowContext.useContext();

	const sidebarOpen = windowContext.sidebarOpen;

	listenEvent('iwacData', (data: string) => {
		const lines = data.split('\n');

		setLines(oldLines => [...oldLines, ...lines]);
	});

	return { lines, sidebarOpen };
};
