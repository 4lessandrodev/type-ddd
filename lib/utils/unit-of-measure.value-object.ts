import { ValueObject } from '../core';
import { Result } from '../core';

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

	value(): UnitOfMeasure {
		return this.props.value;
	}

	get description(): UnitsDescription {
		return UnitsDescription[this.props.value];
	}

	validation(_key: any, _value: any): boolean {
		return _value in UnitsOfMeasure;
	}

	public static isValidProps(value: UnitOfMeasure): boolean {
		return value in UnitsOfMeasure;
	}

	public static create(
		value: UnitOfMeasure
	): Result<UnitOfMeasureValueObject> {
		const isValid = UnitOfMeasureValueObject.isValidProps(value);

		if (!isValid) {
			return Result.fail('Invalid unit of measure value');
		}

		return Result.Ok(new UnitOfMeasureValueObject({ value }));
	}
}

export default UnitOfMeasureValueObject;
