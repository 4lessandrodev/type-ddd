import { Result, ValueObject } from 'rich-domain';

const regexHash = /^\([1-9]{2}\)\s[2-5][0-9]{3}\-[0-9]{4}$/;
const regexHashSpecialChars = /\(|\)|-|\s/g;


/**
 * @description Brazilian Home Phone Number
 * @default (XX) XXXX-XXXX
 */
class HomePhone extends ValueObject<string> {
	protected static readonly REGEX = regexHash;
	protected static readonly MESSAGE: string = 'Invalid Home Phone Number';

	private constructor(prop: string) {
		super(prop);
	}

	public static isValid(value: string): boolean {
		return this.isValidProps(value);
	}

	/**
	 *
	 * @param value Phone number (XX) XXXX-XXXX
	 * @returns true if pattern match and false if not.
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(HomePhone.REGEX);
	}

	/**
	 * @returns value (XX) XXXX-XXXX as string
	 */
	value(): string {
		return this.props;
	}

	/**
	 *
	 * @returns only numbers without special chars. Includes DDD.
	 * @example 1122502301
	 */
	numbers(): number {
		const onlyNumbersAsString = this.props.replace(
			regexHashSpecialChars,
			'',
		);
		return parseInt(onlyNumbersAsString);
	}

	/**
	 *
	 * @returns DDD only as number
	 * @example 11
	 */
	ddd(): number {
		return parseInt(this.props.slice(1, 3));
	}

	public static removeSpecialChars(cell: string): string {
		return this.util.string(cell).removeSpecialChars();
	}

	public static addMask(cell: string): string {
		const phone = this.removeSpecialChars(cell);
		const ddd = phone.slice(0,2);
		const partA = phone.slice(2, 7);
		const partB = phone.slice(7);
		return `(${ddd}) ${partA}-${partB}`;
	}

	/**
	 * 
	 * @param value value as string
	 * @returns instance of HomePhone or throw an error
	 */
	public static init(value: string): HomePhone {
		const isValidValue = HomePhone.isValidProps(value);
		if (!isValidValue) throw new Error(HomePhone.MESSAGE);
		return new HomePhone(value);
	}

	/**
	 *
	 * @param value Brazilian home phone number
	 * @example (XX) XXXX-XXXX
	 * @returns Result of HomePhoneValueObject
	 */
	public static create(value: string): Result<HomePhone> {
		if (!HomePhone.isValidProps(value)) {
			return Result.fail(HomePhone.MESSAGE);
		}
		return Result.Ok(new HomePhone(value));
	}
}

export { HomePhone };
export default HomePhone;
