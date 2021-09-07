import { Logger } from '@types-ddd';
import { YearOfManufacture } from '../year-of-manufacture.value-object';

describe('simple-player.entity', () => {
	it('should be defined', () => {
		const year = YearOfManufacture.create;
		expect(year).toBeDefined();
	});

	it('should create a valid year', () => {
		// 	Create value object
		const year = YearOfManufacture.create(2000);

		expect(year.isSuccess).toBeTruthy();
	});

	it('should validate a year', () => {
		// 	Validate value with Business Logic
		const valid = YearOfManufacture.isValidValue(2000);
		const invalid = YearOfManufacture.isValidValue(1900);

		expect(valid).toBeTruthy();
		expect(invalid).toBeFalsy();
	});

	it('should get value', () => {
		// 	Create value object
		const year = YearOfManufacture.create(2000).getResult();

		expect(year.value).toBe(2000);
	});

	it('should compare value', () => {
		// 	Create value object
		const yearA = YearOfManufacture.create(2000).getResult();
		const yearB = YearOfManufacture.create(2000).getResult();

		expect(yearA.equals(yearB)).toBe(true);
	});

	it('should return result fails if try create value object with invalid value', () => {
		const error = YearOfManufacture.create(1900);
		expect(error.isFailure).toBeTruthy();
	});

	it('should fails if try get value from invalid result', () => {
		Logger.info(
			'THE 3 ERRORS BELOW ON TERMINAL IS ONLY SOME LOGGER TESTS. DO NOT WORRY!'
		);
		const loggerSpy = jest.spyOn(Logger, 'error');
		const error = () => YearOfManufacture.create(1900).getResult();
		expect(error()).toBeNull();
		expect(loggerSpy).toHaveBeenCalled();
	});
});
