import { HomePhone as HomePhoneValueObject } from '../home.value-object';

describe('home-phone.value-object', () => {
	it('should be defined', () => {
		const valueObject = HomePhoneValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create homePhone with success', () => {
		const valueObject = HomePhoneValueObject.create('(11) 3404-1111');
		expect(valueObject.isOk()).toBe(true);
	});

	it('should return true', () => {
		const isValid = HomePhoneValueObject.isValid('(11) 3404-1111');
		expect(isValid).toBe(true);
	});

	it('should return true', () => {
		const isValid = HomePhoneValueObject.isValid('1134041111');
		expect(isValid).toBe(true);
	});

	it('should return false', () => {
		const isValid = HomePhoneValueObject.isValid('(52) 3404-1111');
		expect(isValid).toBe(false);
	});

	it('should return only numbers', () => {
		const value = HomePhoneValueObject.removeSpecialChars('(11) 3404-1111');
		expect(value).toBe('1134041111');
	});

	it('should return numbers with mask', () => {
		const value = HomePhoneValueObject.addMask('1134041111');
		expect(value).toBe('(11) 3404-1111');
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = HomePhoneValueObject.create('(11) 1111-1111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = HomePhoneValueObject.create('(11) 11111111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = HomePhoneValueObject.create('(01) 3404-1111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = HomePhoneValueObject.create('01 3404-1111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = HomePhoneValueObject.create('013404-1111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should get value', () => {
		const valueObject =
			HomePhoneValueObject.create('(71) 2254-1211').value();
		expect(valueObject.value()).toBe('7122541211');
		expect(valueObject.toPattern()).toBe('(71) 2254-1211');
	});

	it('should get only numbers value', () => {
		const valueObject =
			HomePhoneValueObject.create('(71) 2254-1211').value();
		expect(valueObject.number()).toBe('22541211');
		expect(valueObject.toCall()).toBe('07122541211');
	});

	it('should get only DDD number', () => {
		const valueObject =
			HomePhoneValueObject.create('(71) 2254-1211').value();
		expect(valueObject.code()).toBe(71);
	});

	it('should init an instance with success', () => {
		const init = () => HomePhoneValueObject.init('(71) 2253-1213');
		expect(init).not.toThrowError();
	});

	it('should throw an error on init an instance with invalid value', () => {
		const init = () => HomePhoneValueObject.init('');
		expect(init).toThrowError();
	});

	it('should get uf', () => {
		const home = HomePhoneValueObject.init('(71) 2253-1213');
		expect(home.uf()).toBe('Bahia');
	});
});
