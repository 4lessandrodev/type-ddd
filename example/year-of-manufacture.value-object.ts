import { Result, ValueObject } from '@types-ddd';

interface Prop {
	value: number;
}

export class YearOfManufacture extends ValueObject<Prop> {
	private constructor(prop: Prop) {
		super(prop);
	}

	get value(): number {
		return this.props.value;
	}

	public static isValidValue(value: number): boolean {
		const currentYear = new Date().getFullYear();

		return value > 1960 && value <= currentYear;
	}

	public static create(value: number): Result<YearOfManufacture> {
		// Business Logic Validation
		if (!YearOfManufacture.isValidValue(value)) {
			const currentYear = new Date().getFullYear();

			return Result.fail<YearOfManufacture>(
				`Invalid value for a manufacture year. It must be between 1960 and ${currentYear}`
			);
		}

		return Result.ok<YearOfManufacture>(new YearOfManufacture({ value }));
	}
}
