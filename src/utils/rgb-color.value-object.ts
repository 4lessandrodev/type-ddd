import { Result, ValueObject } from "..";
import colorConverter from "./color-converter.util";
import colorGenerator from "./color-generator.util";
const regexHash = /^rgb\((\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\,\s(\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\,\s(\d{1,2}|(0|1)\d{2}|2[0-4]\d|25[0-5])\)/;

interface Prop {
	value: string;
}

class RGBColorValueObject extends ValueObject<Prop>{
	private constructor(prop: Prop){
		super(prop);
	}

	get value(): string {
		return this.props.value;
	}

	/**
	 * 
	 * @param value rgb pattern as string
	 * @example rgb(255, 255, 255)
	 * @returns true if pattern match else return false
	 */
	public static isValidValue(value: string): boolean {
		return regexHash.test(value);
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
		return colorConverter.RGBToHEX(this.props.value)
	}

	/**
	 * 
	 * @param value rgb pattern as string
	 * @example rgb(255, 255, 255)
	 * @returns Result with instance of RGBColorValueObject
	 */
	public static create(value: string): Result<RGBColorValueObject>{
		if (!RGBColorValueObject.isValidValue(value)) {
			return Result.fail<RGBColorValueObject>(
				'Invalid rgb value. It must match with pattern rgb(255, 255, 255)'
			);
		}
		return Result.ok<RGBColorValueObject>(new RGBColorValueObject({ value }));
	}
}

export { RGBColorValueObject };
export default RGBColorValueObject;
