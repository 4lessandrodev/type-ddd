import { ValueObject } from '../core';
import { Result } from '../core';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import passwordGenerator, { ILength } from './password-generator.util';
const regexHash = /^\$2b\$10\$.{53}$/;

interface Prop {
	value: string;
}

class PasswordValueObject extends ValueObject<Prop> {
	constructor(props: Prop) {
		super(props);
	}

	/**
	 * @returns value as string
	 */
	value(): string {
		return this.props.value;
	}

	/**
	 *
	 * @description compare plainText with encrypted password
	 * @param plainText plainText not encrypted to compare with encrypted password
	 * @returns true if match else false
	 */
	public compare(plainText: string): boolean {
		if (this.isEncrypted()) {
			return compareSync(plainText, this.props.value);
		}
		return plainText === this.props.value;
	}

	/**
	 *
	 * @returns true if instance value is encrypted else false
	 */
	public isEncrypted(): boolean {
		return this.validator.string(this.props.value).match(regexHash);
	}

	/**
	 *
	 * @returns true if provided value is encrypted else false
	 */
	public static isEncrypted(value: string): boolean {
		return this.validator.string(value).match(regexHash);
	}

	/**
	 *
	 * @param length password length as number 8/10/12/14/16/18
	 * @returns PasswordValueObject
	 * @default 12 chars or greater is recommended for strongest password
	 */
	public static random(length?: ILength): PasswordValueObject {
		const pass = passwordGenerator(length ?? 12);
		return PasswordValueObject.create(pass).value();
	}

	/**
	 * @summary this function check if value already is encrypted. If already encrypted just returns instance.
	 * @description encrypt instance value
	 * @returns instance
	 */
	public encrypt(): PasswordValueObject {
		const isEncrypted = this.isEncrypted();
		if (isEncrypted) {
			return this;
		}
		const salt = genSaltSync();
		this.props.value = hashSync(this.props.value, salt);
		return this;
	}

	validation(value: string): boolean {
		return PasswordValueObject.isValidProps(value);
	}

	/**
	 *
	 * @param value check if password has a valid value length
	 * @returns true if is all ok or false else not
	 */
	public static isValidProps(value: string): boolean {
		const maxLength = 22;
		const minLength = 5;
		const { string } = this.validator;
		if (!PasswordValueObject.isEncrypted(value)) {
			const passwordHasRequiredLength = string(value).hasLengthBetween(
				minLength,
				maxLength
			);
			return passwordHasRequiredLength;
		}
		return true;
	}

	/**
	 *
	 * @param value password to create
	 * @returns Result of PasswordValueObject
	 */
	static create(value: string): Result<PasswordValueObject> {
		if (!PasswordValueObject.isValidProps(value)) {
			return Result.fail('Password must has min 5 and max 21 chars');
		}
		return Result.Ok(new PasswordValueObject({ value }));
	}
}

export { PasswordValueObject };
export default PasswordValueObject;
