import {
	Model,
	AggregateFactory,
	ModelFactory,
} from '../user.mapper-with-factory';
import { User } from '../simple-user.aggregate';
import { UserMapper } from '../user.mapper-with-factory';
import {
	BirthdayValueObject,
	DomainId,
	EmailValueObject,
	PasswordValueObject,
	UserNameValueObject,
} from '@types-ddd';

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
	userPassword: PasswordValueObject.create(model.userPassword).getResult(),
	createdAt: currentDate,
	updatedAt: currentDate,
}).getResult();

describe('user.factory', () => {
	it('should be defined', () => {
		const factory = AggregateFactory(model);
		expect(factory).toBeDefined();
	});

	it('should convert to model with success', () => {
		const result = AggregateFactory(model);
		const generatedAggregate = result.getResult();
		expect(result.isSuccess).toBeTruthy();
		expect(generatedAggregate).toEqual(aggregate);
		expect(generatedAggregate).toBeInstanceOf(User);
		expect(generatedAggregate.userEmail.value).toBe(model.userEmail);
		expect(generatedAggregate.id.value.toString()).toBe(model.id);
	});

	it('should return result.fail if provide an invalid value', () => {
		const invalidModel = Object.assign(
			{},
			{ ...model },
			{
				userEmail: 'invalid_email',
			}
		);
		const result = AggregateFactory(invalidModel);
		expect(result.isFailure).toBeTruthy();
	});
});

describe('model.factory', () => {
	it('should be defined', () => {
		const factory = ModelFactory(aggregate);
		expect(factory).toBeDefined();
	});

	it('should convert a aggregate into model with success', () => {
		const generatedModel = ModelFactory(aggregate);
		expect(generatedModel).toEqual(model);
		expect(generatedModel.id).toEqual(aggregate.id.value.toString());
		expect(generatedModel.userEmail).toEqual(aggregate.userEmail.value);
	});
});

describe('user.mapper-with-factory', () => {
	it('should be defined', () => {
		const mapper = new UserMapper(ModelFactory, AggregateFactory);
		expect(mapper).toBeDefined();
	});

	it('should convert from database to domain with success', () => {
		const mapper = new UserMapper(ModelFactory, AggregateFactory);
		const generatedAggregate = mapper.toDomain(model);
		expect(generatedAggregate).toEqual(aggregate);
		expect(generatedAggregate).toBeInstanceOf(User);
		expect(generatedAggregate.userEmail.value).toBe(model.userEmail);
		expect(generatedAggregate.id.value.toString()).toBe(model.id);
	});

	it('should convert from domain to database with success', () => {
		const mapper = new UserMapper(ModelFactory, AggregateFactory);
		const generatedModel = mapper.toPersistence(aggregate);
		expect(generatedModel).toEqual(model);
		expect(generatedModel.userEmail).toBe(aggregate.userEmail.value);
		expect(generatedModel.id).toBe(aggregate.id.value.toString());
	});
});
