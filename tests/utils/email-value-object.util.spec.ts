import { EmailValueObject } from '../../lib/utils/email.value-object';

describe('email-value-object.util', () => {
	it('should be defined', () => {
		const valueObject = EmailValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid email with success', () => {
		const valueObject = EmailValueObject.create('valid_email@domain.com');
		expect(valueObject.isOk()).toBe(true);
	});

	it('should transform value to lower on create', () => {
		const valueObject = EmailValueObject.create(
			'Valid_EmaiL@Domain.Com'
		).value();
		expect(valueObject.value()).toBe('valid_email@domain.com');
	});

	it('should create and get value from a valid email with success', () => {
		const valueObject = EmailValueObject.create(
			'valid_email@domain.com'
		).value();
		expect(valueObject.value()).toBe('valid_email@domain.com');
	});

	it('should fail if provide an invalid value', () => {
		const valueObject = EmailValueObject.create('invalid_email');
		expect(valueObject.isFail()).toBe(true);
		expect(valueObject.error()).toBe('Invalid email');
	});

	it('should get nick', () => {
		const valueObject = EmailValueObject.create(
			'username@domain.com'
		).value();
		expect(valueObject.getNick()).toBe('username');
	});

	it('should get domain', () => {
		const valueObject = EmailValueObject.create(
			'username@domain.com'
		).value();
		expect(valueObject.getDomain()).toBe('domain.com');
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create(
			'username.nickname@domain.com'
		);
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe(
			'username.nickname@domain.com'
		);
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create('rocio65@gmail.com');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('rocio65@gmail.com');
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create('user_nick2.0@hotmail.com');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('user_nick2.0@hotmail.com');
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create('rocio_65@gmail.com');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('rocio_65@gmail.com');
	});

	it('should create value object with success', () => {
		const valueObject = EmailValueObject.create('4you@gmail.com');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('4you@gmail.com');
	});

	it('should fails if not provide a domain', () => {
		const valueObject = EmailValueObject.create('4you@gmail');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fails if provide two dots', () => {
		const valueObject = EmailValueObject.create(
			'my-email8950@hotmail..com'
		);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fails if provide an invalid domain', () => {
		const valueObject = EmailValueObject.create(
			'inVaLLiD_Email@MYDomain.longInvalid.br'
		);
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fails if provide an space', () => {
		const valueObject = EmailValueObject.create('invalid email@domain.com');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should get domain with success', () => {
		const vo = EmailValueObject.create('my-email@domain.com').value();
		expect(vo.getDomain()).toBe('domain.com');
	});

	it('should get nick with success', () => {
		const vo = EmailValueObject.create('my-email@domain.com').value();
		expect(vo.get('value')).toBe('my-email@domain.com');
		expect(vo.getNick()).toBe('my-email');
	});
});
