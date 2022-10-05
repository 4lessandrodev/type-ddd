import { ValueObject } from '../core';
import { Result } from '../core';

export interface ICustomNmbValidator {
	(value: number): boolean;
}

export interface CustomNmbProps {
	MAX: number;
	MIN: number;
	VALIDATOR: ICustomNmbValidator;
}

interface Prop {
	value: number;
}

export class CustomNumberValueObject extends ValueObject<Prop> {
	protected static readonly VALIDATOR = (value: number) =>
		typeof value === 'number';
	protected static readonly MAX: number = Number.MAX_SAFE_INTEGER;
	protected static readonly MIN: number = Number.MIN_SAFE_INTEGER;
	protected static readonly DISABLE_SETTER: boolean = true;

	private constructor(props: Prop) {
		super(props, {
			disableSetters: CustomNumberValueObject.DISABLE_SETTER,
		});
	}

	/**
	 * @returns original value as number
	 */
	value(): number {
		return this.props.value;
	}

	/**
	 * @description return true if value is positive and false if not.
	 * @returns boolean
	 */
	get isPositive(): boolean {
		return this.props.value >= 0;
	}

	/**
	 *
	 * @param value as number
	 * @returns true if instance value is greater than provided value and false if not.
	 */
	isGreaterThan(value: number): boolean {
		return this.props.value > value;
	}

	/**
	 *
	 * @param value as number
	 * @returns
	 */
	isEqualTo(value: number): boolean {
		return this.props.value === value;
	}

	/**
	 * @returns validation
	 * @method VALIDATOR: function (value: number): boolean;
	 * @property
	 * MAX: Number.MAX_SAFE_INTEGER,
	 * @property
	 * MIN: Number.MIN_SAFE_INTEGER,
	 */
	get customValidation(): CustomNmbProps {
		return {
			MAX: CustomNumberValueObject.MAX,
			MIN: CustomNumberValueObject.MIN,
			VALIDATOR: CustomNumberValueObject.VALIDATOR,
		};
	}

	/**
	 *
	 * @param value number
	 * @returns boolean
	 */
	public static isValidValue(value: number): boolean {
		const MAX = CustomNumberValueObject.MAX;
		const MIN = CustomNumberValueObject.MIN;
		const VALIDATOR = CustomNumberValueObject.VALIDATOR;

		if (VALIDATOR && MAX && MIN) {
			return VALIDATOR(value) && value >= MIN && value <= MAX;
		}
		return (
			value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER
		);
	}

	public static create(value: number): Result<CustomNumberValueObject> {
		const isValidValue = CustomNumberValueObject.isValidValue(value);

		if (!isValidValue) {
			return Result.fail('Invalid value for a custom number');
		}

		return Result.Ok(new CustomNumberValueObject({ value }));
	}
}

export default CustomNumberValueObject;
