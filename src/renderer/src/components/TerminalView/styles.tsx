import styled from 'styled-components';

export const Container = styled.div<{ open: boolean }>`
	display: flex;
	position: absolute;
	flex-direction: column;
	height: 100%;
	width: 80vw;
	transition: all 0.2s;
	background-color: red;

	left: ${({ open }) => (open ? '0px' : '-80vw')};
	overflow: scroll;
`;

export const Line = styled.span`
	background-color: #2c2c2c;
	color: #e0e0e0;
	font-size: 14px;
	font-family: 'monospace';
`;
