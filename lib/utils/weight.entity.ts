import { Entity } from '../core/entity';
import { BaseDomainEntity } from '../core/base-domain-entity';
import CustomNumberValueObject from './custom-number.value-object';
import WeightUnitValueObject from './weight-unit.value-object';
import { Result } from '../core/result';

export interface WeightEntityProps extends BaseDomainEntity {
	weightUnit: WeightUnitValueObject;
	weight: CustomNumberValueObject;
}

export class WeightEntity extends Entity<WeightEntityProps> {
	private constructor(props: WeightEntityProps) {
		super(props, WeightEntity.name);
	}

	/**
	 * @returns WeightUnitValueObject instance
	 */
	get weightUnit(): WeightUnitValueObject {
		return this.props.weightUnit;
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
	 */
	changeWeightUnit(newValue: WeightUnitValueObject): void {
		this.props.weightUnit = newValue;
	}

	/**
	 *
	 * @param newValue CustomNumberValueObject instance
	 */
	changeWeight(newValue: CustomNumberValueObject): void {
		this.props.weight = newValue;
	}

	/**
	 * convert instance value to kilogram
	 */
	toKG(): void {
		const currentUnit = this.props.weightUnit.value;
		let kg: number = this.props.weight.value;

		switch (currentUnit.length > 0) {
			case currentUnit === 'G':
				kg = (this.props.weight.value * 100) / 1000 / 100;
				break;
			case currentUnit === 'MG':
				kg = (this.props.weight.value * 1000) / 1000000 / 1000;
				break;
			case currentUnit === 'LB':
				kg = (this.props.weight.value * 100) / 2.205 / 100;
				break;
			case currentUnit === 'TON':
				kg = (this.props.weight.value * 100 * 1000) / 100;
				break;
			case currentUnit === 'OZ':
				kg = (this.props.weight.value * 100) / 35.274 / 100;
				break;
		}
		this.changeWeight(
			CustomNumberValueObject.create(
				parseFloat(kg.toFixed(3))
			).getResult()
		);
		this.changeWeightUnit(WeightUnitValueObject.create('KG').getResult());
	}

	/**
	 * convert instance value to gram
	 */
	toG(): void {
		const currentUnit = this.props.weightUnit.value;
		let g: number = this.props.weight.value;

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				g = (this.props.weight.value * 100 * 1000) / 100;
				break;
			case currentUnit === 'MG':
				g = (this.props.weight.value * 100) / 1000 / 100;

				break;
			case currentUnit === 'LB':
				g = (this.props.weight.value * 100 * 454) / 100;
				break;
			case currentUnit === 'TON':
				g = (this.props.weight.value * 100 * 1e6) / 100;
				break;
			case currentUnit === 'OZ':
				g = (this.props.weight.value * 100 * 28.349) / 100;
				break;
		}
		this.changeWeight(
			CustomNumberValueObject.create(parseFloat(g.toFixed(3))).getResult()
		);
		this.changeWeightUnit(WeightUnitValueObject.create('G').getResult());
	}

	/**
	 * convert instance value to milligram
	 */
	toMG(): void {
		const currentUnit = this.props.weightUnit.value;
		let mg: number = this.props.weight.value;

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				mg = (this.props.weight.value * 100 * 1e6) / 100;
				break;
			case currentUnit === 'G':
				mg = (this.props.weight.value * 100 * 1000) / 100;
				break;
			case currentUnit === 'LB':
				mg = (this.props.weight.value * 100 * 453592) / 100;
				break;
			case currentUnit === 'TON':
				mg = (this.props.weight.value * 100 * 1e9) / 100;
				break;
			case currentUnit === 'OZ':
				mg = (this.props.weight.value * 100 * 28350) / 100;
				break;
		}
		this.changeWeight(
			CustomNumberValueObject.create(
				parseFloat(mg.toFixed(3))
			).getResult()
		);
		this.changeWeightUnit(WeightUnitValueObject.create('MG').getResult());
	}

	/**
	 * convert instance value to tonne
	 */
	toTON(): void {
		const currentUnit = this.props.weightUnit.value;
		let ton: number = this.props.weight.value;

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				ton = (this.props.weight.value * 100) / 1000 / 100;
				break;
			case currentUnit === 'G':
				ton = (this.props.weight.value * 100) / 1e6 / 100;
				break;
			case currentUnit === 'LB':
				ton = (this.props.weight.value * 100) / 2205 / 100;
				break;
			case currentUnit === 'MG':
				ton = (this.props.weight.value * 100) / 1e9 / 100;
				break;
			case currentUnit === 'OZ':
				ton = (this.props.weight.value * 100) / 35274 / 100;
				break;
		}
		this.changeWeight(
			CustomNumberValueObject.create(
				parseFloat(ton.toFixed(3))
			).getResult()
		);
		this.changeWeightUnit(WeightUnitValueObject.create('TON').getResult());
	}

	/**
	 * convert instance value to libre
	 */
	toLB(): void {
		const currentUnit = this.props.weightUnit.value;
		let lb: number = this.props.weight.value;

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				lb = (this.props.weight.value * 100 * 2.205) / 100;
				break;
			case currentUnit === 'G':
				lb = (this.props.weight.value * 100) / 454 / 100;
				break;
			case currentUnit === 'TON':
				lb = (this.props.weight.value * 100 * 2205) / 100;
				break;
			case currentUnit === 'MG':
				lb = (this.props.weight.value * 100) / 453592 / 100;
				break;
			case currentUnit === 'OZ':
				lb = (this.props.weight.value * 100) / 16 / 100;
				break;
		}
		this.changeWeight(
			CustomNumberValueObject.create(
				parseFloat(lb.toFixed(3))
			).getResult()
		);
		this.changeWeightUnit(WeightUnitValueObject.create('LB').getResult());
	}

	/**
	 * convert instance value to onz
	 */
	toOZ(): void {
		const currentUnit = this.props.weightUnit.value;
		let lb: number = this.props.weight.value;

		switch (currentUnit.length > 0) {
			case currentUnit === 'KG':
				lb = (this.props.weight.value * 100 * 35.274) / 100;
				break;
			case currentUnit === 'G':
				lb = (this.props.weight.value * 100) / 28.35 / 100;
				break;
			case currentUnit === 'TON':
				lb = (this.props.weight.value * 100 * 35274) / 100;
				break;
			case currentUnit === 'MG':
				lb = (this.props.weight.value * 100) / 28350 / 100;
				break;
			case currentUnit === 'LB':
				lb = (this.props.weight.value * 100 * 16) / 100;
				break;
		}
		this.changeWeight(
			CustomNumberValueObject.create(
				parseFloat(lb.toFixed(3))
			).getResult()
		);
		this.changeWeightUnit(WeightUnitValueObject.create('OZ').getResult());
	}

	public static create(props: WeightEntityProps): Result<WeightEntity> {
		return Result.ok(new WeightEntity(props));
	}
}

export default WeightEntity;
