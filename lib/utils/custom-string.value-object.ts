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

	get value(): string {
		return this.props.value;
	}

	get lowerCaseValue(): string {
		return this.props.value.toLowerCase();
	}

	get upperCaseValue(): string {
		return this.props.value.toUpperCase();
	}

	get capitalizeValue(): string {
		return (
			this.props.value[0].toUpperCase() +
			this.props.value.slice(1).toLowerCase()
		);
	}

	get customValidation(): CustomProps {
		return this.customProps;
	}

	public static isValidValue(
		value: string,
		customProps?: CustomProps
	): boolean {
		const { LENGTH, VALIDATOR } = customProps ?? defaultCustomProps;

		if (VALIDATOR) {
			return (
				VALIDATOR(value) &&
				value.length >= LENGTH.MIN &&
				value.length <= LENGTH.MAX
			);
		}
		return value.length >= LENGTH.MIN && value.length <= LENGTH.MAX;
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
