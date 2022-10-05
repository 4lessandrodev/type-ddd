import { ValueObject } from '../core';
import { Result } from '../core';

interface Prop {
	value: string;
}

export class UserNameValueObject extends ValueObject<Prop> {
	protected static readonly MAX_LENGTH: number = 41;
	protected static readonly MIN_LENGTH: number = 2;
	protected static readonly DISABLE_SETTER: boolean = true;

	private constructor(props: Prop) {
		super(props, { disableSetters: UserNameValueObject.DISABLE_SETTER });
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
		const names = this.props.value.split(' ');
		const capitalized: string[] = [];
		for (const name of names) {
			const lowerCaseName =
				name[0].toUpperCase() + name.slice(1).toLowerCase();
			capitalized.push(lowerCaseName);
		}
		this.props.value = capitalized.toString().replace(/,/g, ' ');
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
	 * @example
	 * for a name "Thomas A. Anderson" = "T.A.A"
	 */
	getInitials(): string {
		const names = this.props.value.split(' ');
		const letters = names.map((name) => name[0]);
		const initials = letters.toString().replace(/,/g, '.');
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
			UserNameValueObject.MAX_LENGTH
		);
	}

	public static create(value: string): Result<UserNameValueObject> {
		const isValidValue = UserNameValueObject.isValidProps(value);
		if (!isValidValue) {
			const max = UserNameValueObject.MAX_LENGTH;
			const min = UserNameValueObject.MIN_LENGTH;
			return Result.fail(
				`Invalid name length. Must has min ${min} and max ${max} chars`
			);
		}
		return Result.Ok(new UserNameValueObject({ value }));
	}
}

export default UserNameValueObject;
