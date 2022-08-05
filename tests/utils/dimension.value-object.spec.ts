import { CustomNumberValueObject } from '@types-ddd';
import { DimensionValueObject } from '../../lib/utils/dimension.value-object';
import { UnitsOfMeasure } from '../../lib/utils/unit-of-measure.value-object';
describe('dimension.value-object', () => {
	const dimension = 1000;

	it('should be defined', () => {
		const dimension = DimensionValueObject.create;
		expect(dimension).toBeDefined();
	});

	it('should fail if provide an unsafe value', () => {
		const dimension = DimensionValueObject.create({
			unit: 'CM',
			value: Number.MAX_SAFE_INTEGER + 1,
		});
		expect(dimension).toBeDefined();
	});

	it('should fail if provide an unsafe value', () => {
		const dimension = DimensionValueObject.create({
			unit: 'CM',
			value: Number.MIN_SAFE_INTEGER - 1,
		});
		expect(dimension).toBeDefined();
	});

	it('should create a valid value', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'CM',
		});

		expect(valueObject.isSuccess()).toBeTruthy();
	});

	it('should getters be defined', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'CM',
		}).value();

		expect(valueObject.dimension).toBeDefined();
		expect(valueObject.unit).toBeDefined();
		expect(valueObject.dimension.value()).toBe(1000);
		expect(valueObject.unit).toBe('CM');
	});

	it('should change value', () => {
		const dimension = DimensionValueObject.create({
			unit: 'MT',
			value: 100,
		}).value();
		dimension.changeValue(CustomNumberValueObject.create(500).value());
		expect(dimension.dimension.value()).toBe(500);
	});

	it('should change unit', () => {
		const dimension = DimensionValueObject.create({
			unit: 'MT',
			value: 100,
		}).value();
		dimension.changeDimensionUnit('YARD');
		expect(dimension.dimension.value()).toBe(100);
		expect(dimension.unit).toBe('YARD');
	});
	// ************************

	it('should convert from cm to foot', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'CM',
		}).value();

		valueObject.toFOOT();
		expect(valueObject.dimension.value()).toBe(32.808);
		expect(valueObject.unit).toBe('FOOT');
	});

	it('should convert from cm to inch', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'CM',
		}).value();

		valueObject.toINCH();
		expect(valueObject.dimension.value()).toBe(393.701);
		expect(valueObject.unit).toBe('INCH');
	});

	it('should convert from cm to mm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'CM',
		}).value();

		valueObject.toMM();
		expect(valueObject.dimension.value()).toBe(10000);
		expect(valueObject.unit).toBe('MM');
	});

	it('should convert from cm to mt', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'CM',
		}).value();

		valueObject.toMT();
		expect(valueObject.dimension.value()).toBe(10);
		expect(valueObject.unit).toBe('MT');
	});

	it('should convert from cm to yard', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'CM',
		}).value();

		valueObject.toYARD();
		expect(valueObject.dimension.value()).toBe(10.936);
		expect(valueObject.unit).toBe('YARD');
	});

	// ************************

	it('should convert from mm to yard', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MM',
		}).value();

		valueObject.toYARD();
		expect(valueObject.dimension.value()).toBe(1.094);
		expect(valueObject.unit).toBe('YARD');
	});

	it('should convert from mm to cm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MM',
		}).value();

		valueObject.toCM();
		expect(valueObject.dimension.value()).toBe(100);
		expect(valueObject.unit).toBe('CM');
	});

	it('should convert from mm to foot', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MM',
		}).value();

		valueObject.toFOOT();
		expect(valueObject.dimension.value()).toBe(3.279);
		expect(valueObject.unit).toBe('FOOT');
	});

	it('should convert from mm to inch', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MM',
		}).value();

		valueObject.toINCH();
		expect(valueObject.dimension.value()).toBe(39.37);
		expect(valueObject.unit).toBe('INCH');
	});

	it('should convert from mm to mt', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MM',
		}).value();

		valueObject.toMT();
		expect(valueObject.dimension.value()).toBe(1);
		expect(valueObject.unit).toBe('MT');
	});

	// ************************

	it('should convert from inch to cm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'INCH',
		}).value();

		valueObject.toCM();
		expect(valueObject.dimension.value()).toBe(2540);
		expect(valueObject.unit).toBe('CM');
	});

	it('should convert from inch to mm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'INCH',
		}).value();

		valueObject.toMM();
		expect(valueObject.dimension.value()).toBe(25400);
		expect(valueObject.unit).toBe('MM');
	});

	it('should convert from inch to foot', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'INCH',
		}).value();

		valueObject.toFOOT();
		expect(valueObject.dimension.value()).toBe(83.333);
		expect(valueObject.unit).toBe('FOOT');
	});

	it('should convert from inch to mt', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'INCH',
		}).value();

		valueObject.toMT();
		expect(valueObject.dimension.value()).toBe(25.4);
		expect(valueObject.unit).toBe('MT');
	});

	it('should convert from inch to yard', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'INCH',
		}).value();

		valueObject.toYARD();
		expect(valueObject.dimension.value()).toBe(27.778);
		expect(valueObject.unit).toBe('YARD');
	});

	// ************************

	it('should convert from foot to yard', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'FOOT',
		}).value();

		valueObject.toYARD();
		expect(valueObject.dimension.value()).toBe(333.333);
		expect(valueObject.unit).toBe('YARD');
	});

	it('should convert from foot to cm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'FOOT',
		}).value();

		valueObject.toCM();
		expect(valueObject.dimension.value()).toBe(30480);
		expect(valueObject.unit).toBe('CM');
	});

	it('should convert from foot to inch', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'FOOT',
		}).value();

		valueObject.toINCH();
		expect(valueObject.dimension.value()).toBe(12000);
		expect(valueObject.unit).toBe('INCH');
	});

	it('should convert from foot to mm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'FOOT',
		}).value();

		valueObject.toMM();
		expect(valueObject.dimension.value()).toBe(305000);
		expect(valueObject.unit).toBe('MM');
	});

	it('should convert from foot to mt', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'FOOT',
		}).value();

		valueObject.toMT();
		expect(valueObject.dimension.value()).toBe(304.044);
		expect(valueObject.unit).toBe('MT');
	});

	// ************************

	it('should convert from mt to yard', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MT',
		}).value();

		valueObject.toYARD();
		expect(valueObject.dimension.value()).toBe(1094);
		expect(valueObject.unit).toBe('YARD');
	});

	it('should convert from mt to cm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MT',
		}).value();

		valueObject.toCM();
		expect(valueObject.dimension.value()).toBe(100000);
		expect(valueObject.unit).toBe('CM');
	});

	it('should convert from mt to mm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MT',
		}).value();

		valueObject.toMM();
		expect(valueObject.dimension.value()).toBe(1e6);
		expect(valueObject.unit).toBe('MM');
	});

	it('should convert from mt to inch', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MT',
		}).value();

		valueObject.toINCH();
		expect(valueObject.dimension.value()).toBe(39370);
		expect(valueObject.unit).toBe('INCH');
	});

	it('should convert from mt to foot', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MT',
		}).value();

		valueObject.toFOOT();
		expect(valueObject.dimension.value()).toBe(3281);
		expect(valueObject.unit).toBe('FOOT');
	});

	// ************************

	it('should convert from yard to cm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'YARD',
		}).value();

		valueObject.toCM();
		expect(valueObject.dimension.value()).toBe(91440);
		expect(valueObject.unit).toBe('CM');
	});

	it('should convert from yard to foot', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'YARD',
		}).value();

		valueObject.toFOOT();
		expect(valueObject.dimension.value()).toBe(3000);
		expect(valueObject.unit).toBe('FOOT');
	});

	it('should convert from yard to mm', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'YARD',
		}).value();

		valueObject.toMM();
		expect(valueObject.dimension.value()).toBe(914000);
		expect(valueObject.unit).toBe('MM');
	});

	it('should convert from yard to mt', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'YARD',
		}).value();

		valueObject.toMT();
		expect(valueObject.dimension.value()).toBe(914.077);
		expect(valueObject.unit).toBe('MT');
	});

	it('should convert from yard to inch', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'YARD',
		}).value();

		valueObject.toINCH();
		expect(valueObject.dimension.value()).toBe(36000);
		expect(valueObject.unit).toBe('INCH');
	});

	// ****

	it('should keep equal value on convert for the same unit', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'YARD',
		}).value();

		valueObject.toYARD();
		expect(valueObject.dimension.value()).toBe(1000);
		expect(valueObject.unit).toBe('YARD');
	});

	it('should keep equal value on convert for the same unit', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'CM',
		}).value();

		valueObject.toCM();
		expect(valueObject.dimension.value()).toBe(1000);
		expect(valueObject.unit).toBe('CM');
	});

	it('should keep equal value on convert for the same unit', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MM',
		}).value();

		valueObject.toMM();
		expect(valueObject.dimension.value()).toBe(1000);
		expect(valueObject.unit).toBe('MM');
	});

	it('should keep equal value on convert for the same unit', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MT',
		}).value();

		valueObject.toMT();
		expect(valueObject.dimension.value()).toBe(1000);
		expect(valueObject.unit).toBe('MT');
	});

	it('should fail if provide an invalid unit', () => {
		const valueObject = DimensionValueObject.create({
			value: dimension,
			unit: 'MTS' as UnitsOfMeasure,
		});
		expect(valueObject.isFailure).toBeTruthy();
	});
});
