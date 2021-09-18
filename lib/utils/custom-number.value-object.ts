import { ValueObject } from '..';
import Result from '../core/result';

export interface ICustomValidator {
	(value: number): boolean;
}

export interface CustomProps {
	MAX?: number;
	MIN?: number;
	VALIDATOR?: ICustomValidator;
}

interface Prop {
	value: number;
}

const defaultCustomProps: CustomProps = {
	VALIDATOR: function (value: number) {
		return typeof value === 'number';
	},
	MAX: Number.MAX_SAFE_INTEGER,
	MIN: Number.MIN_SAFE_INTEGER,
};

export class CustomNumberValueObject extends ValueObject<Prop> {
	private readonly customProps: CustomProps;
	private constructor(props: Prop, customProps?: CustomProps) {
		super(props);
		this.customProps = customProps ?? defaultCustomProps;
	}

	/**
	 * @returns original value as number
	 */
	get value(): number {
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
	get customValidation(): CustomProps {
		return this.customProps;
	}

	/**
	 *
	 * @param value number
	 * @param customProps @see CustomProps
	 * @returns boolean
	 */
	public static isValidValue(
		value: number,
		customProps?: CustomProps
	): boolean {
		const MAX = customProps?.MAX ?? defaultCustomProps.MAX;
		const MIN = customProps?.MIN ?? defaultCustomProps.MIN;
		const VALIDATOR =
			customProps?.VALIDATOR ?? defaultCustomProps.VALIDATOR;

		if (VALIDATOR && MAX && MIN) {
			return VALIDATOR(value) && value >= MIN && value <= MAX;
		}
		return (
			value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER
		);
	}

	public static create(
		value: number,
		customProps?: CustomProps
	): Result<CustomNumberValueObject> {
		const isValidValue = CustomNumberValueObject.isValidValue(
			value,
			customProps
		);

		if (!isValidValue) {
			return Result.fail('Invalid value for a custom number');
		}

		return Result.ok(new CustomNumberValueObject({ value }, customProps));
	}
}

export default CustomNumberValueObject;
