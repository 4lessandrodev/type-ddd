import { DomainId } from '@types-ddd';
import { DimensionEntity } from '../../lib/utils/dimension.entity';
import CustomNumberValueObject from '../../lib/utils/custom-number.value-object';
import { UnitOfMeasure } from '../../lib/utils/unit-of-measure.value-object';
import UnitOfMeasureValueObject from '../../lib/utils/unit-of-measure.value-object';
describe('dimension.entity', () => {
	const ID = DomainId.create();
	const dimension = CustomNumberValueObject.create(1000).getResult();
	const makeUnit = (unit: UnitOfMeasure): UnitOfMeasureValueObject =>
		UnitOfMeasureValueObject.create(unit).getResult();

	it('should be defined', () => {
		const dimension = DimensionEntity.create;
		expect(dimension).toBeDefined();
	});

	it('should create a valid value', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('CM'),
		});

		expect(entity.isSuccess).toBeTruthy();
	});

	it('should getters be defined', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('CM'),
		}).getResult();

		expect(entity.dimension).toBeDefined();
		expect(entity.dimensionUnit).toBeDefined();
		expect(entity.dimension.value).toBe(1000);
		expect(entity.dimensionUnit.value).toBe('CM');
	});

	// ************************

	it('should convert from cm to foot', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('CM'),
		}).getResult();

		entity.toFOOT();
		expect(entity.dimension.value).toBe(32.808);
		expect(entity.dimensionUnit.value).toBe('FOOT');
	});

	it('should convert from cm to inch', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('CM'),
		}).getResult();

		entity.toINCH();
		expect(entity.dimension.value).toBe(393.701);
		expect(entity.dimensionUnit.value).toBe('INCH');
	});

	it('should convert from cm to mm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('CM'),
		}).getResult();

		entity.toMM();
		expect(entity.dimension.value).toBe(10000);
		expect(entity.dimensionUnit.value).toBe('MM');
	});

	it('should convert from cm to mt', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('CM'),
		}).getResult();

		entity.toMT();
		expect(entity.dimension.value).toBe(10);
		expect(entity.dimensionUnit.value).toBe('MT');
	});

	it('should convert from cm to yard', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('CM'),
		}).getResult();

		entity.toYARD();
		expect(entity.dimension.value).toBe(10.936);
		expect(entity.dimensionUnit.value).toBe('YARD');
	});

	// ************************

	it('should convert from mm to yard', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MM'),
		}).getResult();

		entity.toYARD();
		expect(entity.dimension.value).toBe(1.094);
		expect(entity.dimensionUnit.value).toBe('YARD');
	});

	it('should convert from mm to cm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MM'),
		}).getResult();

		entity.toCM();
		expect(entity.dimension.value).toBe(100);
		expect(entity.dimensionUnit.value).toBe('CM');
	});

	it('should convert from mm to foot', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MM'),
		}).getResult();

		entity.toFOOT();
		expect(entity.dimension.value).toBe(3.279);
		expect(entity.dimensionUnit.value).toBe('FOOT');
	});

	it('should convert from mm to inch', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MM'),
		}).getResult();

		entity.toINCH();
		expect(entity.dimension.value).toBe(39.37);
		expect(entity.dimensionUnit.value).toBe('INCH');
	});

	it('should convert from mm to mt', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MM'),
		}).getResult();

		entity.toMT();
		expect(entity.dimension.value).toBe(1);
		expect(entity.dimensionUnit.value).toBe('MT');
	});

	// ************************

	it('should convert from inch to cm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('INCH'),
		}).getResult();

		entity.toCM();
		expect(entity.dimension.value).toBe(2540);
		expect(entity.dimensionUnit.value).toBe('CM');
	});

	it('should convert from inch to mm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('INCH'),
		}).getResult();

		entity.toMM();
		expect(entity.dimension.value).toBe(25400);
		expect(entity.dimensionUnit.value).toBe('MM');
	});

	it('should convert from inch to foot', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('INCH'),
		}).getResult();

		entity.toFOOT();
		expect(entity.dimension.value).toBe(83.333);
		expect(entity.dimensionUnit.value).toBe('FOOT');
	});

	it('should convert from inch to mt', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('INCH'),
		}).getResult();

		entity.toMT();
		expect(entity.dimension.value).toBe(25.4);
		expect(entity.dimensionUnit.value).toBe('MT');
	});

	it('should convert from inch to yard', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('INCH'),
		}).getResult();

		entity.toYARD();
		expect(entity.dimension.value).toBe(27.778);
		expect(entity.dimensionUnit.value).toBe('YARD');
	});

	// ************************

	it('should convert from foot to yard', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('FOOT'),
		}).getResult();

		entity.toYARD();
		expect(entity.dimension.value).toBe(333.333);
		expect(entity.dimensionUnit.value).toBe('YARD');
	});

	it('should convert from foot to cm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('FOOT'),
		}).getResult();

		entity.toCM();
		expect(entity.dimension.value).toBe(30480);
		expect(entity.dimensionUnit.value).toBe('CM');
	});

	it('should convert from foot to inch', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('FOOT'),
		}).getResult();

		entity.toINCH();
		expect(entity.dimension.value).toBe(12000);
		expect(entity.dimensionUnit.value).toBe('INCH');
	});

	it('should convert from foot to mm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('FOOT'),
		}).getResult();

		entity.toMM();
		expect(entity.dimension.value).toBe(305000);
		expect(entity.dimensionUnit.value).toBe('MM');
	});

	it('should convert from foot to mt', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('FOOT'),
		}).getResult();

		entity.toMT();
		expect(entity.dimension.value).toBe(304.044);
		expect(entity.dimensionUnit.value).toBe('MT');
	});

	// ************************

	it('should convert from mt to yard', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MT'),
		}).getResult();

		entity.toYARD();
		expect(entity.dimension.value).toBe(1094);
		expect(entity.dimensionUnit.value).toBe('YARD');
	});

	it('should convert from mt to cm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MT'),
		}).getResult();

		entity.toCM();
		expect(entity.dimension.value).toBe(100000);
		expect(entity.dimensionUnit.value).toBe('CM');
	});

	it('should convert from mt to mm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MT'),
		}).getResult();

		entity.toMM();
		expect(entity.dimension.value).toBe(1e6);
		expect(entity.dimensionUnit.value).toBe('MM');
	});

	it('should convert from mt to inch', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MT'),
		}).getResult();

		entity.toINCH();
		expect(entity.dimension.value).toBe(39370);
		expect(entity.dimensionUnit.value).toBe('INCH');
	});

	it('should convert from mt to foot', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MT'),
		}).getResult();

		entity.toFOOT();
		expect(entity.dimension.value).toBe(3281);
		expect(entity.dimensionUnit.value).toBe('FOOT');
	});

	// ************************

	it('should convert from yard to cm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('YARD'),
		}).getResult();

		entity.toCM();
		expect(entity.dimension.value).toBe(91440);
		expect(entity.dimensionUnit.value).toBe('CM');
	});

	it('should convert from yard to foot', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('YARD'),
		}).getResult();

		entity.toFOOT();
		expect(entity.dimension.value).toBe(3000);
		expect(entity.dimensionUnit.value).toBe('FOOT');
	});

	it('should convert from yard to mm', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('YARD'),
		}).getResult();

		entity.toMM();
		expect(entity.dimension.value).toBe(914000);
		expect(entity.dimensionUnit.value).toBe('MM');
	});

	it('should convert from yard to mt', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('YARD'),
		}).getResult();

		entity.toMT();
		expect(entity.dimension.value).toBe(914.077);
		expect(entity.dimensionUnit.value).toBe('MT');
	});

	it('should convert from yard to inch', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('YARD'),
		}).getResult();

		entity.toINCH();
		expect(entity.dimension.value).toBe(36000);
		expect(entity.dimensionUnit.value).toBe('INCH');
	});

	// ****

	it('should keep equal value on convert for the same unit', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('YARD'),
		}).getResult();

		entity.toYARD();
		expect(entity.dimension.value).toBe(1000);
		expect(entity.dimensionUnit.value).toBe('YARD');
	});

	it('should keep equal value on convert for the same unit', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('CM'),
		}).getResult();

		entity.toCM();
		expect(entity.dimension.value).toBe(1000);
		expect(entity.dimensionUnit.value).toBe('CM');
	});

	it('should keep equal value on convert for the same unit', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MM'),
		}).getResult();

		entity.toMM();
		expect(entity.dimension.value).toBe(1000);
		expect(entity.dimensionUnit.value).toBe('MM');
	});

	it('should keep equal value on convert for the same unit', () => {
		const entity = DimensionEntity.create({
			ID,
			dimension,
			dimensionUnit: makeUnit('MT'),
		}).getResult();

		entity.toMT();
		expect(entity.dimension.value).toBe(1000);
		expect(entity.dimensionUnit.value).toBe('MT');
	});
});
