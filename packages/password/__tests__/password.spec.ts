import PasswordValueObject from '../index'

describe('password.value-object', () => {
	describe('default', () => {
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
				'Password must has min 5 and max 22 chars',
			);
		});

		it('should fail if try to create a password greater than 22 char', () => {
			const valueObject = PasswordValueObject.create(
				'123456789101112131415161718',
			);
			expect(valueObject.isOk()).toBe(false);
			expect(valueObject.error()).toBe(
				'Password must has min 5 and max 22 chars',
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
			const encrypted = result?.encrypt();
			const isEncrypted = encrypted?.isEncrypted();
			expect(isEncrypted).toBe(true);
			expect(PasswordValueObject.isValid(encrypted?.value() as string)).toBe(true);
		});

		it('should encrypt password with success', () => {
			const result = PasswordValueObject.create('123456').value();
			expect(result?.isEncrypted()).toBe(false);
			const encrypted = result?.encrypt();
			const isEncrypted = encrypted?.isEncrypted();
			expect(isEncrypted).toBe(true);
		});

		it('should get value result with success', () => {
			const result = PasswordValueObject.create('123456').value();
			expect(result?.value()).toBe('123456');
		});

		it('should generate a valid random password not encrypted', () => {
			const result = PasswordValueObject.random(8);
			const isEncrypted = result.isEncrypted();
			expect(isEncrypted).toBe(false);
		});

		it('should not generate equal password', () => {
			const passA = PasswordValueObject.random(12);
			const passB = PasswordValueObject.random(12);
			const isEqual = passA.isEqual(passB);
			expect(isEqual).toBe(false);
		});

		it('should password to be equal', () => {
			const passA = PasswordValueObject.create('123456abc!').value();
			const passC = PasswordValueObject.create('123456abc!').value();
			const passB = passA?.clone();
			const isEqual1 = passA?.isEqual(passB as PasswordValueObject);
			const isEqual2 = passA?.isEqual(passC as PasswordValueObject);
			expect(isEqual1).toBe(true);
			expect(isEqual2).toBe(true);
		});

		it('should generate a valid random password not encrypted default 12 chars', () => {
			const result = PasswordValueObject.random();
			const isEncrypted = result.isEncrypted();
			expect(isEncrypted).toBe(false);
			expect(result.value()).toHaveLength(12);
		});

		it('should compare password not encrypted', () => {
			const result = PasswordValueObject.create('123456').value();
			const match = result?.compare('123456');
			expect(match).toBeTruthy();
		});

		it('should compare encrypted password', () => {
			const result = PasswordValueObject.create('123456').value();
			const encrypted = result?.encrypt();
			const match = encrypted?.compare('123456');
			expect(match).toBeTruthy();
		});

		it('should compare password not encrypted', () => {
			const result = PasswordValueObject.create('123456').value();
			const match = result?.compare('abcdef');
			expect(match).toBeFalsy();
		});

		it('should compare encrypted password', () => {
			const result = PasswordValueObject.create('123456').value();
			const encrypted = result?.encrypt();
			const match = encrypted?.compare('abcdef');
			expect(match).toBeFalsy();
		});

		it('should encrypt many times and keep value', () => {
			const valueObject = PasswordValueObject.create('12345').value();
			expect(valueObject?.isEncrypted()).toBeFalsy();
			const encrypted1 = valueObject?.encrypt();
			expect(encrypted1?.isEncrypted()).toBeTruthy();
			expect(valueObject?.compare('12345')).toBeTruthy();

			expect(encrypted1?.compare('12345')).toBe(true);
			expect(encrypted1?.isEncrypted()).toBeTruthy();
		});
	});

	describe('custom password', () => {
		beforeAll(() => {
			Reflect.set(PasswordValueObject, 'MAX_LENGTH', 22);
			Reflect.set(PasswordValueObject, 'MIN_LENGTH', 10);
		});

		it('should validate custom password', () => {
			const pass = PasswordValueObject.create('123456');
			expect(pass.isFail()).toBeTruthy();
			expect(Reflect.get(PasswordValueObject, 'MIN_LENGTH')).toBe(10);
		});
	});


	it('should init an instance with success', () => {
		const init = () => PasswordValueObject.init('sample1234');
		expect(init).not.toThrowError();
	});

	it('should throw an error on init an instance with invalid value', () => {
		const init = () => PasswordValueObject.init('');
		expect(init).toThrowError();
	});

	it('should return the same password if already is encrypted', () => {
		const password = PasswordValueObject.random().encrypt();
		const encrypted = password.encrypt();
		expect(password.isEqual(encrypted)).toBeTruthy();
	});
});
