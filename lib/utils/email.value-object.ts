import { Result, ValueObject } from '..';
const regexHash = /^\w+-?\w+[0-9]?@\w+[0-9]?\.\w{1,5}(\.\w{2})?/;

interface Prop {
	value: string;
}
export class EmailValueObject extends ValueObject<Prop> {
	private constructor(props: Prop) {
		super(props);
	}

	get value(): string {
		return this.props.value.toLowerCase();
	}

	getNick(): string {
		return this.props.value.slice(0, this.props.value.indexOf('@'));
	}

	getDomain(): string {
		return this.props.value
			.slice(this.props.value.indexOf('@') + 1)
			.toLowerCase();
	}

	public static isValidValue(email: string): boolean {
		const isValidEmail = regexHash.test(email);
		return isValidEmail;
	}

	public static create(value: string): Result<EmailValueObject> {
		if (!EmailValueObject.isValidValue(value)) {
			return Result.fail<EmailValueObject>('Invalid email');
		}
		return Result.ok<EmailValueObject>(new EmailValueObject({ value }));
	}
}

export default EmailValueObject;
