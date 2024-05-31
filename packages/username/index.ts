import { Result, ValueObject } from 'rich-domain';

export class UserName extends ValueObject<string> {
	protected static readonly MAX_LENGTH: number = 82;
	protected static readonly MIN_LENGTH: number = 2;
	protected static readonly MESSAGE: string = `Invalid name length. Must has min ${UserName.MIN_LENGTH} and max ${UserName.MAX_LENGTH} chars`;

	private constructor(props: string) {
		super(props);
	}

	/**
	 * @returns capitalized full name
	 */
	value(): string {
		return this.props.trim();
	}

	/**
	 *
	 * @returns capitalize full name as string
	 */
	public static capitalize(fullName: string): string {
		const names = fullName.split(' ').filter((name): boolean => {
			return name.length > 1;
		});

		const capitalizedName = (name: string): string => {
			return name[0].toUpperCase() + name.slice?.(1)?.toLowerCase();
		};

		const capitalized: string[] = [];
		for (const name of names) {
			const lowerCaseName = capitalizedName(name);
			capitalized.push(lowerCaseName);
		}

		return capitalized.toString().replace(/,/g, ' ');
	}

	/**
	 * @description get upper case name from instance
	 * @returns upperCase full name as string
	 */
	upperCase(): string {
		return this.props.toUpperCase();
	}

	/**
	 * @description get lower case name from instance
	 * @returns lowerCase full name as string
	 */
	lowerCase(): string {
		return this.props.toLowerCase();
	}

	/**
	 *
	 * @returns check if has a second name
	 */
	hasMiddleName(): boolean {
		return this.props.split(' ').length > 2;
	}

	title(title: string) {
		return {
			firstName: (): string => title + ' ' + this.firstName(),
			fullName: (): string => title + ' ' + this.value(),
			lastName: (): string => title + ' ' + this.lastName(),
			middleName: (): string => title + ' ' + this.middleName(),
		}
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
	firstName(title: string = ''): string {
		return (title + ' ' + this.props.split(' ')[0])?.trim();
	}

	/**
	 *
	 * @returns middle name if it has more than 2 names, else returns a empty string
	 */
	middleName(): string {
		if (!this.hasMiddleName()) {
			return '';
		}
		return this.props.split(' ')[1]?.trim();
	}

	/**
	 *
	 * @returns last name if exists else return the name
	 */
	lastName(): string {
		const names = this.props.split(' ');
		return names.at(-1)?.trim();
	}

	/**
	 * @returns initials as string
	 * @param separator as string char to separate letters
	 * @default separator (empty)
	 * @example
	 * for a name "Thomas A. Anderson" = "TAA"
	 */
	initials(separator = ''): string {
		const names = this.props.split(' ');
		const letters = names.map((name): string => name[0]);
		const value = this.util.string(letters.toString());

		const initials = value.replace(',').to(separator);

		return initials;
	}

	/**
	 * 
	 * @param value value as string
	 * @returns instance of UserName or throw an error
	 */
	public static init(value: string): UserName {
		const isValidValue = UserName.isValidProps(value);
		if (!isValidValue) throw new Error(UserName.MESSAGE);
		const capitalized = UserName.capitalize(value);
		return new UserName(capitalized);
	}

	/**
	 * @description check name length min(2) max(40)
	 * @param value name as string
	 * @returns true if provided value is valid and false if not
	 */
	public static isValid(value: string): boolean {
		return this.isValidProps(value);
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
		const capitalized = UserName.capitalize(value);
		return Result.Ok(new UserName(capitalized));
	}
}

export default UserName;
