import { colorGenerator } from '../color-generator.util';
import HEXColorValueObject from '../hex-color.value-object';
import { RGBColorValueObject } from '../rgb-color.value-object';

describe('color-generator', () => {
	it('should be defined', ()=>{
		const generator = colorGenerator;
		expect(colorGenerator).toBeDefined()
	})

	it('should has two functions', ()=>{
		const randomHEX = colorGenerator.randomHEX;
		const randomRGB = colorGenerator.randomRGB;

		expect(randomRGB).toBeDefined()
		expect(randomHEX).toBeDefined()
	})

	it('should generate a random valid RGB color', ()=>{
		const randomRGB = colorGenerator.randomRGB();
		const isValid = RGBColorValueObject.isValidValue(randomRGB);
		expect(isValid).toBeTruthy();
	})

	it('should generate a random valid HEX color', ()=>{
		const randomHEX = colorGenerator.randomHEX();
		const isValid = HEXColorValueObject.isValidValue(randomHEX);
		expect(isValid).toBeTruthy();
	})
});
