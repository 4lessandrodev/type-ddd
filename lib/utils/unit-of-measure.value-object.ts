import { ValueObject } from '../core/value-object';
import Result from '../core/result';

export enum UnitsOfMeasure {
	'CM' = 'CM',
	'MM' = 'MM',
	'MT' = 'MT',
	'INCH' = 'INCH',
	'FOOT' = 'FOOT',
	'YARD' = 'YARD',
}

export enum UnitsDescription {
	'CM' = 'CENTIMETER',
	'MM' = 'MILLIMETER',
	'MT' = 'METER',
	'INCH' = 'INCHES',
	'FOOT' = 'FOOT',
	'YARD' = 'YARD',
}

export type UnitOfMeasure = keyof typeof UnitsOfMeasure;

interface Prop {
	value: UnitOfMeasure;
}

export class UnitOfMeasureValueObject extends ValueObject<Prop> {
	private constructor(props: Prop) {
		super(props);
	}

	get value(): UnitOfMeasure {
		return this.props.value;
	}

	get description(): UnitsDescription {
		return UnitsDescription[this.props.value];
	}

	public static isValidValue(value: UnitOfMeasure): boolean {
		return value in UnitsOfMeasure;
	}

	public static create(
		value: UnitOfMeasure
	): Result<UnitOfMeasureValueObject> {
		const isValid = UnitOfMeasureValueObject.isValidValue(value);

		if (!isValid) {
			return Result.fail('Invalid unit of measure value');
		}

		return Result.ok(new UnitOfMeasureValueObject({ value }));
	}
}

export default UnitOfMeasureValueObject;
