import { ValueObject } from '../core/value-object';
import Result from '../core/result';
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
	get value(): string {
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
		return regexHash.test(this.props.value);
	}

	/**
	 *
	 * @returns true if provided value is encrypted else false
	 */
	public static isEncrypted(value: string): boolean {
		return regexHash.test(value);
	}

	/**
	 *
	 * @param length password length as number 8/10/12/14/16/18
	 * @returns PasswordValueObject
	 * @default 12 chars or greater is recommended for strongest password
	 */
	public static generateRandomPassword(
		length?: ILength
	): PasswordValueObject {
		const pass = passwordGenerator(length ?? 12);
		return PasswordValueObject.create(pass).getResult();
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

	/**
	 *
	 * @param value check if password has a valid value length
	 * @returns true if is all ok or false else not
	 */
	public static isValidValue(value: string): boolean {
		const maxLength = 21;
		const minLength = 5;
		if (!PasswordValueObject.isEncrypted(value)) {
			const passwordHasRequiredLength =
				value.length >= minLength && value.length <= maxLength;
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
		if (!PasswordValueObject.isValidValue(value)) {
			return Result.fail<PasswordValueObject>(
				'Password must has min 5 and max 21 chars'
			);
		}
		return Result.ok<PasswordValueObject>(
			new PasswordValueObject({ value })
		);
	}
}

export { PasswordValueObject };
export default PasswordValueObject;
