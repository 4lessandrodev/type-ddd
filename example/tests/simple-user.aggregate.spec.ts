import { EmailValueObject, UserNameValueObject, BirthdayValueObject, DomainId } from "@types-ddd";
import { User } from "../simple-user.aggregate";

describe('simple-user.aggregate.ts', () => {
	
	it('should be defined', ()=> {
		const user = User.create;
		expect(user).toBeDefined()
	})

	it('should create a valid user', ()=> {
		const year = new Date();
		year.setFullYear(2000);

		// 	Create value objects
		const email = EmailValueObject.create('valid_email@domain.com').getResult();
		const name = UserNameValueObject.create('John Stuart').getResult();
		const birthDay = BirthdayValueObject.create(year).getResult();
		const ID = DomainId.create();

		// Create user
		const user = User.create({ ID, email, name, birthDay });
		expect(user.isSuccess).toBeTruthy();
	})

	it('should getters be defined', ()=> {
		const year = new Date();
		year.setFullYear(2000);

		// 	Create value objects
		const email = EmailValueObject.create('valid_email@domain.com').getResult();
		const name = UserNameValueObject.create('John Stuart').getResult();
		const birthDay = BirthdayValueObject.create(year).getResult();
		const ID = DomainId.create();

		// Create user
		const user = User.create({ ID, email, name, birthDay }).getResult();

		expect(user.id).toBeDefined();
		expect(user.email).toBeDefined();
		expect(user.name).toBeDefined();
		expect(user.birthDay).toBeDefined();
		expect(user.createdAt).toBeDefined();
		expect(user.updatedAt).toBeDefined();
		expect(user.getHashCode).toBeDefined();
	})

	it('should change name and email', ()=> {
		const year = new Date();
		year.setFullYear(2000);

		// 	Create value objects
		const email = EmailValueObject.create('valid_email@domain.com').getResult();
		const name = UserNameValueObject.create('John Stuart').getResult();
		const birthDay = BirthdayValueObject.create(year).getResult();
		const ID = DomainId.create();

		// Create user
		const user = User.create({ ID, email, name, birthDay }).getResult();

		const newName = UserNameValueObject.create('Mr. Arthur').getResult();
		const newEmail = EmailValueObject.create('new_email@domain.com').getResult();

		user.setName(newName);
		user.setEmail(newEmail);

		expect(user.email.value).toBe('new_email@domain.com');
		expect(user.name.value).toBe('Mr. Arthur');
	})
});
