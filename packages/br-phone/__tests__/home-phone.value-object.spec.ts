import { HomePhoneValueObject } from '../home.value-object';

describe('home-phone.value-object', () => {
	it('should be defined', () => {
		const valueObject = HomePhoneValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create homePhone with success', () => {
		const valueObject = HomePhoneValueObject.create('(11) 3404-1111');
		expect(valueObject.isOk()).toBe(true);
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
		expect(valueObject.value()).toBe('(71) 2254-1211');
	});

	it('should get only numbers value', () => {
		const valueObject =
			HomePhoneValueObject.create('(71) 2254-1211').value();
		expect(valueObject.getOnlyNumbers()).toBe(7122541211);
	});

	it('should get only DDD number', () => {
		const valueObject =
			HomePhoneValueObject.create('(71) 2254-1211').value();
		expect(valueObject.getDDD()).toBe(71);
	});
});
