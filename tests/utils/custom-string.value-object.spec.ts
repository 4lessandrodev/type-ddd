import { CustomStringValueObject } from '../../lib/utils/custom-string.value-object';
describe('custom-string.value-object', () => {
	it('should be defined', () => {
		const valueObject = CustomStringValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid string without custom validator', () => {
		const valueObject = CustomStringValueObject.create('valid string');
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should get original string', () => {
		const valueObject =
			CustomStringValueObject.create('valid string').value();
		expect(valueObject?.value()).toBe('valid string');
	});

	it('should get uppercase value', () => {
		const valueObject =
			CustomStringValueObject.create('valid string').value();
		expect(valueObject?.upperCaseValue).toBe('VALID STRING');
	});

	it('should get lowercase value', () => {
		const valueObject =
			CustomStringValueObject.create('Valid String').value();
		expect(valueObject?.lowerCaseValue).toBe('valid string');
	});

	it('should get capitalize value', () => {
		const valueObject =
			CustomStringValueObject.create('valid String').value();
		expect(valueObject?.capitalizeValue).toBe('Valid string');
	});

	it('should fail if string is empty', () => {
		const valueObject = CustomStringValueObject.create('');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if string is greater than 255 chars', () => {
		const valueObject = CustomStringValueObject.create(
			'invalid_string_length'.repeat(25),
		);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should validate if provide a valid value', () => {
		const valueObject = CustomStringValueObject.create('123-abcd');
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should validate if provide a valid value', () => {
		const valueObject = CustomStringValueObject.create('123-abcd');
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should get custom validation from instance', () => {
		const valueObject = CustomStringValueObject.create('123-abcd').value();
		const validation = valueObject?.customValidation;
		expect(validation?.VALIDATOR).toBeDefined();
		expect(validation?.MAX_LENGTH).toBeDefined();
		expect(validation?.MIN_LENGTH).toBeDefined();
	});

	it('should be get string only numbers', () => {
		const valueObject =
			CustomStringValueObject.create('B2D05E00').value()?.onlyNumbers;
		expect(valueObject).toBe('20500');
	});

	it('should be get string without chars especial', () => {
		const valueObject = CustomStringValueObject.create(
			'===[brazil(*-*)free]===',
		);
		expect(valueObject.value()?.removeSpecialChars).toBe('brazilfree');
	});
});

describe('custom validation', () => {
	it('should fail if custom validation fails', () => {
		Reflect.set(CustomStringValueObject, 'VALIDATOR', (value: string) =>
			value.includes('0'),
		);
		const valueObject = CustomStringValueObject.create('invalid');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		Reflect.set(CustomStringValueObject, 'VALIDATOR', (value: string) =>
			value.includes('0'),
		);
		const valueObject = CustomStringValueObject.create('111-abcde');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		Reflect.set(CustomStringValueObject, 'VALIDATOR', (value: string) =>
			value.includes('0'),
		);
		const valueObject = CustomStringValueObject.create('333-abcd');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should success if custom validation not fails', () => {
		Reflect.set(CustomStringValueObject, 'VALIDATOR', (value: string) =>
			value.includes('0'),
		);
		const valueObject = CustomStringValueObject.create('012-abcd');
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should customize message on error', () => {
		Reflect.set(CustomStringValueObject, 'VALIDATOR', (value: string) =>
			value.includes('0'),
		);
		Reflect.set(
			CustomStringValueObject,
			'MESSAGE',
			'Oops my custom message',
		);
		const valueObject = CustomStringValueObject.create('AAAAAA');
		expect(valueObject.isOk()).toBeFalsy();
		expect(valueObject.error()).toBe('Oops my custom message');
	});
});
