import { ValueObject } from '../core';
import { Result } from '../core';
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

	value(): string {
		return this.props.value.toLowerCase();
	}

	validation(_key: any, _value: any): boolean {
		return this.validator.string(_value).match(regexHash);
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
		if (!HEXColorValueObject.isValidProps(value)) {
			return Result.fail(
				'Invalid hex value. It must match with pattern #ffffff'
			);
		}
		return Result.success(new HEXColorValueObject({ value }));
	}
}

export { HEXColorValueObject };
export default HEXColorValueObject;
