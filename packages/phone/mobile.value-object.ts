import { Result, ValueObject } from 'rich-domain';
import { UfForCode, ddd, AreaCodes } from './ddd.list';

const regexHash =
	/^\([1-9]{2}\)\s[9](?!\d(?:(\d)\1{2})-(\d)\1{3})[5-9][0-9]{3}\-[0-9]{4}$|^[1-9]{2}9[0-9]{8}$/;
const regexHashSpecialChars = /\(|\)|-|\s/g;

/**
 * @description Brazilian Mobile Phone Number
 * @default (XX) 9XXXX-XXXX
 */
class MobilePhone extends ValueObject<string> {
	protected static readonly REGEX = regexHash;
	protected static readonly MESSAGE: string = 'Invalid Mobile Phone Number';

	private constructor(prop: string) {
		super(prop);
	}

	toPattern(): string {
		return MobilePhone.addMask(this.props);
	}

	/**
	 *
	 * @param value Phone number (XX) 9XXXX-XXXX
	 * @returns true if pattern match and false if not.
	 */
	public static isValidProps(value: string): boolean {
		const isValidDDD = AreaCodes.includes(this.code(value));
		const matchPattern = this.validator.string(value).match(MobilePhone.REGEX);
		return isValidDDD && matchPattern;
	}

	public static isValid(value: string): boolean {
		return MobilePhone.isValidProps(value);
	}

	isMobile(): boolean {
		return true;
	};

	isHome(): boolean {
		return false;
	};

	/**
	 * @returns value XX9XXXXXXXX as string
	 */
	value(): string {
		return this.props;
	}

	/**
	 *
	 * @returns only numbers without special chars. Includes 0 and DDD.
	 * @example 01199502301
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
		const partA = phone.slice(2, 7);
		const partB = phone.slice(7, 11);
		return `(${ddd}) ${partA}-${partB}`;
	}

	/**
	 * 
	 * @param value value as string
	 * @returns instance of MobilePhone or throw an error
	 */
	public static init(value: string): MobilePhone {
		const isValidValue = MobilePhone.isValidProps(value);
		if (!isValidValue) throw new Error(MobilePhone.MESSAGE);
		const phone = this.removeSpecialChars(value);
		return new MobilePhone(phone);
	}

	/**
	 *
	 * @param value Brazilian Mobile phone number
	 * @example (XX) 9XXXX-XXXX
	 * @returns Result of MobilePhoneValueObject
	 */
	public static create(value: string): Result<MobilePhone> {
		if (!MobilePhone.isValidProps(value)) {
			return Result.fail(MobilePhone.MESSAGE);
		}
		const phone = this.removeSpecialChars(value);
		return Result.Ok(new MobilePhone(phone));
	}
}

export { MobilePhone };
export default MobilePhone;
