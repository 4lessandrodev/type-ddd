import {
	CustomStringValueObject,
	CustomStrProps,
} from '../../lib/utils/custom-string.value-object';
describe('custom-string.value-object', () => {
	const customValidation: CustomStrProps = {
		LENGTH: {
			MAX: 8,
			MIN: 8,
		},
		VALIDATOR: function (value: string): boolean {
			// pattern: 123-abcd
			const regex = /([0-9]{3}[-][a-z]{4})/;
			return regex.test(value);
		},
	};

	it('should be defined', () => {
		const valueObject = CustomStringValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid string without custom validator', () => {
		const valueObject = CustomStringValueObject.create('valid string');
		expect(valueObject.isOK()).toBeTruthy();
	});

	it('should get original string', () => {
		const valueObject =
			CustomStringValueObject.create('valid string').value();
		expect(valueObject.value()).toBe('valid string');
	});

	it('should get uppercase value', () => {
		const valueObject =
			CustomStringValueObject.create('valid string').value();
		expect(valueObject.upperCaseValue).toBe('VALID STRING');
	});

	it('should get lowercase value', () => {
		const valueObject =
			CustomStringValueObject.create('Valid String').value();
		expect(valueObject.lowerCaseValue).toBe('valid string');
	});

	it('should get capitalize value', () => {
		const valueObject =
			CustomStringValueObject.create('valid String').value();
		expect(valueObject.capitalizeValue).toBe('Valid string');
	});

	it('should fail if string is empty', () => {
		const valueObject = CustomStringValueObject.create('');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if string is greater than 255 chars', () => {
		const valueObject = CustomStringValueObject.create(
			'invalid_string_length'.repeat(25)
		);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		const valueObject = CustomStringValueObject.create(
			'invalid',
			customValidation
		);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		const valueObject = CustomStringValueObject.create(
			'000-abcde',
			customValidation
		);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		const valueObject = CustomStringValueObject.create(
			'1234-abcd',
			customValidation
		);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should validate if provide a valid value', () => {
		const valueObject = CustomStringValueObject.create(
			'123-abcd',
			customValidation
		);
		expect(valueObject.isOK()).toBeTruthy();
	});

	it('should validate if provide a valid value', () => {
		const valueObject = CustomStringValueObject.create(
			'123-abcd',
			customValidation
		);
		expect(valueObject.isOK()).toBeTruthy();
	});

	it('should get custom validation from instance', () => {
		const valueObject = CustomStringValueObject.create(
			'123-abcd',
			customValidation
		).value();
		const validation = valueObject.customValidation;
		expect(validation.VALIDATOR).toBeDefined();
		expect(validation.LENGTH.MAX).toBeDefined();
		expect(validation.LENGTH.MIN).toBeDefined();
	});

	it('should get default custom validation from instance', () => {
		const valueObject = CustomStringValueObject.create('123-abcd').value();
		const validation = valueObject.customValidation;
		expect(validation.VALIDATOR).toBeDefined();
		expect(validation.LENGTH.MAX).toBeDefined();
		expect(validation.LENGTH.MIN).toBeDefined();
	});
});
