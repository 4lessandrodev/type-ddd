import { Result, ValueObject } from 'rich-domain';

export interface ICustomStrValidator {
	(value: string): boolean;
}

export interface CustomStrProps {
	MAX_LENGTH: number;
	MIN_LENGTH: number;
	VALIDATOR: ICustomStrValidator;
}

interface Prop {
	value: string;
}

export class CustomStringValueObject extends ValueObject<Prop> {
	protected static readonly VALIDATOR = (value: string) => {
		return typeof value === 'string';
	};
	protected static readonly MAX_LENGTH: number = 255;
	protected static readonly MIN_LENGTH: number = 1;
	protected static readonly MESSAGE: string =
		'Invalid value for a custom string';

	private constructor(props: Prop) {
		super(props);
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
	 * @returns value without special chars as string
	 */
	get removeSpecialChars(): string {
		return this.props.value.replace(/[^a-zA-Z0-9]/g, '');
	}

	/**
	 * @returns value only numbers as string
	 */
	get onlyNumbers(): string {
		return this.props.value.replace(/\D/g, '');
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
		return {
			MIN_LENGTH: CustomStringValueObject.MIN_LENGTH,
			MAX_LENGTH: CustomStringValueObject.MAX_LENGTH,
			VALIDATOR: CustomStringValueObject.VALIDATOR,
		};
	}

	public static isValidProps(value: string): boolean {
		const MIN = CustomStringValueObject.MIN_LENGTH;
		const MAX = CustomStringValueObject.MAX_LENGTH;
		const VALIDATOR = CustomStringValueObject.VALIDATOR;

		return VALIDATOR(value) && value.length >= MIN && value.length <= MAX;
	}

	public static create(value: string): Result<CustomStringValueObject> {
		const isValidValue = CustomStringValueObject.isValidProps(value);

		if (!isValidValue) {
			return Result.fail(CustomStringValueObject.MESSAGE);
		}

		return Result.Ok(new CustomStringValueObject({ value }));
	}
}

export default CustomStringValueObject;
