import { ValueObject } from '../core';
import pinGenerator, { PinProps } from './pin-generator.util';
import { Result } from '../core';

interface Prop {
	value: string;
}

/**
 * Pin to use as email confirmation or sms
 * @example ABC-1234
 * @example 123
 * @example ABCDEF-123456
 */
export class PinValueObject extends ValueObject<Prop> {
	private constructor(prop: Prop) {
		super(prop);
	}

	/**
	 * @returns pin as string
	 * @example CTF-8723
	 * @example 52155
	 */
	value(): string {
		return this.props.value;
	}

	/**
	 *
	 * @param props as object with params
	 * @param numbersLength: 3 | 4 | 5 | 6 | 7
	 * @param lettersLength: 0 | 3 | 4 | 5 | 6 | 7
	 * @default numbersLength 5
	 * @default lettersLength 0
	 * @returns Result PinValueObject as instance
	 */
	public static generatePin(props?: PinProps): Result<PinValueObject> {
		const pin = pinGenerator(props);
		return PinValueObject.create(pin);
	}

	/**
	 *
	 * @param value pin as string
	 * @returns true if pin has a valid pattern and false if not
	 */
	public static isValidProps(value: string): boolean {
		const minLength = 2;
		const maxLength = 16;
		const { string } = this.validator;
		return string(value).hasLengthBetween(minLength, maxLength);
	}

	validation(_key: any, _value: any): boolean {
		const minLength = 2;
		const maxLength = 16;
		const { string } = this.validator;
		return string(_value).hasLengthBetween(minLength, maxLength);
	}

	/**
	 *
	 * @param pin as string
	 * @returns true if provided pin match with instance value and return false if not
	 */
	compare(pin: string): boolean {
		return pin === this.props.value;
	}

	/**
	 *
	 * @description if not provide a value automatically generate a pin with 5 digits
	 * @param pin as optional string @max 15 digits @min 3 digits
	 * @returns Result PinValueObject as instance
	 * @default 5 digits
	 * @example 98537
	 */
	public static create(pin?: string): Result<PinValueObject> {
		let value: string = pin ?? pinGenerator();

		const isValidValue = PinValueObject.isValidProps(value);
		if (!isValidValue) {
			return Result.fail('Invalid value for a pin');
		}

		return Result.success(new PinValueObject({ value }));
	}
}

export default PinValueObject;
