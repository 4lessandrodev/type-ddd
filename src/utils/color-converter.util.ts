import { HEXColorValueObject, RGBColorValueObject } from '..';

const colorConverter = {
	/**
	 *
	 * @description Convert hex color to rgb color. If you provide an invalid value It will return the same value.
	 * @param color hex pattern as string
	 * @example #ffffff
	 * @returns rgb(255, 255, 255)
	 */
	HEXToRGB(color: string) {
		const isValid = HEXColorValueObject.isValidValue(color);

		if (!isValid) {
			return color;
		}

		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);

		const red: number = isNaN(r) ? 0 : r;
		const green: number = isNaN(g) ? 0 : g;
		const blue: number = isNaN(b) ? 0 : b;

		return `rgb(${red}, ${green}, ${blue})`;
	},
	/**
	 *
	 * @description Convert rgb color to hex color. If you provide an invalid value It will return the same value.
	 * @param color rgb pattern as string
	 * @example rgb(255, 255, 255)
	 * @returns hex color #ffffff
	 */
	RGBToHEX(color: string) {
		const isValid = RGBColorValueObject.isValidValue(color);

		if (!isValid) {
			return color;
		}

		const numbers = color.slice(4, color.length - 1).split(',');
		const rgb = numbers.map((n) => n.trim());

		const r = parseInt(rgb[0]).toString(16).toLowerCase();
		const g = parseInt(rgb[1]).toString(16).toLowerCase();
		const b = parseInt(rgb[2]).toString(16).toLowerCase();

		const red = r === '0' ? '00' : r;
		const green = g === '0' ? '00' : g;
		const blue = b === '0' ? '00' : b;

		return `#${red}${green}${blue}`;
	},
};

export { colorConverter };
export default colorConverter;
