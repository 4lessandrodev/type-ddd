import { Result, ValueObject } from "rich-domain";
import isValidCpfDigit, { formatValueToCpfPattern } from "./util";

export class CPF extends ValueObject<string> {
	protected static readonly REGEX = /^([0-9]{3})[\.]((?!\1)[0-9]{3})[\.]([0-9]{3})[-]([0-9]{2})$|^[0-9]{11}$/;
	protected static readonly MESSAGE: string = 'Invalid value for cpf';

	private constructor(value: string) {
		super(value);
	}

	/**
	 * @description return a cpf value (only numbers).
	 * @example example "52734865211".
	 * @summary If you want cpf as pattern use `formatToCpfPattern` before get value.
	 */
	value(): string {
		return this.props;
	}

	/**
	 * @description add hyphen and dot to cpf value.
	 * @example before "52734865211"
	 * @example after "527.348.652-11"
	 */
	toPattern(): string {
		return formatValueToCpfPattern(this.props);
	}

	/**
	 * @description add hyphen and dot to cpf value.
	 * @example before "52734865211"
	 * @example after "527.348.652-11"
	 */
	public static addMask(cpf: string): string {
		return formatValueToCpfPattern(cpf);
	}

	/**
	 * @description remove hyphen and dot from cpf value.
	 * @example before "527.348.652-11"
	 * @example after "52734865211"
	 */
	public static removeSpecialChars(cpf: string): string {
		return this.util.string(cpf).removeSpecialChars();
	}

	/**
	 *
	 * @param cpf value as string only number or pattern Or instance of CPF.
	 * @returns true if cpf match with instance value and false if not.
	 * @example param "52734865211"
	 * @example param "527.348.652-11"
	 */
	compare(cpf: string | CPF): boolean {
		if (typeof cpf === 'string') {
			const formattedCpf = this.util.string(cpf).removeSpecialChars();
			const instanceValue = this.util
				.string(this.props)
				.removeSpecialChars();
			return instanceValue === formattedCpf;
		}
		if (cpf instanceof CPF) return cpf.isEqual(this);
		return false;
	}

	/**
	 * @description check if cpf value is a valid pattern and has a valid digit sum.
	 * @param value cpf as string
	 * @returns true if value is valid and false if not.
	 * @example "527.348.652-11"
	 * @example "72725477824"
	 */
	public static isValidProps(value: string): boolean {
		const isValidPattern = CPF.REGEX.test(value);
		const isValidDigits = isValidCpfDigit(value);
		return isValidDigits && isValidPattern;
	}

	/**
	 * @description check if cpf value is a valid pattern and has a valid digit sum.
	 * @param value cpf as string
	 * @returns true if value is valid and false if not.
	 * @example "527.348.652-11"
	 * @example "72725477824"
	 */
	public static isValid(value: string): boolean {
		return this.isValidProps(value);
	}

	/**
	 * 
	 * @param value value as string
	 * @returns instance of CPF or throw an error
	 */
	public static init(value: string): CPF {
		const isValidValue = CPF.isValidProps(value);
		if (!isValidValue) throw new Error(CPF.MESSAGE);
		return new CPF(value);
	}

	/**
	 * @description create a cpf value object
	 * @param value cpf numbers as string
	 * @returns instance of Result with cpf value
	 * @example "527.348.652-11"
	 * @example "72725477824"
	 * @summary fails if provide an invalid pattern or a cpf with invalid digit sum
	 */
	public static create(value: string): Result<CPF> {
		const isValidValue = CPF.isValidProps(value);

		if (!isValidValue) {
			return Result.fail(CPF.MESSAGE);
		}

		return Result.Ok(new CPF(this.util.string(value).removeSpecialChars()));
	}
}

export default CPF;
