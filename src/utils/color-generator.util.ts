import colorConverter from "./color-converter.util";

type IRGB = {
	R: number;
	G: number;
	B: number;
}

const randomRGBColor = ():IRGB =>{
	return {
		R: Math.floor(Math.random() * 255),
		B: Math.floor(Math.random() * 255),
		G: Math.floor(Math.random() * 255)
	}
}

const colorGenerator = {
	randomRGB(){
		const color = randomRGBColor();
		return `rgb(${color.R}, ${color.G}, ${color.B})`;
	},
	randomHEX(){
		const color = randomRGBColor();
		let hexColor = colorConverter.RGBToHEX(`rgb(${color.R}, ${color.G}, ${color.B})`);
		hexColor += '000';
		return hexColor.slice(0, 7);
	}
}

export { colorGenerator };
export default colorGenerator;
