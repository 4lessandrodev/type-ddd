import {
	EmailValueObject,
	UserNameValueObject,
	BirthdayValueObject,
	DomainId,
	PasswordValueObject,
} from '@types-ddd';
import { User } from '../simple-user.aggregate';

describe('simple-user.aggregate.ts', () => {
	it('should be defined', () => {
		const user = User.create;
		expect(user).toBeDefined();
	});

	it('should create a valid user', () => {
		const year = new Date();
		year.setFullYear(2000);

		// 	Create value objects
		const userEmail = EmailValueObject.create(
			'valid_email@domain.com'
		).getResult();
		const userName = UserNameValueObject.create('John Stuart').getResult();
		const userBirthDay = BirthdayValueObject.create(year).getResult();
		const userPassword = PasswordValueObject.generateRandomPassword(8);
		const ID = DomainId.create();

		// Create user
		const user = User.create({
			ID,
			userEmail,
			userName,
			userBirthDay,
			userPassword,
		});
		expect(user.isSuccess).toBeTruthy();
	});

	it('should getters be defined', () => {
		const year = new Date();
		year.setFullYear(2000);

		// 	Create value objects
		const userEmail = EmailValueObject.create(
			'valid_email@domain.com'
		).getResult();
		const userName = UserNameValueObject.create('John Stuart').getResult();
		const userBirthDay = BirthdayValueObject.create(year).getResult();
		const userPassword = PasswordValueObject.generateRandomPassword(8);
		const ID = DomainId.create();

		// Create user
		const user = User.create({
			ID,
			userEmail,
			userName,
			userBirthDay,
			userPassword,
		}).getResult();

		expect(user.id).toBeDefined();
		expect(user.userEmail).toBeDefined();
		expect(user.userName).toBeDefined();
		expect(user.userBirthDay).toBeDefined();
		expect(user.createdAt).toBeDefined();
		expect(user.updatedAt).toBeDefined();
		expect(user.getHashCode).toBeDefined();
	});

	it('should change name and email', () => {
		const year = new Date();
		year.setFullYear(2000);

		// 	Create value objects
		const userEmail = EmailValueObject.create(
			'valid_email@domain.com'
		).getResult();
		const userName = UserNameValueObject.create('John Stuart').getResult();
		const userBirthDay = BirthdayValueObject.create(year).getResult();
		const userPassword = PasswordValueObject.generateRandomPassword(8);
		const ID = DomainId.create();

		// Create user
		const user = User.create({
			ID,
			userEmail,
			userName,
			userBirthDay,
			userPassword,
		}).getResult();

		const newName = UserNameValueObject.create('Mr. Arthur').getResult();
		const newEmail = EmailValueObject.create(
			'new_email@domain.com'
		).getResult();

		user.setName(newName);
		user.setEmail(newEmail);

		expect(user.userEmail.value).toBe('new_email@domain.com');
		expect(user.userName.value).toBe('Mr. Arthur');
	});
});
