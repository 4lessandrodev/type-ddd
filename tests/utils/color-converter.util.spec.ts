import { colorConverter } from '../../lib/utils/color-converter.util';

describe('color-converter', () => {
	it('should be defined', () => {
		const converter = colorConverter;
		expect(converter).toBeDefined();
	});

	it('should has method HEXToRGB', () => {
		const converter = colorConverter.HEXToRGB;
		expect(converter).toBeDefined();
	});

	it('should has method RGBToHex', () => {
		const converter = colorConverter.RGBToHEX;
		expect(converter).toBeDefined();
	});

	it('should convert from rgb to hex', () => {
		const converter = colorConverter.RGBToHEX('rgb(20, 250, 30)');
		expect(converter).toBe('#14fa1e');
	});

	it('should convert from hex to rgb', () => {
		const converter = colorConverter.HEXToRGB('#ffffff');
		expect(converter).toBe('rgb(255, 255, 255)');
	});

	it('should return the same value if provide an invalid rgb color', () => {
		const converter = colorConverter.RGBToHEX('rgb(300, 255, 255)');
		expect(converter).toBe('rgb(300, 255, 255)');
	});

	it('should return the same value if provide an invalid hex color', () => {
		const converter = colorConverter.HEXToRGB('#invalid');
		expect(converter).toBe('#invalid');
	});
});
