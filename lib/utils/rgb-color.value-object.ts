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
	protected static readonly REGEX = regexHash;
	protected static readonly DISABLE_SETTER: boolean = true;
	protected static readonly MESSAGE: string =
		'Invalid rgb value. It must match with pattern rgb(255, 255, 255)';

	private constructor(prop: Prop) {
		super(prop, { disableSetters: RGBColorValueObject.DISABLE_SETTER });
	}

	value(): string {
		return this.props.value;
	}

	validation(value: string): boolean {
		return RGBColorValueObject.isValidProps(value);
	}

	/**
	 *
	 * @param value rgb pattern as string
	 * @example rgb(255, 255, 255)
	 * @returns true if pattern match else return false
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(RGBColorValueObject.REGEX);
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
			return Result.fail(RGBColorValueObject.MESSAGE);
		}
		return Result.Ok(new RGBColorValueObject({ value }));
	}
}

export { RGBColorValueObject };
export default RGBColorValueObject;
