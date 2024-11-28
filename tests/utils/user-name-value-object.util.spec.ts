import { UserNameValueObject } from '../../lib/utils/user-name.value-object';

describe('user-name.value-object', () => {
	it('should be defined', () => {
		const username = UserNameValueObject.create;
		expect(username).toBeDefined();
	});

	it('should create a valid user name', () => {
		const username = UserNameValueObject.create('valid username');
		expect(username.isOk()).toBeTruthy();
	});

	it('should get value', () => {
		const username = UserNameValueObject.create('valid username').value();
		expect(username?.value()).toBe('Valid Username');
	});

	it('should fail if provide a long name (41) chars', () => {
		const username = UserNameValueObject.create(
			'invalid_username'.repeat(3),
		);
		expect(username.isFail()).toBe(true);
	});

	it('should fail if provide a small name (1) char', () => {
		const username = UserNameValueObject.create('i');
		expect(username.isFail()).toBe(true);
	});

	it('should get first name with success', () => {
		const username =
			UserNameValueObject.create('first middle last').value();
		expect(username?.getFirstName()).toBe('First');
	});

	it('should check if has last name [false]', () => {
		const username = UserNameValueObject.create('first').value();
		expect(username?.hasLastName()).toBe(false);
	});

	it('should check if has last name [true]', () => {
		const username =
			UserNameValueObject.create('first middle last').value();
		expect(username?.hasLastName()).toBe(true);
	});

	it('should check if has last name [true]', () => {
		const username = UserNameValueObject.create('first last').value();
		expect(username?.hasLastName()).toBe(true);
	});

	it('should check if has middle name [false]', () => {
		const username = UserNameValueObject.create('first').value();
		expect(username?.hasMiddleName()).toBe(false);
	});

	it('should check if has middle name [true]', () => {
		const username =
			UserNameValueObject.create('first middle last').value();
		expect(username?.hasMiddleName()).toBe(true);
	});

	it('should get first name', () => {
		const username =
			UserNameValueObject.create('first middle last').value();
		expect(username?.getFirstName()).toBe('First');
	});

	it('should get first name', () => {
		const username = UserNameValueObject.create('first middle').value();
		expect(username?.getFirstName()).toBe('First');
	});

	it('should get first name', () => {
		const username = UserNameValueObject.create('first').value();
		expect(username?.getFirstName()).toBe('First');
	});

	it('should get middle name', () => {
		const username =
			UserNameValueObject.create('first middle last').value();
		expect(username?.getMiddleName()).toBe('Middle');
	});

	it('should NOT get middle name', () => {
		const username = UserNameValueObject.create('first last').value();
		expect(username?.getMiddleName()).toBe('');
	});

	it('should get last name', () => {
		const username = UserNameValueObject.create('first last').value();
		expect(username?.getLastName()).toBe('Last');
	});

	it('should return the first if does not exist last name', () => {
		const username = UserNameValueObject.create('FIRST').value();
		expect(username?.getLastName()).toBe('First');
	});

	it('should capitalize names', () => {
		const username =
			UserNameValueObject.create('first middle last').value();
		expect(username?.value()).toBe('First Middle Last');
	});

	it('should capitalize names', () => {
		const username =
			UserNameValueObject.create('FIRST MIDDLE LAST').value();
		expect(username?.value()).toBe('First Middle Last');
		expect(username?.get('value')).toBe('First Middle Last');
	});

	it('should get initials', () => {
		const username =
			UserNameValueObject.create('FIRST MIDDLE LAST').value();
		expect(username?.getInitials()).toBe('F.M.L');
	});

	it('should get initials with custom separator', () => {
		const separator = '-';
		const username =
			UserNameValueObject.create('FIRST MIDDLE LAST').value();
		expect(username?.getInitials(separator)).toBe('F-M-L');
	});

	it('should get initials with none separator', () => {
		const separator = '';
		const username =
			UserNameValueObject.create('FIRST MIDDLE LAST').value();
		expect(username?.getInitials(separator)).toBe('FML');
	});

	it('should get initials', () => {
		const username = UserNameValueObject.create('FIRSt').value();
		expect(username?.getInitials()).toBe('F');
	});

	it('should name with duple spaces', () => {
		const username = UserNameValueObject.create(
			'José caleb  dos Santos',
		).value();
		expect(username?.value()).toBe('José Caleb Dos Santos');
	});

	it('should name with duple spaces and two caracter "de" ', () => {
		const username = UserNameValueObject.create(
			'José caleb  de Oliveira',
		).value();
		expect(username?.value()).toBe('José Caleb De Oliveira');
	});

	it('should name with duple spaces and two caracter specials ', () => {
		const username = UserNameValueObject.create(
			'José caleb , de Oliveira',
		).value();
		expect(username?.value()).toBe('José Caleb De Oliveira');
	});

	it('should name with three spaces in name', () => {
		const username = UserNameValueObject.create(
			'José caleb   de Oliveira',
		).value();
		expect(username?.value()).toBe('José Caleb De Oliveira');
	});
});
