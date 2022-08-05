import { ValueObject } from '../core';
import { Result } from '../core';
import isValidCnpjDigit, {
	formatValueToCnpjPattern,
	removeSpecialCharsFromCnpj,
} from './check-cnpj-digit.util';
const regexCnpj =
	/^([0-9]{2})[\.]([0-9]{3})[\.]((?!\2)[0-9]{3})[\/]([0-9]{4})[-]([0-9]{2})$|^[0-9]{14}$/;

interface Prop {
	value: string;
}

export class CNPJValueObject extends ValueObject<Prop> {
	private constructor(props: Prop) {
		super(props);
		this.removeSpecialChars();
	}

	/**
	 * @description return a cnpj value (only numbers).
	 * @example example "22398345000188".
	 * @summary If you want cnpj as pattern use `formatToCnpjPattern` before get value.
	 */
	value(): string {
		return this.props.value;
	}

	/**
	 * @description remove hyphen and dot from cnpj value.
	 * @example before "22.398.345/0001-88"
	 * @example after "22398345000188"
	 */
	removeSpecialChars(): CNPJValueObject {
		this.props.value = removeSpecialCharsFromCnpj(this.props.value);
		return this;
	}

	/**
	 * @description add hyphen and dot to cnpj value.
	 * @example before "22398345000188"
	 * @example after "22.398.345/0001-88"
	 */
	formatToCnpjPattern(): CNPJValueObject {
		this.props.value = formatValueToCnpjPattern(this.props.value);
		return this;
	}

	/**
	 *
	 * @param cnpj value as string only number or pattern.
	 * @returns true if cnpj match with instance value and false if not.
	 * @example param "22398345000188"
	 * @example param "22.398.345/0001-88"
	 */
	compare(cnpj: string): boolean {
		const formattedCnpj = removeSpecialCharsFromCnpj(cnpj);
		const instanceValue = removeSpecialCharsFromCnpj(this.props.value);
		return instanceValue === formattedCnpj;
	}

	/**
	 * @description check if cnpj value is a valid pattern and has a valid digit sum.
	 * @param value cnpj as string
	 * @returns true if value is valid and false if not.
	 * @example "22.398.345/0001-88"
	 * @example "22398345000188"
	 */
	public static isValidProps(value: string): boolean {
		const isValidPattern = regexCnpj.test(value);
		const isValidDigits = isValidCnpjDigit(value);
		return isValidDigits && isValidPattern;
	}

	/**
	 * @description check if cnpj value is a valid pattern and has a valid digit sum.
	 * @param value cnpj as string
	 * @returns true if value is valid and false if not.
	 * @example "22.398.345/0001-88"
	 * @example "22398345000188"
	 */
	validation(_key: any, _value: string): boolean {
		const isValidPattern = regexCnpj.test(_value);
		const isValidDigits = isValidCnpjDigit(_value);
		return isValidDigits && isValidPattern;
	}
	/**
	 * @description create a cnpj value object
	 * @param value cnpj numbers as string
	 * @returns instance of Result with cnpj value
	 * @example "22.398.345/0001-88"
	 * @example "22398345000188"
	 * @summary fails if provide an invalid pattern or a cnpj with invalid digit sum
	 */
	public static create(value: string): Result<CNPJValueObject> {
		const isValidValue = CNPJValueObject.isValidProps(value);

		if (!isValidValue) {
			return Result.fail('Invalid value for cnpj');
		}

		return Result.success(new CNPJValueObject({ value }));
	}
}

export default CNPJValueObject;
