import { ValueObject } from '../core';
import { Result } from '../core';
const regexHash = /^\w{3,5}:\/{1,}\w{1,}\.\w*\.?\w{2,}/;

interface Prop {
	value: string;
}

class UrlValueObject extends ValueObject<Prop> {
	private constructor(prop: Prop) {
		super(prop);
	}

	/**
	 * @returns url value as string
	 */
	value(): string {
		return this.props.value;
	}

	/**
	 *
	 * @param value url value as string
	 * @example https://google.com
	 * @returns true if value is a valid url and false if does not
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(regexHash);
	}

	validation(_key: any, _value: any): boolean {
		return this.validator.string(_value).match(regexHash);
	}
	/**
	 *
	 * @param value url as string
	 * @example https://google.com
	 * @returns Result with instance of UrlValueObject
	 */
	public static create(value: string): Result<UrlValueObject> {
		if (!UrlValueObject.isValidProps(value)) {
			return Result.fail('Invalid url value');
		}
		return Result.OK(new UrlValueObject({ value }));
	}
}

export { UrlValueObject };
export default UrlValueObject;
