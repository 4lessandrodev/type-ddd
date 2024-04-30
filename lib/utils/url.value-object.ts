import { Result, ValueObject } from 'rich-domain';

interface Prop {
	value: string;
}

class UrlValueObject extends ValueObject<Prop> {
	protected static readonly MESSAGE: string = 'Invalid url value';

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
		try {
			new URL(value);
			return true;
		} catch (error) {
			return false;
		}
	}

	public URL(): URL {
		return new URL(this.props.value);
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
