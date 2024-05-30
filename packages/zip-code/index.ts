import { Result, ValueObject } from 'rich-domain';

const regexHash = /^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$/;

class ZipCode extends ValueObject<string> {
	protected static readonly REGEX = regexHash;
	protected static readonly MESSAGE: string = 'Invalid zip code';

	private constructor(prop: string) {
		super(prop);
	}

	/**
	 * @returns value as string. always only numbers
	 * @example 75520140
	 */
	value(): string {
		return this.props;
	}

	/**
	 * @description add hyphen and dot to cpf value.
	 * @example before "75520140"
	 * @example after "75520-140"
	 */
	public static addMask(zipCode: string): string {
		if (typeof zipCode !== 'string') return '';
		if (zipCode.includes('-')) return zipCode.slice(0, 9);
		return zipCode.slice(0, 5) + '-' + zipCode.slice(5, 8);
	}

	/**
	 * @description remove hyphen and dot from cpf value.
	 * @example before "75520-140"
	 * @example after "75520140"
	 */
	public static removeSpecialChars(zipCode: string): string {
		return this.util.string(zipCode).removeSpecialChars();
	}

	/**
	 * @description add special chars to numbers
	 * @returns zip code as string following pattern xxxxx-xxx
	 */
	toPattern(): string {
		return ZipCode.addMask(this.props);
	}

	/**
	 *
	 * @param value PostalCode as string
	 * @returns true if value match with pattern and false if do not.
	 */
	public static isValid(value: string): boolean {
		return this.isValidProps(value);
	}

	/**
	 *
	 * @param value PostalCode as string
	 * @returns true if value match with pattern and false if do not.
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(ZipCode.REGEX);
	}

	/**
	 * 
	 * @param value value as string
	 * @returns instance of ZipCode or throw an error
	 */
	public static init(value: string): ZipCode {
		const isValidValue = ZipCode.isValidProps(value);
		if (!isValidValue) throw new Error(ZipCode.MESSAGE);
		const numbers = ZipCode.removeSpecialChars(value);
		return new ZipCode(numbers);
	}


	public static create(value: string): Result<ZipCode> {
		if (!ZipCode.isValidProps(value)) {
			return Result.fail(ZipCode.MESSAGE);
		}
		const numbers = ZipCode.removeSpecialChars(value);
		return Result.Ok(new ZipCode(numbers));
	}
}

export { ZipCode };
export default ZipCode;
