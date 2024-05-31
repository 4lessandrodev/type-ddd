import { Result, ValueObject } from 'rich-domain';
import { AreaCodes, UfForCode, ddd } from './ddd.list';
const regexHash = /^\([1-9]{2}\)\s[2-5][0-9]{3}\-[0-9]{4}$|^[1-9]{2}[2-5]{1}[0-9]{7}$/;
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

	toPattern(): string {
		return HomePhone.addMask(this.props);
	}

	isMobile(): boolean {
		return false;
	};

	isHome(): boolean {
		return true;
	};

	public static isValid(value: string): boolean {
		return this.isValidProps(value);
	}

	/**
	 *
	 * @param value Phone number (XX) XXXX-XXXX
	 * @returns true if pattern match and false if not.
	 */
	public static isValidProps(value: string): boolean {
		const isValidDDD = AreaCodes.includes(this.code(value));
		const matchPattern = this.validator.string(value).match(HomePhone.REGEX);
		return isValidDDD && matchPattern;
	}

	/**
	 * @returns value XXXXXXXXXX as string
	 */
	value(): string {
		return this.props;
	}

	/**
	 *
	 * @returns only numbers without special chars. Includes 0 and DDD.
	 * @example 01122502301
	 */
	toCall(): string {
		const onlyNumbersAsString = this.props;
		return `0${onlyNumbersAsString}`;
	}

	number(): string {
		return this.props.slice(2);
	}

	/**
	 *
	 * @returns only area code (DDD) as number
	 * @example 11
	 */
	code(): ddd {
		return parseInt(this.props.slice(0, 2)) as ddd;
	}

	/**
	 *
	 * @returns only area code (DDD) as number
	 * @example 11
	 */
	public static code(phone: string): ddd {
		const value = this.util.string(phone).removeSpecialChars();
		return parseInt(value.slice(0, 2)) as ddd;
	}

	uf() {
		const ddd = this.code();
		return UfForCode[ddd];
	}

	public static removeSpecialChars(cell: string): string {
		const value = this.util.string(cell).removeSpecialChars();
		return this.util.string(value).removeSpaces();
	}

	public static addMask(cell: string): string {
		const phone = this.removeSpecialChars(cell);
		const ddd = phone.slice(0, 2);
		const partA = phone.slice(2, 6);
		const partB = phone.slice(6, 10);
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
		const phone = this.removeSpecialChars(value);
		return new HomePhone(phone);
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
		const phone = this.removeSpecialChars(value);
		return Result.Ok(new HomePhone(phone));
	}
}

export { HomePhone };
export default HomePhone;
