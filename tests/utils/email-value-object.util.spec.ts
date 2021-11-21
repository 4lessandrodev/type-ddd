import { EmailValueObject } from '../../lib/utils/email.value-object';

describe('email-value-object.util', () => {
	it('should be defined', () => {
		const valueObject = EmailValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid email with success', () => {
		const valueObject = EmailValueObject.create('valid_email@domain.com');
		expect(valueObject.isSuccess).toBe(true);
	});

	it('should transform value to lower on create', () => {
		const valueObject = EmailValueObject.create(
			'Valid_EmaiL@Domain.Com'
		).getResult();
		expect(valueObject.value).toBe('valid_email@domain.com');
	});

	it('should create and get value from a valid email with success', () => {
		const valueObject = EmailValueObject.create(
			'valid_email@domain.com'
		).getResult();
		expect(valueObject.value).toBe('valid_email@domain.com');
	});

	it('should fail if provide an invalid value', () => {
		const valueObject = EmailValueObject.create('invalid_email');
		expect(valueObject.isFailure).toBe(true);
		expect(valueObject.errorValue()).toBe('Invalid email');
	});

	it('should get nick', () => {
		const valueObject = EmailValueObject.create(
			'username@domain.com'
		).getResult();
		expect(valueObject.getNick()).toBe('username');
	});

	it('should get domain', () => {
		const valueObject = EmailValueObject.create(
			'username@domain.com'
		).getResult();
		expect(valueObject.getDomain()).toBe('domain.com');
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create(
			'username.nickname@domain.com'
		);
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe(
			'username.nickname@domain.com'
		);
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create('rocio65@gmail.com');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('rocio65@gmail.com');
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create('rocio_65@gmail.com');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('rocio_65@gmail.com');
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create('4you@gmail.com');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('4you@gmail.com');
	});

	it('should fails if not provide a domain', () => {
		const valueObject = EmailValueObject.create('4you@gmail');
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fails if provide two dots', () => {
		const valueObject = EmailValueObject.create(
			'my-email8950@hotmail..com'
		);
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fails if provide an invalid domain', () => {
		const valueObject = EmailValueObject.create(
			'inVaLLiD_Email@MYDomain.longInvalid.br'
		);
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fails if provide an space', () => {
		const valueObject = EmailValueObject.create('invalid email@domain.com');
		expect(valueObject.isFailure).toBeTruthy();
	});
});
