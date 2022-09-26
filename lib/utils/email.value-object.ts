import { ValueObject } from '../core/value-object';
import Result from '../core/result';
import IsValidEmail from './email.validator.util';

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
		const isValidEmail = IsValidEmail(email);
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
