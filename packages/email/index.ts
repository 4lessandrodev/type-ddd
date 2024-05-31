import { Result, ValueObject } from 'rich-domain';
import IsValidEmail from './email.validator.util';

export class Email extends ValueObject<string> {
	protected static readonly BLOCKED_DOMAINS: Array<string> = [];
	protected static readonly VALID_DOMAINS: Array<string> = [];
	protected static readonly MESSAGE: string = 'Invalid email';

	private constructor(props: string) {
		super(props);
	}

	value(): string {
		return this.props;
	}

	nick(): string {
		return this.props.slice(0, this.props.indexOf('@'));
	}

	domain(): string {
		return this.props
			.slice(this.props.indexOf('@') + 1);
	}

	public static isValid(value: string): boolean {
		return this.isValidProps(value);
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
		const isValid = IsValidEmail(email);
		if (!isValid) return false;

		const domain = email.slice(email.indexOf('@') + 1).toLowerCase();

		const isBlockedDomain = Email.BLOCKED_DOMAINS.map(
			(blockedDomain) => blockedDomain.toLowerCase().includes(domain),
		).includes(true);

		if (Email.VALID_DOMAINS.length === 0) {
			return !isBlockedDomain;
		}

		const isAvailable = Email.VALID_DOMAINS.map((freeDomain) =>
			freeDomain.toLowerCase().includes(domain),
		).includes(true);

		return isAvailable && !isBlockedDomain;
	}


	/**
	 * 
	 * @param value value as string
	 * @returns instance of Email or throw an error
	 */
	public static init(value: string): Email {
		const isValidValue = Email.isValidProps(value);
		if (!isValidValue) throw new Error(Email.MESSAGE);
		return new Email(value.toLowerCase());
	}

	public static create(value: string): Result<Email> {
		if (!Email.isValidProps(value)) {
			return Result.fail(Email.MESSAGE);
		}
		return Result.Ok(new Email(value.toLowerCase()));
	}
}

export default Email;
