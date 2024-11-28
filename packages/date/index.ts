import { Result, ValueObject } from 'rich-domain';
import { TimeZones } from './types';

const timeFormat12h = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
const timeFormat24h = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

function commonDateFormat(timeFormat = null) {
  const date = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const time = timeFormat ? { ...timeFormat } : null;
  return { date, time };
}

const DateFormats = {
  // only dates
  'DD-MM-YYYY': commonDateFormat(),
  'MM-DD-YYYY': commonDateFormat(),
  'DD-MM-YY': commonDateFormat(),
  'MM-DD-YY': commonDateFormat(),

  'MM/DD/YYYY': commonDateFormat(),
  'MM/DD/YY': commonDateFormat(),
  'DD/MM/YYYY': commonDateFormat(),
  'DD/MM/YY': commonDateFormat(),

  'YYYY-MM-DD': commonDateFormat(),
  'YYYY/MM/DD': commonDateFormat(),

  // separate with dot
  'DD.MM.YYYY': commonDateFormat(),
  'MM.DD.YYYY': commonDateFormat(),
  'DD.MM.YY': commonDateFormat(),
  'MM.DD.YY': commonDateFormat(),
  'YYYY.MM.DD': commonDateFormat(),

  'DD.MM.YYYY hh:mm:ss': commonDateFormat(timeFormat12h),
  'DD.MM.YY hh:mm:ss': commonDateFormat(timeFormat12h),
  'MM.DD.YYYY hh:mm:ss': commonDateFormat(timeFormat12h),
  'MM.DD.YY hh:mm:ss': commonDateFormat(timeFormat12h),

  'DD.MM.YYYY HH:mm:ss': commonDateFormat(timeFormat24h),
  'DD.MM.YY HH:mm:ss': commonDateFormat(timeFormat24h),
  'MM.DD.YYYY HH:mm:ss': commonDateFormat(timeFormat24h),
  'MM.DD.YY HH:mm:ss': commonDateFormat(timeFormat24h),

  'YYYY.MM.DD hh:mm:ss': commonDateFormat(timeFormat12h),
  'YYYY.MM.DD HH:mm:ss': commonDateFormat(timeFormat24h),

  // with time 12h
  'DD/MM/YYYY hh:mm:ss': commonDateFormat(timeFormat12h),
  'DD-MM-YYYY hh:mm:ss': commonDateFormat(timeFormat12h),
  'DD/MM/YY hh:mm:ss': commonDateFormat(timeFormat12h),
  'DD-MM-YY hh:mm:ss': commonDateFormat(timeFormat12h),
  'MM/DD/YYYY hh:mm:ss': commonDateFormat(timeFormat12h),
  'MM-DD-YYYY hh:mm:ss': commonDateFormat(timeFormat12h),
  'MM/DD/YY hh:mm:ss': commonDateFormat(timeFormat12h),
  'MM-DD-YY hh:mm:ss': commonDateFormat(timeFormat12h),

  // with time 24h
  'DD/MM/YYYY HH:mm:ss': commonDateFormat(timeFormat24h),
  'DD-MM-YYYY HH:mm:ss': commonDateFormat(timeFormat24h),
  'DD/MM/YY HH:mm:ss': commonDateFormat(timeFormat24h),
  'DD-MM-YY HH:mm:ss': commonDateFormat(timeFormat24h),
  'MM/DD/YYYY HH:mm:ss': commonDateFormat(timeFormat24h),
  'MM-DD-YYYY HH:mm:ss': commonDateFormat(timeFormat24h),
  'MM/DD/YY HH:mm:ss': commonDateFormat(timeFormat24h),
  'MM-DD-YY HH:mm:ss': commonDateFormat(timeFormat24h),

  // manual
  'YYYY/MM/DD hh:mm:ss': commonDateFormat(timeFormat12h),
  'YYYY-MM-DD hh:mm:ss': commonDateFormat(timeFormat12h),

  'YYYY/MM/DD HH:mm:ss': commonDateFormat(timeFormat24h),
  'YYYY-MM-DD HH:mm:ss': commonDateFormat(timeFormat24h),
};

type DateFormat = keyof typeof DateFormats;

type FormatParams = { date: Intl.DateTimeFormatOptions; time: Intl.DateTimeFormatOptions | null };

export class Dates extends ValueObject<Date> {
	protected static readonly MESSAGE: string = 'Invalid date value';
	private readonly ONE_DAY: number = 86400000;
	private readonly ONE_HOUR: number = 3600000;
	private readonly ONE_MINUTE: number = 60000;
	private readonly ONE_MONTH: number = 2678400000;
	private readonly ONE_WEEK: number = 604800000;
	private readonly ONE_YEAR: number = 31622400000;

	private constructor(props: Date) {
		super(props);
	}

	/**
	 * @returns instance value as Date
	 */
	value(): Date {
		return this.props;
	}

	/**
	 *
	 * @param days as number to be added
	 * @returns instance of Dates with updated value
	 */
	addDays(days: number): Dates {
		return new Dates(this.util.date(this.props).add(days).days());
	}

	/**
	 *
	 * @param months as number to be added
	 * @returns instance of Dates with updated value
	 */
	addMonths(months: number): Dates {
		return new Dates(this.util.date(this.props).add(months).months());
	}

	/**
	 *
	 * @param hours as number to be added
	 * @returns instance of Dates with updated value
	 */
	addHours(hours: number): Dates {
		return new Dates(this.util.date(this.props).add(hours).hours());
	}

	/**
	 *
	 * @param minutes as number to be added
	 * @returns instance of Dates with updated value
	 */
	addMinutes(minutes: number): Dates {
		return new Dates(this.util.date(this.props).add(minutes).minutes());
	}

	/**
	 *
	 * @param weeks as number to be added
	 * @returns instance of Dates with updated value
	 */
	addWeeks(weeks: number): Dates {
		return new Dates(this.util.date(this.props).add(weeks).weeks());
	}

	/**
	 *
	 * @param years as number to be added
	 * @returns instance of Dates with updated value
	 */
	addYears(years: number): Dates {
		return new Dates(this.util.date(this.props).add(years).years());
	}

	/**
	 *
	 * @param days as number to be subtracted
	 * @returns instance of Dates with updated value
	 */
	subtractDays(days: number): Dates {
		return new Dates(this.util.date(this.props).remove(days).days());
	}

	/**
	 *
	 * @param months as number to be subtracted
	 * @returns instance of Dates with updated value
	 */
	subtractMonths(months: number): Dates {
		return new Dates(this.util.date(this.props).remove(months).months());
	}

	/**
	 *
	 * @param hours as number to be subtracted
	 * @returns instance of Dates with updated value
	 */
	subtractHours(hours: number): Dates {
		return new Dates(this.util.date(this.props).remove(hours).hours());
	}

	/**
	 *
	 * @param minutes as number to be subtracted
	 * @returns instance of Dates with updated value
	 */
	subtractMinutes(minutes: number): Dates {
		return new Dates(this.util.date(this.props).remove(minutes).minutes());
	}

	/**
	 *
	 * @param weeks as number to be subtracted
	 * @returns instance of Dates with updated value
	 */
	subtractWeeks(weeks: number): Dates {
		return new Dates(this.util.date(this.props).remove(weeks).weeks());
	}

	/**
	 *
	 * @param years as number to be subtracted
	 * @returns instance of Dates with updated value
	 */
	subtractYears(years: number): Dates {
		return new Dates(this.util.date(this.props).remove(years).years());
	}

	/**
	 *
	 * @param date as Date to be compared or instance of Dates
	 * @returns result as number of days
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInDays(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_DAY;
			const dateTime = date.getTime() / this.ONE_DAY;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInDays(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared or instance of Dates
	 * @returns result as number of hours
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInHours(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_HOUR;
			const dateTime = date.getTime() / this.ONE_HOUR;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInHours(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared or instance of Dates
	 * @returns result as number of minutes
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInMinutes(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_MINUTE;
			const dateTime = date.getTime() / this.ONE_MINUTE;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInMinutes(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared or Dates
	 * @returns result as number of months
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInMonths(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_MONTH;
			const dateTime = date.getTime() / this.ONE_MONTH;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInMonths(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared or Dates
	 * @returns result as number of years
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInYears(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_YEAR;
			const dateTime = date.getTime() / this.ONE_YEAR;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInYears(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param date to be compared or instance of Dates
	 * @returns result as number of weeks
	 * @summary returns positive result if instance value is greater than provided value
	 */
	differenceInWeeks(date: Date | Dates): number {
		if (date instanceof Date) {
			const currentDays = this.props.getTime() / this.ONE_WEEK;
			const dateTime = date.getTime() / this.ONE_WEEK;
			const calc = (currentDays * 100 - dateTime * 100) / 100;
			return parseFloat(calc.toFixed(2));
		}
		if (date instanceof Dates) {
			return this.differenceInWeeks(date.value());
		}
		return 0;
	}

	/**
	 *
	 * @param format pattern to be applied
	 * @param timeZone as TimeZone name as string to be considered
	 * @returns formatted date as string
	 */
	format(format: DateFormat, timeZone?: TimeZones): string {
		const firstChars = format.slice(0, 2);
		const dateLocale = firstChars === 'DD' ? 'pt-BR' : 'en-US';
		const formatDate = (date: Date, formats: FormatParams) => {

			const locale = (format.slice(0, 2) === 'YY') ? 'sv-SE' : undefined;
			const year = (format.includes('YYYY')) ? 'numeric' : '2-digit';

			const dateFn = new Intl.DateTimeFormat(locale || dateLocale, {
				month: '2-digit',
				day: '2-digit',
				...(formats?.date ?? {}),
				year,
				timeZone
			}).format(date);

			if (formats?.time) {
				const timeFn = new Intl.DateTimeFormat(dateLocale, {
					...formats.time,
					timeZone
				}).format(date);
				return { dateFn, timeFn }
			}

			return { dateFn, timeFn: '' };
		};
		const result = formatDate(this.props, DateFormats[format] as FormatParams);

		const applySeparator = (date: string): string => {
			if (format.includes('/')) return date.replace(/-/g, '/');
			if (format.includes('-')) return date.replace(/\//g, '-');
			if (format.includes('.')) return date.replace(/\/|\-/g, '.');
			return date;
		}
		return applySeparator(`${result.dateFn} ${result.timeFn}`.trim());
	}

	/**
	 * @param value as Date or date string
	 * @returns true if provided value is instance of date, and false if not.
	 */
	public static isValidProps(value: Date | string | number): boolean {
		if(typeof value === 'number') {
			const date = new Date(value);
			return date instanceof Date;
		}
		if (typeof value === 'string') {
			const date = new Date(value);
			return (
				!isNaN(date as unknown as number) &&
				date.toISOString().slice(0, 10) === value &&
				!isNaN(date.getFullYear())
			);
		}
		return this.validator.isDate(value);
	}

	/**
	 * @param value as Date or date string or number as timestamp
	 * @returns true if provided value is instance of date, and false if not.
	 */
	public static isValid(value: Date | string): boolean {
		return this.isValidProps(value);
	}

	/**
	 *
	 * @returns true if date day is week day [Monday-Friday]
	 */
	isWeekday(): boolean {
		return !this.isWeekend()
	}

	/**
	 *
	 * @returns true if date value day is weekend day [Saturday-Sunday]
	 */
	isWeekend(): boolean {
		return this.validator.date(this.props).isWeekend();
	}

	/**
	 *
	 * @param date value as date.
	 * @returns true if date day is week day [Monday-Friday]
	 */
	public static isWeekday(date: Date): boolean {
		return !this.isWeekend(date);
	}

	/**
	 *
	 * @param date value as date.
	 * @returns true if date day is weekend day [Sat-Sunday]
	 */
	public static isWeekend(date: Date): boolean {
		return this.validator.date(date).isWeekend();
	}

	/**
	 *
	 * @param date as Date or instance of Dates
	 * @returns true or false. True if instance date is greater than provided value
	 * @example
	 *
	 * const date = new Date("1989-05-31 11:42:00");
	 *
	 * const vo = Dates.create(date).value();
	 *
	 * const isAfter = vo.isAfter(new Date());
	 *
	 * console.log(isAfter);
	 *
	 * > false
	 *
	 * ...
	 */
	isAfter(date: Date | Dates): boolean {
		if (date instanceof Date) {
			return this.validator.date(this.props).isAfterThan(date);
		}
		if (date instanceof Dates) {
			return this.isAfter(date.value());
		}
		return false;
	}

	/**
	 *
	 * @param date as Date or instance of Dates
	 * @returns true or false. True if instance date is less than provided value
	 * @example
	 *
	 * const date = new Date("1989-05-31 11:42:00");
	 *
	 * const vo = Dates.create(date).value();
	 *
	 * const isBefore = vo.isBefore(new Date());
	 *
	 * console.log(isBefore);
	 *
	 * > true
	 *
	 * ...
	 */
	isBefore(date: Date | Dates): boolean {
		if (date instanceof Date) {
			return this.validator.date(this.props).isBeforeThan(date);
		}
		if (date instanceof Dates) {
			return this.isBefore(date.value());
		}
		return false;
	}

	/**
	 *
	 * @param date as Date or instance of Dates
	 * @returns true or false. True if instance date is equal to provided value
	 */
	isEqualDate(date: Date | Dates): boolean {
		if (date instanceof Date) {
			const time = date.getTime();
			const instanceTime = this.props.getTime();
			return this.validator.number(time).isEqualTo(instanceTime);
		}
		if (date instanceof Dates) {
			return this.isEqualDate(date.value());
		}
		return false;
	}

	/**
	 * 
	 * @param value value as Date or date string or number as timestamp
	 * @returns instance of Dates or throw an error
	 */
	public static init(value?: Date | string | number): Dates {
		if (!value) return new Dates(new Date());
		const isValidValue = Dates.isValidProps(value);
		if (!isValidValue) throw new Error(Dates.MESSAGE);
		if (value instanceof Date) return new Dates(value);
		return new Dates(new Date(value));
	}

	/**
	 * 
	 * @param value value as Date or date string or number as timestamp
	 * @returns Result of Dates
	 */
	public static create(date?: Date | string | number): Result<Dates | null> {
		const value = date ?? new Date();
		const isValid = Dates.isValidProps(value);
		if (!isValid) return Result.fail(Dates.MESSAGE);
		if (value instanceof Date) return Result.Ok(new Dates(value));
		return Result.Ok(new Dates(new Date(value)));
	}
}

export default Dates;
