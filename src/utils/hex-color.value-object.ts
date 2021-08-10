import { Result, ValueObject } from "..";
const regexHash = /^([#])([0-9|a-f]{2})([0-9|a-f]{1,2})([0-9|a-f]{1,2})/;

interface Prop {
	value: string;
}

class HEXColorValueObject extends ValueObject<Prop>{
	private constructor(prop: Prop){
		super(prop);
	}

	get value(): string {
		return this.props.value.toLowerCase();
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
		const r = parseInt(this.props.value.slice(1, 3), 16);
		const g = parseInt(this.props.value.slice(3, 5), 16);
		const b = parseInt(this.props.value.slice(5, 7), 16);

		const red: number = isNaN(r) ? 0 : r;
		const green: number = isNaN(g) ? 0 : g;
		const blue: number = isNaN(b) ? 0 : b;

		return `rgb(${red}, ${green}, ${blue})`;
	}

	/**
	 * 
	 * @param value hex pattern as string
	 * @example #ffffff
	 * @returns Result with instance of HEXColorValueObject
	 */
	public static create(value: string): Result<HEXColorValueObject>{
		if (!HEXColorValueObject.isValidValue(value)) {
			return Result.fail<HEXColorValueObject>(
				'Invalid hex value. It must match with pattern #ffffff'
			);
		}
		return Result.ok<HEXColorValueObject>(new HEXColorValueObject({ value }));
	}
}

export { HEXColorValueObject };
export default HEXColorValueObject;
