import { CustomNumberValueObject } from '../../lib/utils/custom-number.value-object';
describe('custom-number.value-object', () => {
	it('should be defined', () => {
		const valueObject = CustomNumberValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid number without custom validator', () => {
		const valueObject = CustomNumberValueObject.create(400);
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should get original number', () => {
		const valueObject = CustomNumberValueObject.create(600).value();
		expect(valueObject.value()).toBe(600);
	});

	it('should check if is positive value', () => {
		const valueObject = CustomNumberValueObject.create(2).value();
		expect(valueObject.isPositive).toBeTruthy();
	});

	it('should check if is positive value', () => {
		const valueObject = CustomNumberValueObject.create(-2).value();
		expect(valueObject.isPositive).toBeFalsy();
	});

	it('should check if a value is greater than', () => {
		const valueObject = CustomNumberValueObject.create(-10).value();
		expect(valueObject.isGreaterThan(9)).toBeFalsy();
	});

	it('should fail if number is not equal', () => {
		const valueObject = CustomNumberValueObject.create(1230).value();
		expect(valueObject.isEqualTo(10)).toBeFalsy();
	});

	it('should be equal', () => {
		const valueObject = CustomNumberValueObject.create(1230).value();
		expect(valueObject.isEqualTo(1230)).toBeTruthy();
	});

	it('should fail if number max safe', () => {
		const valueObject = CustomNumberValueObject.create(
			Number.MAX_SAFE_INTEGER + 2
		);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should validate if provide a valid value', () => {
		const valueObject = CustomNumberValueObject.create(40);
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should validate if provide a valid value', () => {
		const valueObject = CustomNumberValueObject.create(80);
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should get custom validation from instance', () => {
		const valueObject = CustomNumberValueObject.create(2).value();
		const validation = valueObject.customValidation;
		expect(validation.VALIDATOR).toBeDefined();
		expect(validation.MAX).toBeDefined();
		expect(validation.MIN).toBeDefined();
	});

	it('should get default custom validation from instance', () => {
		const valueObject = CustomNumberValueObject.create(20).value();
		const validation = valueObject.customValidation;
		expect(validation.VALIDATOR).toBeDefined();
		expect(validation.MAX).toBeDefined();
		expect(validation.MIN).toBeDefined();
	});
});

describe('custom validator', () => {
	it('should fail if custom validation fails', () => {
		Reflect.set(
			CustomNumberValueObject,
			'VALIDATOR',
			(value: number) => value > 24 && value < 48
		);
		const valueObject = CustomNumberValueObject.create(23);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		Reflect.set(
			CustomNumberValueObject,
			'VALIDATOR',
			(value: number) => value > 24 && value < 48
		);
		const valueObject = CustomNumberValueObject.create(49);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should validate with success', () => {
		Reflect.set(
			CustomNumberValueObject,
			'VALIDATOR',
			(value: number) => value > 24 && value < 48
		);
		const valueObject = CustomNumberValueObject.create(32);
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		Reflect.set(
			CustomNumberValueObject,
			'VALIDATOR',
			(value: number) => value > 24 && value < 48
		);

		const valueObject = CustomNumberValueObject.create(-1200);
		expect(valueObject.isFail()).toBeTruthy();
	});
});
