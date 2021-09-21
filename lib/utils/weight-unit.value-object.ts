import { ValueObject } from '../core/value-object';
import Result from '../core/result';

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
	private constructor(props: Prop) {
		super(props);
	}

	get value(): UnitOfWeight {
		return this.props.value;
	}

	get description(): UnitsOfWeightDescription {
		return UnitsOfWeightDescription[this.props.value];
	}

	public static isValidValue(value: UnitOfWeight): boolean {
		return value in UnitsOfWeight;
	}

	public static create(value: UnitOfWeight): Result<WeightUnitValueObject> {
		const isValid = WeightUnitValueObject.isValidValue(value);

		if (!isValid) {
			return Result.fail('Invalid weight unit value');
		}

		return Result.ok(new WeightUnitValueObject({ value }));
	}
}

export default WeightUnitValueObject;
