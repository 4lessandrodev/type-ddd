import WeightValueObject from '../../lib/utils/weight.value-object';
import { UnitOfWeight } from '../../lib/utils/weight-unit.value-object';
import { CustomNumberValueObject } from '@types-ddd';

describe('weight.value-object', () => {
	const makeSut = (unit: UnitOfWeight) => {
		const value = 1000;
		const props = {
			value,
			unit,
		};

		const valueObject = WeightValueObject.create(props).getResult();
		return valueObject;
	};

	it('should be defined', () => {
		const valueObject = WeightValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should fail if provide a unsafe value', () => {
		const valueObject = WeightValueObject.create({
			unit: 'TON',
			value: Number.MAX_SAFE_INTEGER + 1,
		});
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fail if provide a unsafe value', () => {
		const valueObject = WeightValueObject.create({
			unit: 'TON',
			value: 400,
		}).getResult();
		expect(valueObject.unit).toBe('TON');

		valueObject.changeValue(
			CustomNumberValueObject.create(200).getResult()
		);
		expect(valueObject.weight.value).toBe(200);
		expect(valueObject.unit).toBe('TON');

		valueObject.changeWeightUnit('KG');

		expect(valueObject.unit).toBe('KG');
		expect(valueObject.weight.value).toBe(200);
	});

	it('should fail if provide a unsafe value', () => {
		const valueObject = WeightValueObject.create({
			unit: 'TON',
			value: Number.MIN_SAFE_INTEGER - 1,
		});
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should getters be defined', () => {
		const valueObject = makeSut('KG');
		expect(valueObject.weight).toBeDefined();
		expect(valueObject.unit).toBeDefined();
	});

	it('should getters be defined', () => {
		const valueObject = makeSut('KG');
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('KG');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('KG');
		valueObject.toTON();
		expect(valueObject.weight.value).toBe(1);
		expect(valueObject.unit).toBe('TON');
	});

	it('should convert to g', () => {
		const valueObject = makeSut('KG');
		valueObject.toG();
		expect(valueObject.weight.value).toBe(1e6);
		expect(valueObject.unit).toBe('G');
	});

	it('should convert to mg', () => {
		const valueObject = makeSut('KG');
		valueObject.toMG();
		expect(valueObject.weight.value).toBe(1e9);
		expect(valueObject.unit).toBe('MG');
	});

	it('should convert to lb', () => {
		const valueObject = makeSut('KG');
		valueObject.toLB();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(2204.62);
		expect(valueObject.weight.value).toBeLessThanOrEqual(2205);
		expect(valueObject.unit).toBe('LB');
	});

	it('should convert to oz', () => {
		const valueObject = makeSut('KG');
		valueObject.toOZ();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(35273);
		expect(valueObject.weight.value).toBeLessThanOrEqual(35274);
		expect(valueObject.unit).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const valueObject = makeSut('G');
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('G');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('G');
		valueObject.toTON();
		expect(valueObject.weight.value).toBe(0.001);
		expect(valueObject.unit).toBe('TON');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('G');
		valueObject.toKG();
		expect(valueObject.weight.value).toBe(1);
		expect(valueObject.unit).toBe('KG');
	});

	it('should convert to g', () => {
		const valueObject = makeSut('G');
		valueObject.toG();
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('G');
	});

	it('should convert to mg', () => {
		const valueObject = makeSut('G');
		valueObject.toMG();
		expect(valueObject.weight.value).toBe(1e6);
		expect(valueObject.unit).toBe('MG');
	});

	it('should convert to lb', () => {
		const valueObject = makeSut('G');
		valueObject.toLB();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(2.202);
		expect(valueObject.unit).toBe('LB');
	});

	it('should convert to oz', () => {
		const valueObject = makeSut('G');
		valueObject.toOZ();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(35.273);
		expect(valueObject.weight.value).toBeLessThanOrEqual(35.274);
		expect(valueObject.unit).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const valueObject = makeSut('LB');
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('LB');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('LB');
		valueObject.toTON();
		expect(valueObject.weight.value).toBe(0.454);
		expect(valueObject.unit).toBe('TON');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('LB');
		valueObject.toKG();
		expect(valueObject.weight.value).toBe(453.515);
		expect(valueObject.unit).toBe('KG');
	});

	it('should convert to g', () => {
		const valueObject = makeSut('LB');
		valueObject.toG();
		expect(valueObject.weight.value).toBe(454000);
		expect(valueObject.unit).toBe('G');
	});

	it('should convert to mg', () => {
		const valueObject = makeSut('LB');
		valueObject.toMG();
		expect(valueObject.weight.value).toBe(453592000);
		expect(valueObject.unit).toBe('MG');
	});

	it('should convert to lb', () => {
		const valueObject = makeSut('LB');
		valueObject.toLB();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(1000);
		expect(valueObject.unit).toBe('LB');
	});

	it('should convert to oz', () => {
		const valueObject = makeSut('LB');
		valueObject.toOZ();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(16000);
		expect(valueObject.unit).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const valueObject = makeSut('MG');
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('MG');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('MG');
		valueObject.toTON();
		expect(valueObject.weight.value).toBe(0);
		expect(valueObject.unit).toBe('TON');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('MG');
		valueObject.toKG();
		expect(valueObject.weight.value).toBe(0.001);
		expect(valueObject.unit).toBe('KG');
	});

	it('should convert to g', () => {
		const valueObject = makeSut('MG');
		valueObject.toG();
		expect(valueObject.weight.value).toBe(1);
		expect(valueObject.unit).toBe('G');
	});

	it('should convert to mg', () => {
		const valueObject = makeSut('MG');
		valueObject.toMG();
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('MG');
	});

	it('should convert to lb', () => {
		const valueObject = makeSut('MG');
		valueObject.toLB();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(0.002);
		expect(valueObject.unit).toBe('LB');
	});

	it('should convert to oz', () => {
		const valueObject = makeSut('MG');
		valueObject.toOZ();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(0.035);
		expect(valueObject.unit).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const valueObject = makeSut('OZ');
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('OZ');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('OZ');
		valueObject.toTON();
		expect(valueObject.weight.value).toBe(0.028);
		expect(valueObject.unit).toBe('TON');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('OZ');
		valueObject.toKG();
		expect(valueObject.weight.value).toBe(28.349);
		expect(valueObject.unit).toBe('KG');
	});

	it('should convert to g', () => {
		const valueObject = makeSut('OZ');
		valueObject.toG();
		expect(valueObject.weight.value).toBe(28349);
		expect(valueObject.unit).toBe('G');
	});

	it('should convert to mg', () => {
		const valueObject = makeSut('OZ');
		valueObject.toMG();
		expect(valueObject.weight.value).toBe(2.835e7);
		expect(valueObject.unit).toBe('MG');
	});

	it('should convert to lb', () => {
		const valueObject = makeSut('OZ');
		valueObject.toLB();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(62.5);
		expect(valueObject.unit).toBe('LB');
	});

	it('should convert to oz', () => {
		const valueObject = makeSut('OZ');
		valueObject.toOZ();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(1000);
		expect(valueObject.unit).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const valueObject = makeSut('TON');
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('TON');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('TON');
		valueObject.toTON();
		expect(valueObject.weight.value).toBe(1000);
		expect(valueObject.unit).toBe('TON');
	});

	it('should convert to ton', () => {
		const valueObject = makeSut('TON');
		valueObject.toKG();
		expect(valueObject.weight.value).toBe(1e6);
		expect(valueObject.unit).toBe('KG');
	});

	it('should convert to g', () => {
		const valueObject = makeSut('TON');
		valueObject.toG();
		expect(valueObject.weight.value).toBe(1e9);
		expect(valueObject.unit).toBe('G');
	});

	it('should convert to mg', () => {
		const valueObject = makeSut('TON');
		valueObject.toMG();
		expect(valueObject.weight.value).toBe(1e12);
		expect(valueObject.unit).toBe('MG');
	});

	it('should convert to lb', () => {
		const valueObject = makeSut('TON');
		valueObject.toLB();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(2.205e6);
		expect(valueObject.unit).toBe('LB');
	});

	it('should convert to oz', () => {
		const valueObject = makeSut('TON');
		valueObject.toOZ();
		expect(valueObject.weight.value).toBeGreaterThanOrEqual(3.527e7);
		expect(valueObject.unit).toBe('OZ');
	});
});
