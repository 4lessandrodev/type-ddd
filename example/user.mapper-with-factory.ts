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

// interfaces
type IAggregateFactory = (model: Model) => Result<User>;
type IModelFactory = (aggregate: User) => Model;

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

// Factory function turn a model obj on domain obj
// This is util to use on your use-cases
export const AggregateFactory: IAggregateFactory = (
	target: Model
): Result<User> => {
	const userNameOrError = UserNameValueObject.create(target.userName);
	const userEmailOrError = EmailValueObject.create(target.userEmail);
	const userPasswordOrError = PasswordValueObject.create(target.userPassword);
	const userBirthDayOrError = BirthdayValueObject.create(target.userBirthDay);

	const changes = ChangesObserver.init<unknown>();

	changes.add(userNameOrError);
	changes.add(userEmailOrError);
	changes.add(userPasswordOrError);
	changes.add(userBirthDayOrError);

	const result = changes.getResult();
	const isAllResultsOk = result.isSuccess;

	if (!isAllResultsOk) {
		return Result.fail(result.errorValue());
	}

	return User.create({
		ID: DomainId.create(target.id),
		userName: userNameOrError.getResult(),
		userEmail: userEmailOrError.getResult(),
		userPassword: userPasswordOrError.getResult(),
		userBirthDay: userBirthDayOrError.getResult(),
		createdAt: target.createdAt,
		updatedAt: target.updatedAt,
	});
};

// ----------------------------------------------------------------------------

// Factory function turn a domain obj on database obj
export const ModelFactory: IModelFactory = (target: User): Model => ({
	id: target.id.uid,
	userName: target.userName.value,
	userEmail: target.userEmail.value,
	userPassword: target.userPassword.value,
	userBirthDay: target.userBirthDay.value,
	createdAt: target.createdAt,
	updatedAt: target.updatedAt,
});

// ----------------------------------------------------------------------------
// Mapper to be injected on user repository. Deprecated. Use TMapper instead
export class UserMapper implements IMapper<User, Model> {
	constructor(
		private readonly modelFactory: IModelFactory,
		private readonly aggregateFactory: IAggregateFactory
	) {}

	toDomain = (model: Model): User => this.aggregateFactory(model).getResult();
	toPersistence = (aggregate: User): Model => this.modelFactory(aggregate);
}
