import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { Result, ValueObject } from 'rich-domain';
import passwordGenerator, { ILength } from './utils';
const regexHash = /^\$2b\$10\$.{53}$/;

class Password extends ValueObject<string> {
	protected static readonly MAX_LENGTH = 22;
	protected static readonly MIN_LENGTH = 5;
	protected static readonly REGEX = regexHash;
	protected static readonly MESSAGE: string = `Password must has min ${Password.MIN_LENGTH} and max ${Password.MAX_LENGTH} chars`;

	private constructor(props: string) {
		super(props);
	}

	/**
	 * @returns value as string
	 */
	value(): string {
		return this.props;
	}

	/**
	 *
	 * @description compare plainText with encrypted password
	 * @param plainText plainText not encrypted to compare with encrypted password
	 * @returns true if match else false
	 */
	public compare(plainText: string): boolean {
		if (this.isEncrypted()) {
			return compareSync(plainText, this.props);
		}
		return plainText === this.props;
	}

	/**
	 *
	 * @returns true if instance value is encrypted else false
	 */
	public isEncrypted(): boolean {
		const isEncrypted = this.validator
			.string(this.props)
			.match(Password.REGEX);
		return isEncrypted;
	}

	/**
	 *
	 * @returns true if provided value is encrypted else false
	 */
	public static isEncrypted(value: string): boolean {
		return this.validator.string(value).match(Password.REGEX);
	}

	/**
	 *
	 * @param length password length as number 8/10/12/14/16/18
	 * @returns PasswordValueObject
	 * @default 12 chars or greater is recommended for strongest password
	 */
	public static random(length?: ILength): Password {
		const pass = passwordGenerator(length ?? 12);
		return Password.create(pass).value();
	}

	/**
	 * @summary this function check if value already is encrypted. If already encrypted just returns instance.
	 * @description encrypt instance value
	 * @returns instance
	 */
	public encrypt(): Password {
		const isEncrypted = this.isEncrypted();
		if (isEncrypted) {
			return this;
		}
		const salt = genSaltSync();
		this.props = hashSync(this.props, salt);
		return this;
	}

	validation(value: string): boolean {
		return Password.isValidProps(value);
	}

	/**
	 *
	 * @param value check if password has a valid value length
	 * @returns true if is all ok or false else not
	 */
	public static isValidProps(value: string): boolean {
		const { string } = this.validator;
		if (!Password.isEncrypted(value)) {
			const passwordHasRequiredLength = string(
				value,
			).hasLengthBetweenOrEqual(
				Password.MIN_LENGTH,
				Password.MAX_LENGTH,
			);
			return passwordHasRequiredLength;
		}
		return true;
	}

	isEqual(password: Password): boolean {
		return this.compare(password.value());
	}

	/**
	 *
	 * @param value password to create
	 * @returns Result of PasswordValueObject
	 */
	static create(value: string): Result<Password> {
		if (!Password.isValidProps(value)) {
			return Result.fail(Password.MESSAGE);
		}
		return Result.Ok(new Password(value));
	}
}

export { Password };
export default Password;
