import { Result, ValueObject } from 'rich-domain';

const regexHash = /^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$/;

class ZipCodeValueObject extends ValueObject<string> {
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
		return ZipCodeValueObject.isValidProps(value);
	}

	/**
	 *
	 * @param value PostalCode as string
	 * @returns true if value match with pattern and false if do not.
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(ZipCodeValueObject.REGEX);
	}

	public static create(value: string): Result<ZipCodeValueObject> {
		if (!ZipCodeValueObject.isValidProps(value)) {
			return Result.fail(ZipCodeValueObject.MESSAGE);
		}
		return Result.Ok(new ZipCodeValueObject(value));
	}
}

export { ZipCodeValueObject };
export default ZipCodeValueObject;
