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
	protected static readonly DISABLE_SETTER: boolean = true;
	protected static readonly MESSAGE: string = 'Invalid unit of measure value';

	private constructor(props: Prop) {
		super(props, {
			disableSetters: UnitOfMeasureValueObject.DISABLE_SETTER,
		});
	}

	value(): UnitOfMeasure {
		return this.props.value;
	}

	get description(): UnitsDescription {
		return UnitsDescription[this.props.value];
	}

	validation(value: UnitOfMeasure): boolean {
		return UnitOfMeasureValueObject.isValidProps(value);
	}

	public static isValidProps(value: UnitOfMeasure): boolean {
		return value in UnitsOfMeasure;
	}

	public static create(
		value: UnitOfMeasure,
	): Result<UnitOfMeasureValueObject> {
		const isValid = UnitOfMeasureValueObject.isValidProps(value);

		if (!isValid) {
			return Result.fail(UnitOfMeasureValueObject.MESSAGE);
		}

		return Result.Ok(new UnitOfMeasureValueObject({ value }));
	}
}

export default UnitOfMeasureValueObject;
