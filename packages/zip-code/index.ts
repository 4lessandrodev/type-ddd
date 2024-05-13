import { Result, ValueObject } from 'rich-domain';

const regexHash = /^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$/;

class ZipCode extends ValueObject<string> {
	protected static readonly REGEX = regexHash;
	protected static readonly MESSAGE: string = 'Invalid postal code';

	private constructor(prop: string) {
		super(prop);
	}

	/**
	 * @returns value as string. always only numbers
	 * @example 75520140
	 */
	value(): string {
		return this.props.replace(/-|\./g, '');
	}

	validation(value: string): boolean {
		return ZipCode.isValidProps(value);
	}

	/**
	 *
	 * @param value PostalCode as string
	 * @returns true if value match with pattern and false if do not.
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(ZipCode.REGEX);
	}

	public static create(value: string): Result<ZipCode> {
		if (!ZipCode.isValidProps(value)) {
			return Result.fail(ZipCode.MESSAGE);
		}
		return Result.Ok(new ZipCode(value));
	}
}

export { ZipCode };
export default ZipCode;
