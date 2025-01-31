import { getThemed } from '@renderer/theme';
import styled from 'styled-components';

export const FullScreenContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: linear-gradient(
		to bottom,
		${getThemed('greenBackground')},
		${getThemed('darkGreenBackground')}
	);
`;

export const Header = styled.header`
	height: 20%;
	padding: 20px;
	background-color: transparent;
	color: ${getThemed('lightText')};
	text-align: center;
`;

export const Title = styled.h1`
	font-size: 2.5em;
	margin-bottom: 0.5em;
`;

export const Subtitle = styled.h2`
	font-size: 1.5em;
`;

export const LoadingMessage = styled.p`
	font-size: 1.2em;
	color: ${getThemed('textDecoration')};
	text-align: center;
	margin-top: 20px;
`;

export const QrCodeContainer = styled.div`
	min-width: 480px;
	min-height: 480px;
	padding: 1.5rem;
	border: 4px solid ${getThemed('blueBorderColor')};
	border-radius: 15px;
	background: ${getThemed('whiteBackground')};
	box-shadow: 8px 8px 8px ${getThemed('blueBorderColor')};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 16px;
`;

export const InstructionText = styled.p`
	font-size: 1.2em;
	color: ${getThemed('lightText')};
	text-align: center;
	margin-top: 20px;
`;

export const Center = styled.div`
	min-width: 480px;
	min-height: 480px;

	height: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
