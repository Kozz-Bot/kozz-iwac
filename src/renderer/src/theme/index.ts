import { DefaultTheme } from 'styled-components/native';

const colors = {
	darkGray: 'rgb(42,42,42)',
	lightGray: 'rgb(200,200,200)',
	lightBackground: 'rgb(232, 230, 230)',
	yellow: 'rgb(255, 255, 0)',
	darkYellow: 'rgb(204, 204, 0)',
	purple: 'rgb(128, 0, 128)',
	darkPurple: 'rgb(75, 0, 130)',
	black: 'rgb(0, 0, 0)',
	white: 'rgb(255, 255, 255)',
	transparent: 'rgba(0, 0, 0, 0)',
	orange1: 'rgb(57, 0, 0)',
	orange2: 'rgb(75, 0, 0)',
	orange3: 'rgb(93, 5, 0)',
	orange4: 'rgb(111, 20, 0)',
	orange5: 'rgb(129, 35, 0)',
	orange6: 'rgb(147, 50, 0)',
	orange7: 'rgb(165, 65, 0)',
	orange8: 'rgb(183, 80, 0)',
	orange9: 'rgb(201, 95, 0)',
	orange10: 'rgb(219, 110, 0)',
	orange11: 'rgb(237, 125, 0)',
	orange12: 'rgb(255, 140, 0)',
	blue1: 'rgb(0, 0, 64)',
	blue2: 'rgb(0, 0, 76)',
	blue3: 'rgb(0, 0, 89)',
	blue4: 'rgb(0, 0, 102)',
	blue5: 'rgb(0, 0, 115)',
	blue6: 'rgb(0, 0, 128)',
	blue7: 'rgb(13, 13, 128)',
	blue8: 'rgb(26, 26, 128)',
	blue9: 'rgb(39, 39, 128)',
	blue10: 'rgb(51, 51, 128)',
	blue11: 'rgb(64, 64, 128)',
	blue12: 'rgb(76, 76, 128)',
	green1: 'rgb(0, 50, 0)',
	green2: 'rgb(0, 64, 0)',
	green3: 'rgb(0, 76, 0)',
	green4: 'rgb(0, 89, 0)',
	green5: 'rgb(0, 102, 0)',
	green6: 'rgb(0, 115, 0)',
	green7: 'rgb(0, 128, 0)',
	green8: 'rgb(13, 128, 13)',
	green9: 'rgb(26, 128, 26)',
	green10: 'rgb(39, 128, 39)',
	green11: 'rgb(51, 128, 51)',
	green12: 'rgb(64, 128, 64)',
	textLight: 'rgb(228, 228, 228)',
	textDark: 'rgb(20, 20, 20)',
};

type Theme = {
	darkGrayBackground: string;
	greenBackground: string;
	darkGreenBackground: string;
	blueBackground: string;
	darkBlueBackground: string;
	redBackground: string;
	darkRedBackground: string;
	orangeBackground: string;
	darkOrangeBackground: string;
	darkText: string;
	lightText;
	borderColor: string;
	buttonColor: string;
	textEmphasis: string;
	textDecoration: string;
	orangeBorderColor: string;
	blueBorderColor: string;
	whiteBackground: string;
	greenMainColor: string;
	orangeMainColor: string;
	blueMainColor: string;
};

const darkTheme: Theme = {
	darkGrayBackground: colors.darkGray,
	greenBackground: colors.green5,
	darkGreenBackground: colors.green3,
	blueBackground: colors.blue1,
	darkBlueBackground: colors.blue2,
	redBackground: colors.orange10,
	darkRedBackground: colors.orange11,
	orangeBackground: colors.orange1,
	darkOrangeBackground: colors.orange2,
	orangeBorderColor: colors.orange10,
	blueBorderColor: colors.blue1,
	lightText: colors.textLight,
	darkText: colors.textDark,
	borderColor: colors.blue4,
	buttonColor: colors.blue4,
	textEmphasis: colors.blue4,
	textDecoration: colors.darkGray,
	whiteBackground: colors.white,
	greenMainColor: colors.green4,
	orangeMainColor: colors.orange10,
	blueMainColor: colors.blue1,
};

export const getThemed =
	<Attribute extends keyof Theme>(attribute: Attribute) =>
	({ theme }: { theme: DefaultTheme }) => {
		// support for dark mode is something I'll do when we have a designer
		return darkTheme[attribute];
	};

export const getColor = (colorName: keyof typeof colors) => colors[colorName];
export const getColorWithTransparency = (
	colorName: keyof typeof colors,
	opacity: number
) => {
	const colorChannels = colors[colorName].match(/[0-9]+/g)!;
	const [r, g, b] = colorChannels;
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
