import { ValueObject } from '../core';
import { Result } from '../core';

interface Prop {
	value: Date;
}

export class BirthdayValueObject extends ValueObject<Prop> {
	private readonly ONE_YEAR: number = 31536000902;
	private constructor(prop: Prop) {
		super(prop);
	}

	/**
	 * @returns the birthday date
	 */
	value(): Date {
		return this.props.value;
	}

	/**
	 * @description this method round the age
	 * @returns age as number
	 */
	getAgeAsYearsOld(): number {
		const now = new Date().getTime();
		const difference = now - this.props.value.getTime();
		const ageInYears = difference / this.ONE_YEAR;
		return Math.trunc(ageInYears);
	}

	/**
	 *
	 * @param age as number
	 * @returns true if instance value is greater than provided value else return false
	 */
	isAgeGreaterThan(age: number): boolean {
		const yearOld = this.getAgeAsYearsOld();
		return age < yearOld;
	}

	/**
	 *
	 * @param age as number
	 * @returns true if instance value is equal to provided value else return false
	 */
	isAgeEqualTo(age: number): boolean {
		const yearOld = this.getAgeAsYearsOld();
		return age === yearOld;
	}

	/**
	 *
	 * @param date birthday as Date
	 * @returns true if is a valid age for a human
	 */
	public static isValidValue(date: Date): boolean {
		const now = new Date();
		const isBeforeToday = date < now;
		const hasLessThan121YearsOld =
			now.getFullYear() - date.getFullYear() < 121;
		return isBeforeToday && hasLessThan121YearsOld;
	}

	public static create(value: Date): Result<BirthdayValueObject> {
		if (!BirthdayValueObject.isValidValue(value)) {
			return Result.fail(
				'Invalid age for a human. Must has less than 121 years old and birth not in future'
			);
		}
		return Result.success(new BirthdayValueObject({ value }));
	}
}

export default BirthdayValueObject;
