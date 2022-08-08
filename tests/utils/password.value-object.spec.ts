import { PasswordValueObject } from '../../lib/utils/password.value-object';

describe('password.value-object', () => {
	it('should be defined', () => {
		const valueObject = PasswordValueObject.create('12345');
		expect(valueObject).toBeDefined();
	});

	it('should create a not encrypted pass', () => {
		const valueObject = PasswordValueObject.create('12345');
		expect(valueObject.isOk()).toBe(true);
	});

	it('should fail if try to create a password less than 5 char', () => {
		const valueObject = PasswordValueObject.create('1234');
		expect(valueObject.isOk()).toBe(false);
		expect(valueObject.error()).toBe(
			'Password must has min 5 and max 21 chars'
		);
	});

	it('should fail if try to create a password greater than 21 char', () => {
		const valueObject = PasswordValueObject.create(
			'123456789101112131415161718'
		);
		expect(valueObject.isOk()).toBe(false);
		expect(valueObject.error()).toBe(
			'Password must has min 5 and max 21 chars'
		);
	});

	it('should validate password with success', () => {
		const result = PasswordValueObject.isValidProps('123456');
		expect(result).toBe(true);
	});

	it('should validate password with success', () => {
		const result = PasswordValueObject.isValidProps('1234');
		expect(result).toBe(false);
	});

	it('should validate encrypted password with success', () => {
		const result = PasswordValueObject.create('123456').value();
		result.encrypt();
		const isEncrypted = result.isEncrypted();
		expect(isEncrypted).toBe(true);
		expect(PasswordValueObject.isValidProps(result.value())).toBe(true);
	});

	it('should encrypt password with success', () => {
		const result = PasswordValueObject.create('123456').value();
		expect(result.isEncrypted()).toBe(false);
		result.encrypt();
		const isEncrypted = result.isEncrypted();
		expect(isEncrypted).toBe(true);
	});

	it('should get value result with success', () => {
		const result = PasswordValueObject.create('123456').value();
		expect(result.value()).toBe('123456');
	});

	it('should generate a valid random password not encrypted', () => {
		const result = PasswordValueObject.random(8);
		const isEncrypted = result.isEncrypted();
		expect(isEncrypted).toBe(false);
	});

	it('should generate a valid random password not encrypted default 12 chars', () => {
		const result = PasswordValueObject.random();
		const isEncrypted = result.isEncrypted();
		expect(isEncrypted).toBe(false);
		expect(result.value()).toHaveLength(12);
	});

	it('should compare password not encrypted', () => {
		const result = PasswordValueObject.create('123456').value();
		const match = result.compare('123456');
		expect(match).toBeTruthy();
	});

	it('should compare encrypted password', () => {
		const result = PasswordValueObject.create('123456').value();
		result.encrypt();
		const match = result.compare('123456');
		expect(match).toBeTruthy();
	});

	it('should compare password not encrypted', () => {
		const result = PasswordValueObject.create('123456').value();
		const match = result.compare('abcdef');
		expect(match).toBeFalsy();
	});

	it('should compare encrypted password', () => {
		const result = PasswordValueObject.create('123456').value();
		result.encrypt();
		const match = result.compare('abcdef');
		expect(match).toBeFalsy();
	});

	it('should encrypt many times and keep value', () => {
		const valueObject = PasswordValueObject.create('12345').value();
		expect(valueObject.isEncrypted()).toBeFalsy();
		valueObject.encrypt();
		expect(valueObject.isEncrypted()).toBeTruthy();
		expect(valueObject.compare('12345')).toBeTruthy();
		valueObject.encrypt();
		expect(valueObject.compare('12345')).toBe(true);
		expect(valueObject.isEncrypted()).toBeTruthy();
	});
});
