import React from 'react';
import { useSidebarBehavior } from './behaviour';
import { Container, Line } from './styles';

const TerminalView: React.FC = () => {
	const { lines, sidebarOpen } = useSidebarBehavior();

	return (
		<Container open={sidebarOpen}>
			{lines.map(line => (
				<Line>{line}</Line>
			))}
		</Container>
	);
};

export default TerminalView;
