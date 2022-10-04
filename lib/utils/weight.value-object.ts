import CustomNumberValueObject from './custom-number.value-object';
import { Result } from '../core';
import { ValueObject } from '../core';
import { UnitOfWeight, UnitsOfWeight } from './weight-unit.value-object';
import { CustomNmbProps } from './custom-number.value-object';

interface WeightValueObjectProps {
	unit: UnitOfWeight;
	weight: CustomNumberValueObject;
}

interface Props {
	unit: UnitOfWeight;
	value: number;
}

export class WeightValueObject extends ValueObject<WeightValueObjectProps> {
	private constructor(props: WeightValueObjectProps) {
		super(props, { disableSetters: true });
	}

	/**
	 * @returns WeightUnitValueObject instance
	 */
	get unit(): UnitOfWeight {
		return this.props.unit;
	}

	/**
	 * @returns CustomNumberValueObject instance
	 */
	get weight(): CustomNumberValueObject {
		return this.props.weight;
	}

	/**
	 *
	 * @param newValue WeightUnitValueObject instance
	 * @returns instance
	 */
	changeWeightUnit(newValue: UnitOfWeight): WeightValueObject {
		this.props.unit = newValue;
		return this;
	}

	/**
	 *
	 * @param newValue CustomNumberValueObject instance
	 * @returns instance
	 */
	changeValue(newValue: CustomNumberValueObject): WeightValueObject {
		this.props.weight = CustomNumberValueObject.create(
			parseFloat(newValue.value().toFixed(3))
		).value();
		return this;
	}

	private updateInstanceValues(
		value: number,
		unit: UnitOfWeight
	): WeightValueObject {
		const float = parseFloat(value.toFixed(3));
		this.props.weight = CustomNumberValueObject.create(float).value();
		this.changeWeightUnit(unit);
		return this;
	}

	/**
	 * convert instance value and unit to kilogram
	 * @returns instance
	 */
	toKG(): WeightValueObject {
		const currentUnit = this.props.unit;
		let kg: number = this.props.weight.value();

		switch (currentUnit.length > 0) {
			case currentUnit === 'G':
				kg = (this.props.weight.value() * 100) / 1000 / 100;
				break;
			case currentUnit === 'MG':
				kg = (this.props.weight.value() * 1000) / 1000000 / 1000;
				break;
			case currentUnit === 'LB':
				kg = (this.props.weight.value() * 100) / 2.205 / 100;
				break;
			case currentUnit === 'TON':
				kg = (this.props.weight.value() * 100 * 1000) / 100;
				break;
			case currentUnit === 'OZ':
				kg = (this.props.weight.value() * 100) / 35.274 / 100;
				break;
		}
		this.updateInstanceValues(kg, 'KG');
		return this;
	}

	/**
	 * convert instance value and unit to gram
	 * @returns instance
	 */
	toG(): WeightValueObject {
		const currentUnit = this.props.unit;
		let g: number = this.props.weight.value();

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				g = (this.props.weight.value() * 100 * 1000) / 100;
				break;
			case currentUnit === 'MG':
				g = (this.props.weight.value() * 100) / 1000 / 100;

				break;
			case currentUnit === 'LB':
				g = (this.props.weight.value() * 100 * 454) / 100;
				break;
			case currentUnit === 'TON':
				g = (this.props.weight.value() * 100 * 1e6) / 100;
				break;
			case currentUnit === 'OZ':
				g = (this.props.weight.value() * 100 * 28.349) / 100;
				break;
		}
		this.updateInstanceValues(g, 'G');
		return this;
	}

	/**
	 * convert instance value and unit to milligram
	 * @returns instance
	 */
	toMG(): WeightValueObject {
		const currentUnit = this.props.unit;
		let mg: number = this.props.weight.value();

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				mg = (this.props.weight.value() * 100 * 1e6) / 100;
				break;
			case currentUnit === 'G':
				mg = (this.props.weight.value() * 100 * 1000) / 100;
				break;
			case currentUnit === 'LB':
				mg = (this.props.weight.value() * 100 * 453592) / 100;
				break;
			case currentUnit === 'TON':
				mg = (this.props.weight.value() * 100 * 1e9) / 100;
				break;
			case currentUnit === 'OZ':
				mg = (this.props.weight.value() * 100 * 28350) / 100;
				break;
		}
		this.updateInstanceValues(mg, 'MG');
		return this;
	}

	/**
	 * convert instance value and unit to tonne
	 * @returns instance
	 */
	toTON(): WeightValueObject {
		const currentUnit = this.props.unit;
		let ton: number = this.props.weight.value();

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				ton = (this.props.weight.value() * 100) / 1000 / 100;
				break;
			case currentUnit === 'G':
				ton = (this.props.weight.value() * 100) / 1e6 / 100;
				break;
			case currentUnit === 'LB':
				ton = (this.props.weight.value() * 100) / 2205 / 100;
				break;
			case currentUnit === 'MG':
				ton = (this.props.weight.value() * 100) / 1e9 / 100;
				break;
			case currentUnit === 'OZ':
				ton = (this.props.weight.value() * 100) / 35274 / 100;
				break;
		}
		this.updateInstanceValues(ton, 'TON');
		return this;
	}

	/**
	 * convert instance value and unit to libre
	 * @returns instance
	 */
	toLB(): WeightValueObject {
		const currentUnit = this.props.unit;
		let lb: number = this.props.weight.value();

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				lb = (this.props.weight.value() * 100 * 2.205) / 100;
				break;
			case currentUnit === 'G':
				lb = (this.props.weight.value() * 100) / 454 / 100;
				break;
			case currentUnit === 'TON':
				lb = (this.props.weight.value() * 100 * 2205) / 100;
				break;
			case currentUnit === 'MG':
				lb = (this.props.weight.value() * 100) / 453592 / 100;
				break;
			case currentUnit === 'OZ':
				lb = (this.props.weight.value() * 100) / 16 / 100;
				break;
		}
		this.updateInstanceValues(lb, 'LB');
		return this;
	}

	/**
	 * convert instance value and unit to onz
	 * @returns instance
	 */
	toOZ(): WeightValueObject {
		const currentUnit = this.props.unit;
		let oz: number = this.props.weight.value();

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				oz = (this.props.weight.value() * 100 * 35.274) / 100;
				break;
			case currentUnit === 'G':
				oz = (this.props.weight.value() * 100) / 28.35 / 100;
				break;
			case currentUnit === 'TON':
				oz = (this.props.weight.value() * 100 * 35274) / 100;
				break;
			case currentUnit === 'MG':
				oz = (this.props.weight.value() * 100) / 28350 / 100;
				break;
			case currentUnit === 'LB':
				oz = (this.props.weight.value() * 100 * 16) / 100;
				break;
		}
		this.updateInstanceValues(oz, 'OZ');
		return this;
	}

	public static create(
		{ value, unit }: Props,
		customValidation?: CustomNmbProps
	): Result<WeightValueObject> {
		const customNumber = CustomNumberValueObject.create(
			parseFloat(value.toFixed(3)),
			customValidation
		);

		const isValidUnit = unit in UnitsOfWeight;

		if (!isValidUnit) {
			return Result.fail('Invalid unit for weight');
		}

		if (customNumber.isFail()) {
			return Result.fail(customNumber.error());
		}

		return Result.Ok(
			new WeightValueObject({
				unit,
				weight: customNumber.value(),
			})
		);
	}
}

export default WeightValueObject;
