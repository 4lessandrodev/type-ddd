import { ValueObject } from '../core';
import { Result } from '../core';
import { IsValidEmail } from './email.validator.util';

interface Prop {
	value: string;
}
export class EmailValueObject extends ValueObject<Prop> {
	private constructor(props: Prop) {
		super(props);
	}

	value(): string {
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

	validation(value: string): boolean {
		return EmailValueObject.isValidProps(value);
	}

	/**
	 * @description validate email value
	 * @param email string
	 * @returns true if email value is valid and returns false if not.
	 *
	 * @requires email not greater than 256 char.
	 * @requires contain symbol @
	 * @requires contain [domain].[org].[optional country]
	 * @requires contain [nick letters] with [hifen or numbers]
	 * @requires starts [a-z]
	 * @requires ends [a-z]
	 */
	public static isValidProps(email: string): boolean {
		return IsValidEmail(email);
	}

	public static create(value: string): Result<EmailValueObject> {
		if (!EmailValueObject.isValidProps(value)) {
			return Result.fail('Invalid email');
		}
		return Result.Ok(new EmailValueObject({ value }));
	}
}

export default EmailValueObject;
