import colorConverter from './color-converter.util';

type RGB = {
	R: number;
	G: number;
	B: number;
};

const randomRGBColor = (): RGB => {
	const colorR = Math.floor(Math.random() * 255);
	const colorB = Math.floor(Math.random() * 255);
	const colorG =
		colorB > 100 && colorR > 100
			? Math.floor(Math.random() * 100)
			: Math.floor(Math.random() * 255);
	return {
		R: colorR,
		G: colorG,
		B: colorB,
	};
};

const colorGenerator = {
	randomRGB() {
		const color = randomRGBColor();
		return `rgb(${color.R}, ${color.G}, ${color.B})`;
	},
	randomHEX() {
		const color = randomRGBColor();
		let hexColor = colorConverter.RGBToHEX(
			`rgb(${color.R}, ${color.G}, ${color.B})`,
		);
		hexColor += '000';
		return hexColor.slice(0, 7);
	},
};

export { colorGenerator };
export default colorGenerator;
