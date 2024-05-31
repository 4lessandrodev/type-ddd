import UserName from '../index'

describe('user-name.value-object', () => {
	it('should be defined', () => {
		const username = UserName.create;
		expect(username).toBeDefined();
	});

	it('should create a valid user name', () => {
		const username = UserName.create('valid username');
		expect(username.isOk()).toBeTruthy();
	});

	it('should get value', () => {
		const username = UserName.create('valid username').value();
		expect(username.value()).toBe('Valid Username');
	});

	it('should fail if provide a long name (41) chars', () => {
		const username = UserName.create(
			'invalid_username'.repeat(10),
		);
		expect(username.isFail()).toBe(true);
	});

	it('should fail if provide a small name (1) char', () => {
		const username = UserName.create('i');
		expect(username.isFail()).toBe(true);
	});

	it('should get first name with success', () => {
		const username =
			UserName.create('first middle last').value();
		expect(username.firstName()).toBe('First');
	});

	it('should check if has last name [false]', () => {
		const username = UserName.create('first').value();
		expect(username.hasLastName()).toBe(false);
	});

	it('should check if has last name [true]', () => {
		const username =
			UserName.create('first middle last').value();
		expect(username.hasLastName()).toBe(true);
	});

	it('should check if has last name [true]', () => {
		const username = UserName.create('first last').value();
		expect(username.hasLastName()).toBe(true);
	});

	it('should check if has middle name [false]', () => {
		const username = UserName.create('first').value();
		expect(username.hasMiddleName()).toBe(false);
	});

	it('should check if has middle name [true]', () => {
		const username =
			UserName.create('first middle last').value();
		expect(username.hasMiddleName()).toBe(true);
	});

	it('should get first name', () => {
		const username = UserName.create('first middle last').value();
		expect(username.firstName()).toBe('First');
	});

	it('should get first name', () => {
		const username = UserName.create('first middle').value();
		expect(username.firstName()).toBe('First');
	});

	it('should get first name', () => {
		const username = UserName.create('first').value();
		expect(username.firstName()).toBe('First');
	});

	it('should get middle name', () => {
		const username = UserName.create('first middle last').value();
		expect(username.middleName()).toBe('Middle');
	});

	it('should NOT get middle name', () => {
		const username = UserName.create('first last').value();
		expect(username.middleName()).toBe('');
	});

	it('should get last name', () => {
		const username = UserName.create('first last').value();
		expect(username.lastName()).toBe('Last');
	});

	it('should return the first if does not exist last name', () => {
		const username = UserName.create('FIRST').value();
		expect(username.lastName()).toBe('First');
	});

	it('should capitalize names', () => {
		const username = UserName.create('first middle last').value();
		expect(username.value()).toBe('First Middle Last');
	});

	it('should capitalize names', () => {
		const username = UserName.create('FIRST MIDDLE LAST').value();
		expect(username.value()).toBe('First Middle Last');
		expect(username.get('value')).toBe('First Middle Last');
	});

	it('should get initials', () => {
		const username = UserName.create('FIRST MIDDLE LAST').value();
		expect(username.initials()).toBe('FML');
	});

	it('should get initials with custom separator', () => {
		const separator = '-';
		const username = UserName.create('FIRST MIDDLE LAST').value();
		expect(username.initials(separator)).toBe('F-M-L');
	});

	it('should get initials with none separator', () => {
		const separator = '.';
		const username = UserName.create('FIRST MIDDLE LAST').value();
		expect(username.initials(separator)).toBe('F.M.L');
	});

	it('should get initials', () => {
		const username = UserName.create('FIRSt').value();
		expect(username.initials()).toBe('F');
	});

	it('should name with duple spaces', () => {
		const username = UserName.create(
			'José caleb  dos Santos',
		).value();
		expect(username.value()).toBe('José Caleb Dos Santos');
	});

	it('should name with duple spaces and two character "de" ', () => {
		const username = UserName.create(
			'José caleb  de Oliveira',
		).value();
		expect(username.value()).toBe('José Caleb De Oliveira');
	});

	it('should name with duple spaces and two character specials ', () => {
		const username = UserName.create(
			'José caleb , de Oliveira',
		).value();
		expect(username.value()).toBe('José Caleb De Oliveira');
	});

	it('should name with three spaces in name', () => {
		const username = UserName.create(
			'José caleb   de Oliveira',
		).value();
		expect(username.value()).toBe('José Caleb De Oliveira');
	});

	it('should init an instance with success', () => {
		const init = () => UserName.init('lorem ipsum');
		expect(init).not.toThrowError();
	});

	it('should throw an error on init an instance with invalid value', () => {
		const init = () => UserName.init('');
		expect(init).toThrowError();
	});

	it('should capitalize a full name', () => {
		const value = UserName.capitalize('jane doe');
		expect(value).toBe('Jane Doe');
	});

	it('should uppercase value', () => {
		const name = UserName.init('jane doe');
		const value = name.upperCase();
		expect(value).toBe('JANE DOE');
	});

	it('should lowercase value', () => {
		const name = UserName.init('JaNe DOE');
		const value = name.lowerCase();
		expect(value).toBe('jane doe');
	});

	it('should validate user name', () => {
		expect(UserName.isValid('jane doe')).toBeTruthy();
		expect(UserName.isValid('')).toBeFalsy();
	});

	it('should add title', () => {
		const name = UserName.init('Juliana Paes');
		expect(name.title('Sra.').firstName()).toBe('Sra. Juliana')
	})
});
