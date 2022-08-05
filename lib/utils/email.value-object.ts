import { ValueObject } from '../core';
import { Result } from '../core';
const regexHash = /^\w+-?\.?\w+[0-9]??\@\w+[0-9]?\.\w{1,5}(\.\w{2})?(?!.)/;

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

	validation(_key: any, _value: any): boolean {
		return this.validator.string(_value).match(regexHash);
	}

	public static isValidProps(email: string): boolean {
		const isValidEmail = regexHash.test(email);
		return isValidEmail;
	}

	public static create(value: string): Result<EmailValueObject> {
		if (!EmailValueObject.isValidProps(value)) {
			return Result.fail('Invalid email');
		}
		return Result.success(new EmailValueObject({ value }));
	}
}

export default EmailValueObject;
