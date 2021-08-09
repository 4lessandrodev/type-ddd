import { Result, ValueObject } from "..";

interface Prop {
	value: Date;
}

export class BirthdayValueObject extends ValueObject<Prop>{
	private readonly ONE_YEAR: number = 31536000902;
	private constructor(prop: Prop) {
		super(prop);
	}

	/**
	 * @returns the birthday date
	 */
	get value(): Date {
		return this.props.value;
	}

	/**
	 * @description this method round the age
	 * @returns age as number
	 */
	getAgeInYears(): number {
		const now = new Date().getTime();
		const difference = now - this.props.value.getTime();
		const ageInYears = (difference / this.ONE_YEAR);
		return Math.trunc(ageInYears);
	}

	/**
	 * 
	 * @param date birthday as Date
	 * @returns true if is a valid age for a human
	 */
	public static isValidValue(date: Date): boolean {
		const now = new Date();
		const isBeforeToday = date < now;
		const hasLessThan121YearsOld = (now.getFullYear() - date.getFullYear()) < 121;
		return (isBeforeToday && hasLessThan121YearsOld);
	}

	public static create(value: Date): Result<BirthdayValueObject>{
		if (!BirthdayValueObject.isValidValue(value)){
			return Result.fail<BirthdayValueObject>('Invalid age for a human. Must has less than 121 years old and birth not in future');
		}
		return Result.ok<BirthdayValueObject>(new BirthdayValueObject({ value }));
	}
}
