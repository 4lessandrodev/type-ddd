import { ValueObject } from '../core';
import { Result } from '../core';
const regexHash =
	/^(https?:\/\/)?(([\da-z\.-]+))?\.?([a-z\.]{2,6})([\/\w \.-]*)*\/?(:\d{2,4})?(\/\w+)?$/;

interface Prop {
	value: string;
}

class UrlValueObject extends ValueObject<Prop> {
	protected static readonly REGEX = regexHash;
	protected static readonly DISABLE_SETTER: boolean = true;
	protected static readonly MESSAGE: string = 'Invalid url value';

	private constructor(prop: Prop) {
		super(prop, { disableSetters: UrlValueObject.DISABLE_SETTER });
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
		return this.validator.string(value).match(UrlValueObject.REGEX);
	}

	validation(value: string): boolean {
		return UrlValueObject.isValidProps(value);
	}
	/**
	 *
	 * @param value url as string
	 * @example https://google.com
	 * @returns Result with instance of UrlValueObject
	 */
	public static create(value: string): Result<UrlValueObject> {
		if (!UrlValueObject.isValidProps(value)) {
			return Result.fail(UrlValueObject.MESSAGE);
		}
		return Result.Ok(new UrlValueObject({ value }));
	}
}

export { UrlValueObject };
export default UrlValueObject;
