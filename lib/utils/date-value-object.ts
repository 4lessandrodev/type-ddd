import { Result } from '../core';
import { ValueObject } from '../core';

enum DateFormats {
	'DD-MM-YYYY' = 'DD-MM-YYYY',
	'YYYY-DD-MM' = 'YYYY-DD-MM',
	'YYYY-MM-DD' = 'YYYY-MM-DD',
	'DD-MM-YY' = 'DD-MM-YY',
	'YY-DD-MM' = 'YY-DD-MM',
	'YY-MM-DD' = 'YY-MM-DD',
	'DD-MM-YYYY HH:MM:SS' = 'DD-MM-YYYY HH:MM:SS',
	'YYYY-DD-MM HH:MM:SS' = 'YYYY-DD-MM HH:MM:SS',
	'YYYY-MM-DD HH:MM:SS' = 'YYYY-MM-DD HH:MM:SS',
	'DD-MM-YY HH:MM:SS' = 'DD-MM-YY HH:MM:SS',
	'YY-DD-MM HH:MM:SS' = 'YY-DD-MM',
	'YY-MM-DD HH:MM:SS' = 'YY-MM-DD HH:MM:SS',
	'DD/MM/YYYY' = 'DD/MM/YYYY',
	'YYYY/DD/MM' = 'YYYY/DD/MM',
	'YYYY/MM/DD' = 'YYYY/MM/DD',
	'DD/MM/YY' = 'DD/MM/YY',
	'YY/DD/MM' = 'YY/DD/MM',
	'YY/MM/DD' = 'YY/MM/DD',
	'DD/MM/YYYY HH:MM:SS' = 'DD/MM/YYYY HH:MM:SS',
	'YYYY/DD/MM HH:MM:SS' = 'YYYY/DD/MM HH:MM:SS',
	'YYYY/MM/DD HH:MM:SS' = 'YYYY/MM/DD HH:MM:SS',
	'DD/MM/YY HH:MM:SS' = 'DD/MM/YY HH:MM:SS',
	'YY/DD/MM HH:MM:SS' = 'YY/DD/MM',
	'YY/MM/DD HH:MM:SS' = 'YY/MM/DD HH:MM:SS',
}

type DateFormat = keyof typeof DateFormats;

interface Prop {
	value: Date;
}

export class DateValueObject extends ValueObject<Prop> {
	private readonly ONE_DAY: number = 86400000;
	private readonly ONE_HOUR: number = 3600000;
	private readonly ONE_MINUTE: number = 60000;
	private readonly ONE_MONTH: number = 2678400000;
	private readonly ONE_WEEK: number = 604800000;
	private readonly ONE_YEAR: number = 31622400000;
	protected static readonly DISABLE_SETTER: boolean = true;

	private constructor(props: Prop) {
		super(props, { disableSetters: DateValueObject.DISABLE_SETTER });
	}

	/**
	 * @returns instance value as Date
	 */
	value(): Date {
		return this.props.value;
	}

	/**
	 *
	 * @param days to be added
	 * @returns instance DateValueObject with updated value
	 */
	addDays(days: number): DateValueObject {
		const daysInTime = days * this.ONE_DAY;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime + daysInTime);
		return this;
	}

	/**
	 *
	 * @param months to be added
	 * @returns instance DateValueObject with updated value
	 */
	addMonths(months: number): DateValueObject {
		const monthsInTime = months * this.ONE_MONTH;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime + monthsInTime);
		return this;
	}

	/**
	 *
	 * @param hours to be added
	 * @returns instance DateValueObject with updated value
	 */
	addHours(hours: number): DateValueObject {
		const hoursInTime = hours * this.ONE_HOUR;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime + hoursInTime);
		return this;
	}

	/**
	 *
	 * @param minutes to be added
	 * @returns instance DateValueObject with updated value
	 */
	addMinutes(minutes: number): DateValueObject {
		const minutesInTime = minutes * this.ONE_MINUTE;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime + minutesInTime);
		return this;
	}

	/**
	 *
	 * @param weeks to be added
	 * @returns instance DateValueObject with updated value
	 */
	addWeeks(weeks: number): DateValueObject {
		const weeksInTime = weeks * this.ONE_WEEK;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime + weeksInTime);
		return this;
	}

	/**
	 *
	 * @param years to be added
	 * @returns instance DateValueObject with updated value
	 */
	addYears(years: number): DateValueObject {
		const yearsInTime = years * this.ONE_YEAR;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime + yearsInTime);
		return this;
	}

	/**
	 *
	 * @param days to be subtracted
	 * @returns instance DateValueObject with updated value
	 */
	subtractDays(days: number): DateValueObject {
		const daysInTime = days * this.ONE_DAY;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime - daysInTime);
		return this;
	}

	/**
	 *
	 * @param months to be subtracted
	 * @returns instance DateValueObject with updated value
	 */
	subtractMonths(months: number): DateValueObject {
		const monthsInTime = months * this.ONE_MONTH;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime - monthsInTime);
		return this;
	}

	/**
	 *
	 * @param hours to be subtracted
	 * @returns instance DateValueObject with updated value
	 */
	subtractHours(hours: number): DateValueObject {
		const hoursInTime = hours * this.ONE_HOUR;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime - hoursInTime);
		return this;
	}

	/**
	 *
	 * @param minutes to be subtracted
	 * @returns instance DateValueObject with updated value
	 */
	subtractMinutes(minutes: number): DateValueObject {
		const minutesInTime = minutes * this.ONE_MINUTE;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime - minutesInTime);
		return this;
	}

	/**
	 *
	 * @param weeks to be subtracted
	 * @returns instance DateValueObject with updated value
	 */
	subtractWeeks(weeks: number): DateValueObject {
		const weeksInTime = weeks * this.ONE_WEEK;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime - weeksInTime);
		return this;
	}

	/**
	 *
	 * @param years to be subtracted
	 * @returns instance DateValueObject with updated value
	 */
	subtractYears(years: number): DateValueObject {
		const yearsInTime = years * this.ONE_YEAR;
		const currentTime = this.props.value.getTime();
		this.props.value.setTime(currentTime - yearsInTime);
		return this;
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInDays(date: Date): number {
		const currentDays = this.props.value.getTime() / this.ONE_DAY;
		const dateTime = date.getTime() / this.ONE_DAY;
		const calc = (currentDays * 100 - dateTime * 100) / 100;
		return parseFloat(calc.toFixed(2));
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInHours(date: Date): number {
		const currentDays = this.props.value.getTime() / this.ONE_HOUR;
		const dateTime = date.getTime() / this.ONE_HOUR;
		const calc = (currentDays * 100 - dateTime * 100) / 100;
		return parseFloat(calc.toFixed(2));
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInMinutes(date: Date): number {
		const currentDays = this.props.value.getTime() / this.ONE_MINUTE;
		const dateTime = date.getTime() / this.ONE_MINUTE;
		const calc = (currentDays * 100 - dateTime * 100) / 100;
		return parseFloat(calc.toFixed(2));
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInMonths(date: Date): number {
		const currentDays = this.props.value.getTime() / this.ONE_MONTH;
		const dateTime = date.getTime() / this.ONE_MONTH;
		const calc = (currentDays * 100 - dateTime * 100) / 100;
		return parseFloat(calc.toFixed(2));
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInYears(date: Date): number {
		const currentDays = this.props.value.getTime() / this.ONE_YEAR;
		const dateTime = date.getTime() / this.ONE_YEAR;
		const calc = (currentDays * 100 - dateTime * 100) / 100;
		return parseFloat(calc.toFixed(2));
	}

	/**
	 *
	 * @param date to be compared
	 * @returns result as number
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInWeeks(date: Date): number {
		const currentDays = this.props.value.getTime() / this.ONE_WEEK;
		const dateTime = date.getTime() / this.ONE_WEEK;
		const calc = (currentDays * 100 - dateTime * 100) / 100;
		return parseFloat(calc.toFixed(2));
	}

	private addZero(value: number): string {
		return value < 10 ? `0${value}` : `${value}`;
	}

	/**
	 *
	 * @param format pattern to be applied
	 * @returns formatted date as string
	 */
	format(format: DateFormat): string {
		const date = this.addZero(this.props.value.getDate());
		const fullYear = this.props.value.getFullYear().toString();
		const month = this.addZero(this.props.value.getMonth() + 1);
		const hours = this.addZero(this.props.value.getHours());
		const minutes = this.addZero(this.props.value.getMinutes());
		const sec = this.addZero(this.props.value.getSeconds());

		if (format === 'DD-MM-YY') {
			return `${date}-${month}-${fullYear.slice(2)}`;
		} else if (format === 'DD-MM-YY HH:MM:SS') {
			return `${date}-${month}-${fullYear.slice(
				2
			)} ${hours}:${minutes}:${sec}`;
		} else if (format === 'DD-MM-YYYY') {
			return `${date}-${month}-${fullYear}`;
		} else if (format === 'DD-MM-YYYY HH:MM:SS') {
			return `${date}-${month}-${fullYear} ${hours}:${minutes}:${sec}`;
		} else if (format === 'YY-DD-MM') {
			return `${fullYear.slice(2)}-${date}-${month}`;
		} else if (format === 'YY-DD-MM HH:MM:SS') {
			return `${fullYear.slice(
				2
			)}-${date}-${month} ${hours}:${minutes}:${sec}`;
		} else if (format === 'YY-MM-DD') {
			return `${fullYear.slice(2)}-${date}-${month}`;
		} else if (format === 'YY-MM-DD HH:MM:SS') {
			return `${fullYear.slice(
				2
			)}-${date}-${month} ${hours}:${minutes}:${sec}`;
		} else if (format === 'YYYY-DD-MM HH:MM:SS') {
			return `${fullYear}-${date}-${month} ${hours}:${minutes}:${sec}`;
		} else if (format === 'YYYY-MM-DD') {
			return `${fullYear}-${month}-${date}`;
		} else if (format === 'YYYY-DD-MM') {
			return `${fullYear}-${date}-${month}`;
		} else if (format === 'DD/MM/YY') {
			return `${date}/${month}/${fullYear.slice(2)}`;
		} else if (format === 'DD/MM/YY HH:MM:SS') {
			return `${date}/${month}/${fullYear.slice(
				2
			)} ${hours}:${minutes}:${sec}`;
		} else if (format === 'DD/MM/YYYY') {
			return `${date}/${month}/${fullYear}`;
		} else if (format === 'DD/MM/YYYY HH:MM:SS') {
			return `${date}/${month}/${fullYear} ${hours}:${minutes}:${sec}`;
		} else if (format === 'YY/DD/MM') {
			return `${fullYear.slice(2)}/${date}/${month}`;
		} else if (format === 'YY/DD/MM HH:MM:SS') {
			return `${fullYear.slice(
				2
			)}/${date}/${month} ${hours}:${minutes}:${sec}`;
		} else if (format === 'YY/MM/DD') {
			return `${fullYear.slice(2)}/${date}/${month}`;
		} else if (format === 'YY/MM/DD HH:MM:SS') {
			return `${fullYear.slice(
				2
			)}/${date}/${month} ${hours}:${minutes}:${sec}`;
		} else if (format === 'YYYY/DD/MM HH:MM:SS') {
			return `${fullYear}/${date}/${month} ${hours}:${minutes}:${sec}`;
		} else if (format === 'YYYY/MM/DD') {
			return `${fullYear}/${month}/${date}`;
		} else if (format === 'YYYY/DD/MM') {
			return `${fullYear}/${date}/${month}`;
		} else if (format === 'YYYY/MM/DD HH:MM:SS') {
			return `${fullYear}/${month}/${date} ${hours}:${minutes}:${sec}`;
		}
		return `${fullYear}-${month}-${date} ${hours}:${minutes}:${sec}`;
	}

	public static isValidProps(value: Date): boolean {
		return this.validator.isDate(value);
	}

	/**
	 *
	 * @param date optional value as date.
	 * If provide It will be checked, If It not be provided instance value will be considered
	 * @returns true if date day is week day [Monday-Friday]
	 */
	isWeekday(date?: Date): boolean {
		const day = date?.getDay() ?? this.props.value.getDay();
		return day > 0 && day < 6;
	}

	/**
	 *
	 * @param date optional value as date.
	 * If provide It will be checked, If It not be provided instance value will be considered
	 * @returns true if date day is weekend day [Sat-Sunday]
	 */
	isWeekend(date?: Date): boolean {
		const day = date?.getDay() ?? this.props.value.getDay();
		return day === 6 || day === 0;
	}

	/**
	 *
	 * @param date as Date
	 * @returns true or false. True if instance date is greater than provided value
	 * @example
	 *
	 * const date = new Date("1989-05-31 11:42:00");
	 *
	 * const valueObj = DateValueObject.create(date).value();
	 *
	 * const isAfter = valueObj.isAfter(new Date());
	 *
	 * console.log(isAfter);
	 *
	 * > false
	 *
	 * ...
	 */
	isAfter(date: Date): boolean {
		const time = date.getTime();
		const instanceTime = this.props.value.getTime();
		return instanceTime > time;
	}

	/**
	 *
	 * @param date as Date
	 * @returns true or false. True if instance date is less than provided value
	 * @example
	 *
	 * const date = new Date("1989-05-31 11:42:00");
	 *
	 * const valueObj = DateValueObject.create(date).value();
	 *
	 * const isBefore = valueObj.isBefore(new Date());
	 *
	 * console.log(isBefore);
	 *
	 * > true
	 *
	 * ...
	 */
	isBefore(date: Date): boolean {
		const time = date.getTime();
		const instanceTime = this.props.value.getTime();
		return instanceTime < time;
	}

	validation(value: Date): boolean {
		return this.validator.isDate(value);
	}

	/**
	 *
	 * @param date as Date
	 * @returns true or false. True if instance date is equal to provided value
	 */
	isEqual(date: Date): boolean {
		const time = date.getTime();
		const instanceTime = this.props.value.getTime();
		return instanceTime === time;
	}

	public static create(date?: Date): Result<DateValueObject> {
		const value = date ?? new Date();
		const isValid = DateValueObject.isValidProps(value);
		if (!isValid) return Result.fail('Invalid Date Value');

		return Result.Ok(new DateValueObject({ value }));
	}
}
