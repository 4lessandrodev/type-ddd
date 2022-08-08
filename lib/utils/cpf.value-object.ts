import { ValueObject } from '../core';
import { Result } from '../core';
import isValidCpfDigit, {
	formatValueToCpfPattern,
	removeSpecialCharsFromCpf,
} from './check-cpf-digit.util';
const regexCpf =
	/^([0-9]{3})[\.]((?!\1)[0-9]{3})[\.]([0-9]{3})[-]([0-9]{2})$|^[0-9]{11}$/;

interface Prop {
	value: string;
}

export class CPFValueObject extends ValueObject<Prop> {
	private constructor(props: Prop) {
		super(props);
		this.removeSpecialChars();
	}

	/**
	 * @description return a cpf value (only numbers).
	 * @example example "52734865211".
	 * @summary If you want cpf as pattern use `formatToCpfPattern` before get value.
	 */
	value(): string {
		return this.props.value;
	}

	/**
	 * @description remove hyphen and dot from cpf value.
	 * @example before "527.348.652-11"
	 * @example after "52734865211"
	 */
	removeSpecialChars(): CPFValueObject {
		this.props.value = removeSpecialCharsFromCpf(this.props.value);
		return this;
	}

	/**
	 * @description add hyphen and dot to cpf value.
	 * @example before "52734865211"
	 * @example after "527.348.652-11"
	 */
	formatToCpfPattern(): CPFValueObject {
		this.props.value = formatValueToCpfPattern(this.props.value);
		return this;
	}

	/**
	 *
	 * @param cpf value as string only number or pattern.
	 * @returns true if cpf match with instance value and false if not.
	 * @example param "52734865211"
	 * @example param "527.348.652-11"
	 */
	compare(cpf: string): boolean {
		const formattedCpf = removeSpecialCharsFromCpf(cpf);
		const instanceValue = removeSpecialCharsFromCpf(this.props.value);
		return instanceValue === formattedCpf;
	}

	/**
	 * @description check if cpf value is a valid pattern and has a valid digit sum.
	 * @param value cpf as string
	 * @returns true if value is valid and false if not.
	 * @example "527.348.652-11"
	 * @example "72725477824"
	 */
	public static isValidProps(value: string): boolean {
		const isValidPattern = regexCpf.test(value);
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
	validation(_key: any, _value: string): boolean {
		const isValidPattern = regexCpf.test(_value);
		const isValidDigits = isValidCpfDigit(_value);
		return isValidDigits && isValidPattern;
	}

	/**
	 * @description create a cpf value object
	 * @param value cpf numbers as string
	 * @returns instance of Result with cpf value
	 * @example "527.348.652-11"
	 * @example "72725477824"
	 * @summary fails if provide an invalid pattern or a cpf with invalid digit sum
	 */
	public static create(value: string): Result<CPFValueObject> {
		const isValidValue = CPFValueObject.isValidProps(value);

		if (!isValidValue) {
			return Result.fail('Invalid value for cpf');
		}

		return Result.Ok(new CPFValueObject({ value }));
	}
}

export default CPFValueObject;
