import { PostalCodeValueObject } from '../../lib/utils/postal-code.value-object';

describe('postal-code.value-object', () => {
	it('should be defined', () => {
		const valueObject = PostalCodeValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid zip code', () => {
		const valueObject = PostalCodeValueObject.create('75520140');
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should get value', () => {
		const valueObject = PostalCodeValueObject.create('75520140').value();
		expect(valueObject.value()).toBe('75520140');
	});

	it('should get value without hyphen', () => {
		const valueObject = PostalCodeValueObject.create('75520-140').value();
		expect(valueObject.value()).toBe('75520140');
	});

	it('should fail if provide an invalid postal code', () => {
		const valueObject = PostalCodeValueObject.create('invalid');
		expect(valueObject.isOk()).toBe(false);
	});
});
