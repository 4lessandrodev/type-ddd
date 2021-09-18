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
		expect(valueObject.isSuccess).toBeTruthy();
	});

	it('should get original string', () => {
		const valueObject =
			CustomStringValueObject.create('valid string').getResult();
		expect(valueObject.value).toBe('valid string');
	});

	it('should get uppercase value', () => {
		const valueObject =
			CustomStringValueObject.create('valid string').getResult();
		expect(valueObject.upperCaseValue).toBe('VALID STRING');
	});

	it('should get lowercase value', () => {
		const valueObject =
			CustomStringValueObject.create('Valid String').getResult();
		expect(valueObject.lowerCaseValue).toBe('valid string');
	});

	it('should get capitalize value', () => {
		const valueObject =
			CustomStringValueObject.create('valid String').getResult();
		expect(valueObject.capitalizeValue).toBe('Valid string');
	});

	it('should fail if string is empty', () => {
		const valueObject = CustomStringValueObject.create('');
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fail if string is greater than 255 chars', () => {
		const valueObject = CustomStringValueObject.create(
			'invalid_string_length'.repeat(25)
		);
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		const valueObject = CustomStringValueObject.create(
			'invalid',
			customValidation
		);
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		const valueObject = CustomStringValueObject.create(
			'000-abcde',
			customValidation
		);
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fail if custom validation fails', () => {
		const valueObject = CustomStringValueObject.create(
			'1234-abcd',
			customValidation
		);
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should validate if provide a valid value', () => {
		const valueObject = CustomStringValueObject.create(
			'123-abcd',
			customValidation
		);
		expect(valueObject.isSuccess).toBeTruthy();
	});

	it('should validate if provide a valid value', () => {
		const valueObject = CustomStringValueObject.create(
			'123-abcd',
			customValidation
		);
		expect(valueObject.isSuccess).toBeTruthy();
	});

	it('should get custom validation from instance', () => {
		const valueObject = CustomStringValueObject.create(
			'123-abcd',
			customValidation
		).getResult();
		const validation = valueObject.customValidation;
		expect(validation.VALIDATOR).toBeDefined();
		expect(validation.LENGTH.MAX).toBeDefined();
		expect(validation.LENGTH.MIN).toBeDefined();
	});

	it('should get default custom validation from instance', () => {
		const valueObject =
			CustomStringValueObject.create('123-abcd').getResult();
		const validation = valueObject.customValidation;
		expect(validation.VALIDATOR).toBeDefined();
		expect(validation.LENGTH.MAX).toBeDefined();
		expect(validation.LENGTH.MIN).toBeDefined();
	});
});
