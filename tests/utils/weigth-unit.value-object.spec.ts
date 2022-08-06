import {
	WeightUnitValueObject,
	UnitOfWeight,
} from '../../lib/utils/weight-unit.value-object';

describe('weight-unit.value-object', () => {
	it('should be defined', () => {
		const unit = WeightUnitValueObject.create;
		expect(unit).toBeDefined();
	});

	it('should create a valid unit', () => {
		const unit = WeightUnitValueObject.create('TON');
		expect(unit.isOK()).toBeTruthy();
		expect(unit.value().value()).toBe('TON');
		expect(unit.value().description).toBe('TONNE');
	});

	it('should fail if provide an invalid value', () => {
		const unit = WeightUnitValueObject.create('CMS' as UnitOfWeight);
		expect(unit.isFail()).toBeTruthy();
	});
});
