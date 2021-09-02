import {
	IMapper,
	DomainId,
	BirthdayValueObject,
	EmailValueObject,
	UserNameValueObject,
	PasswordValueObject,
} from '@types-ddd';
import { User } from './simple-user.aggregate';

// ----------------------------------------------------------------------------
// User to persist on database
class Model {
	id!: string;
	userName!: string;
	userEmail!: string;
	userBirthDay!: Date;
	userPassword!: string;
	createdAt!: Date;
	updatedAt!: Date;
}

// ----------------------------------------------------------------------------
// Mapper to be injected on repository
export class UserMapper implements IMapper<User, Model> {
	//
	toDomain = (model: Model): User =>
		User.create({
			ID: DomainId.create(model.id),
			userName: UserNameValueObject.create(model.userName).getResult(),
			userEmail: EmailValueObject.create(model.userEmail).getResult(),
			userPassword: PasswordValueObject.create(
				model.userPassword
			).getResult(),
			userBirthDay: BirthdayValueObject.create(
				model.userBirthDay
			).getResult(),
			createdAt: model.createdAt,
			updatedAt: model.updatedAt,
		}).getResult();

	toPersistence = (aggregate: User): Model => ({
		id: aggregate.id.value.toString(),
		userName: aggregate.name.value,
		userEmail: aggregate.email.value,
		userPassword: aggregate.password.value,
		userBirthDay: aggregate.birthDay.value,
		createdAt: aggregate.createdAt,
		updatedAt: aggregate.updatedAt,
	});
}
