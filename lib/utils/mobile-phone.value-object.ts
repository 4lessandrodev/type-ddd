import { Result, ValueObject } from '..';
const regexHash =
	/^\([1-9]{2}\)\s[9](?!\d(?:(\d)\1{2})-(\d)\1{3})[5-9][0-9]{3}\-[0-9]{4}$/;
const regexHashSpecialChars = /\(|\)|-|\s/g;

interface Prop {
	value: string;
}

/**
 * @description Brazilian Mobile Phone Number
 * @default (XX) 9XXXX-XXXX
 */
class MobilePhoneValueObject extends ValueObject<Prop> {
	private constructor(prop: Prop) {
		super(prop);
	}

	/**
	 *
	 * @param value Phone number (XX) 9XXXX-XXXX
	 * @returns true if pattern match and false if not.
	 */
	public static isValidValue(value: string): boolean {
		return regexHash.test(value);
	}

	/**
	 * @returns value (XX) 9XXXX-XXXX as string
	 */
	get value(): string {
		return this.props.value;
	}

	/**
	 *
	 * @returns only numbers without special chars. Includes DDD.
	 * @example 11992502301
	 */
	getOnlyNumbers(): number {
		const onlyNumbersAsString = this.props.value.replace(
			regexHashSpecialChars,
			''
		);
		return parseInt(onlyNumbersAsString);
	}

	/**
	 *
	 * @returns DDD only as number
	 * @example 11
	 */
	getDDD(): number {
		return parseInt(this.props.value.slice(1, 3));
	}

	/**
	 *
	 * @param value Brazilian Mobile phone number
	 * @example (XX) 9XXXX-XXXX
	 * @returns Result of MobilePhoneValueObject
	 */
	public static create(value: string): Result<MobilePhoneValueObject> {
		if (!MobilePhoneValueObject.isValidValue(value)) {
			return Result.fail<MobilePhoneValueObject>(
				'Invalid Mobile Phone Number'
			);
		}
		return Result.ok<MobilePhoneValueObject>(
			new MobilePhoneValueObject({ value })
		);
	}
}

export { MobilePhoneValueObject };
export default MobilePhoneValueObject;
