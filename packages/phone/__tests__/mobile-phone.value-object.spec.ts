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

	it('should create mobile phone number with success', () => {
		const valueObject = MobilePhoneValueObject.create('11996041111');
		expect(valueObject.isOk()).toBe(true);
	});

	it('should create mobile phone number with success', () => {
		const phone = MobilePhoneValueObject.init('11996041111');
		expect(phone.uf()).toBe('São Paulo');
	});

	it('should create mobile phone number with success', () => {
		const valueObject = MobilePhoneValueObject.create('(52) 99604-1111');
		expect(valueObject.isOk()).toBe(false);
	});

	it('should remove special chars with success', () => {
		const value = MobilePhoneValueObject.removeSpecialChars('(11) 99604-1111');
		expect(value).toBe('11996041111');
	});

	it('should add mask with success', () => {
		const value = MobilePhoneValueObject.addMask('11996041111');
		expect(value).toBe('(11) 99604-1111');
	});

	it('should return true', () => {
		const isValid = MobilePhoneValueObject.isValid('(11) 99604-1111');
		expect(isValid).toBe(true);
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
		expect(valueObject?.value()).toBe('71982541211');
		expect(valueObject?.toPattern()).toBe('(71) 98254-1211');
	});

	it('should get only numbers value', () => {
		const valueObject =
			MobilePhoneValueObject.create('(71) 96254-1211').value();
		expect(valueObject?.number()).toBe('962541211');
		expect(valueObject?.toCall()).toBe('071962541211')
	});

	it('should get only DDD number', () => {
		const valueObject =
			MobilePhoneValueObject.create('(71) 97254-1211').value();
		expect(valueObject?.code()).toBe(71);
	});

	it('should init an instance with success', () => {
		const init = () => MobilePhoneValueObject.init('(62) 96556-1234');
		expect(init).not.toThrowError();
	});

	it('should throw an error on init an instance with invalid value', () => {
		const init = () => MobilePhoneValueObject.init('');
		expect(init).toThrowError();
	});
});
