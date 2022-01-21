import { UserMapper } from '../user.simple-mapper';
import { Model } from '../user.mapper-with-factory';
import { User } from '../simple-user.aggregate';
import {
	BirthdayValueObject,
	DomainId,
	EmailValueObject,
	PasswordValueObject,
	UserNameValueObject,
} from '@types-ddd';
describe('user.simple-mapper', () => {
	const currentDate = new Date();
	const lastYear = new Date(
		new Date().setFullYear(currentDate.getFullYear() - 1)
	);

	const model: Model = {
		id: 'valid_id',
		createdAt: currentDate,
		updatedAt: currentDate,
		userBirthDay: lastYear,
		userEmail: 'valid_email@domain.com',
		userName: 'Valid Name',
		userPassword: 'valid_pass',
	};

	const aggregate: User = User.create({
		ID: DomainId.create(model.id),
		userBirthDay: BirthdayValueObject.create(lastYear).getResult(),
		userEmail: EmailValueObject.create(model.userEmail).getResult(),
		userName: UserNameValueObject.create(model.userName).getResult(),
		userPassword: PasswordValueObject.create(
			model.userPassword
		).getResult(),
		createdAt: currentDate,
		updatedAt: currentDate,
	}).getResult();

	it('should be defined', () => {
		const mapper = new UserMapper();
		expect(mapper).toBeDefined();
	});

	it('should convert from database to domain with success', () => {
		const mapper = new UserMapper();
		const generatedAggregate = mapper.toDomain(model);
		expect(generatedAggregate).toEqual(aggregate);
		expect(generatedAggregate.userEmail.value).toBe(model.userEmail);
		expect(generatedAggregate.id.value.toString()).toBe(model.id);
	});

	it('should convert from domain to database with success', () => {
		const mapper = new UserMapper();
		const generatedModel = mapper.toPersistence(aggregate);
		expect(generatedModel).toEqual(model);
		expect(generatedModel.userEmail).toBe(aggregate.userEmail.value);
		expect(generatedModel.id).toBe(aggregate.id.value.toString());
	});
});
