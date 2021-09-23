import ValueObject from '../core/value-object';
import { Result } from '../core/result';
import CustomNumberValueObject from './custom-number.value-object';
import { UnitOfMeasure, UnitsOfMeasure } from './unit-of-measure.value-object';
import { CustomNmbProps } from './custom-number.value-object';

interface DimensionValueObjectProps {
	dimension: CustomNumberValueObject;
	unit: UnitOfMeasure;
}

interface Props {
	value: number;
	unit: UnitOfMeasure;
}

export class DimensionValueObject extends ValueObject<DimensionValueObjectProps> {
	private constructor(props: DimensionValueObjectProps) {
		super(props);
	}

	get dimension(): CustomNumberValueObject {
		return this.props.dimension;
	}

	get unit(): UnitOfMeasure {
		return this.props.unit;
	}

	/**
	 *
	 * @description this method does not change value, only measure unit.
	 * @summary to convert value and unit use toMT / toMM ...
	 * @param newDimension as CustomNumberValueObject
	 */
	changeValue(newDimension: CustomNumberValueObject): void {
		this.props.dimension = newDimension;
	}

	/**
	 *
	 * @description this method does not change value, only measure unit.
	 * @summary to convert value and unit use toMT / toMM ...
	 * @param newDimensionUnit as UnitOfMeasure MT/MM/CM etc.
	 */
	changeDimensionUnit(newDimensionUnit: UnitOfMeasure): void {
		this.props.unit = newDimensionUnit;
	}

	private updateInstanceValues(value: number, unit: UnitOfMeasure): void {
		const float = (value = parseFloat(value.toFixed(3)));
		this.props.dimension =
			CustomNumberValueObject.create(float).getResult();
		this.changeDimensionUnit(unit);
	}

	/**
	 * convert value and unit to cm
	 * @returns instance
	 */
	toCM(): DimensionValueObject {
		let unit = this.props.unit;
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
		this.updateInstanceValues(value, 'CM');
		return this;
	}

	/**
	 * convert value and unit to mm
	 * @returns instance
	 */
	toMM(): DimensionValueObject {
		let unit = this.props.unit;
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
		this.updateInstanceValues(value, 'MM');
		return this;
	}

	/**
	 * convert value and unit to mt
	 * @returns instance
	 */
	toMT(): DimensionValueObject {
		let unit = this.props.unit;
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
		this.updateInstanceValues(value, 'MT');
		return this;
	}

	/**
	 * convert value and unit to inch
	 * @returns instance
	 */
	toINCH(): DimensionValueObject {
		let unit = this.props.unit;
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
		this.updateInstanceValues(value, 'INCH');
		return this;
	}

	/**
	 * convert value and unit to foot
	 * @returns instance
	 */
	toFOOT(): DimensionValueObject {
		let unit = this.props.unit;
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
		this.updateInstanceValues(value, 'FOOT');
		return this;
	}

	/**
	 * convert value and unit to yard
	 * @returns instance
	 */
	toYARD(): DimensionValueObject {
		let unit = this.props.unit;
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
		this.updateInstanceValues(value, 'YARD');
		return this;
	}

	public static create(
		{ unit, value }: Props,
		customValidation?: CustomNmbProps
	): Result<DimensionValueObject> {
		const isValidUnit = unit in UnitsOfMeasure;

		if (!isValidUnit) {
			return Result.fail('Invalid unit for Dimension');
		}

		const customNumber = CustomNumberValueObject.create(
			parseFloat(value.toFixed(3)),
			customValidation
		);
		if (customNumber.isFailure) {
			return Result.fail(customNumber.errorValue());
		}

		return Result.ok(
			new DimensionValueObject({
				unit,
				dimension: customNumber.getResult(),
			})
		);
	}
}

export default DimensionValueObject;
