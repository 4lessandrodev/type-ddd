import { Result, ValueObject } from "..";
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
	 * @returns hex color 
	 * @example #ffffff
	 */
	getAsHex(): string {
		const numbers = this.props.value.slice(4, this.props.value.length -1).split(",");
		const rgb = numbers.map((n)=> n.trim());
		
		const r = parseInt(rgb[0]).toString(16).toLowerCase();
		const g = parseInt(rgb[1]).toString(16).toLowerCase();
		const b = parseInt(rgb[2]).toString(16).toLowerCase();

		const red = r === '0' ? '00' : r;
		const green = g === '0' ? '00' : g;
		const blue = b === '0' ? '00' : b;

		return `#${red}${green}${blue}`;
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
