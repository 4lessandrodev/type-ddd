import { ValueObject } from '../core';
import { Result } from '../core';
import colorConverter from './color-converter.util';
import colorGenerator from './color-generator.util';
const regexHash =
	/^rgb\((\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\,\s(\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\,\s(\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\)/;

interface Prop {
	value: string;
}

class RGBColorValueObject extends ValueObject<Prop> {
	private constructor(prop: Prop) {
		super(prop);
	}

	value(): string {
		return this.props.value;
	}

	validation(_key: any, _value: any): boolean {
		return this.validator.string(_value).match(regexHash);
	}

	/**
	 *
	 * @param value rgb pattern as string
	 * @example rgb(255, 255, 255)
	 * @returns true if pattern match else return false
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(regexHash);
	}

	/**
	 *
	 * @returns RGBColorValueObject instance with random color value
	 */
	public static randomColor(): RGBColorValueObject {
		const rgbColor = colorGenerator.randomRGB();
		return new RGBColorValueObject({ value: rgbColor });
	}

	/**
	 *
	 * @returns hex color
	 * @example #ffffff
	 */
	getAsHex(): string {
		return colorConverter.RGBToHEX(this.props.value);
	}

	/**
	 *
	 * @param value rgb pattern as string
	 * @example rgb(255, 255, 255)
	 * @returns Result with instance of RGBColorValueObject
	 */
	public static create(value: string): Result<RGBColorValueObject> {
		if (!RGBColorValueObject.isValidProps(value)) {
			return Result.fail(
				'Invalid rgb value. It must match with pattern rgb(255, 255, 255)'
			);
		}
		return Result.OK(new RGBColorValueObject({ value }));
	}
}

export { RGBColorValueObject };
export default RGBColorValueObject;
