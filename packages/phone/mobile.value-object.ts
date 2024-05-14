import { Result, ValueObject } from 'rich-domain';

const regexHash =
	/^\([1-9]{2}\)\s[9](?!\d(?:(\d)\1{2})-(\d)\1{3})[5-9][0-9]{3}\-[0-9]{4}$/;
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

	/**
	 *
	 * @param value Phone number (XX) 9XXXX-XXXX
	 * @returns true if pattern match and false if not.
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(MobilePhone.REGEX);
	}

	validation(value: string): boolean {
		return MobilePhone.isValidProps(value);
	}

	/**
	 * @returns value (XX) 9XXXX-XXXX as string
	 */
	value(): string {
		return this.props;
	}

	/**
	 *
	 * @returns only numbers without special chars. Includes DDD.
	 * @example 11992502301
	 */
	getOnlyNumbers(): number {
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
	getDDD(): number {
		return parseInt(this.props.slice(1, 3));
	}

	/**
	 * 
	 * @param value value as string
	 * @returns instance of MobilePhone or throw an error
	 */
	public static init(value: string): MobilePhone {
		const isValidValue = MobilePhone.isValidProps(value);
		if (!isValidValue) throw new Error(MobilePhone.MESSAGE);
		return new MobilePhone(value);
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
		return Result.Ok(new MobilePhone(value));
	}
}

export { MobilePhone };
export default MobilePhone;
