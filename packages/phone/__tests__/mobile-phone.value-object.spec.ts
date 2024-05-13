import { MobilePhone as MobilePhoneValueObject } from '../mobile.value-object';

describe('home-phone.value-object', () => {
	it('should be defined', () => {
		const valueObject = MobilePhoneValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create mobile phone number with success', () => {
		const valueObject = MobilePhoneValueObject.create('(11) 99604-1111');
		expect(valueObject.isOk()).toBe(true);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = MobilePhoneValueObject.create('(11) 99999-9999');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = MobilePhoneValueObject.create('(11) 11111111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = MobilePhoneValueObject.create('(01) 99061-1111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = MobilePhoneValueObject.create('01 99620-1111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should fail if try to create an invalid home phone number', () => {
		const valueObject = MobilePhoneValueObject.create('99201-1111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should get value', () => {
		const valueObject =
			MobilePhoneValueObject.create('(71) 98254-1211').value();
		expect(valueObject.value()).toBe('(71) 98254-1211');
	});

	it('should get only numbers value', () => {
		const valueObject =
			MobilePhoneValueObject.create('(71) 96254-1211').value();
		expect(valueObject.getOnlyNumbers()).toBe(71962541211);
	});

	it('should get only DDD number', () => {
		const valueObject =
			MobilePhoneValueObject.create('(71) 97254-1211').value();
		expect(valueObject.getDDD()).toBe(71);
	});
});
