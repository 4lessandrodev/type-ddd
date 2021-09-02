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
	toDomain = ({
		id,
		userPassword,
		userName,
		userEmail,
		userBirthDay,
		updatedAt,
		createdAt,
	}: Model): User =>
		User.create({
			ID: DomainId.create(id),
			userName: UserNameValueObject.create(userName).getResult(),
			userEmail: EmailValueObject.create(userEmail).getResult(),
			userPassword: PasswordValueObject.create(userPassword).getResult(),
			userBirthDay: BirthdayValueObject.create(userBirthDay).getResult(),
			createdAt: createdAt,
			updatedAt: updatedAt,
		}).getResult();
	toPersistence = ({
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
}
