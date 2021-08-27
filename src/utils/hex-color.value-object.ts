import { Result, ValueObject } from '..';
import colorConverter from './color-converter.util';
import colorGenerator from './color-generator.util';
const regexHash = /^([#])([0-9|a-f]{2})([0-9|a-f]{1,2})([0-9|a-f]{1,2})/;

interface Prop {
	value: string;
}

class HEXColorValueObject extends ValueObject<Prop> {
	private constructor(prop: Prop) {
		super(prop);
	}

	get value(): string {
		return this.props.value.toLowerCase();
	}

	/**
	 *
	 * @returns HEXColorValueObject instance with random color value
	 */
	public static randomColor(): HEXColorValueObject {
		const hexColor = colorGenerator.randomHEX();
		return new HEXColorValueObject({ value: hexColor });
	}

	/**
	 *
	 * @param value hex pattern as string
	 * @example #ffffff
	 * @returns true if pattern match else return false
	 */
	public static isValidValue(value: string): boolean {
		const upper = value.toLowerCase();
		return regexHash.test(upper);
	}

	/**
	 *
	 * @returns rgb color
	 * @example rgb(255, 255, 255)
	 */
	getAsRGB(): string {
		return colorConverter.HEXToRGB(this.props.value);
	}

	/**
	 *
	 * @param value hex pattern as string
	 * @example #ffffff
	 * @returns Result with instance of HEXColorValueObject
	 */
	public static create(value: string): Result<HEXColorValueObject> {
		if (!HEXColorValueObject.isValidValue(value)) {
			return Result.fail<HEXColorValueObject>(
				'Invalid hex value. It must match with pattern #ffffff'
			);
		}
		return Result.ok<HEXColorValueObject>(
			new HEXColorValueObject({ value })
		);
	}
}

export { HEXColorValueObject };
export default HEXColorValueObject;
