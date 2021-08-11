import { Result, ValueObject } from "..";
const regexHash = /^\w{3,5}:\/{1,}\w{1,}\.\w*\.?\w{2,}/;

interface Prop {
	value: string;
}

class UrlValueObject extends ValueObject<Prop>{
	private constructor(prop: Prop){
		super(prop)
	}

	/**
	 * @returns url value as string
	 */
	get value(): string {
		return this.props.value;
	}

	/**
	 * 
	 * @param value url value as string
	 * @example https://google.com
	 * @returns true if value is a valid url and false if does not
	 */
	public static isValidValue(value: string): boolean {
		return regexHash.test(value);
	}

	/**
	 * 
	 * @param value url as string
	 * @example https://google.com
	 * @returns Result with instance of UrlValueObject
	 */
	public static create(value: string): Result<UrlValueObject>{
		if (!UrlValueObject.isValidValue(value)){
			return Result.fail<UrlValueObject>('Invalid url value');
		}
		return Result.ok<UrlValueObject>(new UrlValueObject({ value }));
	}
}

export { UrlValueObject };
export default UrlValueObject;
