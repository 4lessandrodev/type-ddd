import { PostalCodeValueObject } from '../../lib/utils/postal-code.value-object';

describe('postal-code.value-object', () => {
	it('should be defined', () => {
		const valueObject = PostalCodeValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid zip code', () => {
		const valueObject = PostalCodeValueObject.create('75520140');
		expect(valueObject.isSuccess).toBeTruthy();
	});

	it('should get value', () => {
		const valueObject =
			PostalCodeValueObject.create('75520140').getResult();
		expect(valueObject.value).toBe('75520140');
	});

	it('should get value without hyphen', () => {
		const valueObject =
			PostalCodeValueObject.create('75520-140').getResult();
		expect(valueObject.value).toBe('75520140');
	});

	it('should fail if provide an invalid postal code', () => {
		const valueObject = PostalCodeValueObject.create('invalid');
		expect(valueObject.isSuccess).toBe(false);
	});
});
