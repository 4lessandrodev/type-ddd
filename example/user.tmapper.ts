import {
	DomainId,
	BirthdayValueObject,
	EmailValueObject,
	UserNameValueObject,
	PasswordValueObject,
	Result,
	TMapper,
	ChangesObserver,
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
	isDeleted!: boolean;
}

// ----------------------------------------------------------------------------
// Mapper to be injected on repository.
export class UserModelToDomainMapper implements TMapper<Model, User> {
	//
	map(model: Model): Result<User> {
		const nameOrError = UserNameValueObject.create(model.userName);
		const emailOrError = EmailValueObject.create(model.userEmail);
		const passOrError = PasswordValueObject.create(model.userPassword);
		const birthOrError = BirthdayValueObject.create(model.userBirthDay);

		const observer = ChangesObserver.init<unknown>();

		observer.add(nameOrError);
		observer.add(emailOrError);
		observer.add(passOrError);
		observer.add(birthOrError);

		const result = observer.getResult();

		if (result.isFailure) {
			return Result.fail(result.errorValue());
		}

		return User.create({
			ID: DomainId.create(model.id),
			userName: nameOrError.getResult(),
			userEmail: emailOrError.getResult(),
			userPassword: passOrError.getResult(),
			userBirthDay: birthOrError.getResult(),
			createdAt: model.createdAt,
			updatedAt: model.updatedAt,
			isDeleted: model.isDeleted,
		});
	}
}

// What about Domain to Persistence Conversion ???
// use your domain instance toObject method. e.g: user.toObject();
// OR

export class UserDomainToModelMapper implements TMapper<User, Model> {
	//
	map(domain: User): Result<Model> {
		const model: Model = {
			id: domain.id.uid,
			userName: domain.userName.toObject(),
			userEmail: domain.userEmail.toObject(),
			userPassword: domain.userPassword.toObject(),
			userBirthDay: domain.userBirthDay.toObject(),
			createdAt: domain.createdAt,
			updatedAt: domain.updatedAt,
			isDeleted: domain.isDeleted,
		};

		return Result.ok(model);
	}
}
