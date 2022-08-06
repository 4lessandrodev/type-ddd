import { RGBColorValueObject } from '../../lib/utils/rgb-color.value-object';

describe('rgb-color.value-object', () => {
	it('should be defined', () => {
		const valueObject = RGBColorValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should fails if try create a hex as rgb color', () => {
		const valueObject = RGBColorValueObject.create('#ffffff');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should create a valid rgb color', () => {
		const valueObject = RGBColorValueObject.create('rgb(255, 255, 255)');
		expect(valueObject.isOK()).toBeTruthy();
	});

	it('should create a valid rgb color and get value', () => {
		const valueObject = RGBColorValueObject.create('rgb(255, 255, 255)');
		expect(valueObject.isOK()).toBeTruthy();
		expect(valueObject.value().value()).toBe('rgb(255, 255, 255)');
	});

	it('should create a valid rgb color and get value', () => {
		const valueObject = RGBColorValueObject.create('rgb(0, 0, 0)');
		expect(valueObject.isOK()).toBeTruthy();
		expect(valueObject.value().value()).toBe('rgb(0, 0, 0)');
	});

	it('should create a valid rgb color and get value', () => {
		const valueObject = RGBColorValueObject.create('rgb(120, 70, 90)');
		expect(valueObject.isOK()).toBeTruthy();
		expect(valueObject.value().value()).toBe('rgb(120, 70, 90)');
	});

	it('should fails if try to create an invalid rgb color', () => {
		const valueObject = RGBColorValueObject.create('#invalid');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fails if try to create an invalid rgb color', () => {
		const valueObject = RGBColorValueObject.create('rgb(300, 255, 2)');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fails if try to create an invalid rgb color', () => {
		const valueObject = RGBColorValueObject.create('rgb(255, 255)');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should get color as hex', () => {
		const valueObject = RGBColorValueObject.create('rgb(85, 107, 47)');
		expect(valueObject.value().getAsHex()).toBe('#556b2f');
	});

	it('should get color as hex', () => {
		const valueObject = RGBColorValueObject.create('rgb(0, 255, 255)');
		expect(valueObject.value().getAsHex()).toBe('#00ffff');
	});

	it('should get color as hex', () => {
		const valueObject = RGBColorValueObject.create('rgb(0, 128, 0)');
		expect(valueObject.value().getAsHex()).toBe('#008000');
	});

	it('should get color as hex', () => {
		const valueObject = RGBColorValueObject.create('rgb(152, 251, 152)');
		expect(valueObject.value().getAsHex()).toBe('#98fb98');
	});

	it('should get color as hex', () => {
		const valueObject = RGBColorValueObject.create('rgb(139, 0, 0)');
		expect(valueObject.value().getAsHex()).toBe('#8b0000');
	});

	it('should get color as hex', () => {
		const valueObject = RGBColorValueObject.create('rgb(255, 255, 255)');
		expect(valueObject.value().getAsHex()).toBe('#ffffff');
	});

	it('should get color as hex', () => {
		const valueObject = RGBColorValueObject.create('rgb(0, 0, 0)');
		expect(valueObject.value().getAsHex()).toBe('#000000');
	});

	it('should generate a random rgb color', () => {
		const valueObject = RGBColorValueObject.randomColor();
		const isValid = RGBColorValueObject.isValidProps(valueObject.value());
		expect(isValid).toBeTruthy();
	});
});
