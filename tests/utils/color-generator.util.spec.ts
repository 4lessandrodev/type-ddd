import { colorGenerator } from '../../lib/utils/color-generator.util';
import HEXColorValueObject from '../../lib/utils/hex-color.value-object';
import { RGBColorValueObject } from '../../lib/utils/rgb-color.value-object';

describe('color-generator', () => {
	it('should be defined', () => {
		const generator = colorGenerator;
		expect(generator).toBeDefined();
	});

	it('should has two functions', () => {
		const randomHEX = colorGenerator.randomHEX;
		const randomRGB = colorGenerator.randomRGB;

		expect(randomRGB).toBeDefined();
		expect(randomHEX).toBeDefined();
	});

	it('should generate a random valid RGB color', () => {
		const randomRGB = colorGenerator.randomRGB();
		const isValid = RGBColorValueObject.isValidProps(randomRGB);
		expect(isValid).toBeTruthy();
	});

	it('should generate a random valid HEX color', () => {
		const randomHEX = colorGenerator.randomHEX();
		const isValid = HEXColorValueObject.isValidProps(randomHEX);
		expect(isValid).toBeTruthy();
	});

	it('should generate colors with 6 char length', () => {
		const colors: string[] = [];
		let i = 0;
		while (i < 100) {
			const randomHEX = colorGenerator.randomHEX();
			colors.push(randomHEX);
			i++;
		}
		while (i > 1) {
			const colorLength = colors[i - 1].length;
			expect(colorLength).toBe(7);
			i--;
		}
	});

	it('should generate colors rgb pattern', () => {
		const colors: string[] = [];
		let i = 0;
		while (i < 100) {
			const randomRGB = colorGenerator.randomRGB();
			colors.push(randomRGB);
			i++;
		}
		while (i > 1) {
			const color = colors[i - 1];
			expect(color).toMatch(
				/^rgb\((\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\,\s(\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\,\s(\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\)/,
			);
			i--;
		}
	});
});
