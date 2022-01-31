import { Model } from '../user.tmapper';
import { User } from '../simple-user.aggregate';
import {
	UserDomainToModelMapper,
	UserModelToDomainMapper,
} from '../user.tmapper';
import {
	BirthdayValueObject,
	DomainId,
	EmailValueObject,
	PasswordValueObject,
	UserNameValueObject,
} from '@types-ddd';
describe('user.tmapper', () => {
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
		isDeleted: false,
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
		isDeleted: false,
	}).getResult();

	it('should be defined', () => {
		const mapper = new UserModelToDomainMapper();
		expect(mapper).toBeDefined();
	});

	it('should convert from database to domain with success', () => {
		const mapper = new UserModelToDomainMapper();
		const generatedAggregateResult = mapper.map(model);

		expect(generatedAggregateResult.isSuccess).toBeTruthy();

		const generatedAggregate = generatedAggregateResult.getResult();

		expect(generatedAggregate).toEqual(aggregate);
		expect(generatedAggregate.userEmail.value).toBe(model.userEmail);
		expect(generatedAggregate.id.value.toString()).toBe(model.id);
	});

	it('should fail if provide an invalid prop', () => {
		const mapper = new UserModelToDomainMapper();

		const corruptedModel = Object.assign(
			{},
			{ ...model },
			{ userEmail: 'invalid_email' }
		);

		const generatedAggregateResult = mapper.map(corruptedModel);

		expect(generatedAggregateResult.isFailure).toBeTruthy();

		expect(generatedAggregateResult.errorValue()).toBe('Invalid email');
	});

	it('should convert from domain to database with success', () => {
		const mapper = new UserDomainToModelMapper();

		const generatedModelResult = mapper.map(aggregate);

		expect(generatedModelResult.isSuccess).toBeTruthy();

		const generatedModel = generatedModelResult.getResult();

		expect(generatedModel).toEqual(model);
		expect(generatedModel.userEmail).toBe(aggregate.userEmail.value);
		expect(generatedModel.id).toBe(aggregate.id.value.toString());
	});

	it('should get model from domain instance', () => {
		const generatedModel = aggregate.toObject();

		expect(generatedModel).toEqual(model);
	});

	it('should get model with encrypted pass', () => {
		aggregate.userPassword.encrypt();

		const generatedModel = aggregate.toObject<Model>();

		expect(generatedModel.userPassword).not.toBe(model.userPassword);
		const isEncrypted = PasswordValueObject.isEncrypted(
			generatedModel.userPassword
		);

		expect(isEncrypted).toBeTruthy();
	});
});
