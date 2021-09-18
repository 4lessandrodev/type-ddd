import { Result, ValueObject } from '..';

interface Prop {
	value: string;
}

export class UserNameValueObject extends ValueObject<Prop> {
	private constructor(props: Prop) {
		super(props);
		this.capitalize();
	}

	/**
	 * @returns capitalized full name
	 */
	get value(): string {
		return this.props.value;
	}

	private capitalize(): void {
		const names = this.props.value.split(' ');
		const capitalized: string[] = [];
		for (const name of names) {
			const lowerCaseName =
				name[0].toUpperCase() + name.slice(1).toLowerCase();
			capitalized.push(lowerCaseName);
		}
		this.props.value = capitalized.toString().replace(/,/g, ' ');
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
	 * @example
	 * for a name "Thomas A. Anderson" = "T.A.A"
	 */
	getInitials(): string {
		const names = this.props.value.split(' ');
		const letters = names.map((name) => name[0]);
		const initials = letters.toString().replace(/,/g, '.');
		return initials;
	}

	/**
	 * @description check name length min(2) max(40)
	 * @param value name as string
	 * @returns true if provided value is valid and false if not
	 */
	public static isValidValue(value: string): boolean {
		return value.length >= 2 && value.length <= 40;
	}

	public static create(value: string): Result<UserNameValueObject> {
		const isValidValue = UserNameValueObject.isValidValue(value);
		if (!isValidValue) {
			return Result.fail<UserNameValueObject>(
				'Invalid name length. Must has min 2 and max 40 chars'
			);
		}
		return Result.ok<UserNameValueObject>(
			new UserNameValueObject({ value })
		);
	}
}

export default UserNameValueObject;
