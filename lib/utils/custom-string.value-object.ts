import { ValueObject } from '..';
import Result from '../core/result';

interface ICustomStringLength {
	MAX: number;
	MIN: number;
}

export interface ICustomValidator {
	(value: string): boolean;
}

export interface CustomProps {
	LENGTH: ICustomStringLength;
	VALIDATOR?: ICustomValidator;
}

interface Prop {
	value: string;
}

const defaultCustomProps: CustomProps = {
	VALIDATOR: function (value: string) {
		return typeof value === 'string';
	},
	LENGTH: {
		MAX: 255,
		MIN: 1,
	},
};

export class CustomStringValueObject extends ValueObject<Prop> {
	private readonly customProps: CustomProps;
	private constructor(props: Prop, customProps?: CustomProps) {
		super(props);
		this.customProps = customProps ?? defaultCustomProps;
	}

	/**
	 * @returns original value as string
	 */
	get value(): string {
		return this.props.value;
	}

	/**
	 * @returns value lowerCase as string
	 */
	get lowerCaseValue(): string {
		return this.props.value.toLowerCase();
	}

	/**
	 * @returns value upperCase as string
	 */
	get upperCaseValue(): string {
		return this.props.value.toUpperCase();
	}

	/**
	 * @returns value capitalized as string
	 */
	get capitalizeValue(): string {
		return (
			this.props.value[0].toUpperCase() +
			this.props.value.slice(1).toLowerCase()
		);
	}

	/**
	 * @returns validation
	 * @method VALIDATOR: function (value: string): boolean;
	 * @property
	 * LENGTH: MAX / MIN,
	 * @property
	 * MIN: number
	 * @property
	 * MAX: number
	 * @default
	 * MAX: 255
	 * MIN: 1
	 */
	get customValidation(): CustomProps {
		return this.customProps;
	}

	public static isValidValue(
		value: string,
		customProps?: CustomProps
	): boolean {
		const MIN = customProps?.LENGTH.MIN ?? defaultCustomProps.LENGTH.MIN;
		const MAX = customProps?.LENGTH.MAX ?? defaultCustomProps.LENGTH.MAX;
		const VALIDATOR =
			customProps?.VALIDATOR ?? defaultCustomProps.VALIDATOR;

		if (VALIDATOR) {
			return (
				VALIDATOR(value) && value.length >= MIN && value.length <= MAX
			);
		}
		return value.length >= MIN && value.length <= MAX;
	}

	public static create(
		value: string,
		customProps?: CustomProps
	): Result<CustomStringValueObject> {
		const isValidValue = CustomStringValueObject.isValidValue(
			value,
			customProps
		);

		if (!isValidValue) {
			return Result.fail('Invalid value for a custom string');
		}

		return Result.ok(new CustomStringValueObject({ value }, customProps));
	}
}

export default CustomStringValueObject;
