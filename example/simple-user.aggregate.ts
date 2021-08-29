import {
	AggregateRoot,
	BaseDomainEntity,
	UserNameValueObject,
	EmailValueObject,
	BirthdayValueObject,
	Result,
	PasswordValueObject,
} from '@types-ddd';

// Important extends to BaseDomainEntity
interface Props extends BaseDomainEntity {
	userName: UserNameValueObject;
	userEmail: EmailValueObject;
	userBirthDay: BirthdayValueObject;
	userPassword: PasswordValueObject;
}

export class User extends AggregateRoot<Props> {
	private constructor(props: Props) {
		super(props, User.name);
	}

	get name(): UserNameValueObject {
		return this.props.userName;
	}

	setName(newName: UserNameValueObject): void {
		this.props.userName = newName;
		this.props.updatedAt = new Date();
	}

	get email(): EmailValueObject {
		return this.props.userEmail;
	}

	setEmail(newEmail: EmailValueObject): void {
		this.props.userEmail = newEmail;
		this.props.updatedAt = new Date();
	}

	get birthDay(): BirthdayValueObject {
		return this.props.userBirthDay;
	}

	get password(): PasswordValueObject {
		return this.props.userPassword;
	}

	public static create(props: Props): Result<User> {
		/*
		 Business Logic Validations Here
		*/
		return Result.ok<User>(new User(props));
	}
}
