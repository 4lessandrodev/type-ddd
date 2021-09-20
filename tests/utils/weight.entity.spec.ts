import WeightEntity from '../../lib/utils/weight.entity';
import WeightUnitValueObject from '../../lib/utils/weight-unit.value-object';
import { CustomNumberValueObject, DomainId } from '@types-ddd';
import { UnitOfWeight } from '../../lib/utils/weight-unit.value-object';

describe('weight.entity', () => {
	const makeSut = (value: UnitOfWeight) => {
		const weightUnit = WeightUnitValueObject.create(value).getResult();
		const weight = CustomNumberValueObject.create(1000).getResult();
		const ID = DomainId.create();
		const props = {
			ID,
			weight,
			weightUnit,
		};

		const entity = WeightEntity.create(props).getResult();
		return entity;
	};

	it('should be defined', () => {
		const entity = WeightEntity.create;
		expect(entity).toBeDefined();
	});

	it('should getters be defined', () => {
		const entity = makeSut('KG');
		expect(entity.weight).toBeDefined();
		expect(entity.weightUnit).toBeDefined();
	});

	it('should getters be defined', () => {
		const entity = makeSut('KG');
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('KG');
	});

	it('should convert to ton', () => {
		const entity = makeSut('KG');
		entity.toTON();
		expect(entity.weight.value).toBe(1);
		expect(entity.weightUnit.value).toBe('TON');
	});

	it('should convert to g', () => {
		const entity = makeSut('KG');
		entity.toG();
		expect(entity.weight.value).toBe(1e6);
		expect(entity.weightUnit.value).toBe('G');
	});

	it('should convert to mg', () => {
		const entity = makeSut('KG');
		entity.toMG();
		expect(entity.weight.value).toBe(1e9);
		expect(entity.weightUnit.value).toBe('MG');
	});

	it('should convert to lb', () => {
		const entity = makeSut('KG');
		entity.toLB();
		expect(entity.weight.value).toBeGreaterThanOrEqual(2204.62);
		expect(entity.weight.value).toBeLessThanOrEqual(2205);
		expect(entity.weightUnit.value).toBe('LB');
	});

	it('should convert to oz', () => {
		const entity = makeSut('KG');
		entity.toOZ();
		expect(entity.weight.value).toBeGreaterThanOrEqual(35273);
		expect(entity.weight.value).toBeLessThanOrEqual(35274);
		expect(entity.weightUnit.value).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const entity = makeSut('G');
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('G');
	});

	it('should convert to ton', () => {
		const entity = makeSut('G');
		entity.toTON();
		expect(entity.weight.value).toBe(0.001);
		expect(entity.weightUnit.value).toBe('TON');
	});

	it('should convert to ton', () => {
		const entity = makeSut('G');
		entity.toKG();
		expect(entity.weight.value).toBe(1);
		expect(entity.weightUnit.value).toBe('KG');
	});

	it('should convert to g', () => {
		const entity = makeSut('G');
		entity.toG();
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('G');
	});

	it('should convert to mg', () => {
		const entity = makeSut('G');
		entity.toMG();
		expect(entity.weight.value).toBe(1e6);
		expect(entity.weightUnit.value).toBe('MG');
	});

	it('should convert to lb', () => {
		const entity = makeSut('G');
		entity.toLB();
		expect(entity.weight.value).toBeGreaterThanOrEqual(2.202);
		expect(entity.weightUnit.value).toBe('LB');
	});

	it('should convert to oz', () => {
		const entity = makeSut('G');
		entity.toOZ();
		expect(entity.weight.value).toBeGreaterThanOrEqual(35.273);
		expect(entity.weight.value).toBeLessThanOrEqual(35.274);
		expect(entity.weightUnit.value).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const entity = makeSut('LB');
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('LB');
	});

	it('should convert to ton', () => {
		const entity = makeSut('LB');
		entity.toTON();
		expect(entity.weight.value).toBe(0.454);
		expect(entity.weightUnit.value).toBe('TON');
	});

	it('should convert to ton', () => {
		const entity = makeSut('LB');
		entity.toKG();
		expect(entity.weight.value).toBe(453.515);
		expect(entity.weightUnit.value).toBe('KG');
	});

	it('should convert to g', () => {
		const entity = makeSut('LB');
		entity.toG();
		expect(entity.weight.value).toBe(454000);
		expect(entity.weightUnit.value).toBe('G');
	});

	it('should convert to mg', () => {
		const entity = makeSut('LB');
		entity.toMG();
		expect(entity.weight.value).toBe(453592000);
		expect(entity.weightUnit.value).toBe('MG');
	});

	it('should convert to lb', () => {
		const entity = makeSut('LB');
		entity.toLB();
		expect(entity.weight.value).toBeGreaterThanOrEqual(1000);
		expect(entity.weightUnit.value).toBe('LB');
	});

	it('should convert to oz', () => {
		const entity = makeSut('LB');
		entity.toOZ();
		expect(entity.weight.value).toBeGreaterThanOrEqual(16000);
		expect(entity.weightUnit.value).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const entity = makeSut('MG');
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('MG');
	});

	it('should convert to ton', () => {
		const entity = makeSut('MG');
		entity.toTON();
		expect(entity.weight.value).toBe(0);
		expect(entity.weightUnit.value).toBe('TON');
	});

	it('should convert to ton', () => {
		const entity = makeSut('MG');
		entity.toKG();
		expect(entity.weight.value).toBe(0.001);
		expect(entity.weightUnit.value).toBe('KG');
	});

	it('should convert to g', () => {
		const entity = makeSut('MG');
		entity.toG();
		expect(entity.weight.value).toBe(1);
		expect(entity.weightUnit.value).toBe('G');
	});

	it('should convert to mg', () => {
		const entity = makeSut('MG');
		entity.toMG();
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('MG');
	});

	it('should convert to lb', () => {
		const entity = makeSut('MG');
		entity.toLB();
		expect(entity.weight.value).toBeGreaterThanOrEqual(0.002);
		expect(entity.weightUnit.value).toBe('LB');
	});

	it('should convert to oz', () => {
		const entity = makeSut('MG');
		entity.toOZ();
		expect(entity.weight.value).toBeGreaterThanOrEqual(0.035);
		expect(entity.weightUnit.value).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const entity = makeSut('OZ');
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('OZ');
	});

	it('should convert to ton', () => {
		const entity = makeSut('OZ');
		entity.toTON();
		expect(entity.weight.value).toBe(0.028);
		expect(entity.weightUnit.value).toBe('TON');
	});

	it('should convert to ton', () => {
		const entity = makeSut('OZ');
		entity.toKG();
		expect(entity.weight.value).toBe(28.349);
		expect(entity.weightUnit.value).toBe('KG');
	});

	it('should convert to g', () => {
		const entity = makeSut('OZ');
		entity.toG();
		expect(entity.weight.value).toBe(28349);
		expect(entity.weightUnit.value).toBe('G');
	});

	it('should convert to mg', () => {
		const entity = makeSut('OZ');
		entity.toMG();
		expect(entity.weight.value).toBe(2.835e7);
		expect(entity.weightUnit.value).toBe('MG');
	});

	it('should convert to lb', () => {
		const entity = makeSut('OZ');
		entity.toLB();
		expect(entity.weight.value).toBeGreaterThanOrEqual(62.5);
		expect(entity.weightUnit.value).toBe('LB');
	});

	it('should convert to oz', () => {
		const entity = makeSut('OZ');
		entity.toOZ();
		expect(entity.weight.value).toBeGreaterThanOrEqual(1000);
		expect(entity.weightUnit.value).toBe('OZ');
	});

	// ***************************

	it('should getters be defined', () => {
		const entity = makeSut('TON');
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('TON');
	});

	it('should convert to ton', () => {
		const entity = makeSut('TON');
		entity.toTON();
		expect(entity.weight.value).toBe(1000);
		expect(entity.weightUnit.value).toBe('TON');
	});

	it('should convert to ton', () => {
		const entity = makeSut('TON');
		entity.toKG();
		expect(entity.weight.value).toBe(1e6);
		expect(entity.weightUnit.value).toBe('KG');
	});

	it('should convert to g', () => {
		const entity = makeSut('TON');
		entity.toG();
		expect(entity.weight.value).toBe(1e9);
		expect(entity.weightUnit.value).toBe('G');
	});

	it('should convert to mg', () => {
		const entity = makeSut('TON');
		entity.toMG();
		expect(entity.weight.value).toBe(1e12);
		expect(entity.weightUnit.value).toBe('MG');
	});

	it('should convert to lb', () => {
		const entity = makeSut('TON');
		entity.toLB();
		expect(entity.weight.value).toBeGreaterThanOrEqual(2.205e6);
		expect(entity.weightUnit.value).toBe('LB');
	});

	it('should convert to oz', () => {
		const entity = makeSut('TON');
		entity.toOZ();
		expect(entity.weight.value).toBeGreaterThanOrEqual(3.527e7);
		expect(entity.weightUnit.value).toBe('OZ');
	});
});
