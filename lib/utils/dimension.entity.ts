import { Entity, BaseDomainEntity } from '..';
import { Result } from '../core/result';
import CustomNumberValueObject from './custom-number.value-object';
import UnitOfMeasureValueObject from './unit-of-measure.value-object';

export interface DimensionProps extends BaseDomainEntity {
	dimension: CustomNumberValueObject;
	dimensionUnit: UnitOfMeasureValueObject;
}

export class DimensionEntity extends Entity<DimensionProps> {
	private constructor(props: DimensionProps) {
		super(props, DimensionEntity.name);
	}

	get dimension(): CustomNumberValueObject {
		return this.props.dimension;
	}

	get dimensionUnit(): UnitOfMeasureValueObject {
		return this.props.dimensionUnit;
	}

	changeDimension(newDimension: UnitOfMeasureValueObject): void {
		this.props.dimensionUnit = newDimension;
	}

	changeDimensionUnit(newDimensionUnit: UnitOfMeasureValueObject): void {
		this.props.dimensionUnit = newDimensionUnit;
	}

	/**
	 * convert value to cm
	 */
	toCM(): void {
		let unit = this.props.dimensionUnit.value;
		let value: number = this.props.dimension.value;
		switch (unit.length > 0) {
			case unit === 'FOOT':
				value = (value * 100 * 30.48) / 100;
				break;
			case unit === 'INCH':
				value = (value * 100 * 2.54) / 100;
				break;
			case unit === 'MM':
				value = (value * 100) / 10 / 100;
				break;
			case unit === 'MT':
				value = (value * 100 * 100) / 100;
				break;
			case unit === 'YARD':
				value = (value * 100 * 91.44) / 100;
				break;
		}
		value = parseFloat(value.toFixed(3));
		this.props.dimension =
			CustomNumberValueObject.create(value).getResult();
		this.props.dimensionUnit =
			UnitOfMeasureValueObject.create('CM').getResult();
	}

	/**
	 * convert value to mm
	 */
	toMM(): void {
		let unit = this.props.dimensionUnit.value;
		let value: number = this.props.dimension.value;
		switch (unit.length > 0) {
			case unit === 'CM':
				value = (value * 100 * 10) / 100;
				break;
			case unit === 'FOOT':
				value = (value * 100 * 305) / 100;
				break;
			case unit === 'INCH':
				value = (value * 100 * 25.4) / 100;
				break;
			case unit === 'MT':
				value = (value * 100 * 1000) / 100;
				break;
			case unit === 'YARD':
				value = (value * 100 * 914) / 100;
				break;
		}
		value = parseFloat(value.toFixed(3));
		this.props.dimension =
			CustomNumberValueObject.create(value).getResult();
		this.props.dimensionUnit =
			UnitOfMeasureValueObject.create('MM').getResult();
	}

	/**
	 * convert value to mt
	 */
	toMT(): void {
		let unit = this.props.dimensionUnit.value;
		let value: number = this.props.dimension.value;
		switch (unit.length > 0) {
			case unit === 'CM':
				value = (value * 100) / 100 / 100;
				break;
			case unit === 'FOOT':
				value = (value * 100) / 3.289 / 100;
				break;
			case unit === 'INCH':
				value = (value * 100) / 39.37 / 100;
				break;
			case unit === 'MM':
				value = (value * 100) / 1000 / 100;
				break;
			case unit === 'YARD':
				value = (value * 100) / 1.094 / 100;
				break;
		}
		value = parseFloat(value.toFixed(3));
		this.props.dimension =
			CustomNumberValueObject.create(value).getResult();
		this.props.dimensionUnit =
			UnitOfMeasureValueObject.create('MT').getResult();
	}

	/**
	 * convert value to inch
	 */
	toINCH(): void {
		let unit = this.props.dimensionUnit.value;
		let value: number = this.props.dimension.value;
		switch (unit.length > 0) {
			case unit === 'CM':
				value = (value * 100) / 2.54 / 100;
				break;
			case unit === 'FOOT':
				value = (value * 100 * 12) / 100;
				break;
			case unit === 'MM':
				value = (value * 100) / 25.4 / 100;
				break;
			case unit === 'MT':
				value = (value * 100 * 39.37) / 100;
				break;
			case unit === 'YARD':
				value = (value * 100 * 36) / 100;
				break;
		}
		value = parseFloat(value.toFixed(3));
		this.props.dimension =
			CustomNumberValueObject.create(value).getResult();
		this.props.dimensionUnit =
			UnitOfMeasureValueObject.create('INCH').getResult();
	}
	toFOOT(): void {
		let unit = this.props.dimensionUnit.value;
		let value: number = this.props.dimension.value;
		switch (unit.length > 0) {
			case unit === 'CM':
				value = (value * 100) / 30.48 / 100;
				break;
			case unit === 'INCH':
				value = (value * 100) / 12 / 100;
				break;
			case unit === 'MM':
				value = (value * 100) / 305 / 100;
				break;
			case unit === 'MT':
				value = (value * 100 * 3.281) / 100;
				break;
			case unit === 'YARD':
				value = (value * 100 * 3) / 100;
				break;
		}
		value = parseFloat(value.toFixed(3));
		this.props.dimension =
			CustomNumberValueObject.create(value).getResult();
		this.props.dimensionUnit =
			UnitOfMeasureValueObject.create('FOOT').getResult();
	}
	toYARD(): void {
		let unit = this.props.dimensionUnit.value;
		let value: number = this.props.dimension.value;
		switch (unit.length > 0) {
			case unit === 'CM':
				value = (value * 100) / 91.44 / 100;
				break;
			case unit === 'FOOT':
				value = (value * 100) / 3 / 100;
				break;
			case unit === 'INCH':
				value = (value * 100) / 36 / 100;
				break;
			case unit === 'MM':
				value = (value * 100) / 914 / 100;
				break;
			case unit === 'MT':
				value = (value * 100 * 1.094) / 100;
				break;
		}
		value = parseFloat(value.toFixed(3));
		this.props.dimension =
			CustomNumberValueObject.create(value).getResult();
		this.props.dimensionUnit =
			UnitOfMeasureValueObject.create('YARD').getResult();
	}

	public static create(props: DimensionProps): Result<DimensionEntity> {
		return Result.ok(new DimensionEntity(props));
	}
}

export default DimensionEntity;
