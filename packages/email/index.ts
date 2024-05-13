import { Result, ValueObject } from 'rich-domain';
import IsValidEmail from './email.validator.util';

export class EmailValueObject extends ValueObject<string> {
	protected static readonly BLOCKED_DOMAINS: Array<string> = [];
	protected static readonly VALID_DOMAINS: Array<string> = [];
	protected static readonly MESSAGE: string = 'Invalid email';

	private constructor(props: string) {
		super(props);
	}

	value(): string {
		return this.props.toLowerCase();
	}

	getNick(): string {
		return this.props.slice(0, this.props.indexOf('@'));
	}

	getDomain(): string {
		return this.props
			.slice(this.props.indexOf('@') + 1)
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
		const isValid = IsValidEmail(email);
		if (!isValid) return false;

		const domain = email.slice(email.indexOf('@') + 1).toLowerCase();

		const isBlockedDomain = EmailValueObject.BLOCKED_DOMAINS.map(
			(blockedDomain) => blockedDomain.toLowerCase().includes(domain),
		).includes(true);

		if (EmailValueObject.VALID_DOMAINS.length === 0)
			return !isBlockedDomain;

		const isAvailable = EmailValueObject.VALID_DOMAINS.map((freeDomain) =>
			freeDomain.toLowerCase().includes(domain),
		).includes(true);

		return isAvailable && !isBlockedDomain;
	}

	public static create(value: string): Result<EmailValueObject> {
		if (!EmailValueObject.isValidProps(value)) {
			return Result.fail(EmailValueObject.MESSAGE);
		}
		return Result.Ok(new EmailValueObject(value));
	}
}

export default EmailValueObject;
