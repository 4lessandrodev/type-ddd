import { ValueObject, Result } from '..';
import isValidCpfDigit from './check-cpf-digit.util';
const regexCpf =
	/^([0-9]{3})[\.]((?!\1)[0-9]{3})[\.]([0-9]{3})[-]([0-9]{2})$|^[0-9]{11}$/;

export interface Prop {
	value: string;
}

export class CPFValueObject extends ValueObject<Prop> {
	private constructor(props: Prop) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}

	public static isValidValue(value: string): boolean {
		const isValidPattern = regexCpf.test(value);
		const isValidDigits = isValidCpfDigit(value);
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
		const isValidValue = CPFValueObject.isValidValue(value);

		if (!isValidValue) {
			return Result.fail('Invalid value for cpf');
		}

		return Result.ok(new CPFValueObject({ value }));
	}
}
