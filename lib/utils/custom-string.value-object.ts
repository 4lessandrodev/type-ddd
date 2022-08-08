import { ValueObject } from '../core';
import { Result } from '../core';

interface ICustomStringLength {
	MAX: number;
	MIN: number;
}

export interface ICustomStrValidator {
	(value: string): boolean;
}

export interface CustomStrProps {
	LENGTH: ICustomStringLength;
	VALIDATOR?: ICustomStrValidator;
}

interface Prop {
	value: string;
}

const defaultCustomProps: CustomStrProps = {
	VALIDATOR: function (value: string) {
		return typeof value === 'string';
	},
	LENGTH: {
		MAX: 255,
		MIN: 1,
	},
};

export class CustomStringValueObject extends ValueObject<Prop> {
	private readonly customProps: CustomStrProps;
	private constructor(props: Prop, customProps?: CustomStrProps) {
		super(props);
		this.customProps = customProps ?? defaultCustomProps;
	}

	/**
	 * @returns original value as string
	 */
	value(): string {
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
	get customValidation(): CustomStrProps {
		return this.customProps;
	}

	public static isValidProps(
		value: string,
		customProps?: CustomStrProps
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
		customProps?: CustomStrProps
	): Result<CustomStringValueObject> {
		const isValidValue = CustomStringValueObject.isValidProps(
			value,
			customProps
		);

		if (!isValidValue) {
			return Result.fail('Invalid value for a custom string');
		}

		return Result.Ok(new CustomStringValueObject({ value }, customProps));
	}
}

export default CustomStringValueObject;
