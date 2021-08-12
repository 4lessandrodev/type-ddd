import { 
	AggregateRoot, 
	BaseDomainEntity, 
	UserNameValueObject, 
	EmailValueObject, 
	BirthdayValueObject,
	Result
} from '@types-ddd';

// Important extends to BaseDomainEntity
interface Props extends BaseDomainEntity {
	name: UserNameValueObject,
	email: EmailValueObject,
	birthDay: BirthdayValueObject,
}

export class User extends AggregateRoot<Props> {
	private constructor(props: Props) {
		super(props, User.name)
	}

	get name(): UserNameValueObject {
		return this.props.name;
	}
	
	setName(newName: UserNameValueObject): void {
		this.props.name = newName;
		this.props.updatedAt = new Date();
	}

	get email(): EmailValueObject {
		return this.props.email;
	}

	setEmail(newEmail: EmailValueObject): void {
		this.props.email = newEmail;
		this.props.updatedAt = new Date();
	}

	get birthDay(): BirthdayValueObject {
		return this.props.birthDay;
	}

	public static create(props: Props): Result<User> {
		/*
		 Business Logic Validations Here
		*/
		return Result.ok<User>(new User(props));
	}
}
