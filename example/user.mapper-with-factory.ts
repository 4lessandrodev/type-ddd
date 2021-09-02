import {
	IMapper,
	DomainId,
	BirthdayValueObject,
	EmailValueObject,
	UserNameValueObject,
	PasswordValueObject,
	ChangesObserver,
	Result,
} from '@types-ddd';
import { User } from './simple-user.aggregate';

// ----------------------------------------------------------------------------
// User to persist on database
export class Model {
	id!: string;
	userName!: string;
	userEmail!: string;
	userBirthDay!: Date;
	userPassword!: string;
	createdAt!: Date;
	updatedAt!: Date;
}

// ----------------------------------------------------------------------------
type IAggregateFactory = (model: Model) => Result<User>;

// Factory function turn a model obj on domain obj
// This is util to use on your use-cases
export const AggregateFactory: IAggregateFactory = ({
	id,
	userPassword,
	userName,
	userEmail,
	userBirthDay,
	updatedAt,
	createdAt,
}: Model): Result<User> => {
	const userNameOrError = UserNameValueObject.create(userName);
	const userEmailOrError = EmailValueObject.create(userEmail);
	const userPasswordOrError = PasswordValueObject.create(userPassword);
	const userBirthDayOrError = BirthdayValueObject.create(userBirthDay);

	const changes = ChangesObserver.init<unknown>([
		userNameOrError,
		userEmailOrError,
		userPasswordOrError,
		userBirthDayOrError,
	]).getResult();

	const isAllResultsOk = changes.isSuccess;

	if (!isAllResultsOk) {
		return Result.fail(changes.errorValue());
	}

	return User.create({
		ID: DomainId.create(id),
		userName: userNameOrError.getResult(),
		userEmail: userEmailOrError.getResult(),
		userPassword: userPasswordOrError.getResult(),
		userBirthDay: userBirthDayOrError.getResult(),
		createdAt: createdAt,
		updatedAt: updatedAt,
	});
};

// ----------------------------------------------------------------------------
type IModelFactory = (aggregate: User) => Model;

// Factory function turn a domain obj on database obj
export const ModelFactory: IModelFactory = ({
	id,
	createdAt,
	password,
	name,
	email,
	birthDay,
	updatedAt,
}: User): Model => ({
	id: id.value.toString(),
	userName: name.value,
	userEmail: email.value,
	userPassword: password.value,
	userBirthDay: birthDay.value,
	createdAt: createdAt,
	updatedAt: updatedAt,
});

// ----------------------------------------------------------------------------
// Mapper to be injected on user repository
export class UserMapper implements IMapper<User, Model> {
	constructor(
		private readonly modelFactory: IModelFactory,
		private readonly aggregateFactory: IAggregateFactory
	) {}

	toDomain = (model: Model): User => this.aggregateFactory(model).getResult();
	toPersistence = (aggregate: User): Model => this.modelFactory(aggregate);
}
