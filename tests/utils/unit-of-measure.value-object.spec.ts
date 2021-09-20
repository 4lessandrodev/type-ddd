import {
	UnitOfMeasureValueObject,
	UnitOfMeasure,
} from '../../lib/utils/unit-of-measure.value-object';

describe('unit-of-measure.value-object', () => {
	it('should be defined', () => {
		const unit = UnitOfMeasureValueObject.create;
		expect(unit).toBeDefined();
	});

	it('should create a valid unit of measure', () => {
		const unit = UnitOfMeasureValueObject.create('CM');
		expect(unit.isSuccess).toBeTruthy();
		expect(unit.getResult().value).toBe('CM');
		expect(unit.getResult().description).toBe('CENTIMETER');
	});

	it('should fail if provide an invalid value', () => {
		const unit = UnitOfMeasureValueObject.create('CMS' as UnitOfMeasure);
		expect(unit.isFailure).toBeTruthy();
	});
});
