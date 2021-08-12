import { UserNameValueObject } from '../../src/utils/user-name.value-object';

describe('user-name.value-object', () => {
	it('should be defined', ()=>{
		const username = UserNameValueObject.create;
		expect(username).toBeDefined()
	})

	it('should create a valid user name', ()=>{
		const username = UserNameValueObject.create('valid username');
		expect(username.isSuccess).toBeTruthy();
	})

	it('should get value', ()=>{
		const username = UserNameValueObject.create('valid username').getResult();
		expect(username.value).toBe('Valid Username');
	})

	it('should fail if provide a long name (41) chars', ()=>{
		const username = UserNameValueObject.create('invalid_username'.repeat(3));
		expect(username.isFailure).toBe(true);
	})

	it('should fail if provide a small name (1) char', ()=>{
		const username = UserNameValueObject.create('i');
		expect(username.isFailure).toBe(true);
	})

	it('should get first name with success', ()=>{
		const username = UserNameValueObject.create('first middle last').getResult();
		expect(username.getFirstName()).toBe('First');
	})

	it('should check if has last name [false]', ()=>{
		const username = UserNameValueObject.create('first').getResult();
		expect(username.hasLastName()).toBe(false);
	})

	it('should check if has last name [true]', ()=>{
		const username = UserNameValueObject.create('first middle last').getResult();
		expect(username.hasLastName()).toBe(true);
	})

	it('should check if has last name [true]', ()=>{
		const username = UserNameValueObject.create('first last').getResult();
		expect(username.hasLastName()).toBe(true);
	})

	it('should check if has middle name [false]', ()=>{
		const username = UserNameValueObject.create('first').getResult();
		expect(username.hasMiddleName()).toBe(false);
	})

	it('should check if has middle name [true]', ()=>{
		const username = UserNameValueObject.create('first middle last').getResult();
		expect(username.hasMiddleName()).toBe(true);
	})

	it('should get first name', ()=>{
		const username = UserNameValueObject.create('first middle last').getResult();
		expect(username.getFirstName()).toBe('First');
	})

	it('should get first name', ()=>{
		const username = UserNameValueObject.create('first middle').getResult();
		expect(username.getFirstName()).toBe('First');
	})

	it('should get first name', ()=>{
		const username = UserNameValueObject.create('first').getResult();
		expect(username.getFirstName()).toBe('First');
	})

	it('should get middle name', ()=>{
		const username = UserNameValueObject.create('first middle last').getResult();
		expect(username.getMiddleName()).toBe('Middle');
	})

	it('should NOT get middle name', ()=>{
		const username = UserNameValueObject.create('first last').getResult();
		expect(username.getMiddleName()).toBe('');
	})

	it('should get last name', ()=>{
		const username = UserNameValueObject.create('first last').getResult();
		expect(username.getLastName()).toBe('Last');
	})

	it('should return the first if does not exist last name', ()=>{
		const username = UserNameValueObject.create('FIRST').getResult();
		expect(username.getLastName()).toBe('First');
	})

	it('should capitalize names', ()=>{
		const username = UserNameValueObject.create('first middle last').getResult();
		expect(username.value).toBe('First Middle Last');
	})

	it('should capitalize names', ()=>{
		const username = UserNameValueObject.create('FIRST MIDDLE LAST').getResult();
		expect(username.value).toBe('First Middle Last');
	})

	it('should get initials', ()=>{
		const username = UserNameValueObject.create('FIRST MIDDLE LAST').getResult();
		expect(username.getInitials()).toBe('F.M.L');
	})

	it('should get initials', ()=>{
		const username = UserNameValueObject.create('FIRSt').getResult();
		expect(username.getInitials()).toBe('F');
	})
});
