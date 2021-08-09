import { EmailValueObject } from '../email.value-object';

describe('email-value-object.util', () => {
	it('should be defined', ()=>{
		const valueObject = EmailValueObject.create;
		expect(valueObject).toBeDefined()
	})

	it('should create a valid email with success', ()=>{
		const valueObject = EmailValueObject.create('valid_email@domain.com');
		expect(valueObject.isSuccess).toBe(true)
	})

	it('should transform value to lower on create', ()=>{
		const valueObject = EmailValueObject.create('Valid_EmaiL@Domain.Com').getResult();
		expect(valueObject.value).toBe('valid_email@domain.com')
	})

	it('should create and get value from a valid email with success', ()=>{
		const valueObject = EmailValueObject.create('valid_email@domain.com').getResult();
		expect(valueObject.value).toBe('valid_email@domain.com')
	})

	it('should fail if provide an invalid value', ()=>{
		const valueObject = EmailValueObject.create('invalid_email');
		expect(valueObject.isFailure).toBe(true);
		expect(valueObject.errorValue()).toBe('Invalid email');
	})

	it('should get nick', ()=>{
		const valueObject = EmailValueObject.create('username@domain.com').getResult();
		expect(valueObject.getNick()).toBe('username');
	})

	it('should get domain', ()=>{
		const valueObject = EmailValueObject.create('username@domain.com').getResult();
		expect(valueObject.getDomain()).toBe('domain.com');
	})
});
