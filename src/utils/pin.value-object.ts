import ValueObject from '../core/value-object';
import pinGenerator, { PinProps } from './pin-generator.util';
import { Result } from '../core/result';

interface Prop {
	value: string;
}

/**
 * Pin to use as email confirmation or sms
 * @example ABC-1234
 * @example 123
 */
export class PinValueObject extends ValueObject<Prop> {
	private constructor(prop: Prop) {
		super(prop);
	}

	/**
	 * @returns pin as string
	 * @example ABC-1234
	 * @example 123
	 */
	get value(): string {
		return this.props.value;
	}

	/**
	 *
	 * @param props as object with params
	 * @param numbersLength: 3 | 4 | 5 | 6 | 7
	 * @param lettersLength: 0 | 3 | 4 | 5 | 6 | 7
	 * @default numbersLength 4
	 * @default lettersLength 3
	 * @returns Result PinValueObject as instance
	 */
	public static generatePin(props: PinProps): Result<PinValueObject> {
		const pin = pinGenerator(props);
		return PinValueObject.create(pin);
	}

	/**
	 *
	 * @param value pin as string
	 * @returns true if pin has a valid pattern and false if not
	 */
	public static isValidValue(value: string): boolean {
		return value.length >= 3 && value.length <= 15;
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
	 * @param pin as optional string
	 * @returns Result PinValueObject as instance
	 */
	public static create(pin?: string): Result<PinValueObject> {
		let value: string =
			pin ??
			pinGenerator({
				lettersLength: 3,
				numbersLength: 4,
			});

		const isValidValue = PinValueObject.isValidValue(value);
		if (!isValidValue) {
			return Result.fail('Invalid value for a pin');
		}

		return Result.ok(new PinValueObject({ value }));
	}
}
