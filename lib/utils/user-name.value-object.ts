import { Result, ValueObject } from 'rich-domain';

interface Prop {
	value: string;
}

export class UserNameValueObject extends ValueObject<Prop> {
	protected static readonly MAX_LENGTH: number = 41;
	protected static readonly MIN_LENGTH: number = 2;
	protected static readonly MESSAGE: string = `Invalid name length. Must has min ${UserNameValueObject.MIN_LENGTH} and max ${UserNameValueObject.MAX_LENGTH} chars`;

	private constructor(props: Prop) {
		super(props);
		this.capitalize();
	}

	/**
	 * @returns capitalized full name
	 */
	value(): string {
		return this.props.value;
	}

	/**
	 *
	 * @returns instance
	 */
	private capitalize(): UserNameValueObject {
		const names = this.props.value.split(' ').filter((name): boolean => {
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

		this.props.value = value;
		return this;
	}

	/**
	 *
	 * @returns check if has a second name
	 */
	hasMiddleName(): boolean {
		return this.props.value.split(' ').length > 2;
	}

	/**
	 *
	 * @returns check if has last name `first middle last`
	 */
	hasLastName(): boolean {
		return this.props.value.split(' ').length >= 2;
	}

	/**
	 *
	 * @returns first name
	 */
	getFirstName(): string {
		return this.props.value.split(' ')[0];
	}

	/**
	 *
	 * @returns middle name if it has more than 2 names, else returns a empty string
	 */
	getMiddleName(): string {
		if (!this.hasMiddleName()) {
			return '';
		}
		return this.props.value.split(' ')[1];
	}

	/**
	 *
	 * @returns last name if exists else return the name
	 */
	getLastName(): string {
		const names = this.props.value.split(' ');
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
		const names = this.props.value.split(' ');
		const letters = names.map((name) => name[0]);
		const value = this.util.string(letters.toString());

		const initials = value.replace(',').to(separator);

		return initials;
	}

	validation(value: string): boolean {
		return UserNameValueObject.isValidProps(value);
	}

	/**
	 * @description check name length min(2) max(40)
	 * @param value name as string
	 * @returns true if provided value is valid and false if not
	 */
	public static isValidProps(value: string): boolean {
		const { string } = this.validator;
		return string(value).hasLengthBetween(
			UserNameValueObject.MIN_LENGTH,
			UserNameValueObject.MAX_LENGTH,
		);
	}

	public static create(value: string): Result<UserNameValueObject> {
		const isValidValue = UserNameValueObject.isValidProps(value);
		if (!isValidValue) {
			return Result.fail(UserNameValueObject.MESSAGE);
		}
		return Result.Ok(new UserNameValueObject({ value }));
	}
}

export default UserNameValueObject;
