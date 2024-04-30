import { Result, ValueObject } from 'rich-domain';

export enum UnitsOfWeight {
	'KG' = 'KG',
	'G' = 'G',
	'MG' = 'MG',
	'TON' = 'TON',
	'LB' = 'LB',
	'OZ' = 'OZ',
}

export enum UnitsOfWeightDescription {
	'KG' = 'KILOGRAM',
	'G' = 'GRAM',
	'MG' = 'MILLIGRAM',
	'TON' = 'TONNE',
	'LB' = 'POUND',
	'OZ' = 'OUNCE',
}

export type UnitOfWeight = keyof typeof UnitsOfWeight;

interface Prop {
	value: UnitOfWeight;
}

export class WeightUnitValueObject extends ValueObject<Prop> {
	protected static readonly MESSAGE: string = 'Invalid weight unit value';

	private constructor(props: Prop) {
		super(props);
	}

	value(): UnitOfWeight {
		return this.props.value;
	}

	get description(): UnitsOfWeightDescription {
		return UnitsOfWeightDescription[this.props.value];
	}

	validation(value: UnitOfWeight): boolean {
		return WeightUnitValueObject.isValidProps(value);
	}

	public static isValidProps(value: UnitOfWeight): boolean {
		return value in UnitsOfWeight;
	}

	public static create(value: UnitOfWeight): Result<WeightUnitValueObject> {
		const isValid = WeightUnitValueObject.isValidProps(value);

		if (!isValid) {
			return Result.fail(WeightUnitValueObject.MESSAGE);
		}

		return Result.Ok(new WeightUnitValueObject({ value }));
	}
}

export default WeightUnitValueObject;
