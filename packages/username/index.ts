import { Result, ValueObject } from 'rich-domain';

export class UserName extends ValueObject<string> {
	protected static readonly MAX_LENGTH: number = 82;
	protected static readonly MIN_LENGTH: number = 2;
	protected static readonly MESSAGE: string = `Invalid name length. Must has min ${UserName.MIN_LENGTH} and max ${UserName.MAX_LENGTH} chars`;

	private constructor(props: string) {
		super(props);
		this.capitalize();
	}

	/**
	 * @returns capitalized full name
	 */
	value(): string {
		return this.props;
	}

	/**
	 *
	 * @returns instance
	 */
	private capitalize(): UserName {
		const names = this.props.split(' ').filter((name): boolean => {
			return name.length > 1;
		});

		const capitalized: string[] = [];
		for (const name of names) {
			const lowerCaseName =
				name[0].toUpperCase() + name.slice(1).toLowerCase();
			capitalized.push(lowerCaseName);
		}

		const value = this.util
			.string(capitalized.toString())
			.replace(',')
			.to(' ');

		this.props = value;
		return this;
	}

	/**
	 *
	 * @returns check if has a second name
	 */
	hasMiddleName(): boolean {
		return this.props.split(' ').length > 2;
	}

	/**
	 *
	 * @returns check if has last name `first middle last`
	 */
	hasLastName(): boolean {
		return this.props.split(' ').length >= 2;
	}

	/**
	 *
	 * @returns first name
	 */
	getFirstName(): string {
		return this.props.split(' ')[0];
	}

	/**
	 *
	 * @returns middle name if it has more than 2 names, else returns a empty string
	 */
	getMiddleName(): string {
		if (!this.hasMiddleName()) {
			return '';
		}
		return this.props.split(' ')[1];
	}

	/**
	 *
	 * @returns last name if exists else return the name
	 */
	getLastName(): string {
		const names = this.props.split(' ');
		return names[names.length - 1];
	}

	/**
	 * @returns initials as string
	 * @param separator as string char to separate letters
	 * @default separator . (dot)
	 * @example
	 * for a name "Thomas A. Anderson" = "T.A.A"
	 */
	getInitials(separator = '.'): string {
		const names = this.props.split(' ');
		const letters = names.map((name) => name[0]);
		const value = this.util.string(letters.toString());

		const initials = value.replace(',').to(separator);

		return initials;
	}

	validation(value: string): boolean {
		return UserName.isValidProps(value);
	}

	/**
	 * @description check name length min(2) max(40)
	 * @param value name as string
	 * @returns true if provided value is valid and false if not
	 */
	public static isValidProps(value: string): boolean {
		const { string } = this.validator;
		return string(value).hasLengthBetween(
			UserName.MIN_LENGTH,
			UserName.MAX_LENGTH,
		);
	}

	public static create(value: string): Result<UserName> {
		const isValidValue = UserName.isValidProps(value);
		if (!isValidValue) {
			return Result.fail(UserName.MESSAGE);
		}
		return Result.Ok(new UserName(value));
	}
}

export default UserName;
