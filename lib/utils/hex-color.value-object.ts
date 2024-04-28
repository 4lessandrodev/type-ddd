import { ValueObject } from '../core';
import { Result } from '../core';
import colorConverter from './color-converter.util';
import colorGenerator from './color-generator.util';
const regexHash = /^([#])([0-9|a-f]{2})([0-9|a-f]{1,2})([0-9|a-f]{1,2})/;

interface Prop {
	value: string;
}

class HEXColorValueObject extends ValueObject<Prop> {
	protected static readonly REGEX = regexHash;

	private constructor(prop: Prop) {
		super(prop);
	}

	value(): string {
		return this.props.value.toLowerCase();
	}

	validation(value: string): boolean {
		return HEXColorValueObject.isValidProps(value);
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
	public static isValidProps(value: string): boolean {
		const lower = value.toLowerCase();
		return this.validator.string(lower).match(HEXColorValueObject.REGEX);
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
		if (!HEXColorValueObject.isValidProps(value)) {
			return Result.fail(
				'Invalid hex value. It must match with pattern #ffffff',
			);
		}
		return Result.Ok(new HEXColorValueObject({ value }));
	}
}

export { HEXColorValueObject };
export default HEXColorValueObject;
