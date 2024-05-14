import { ZipCode as ZipCodeValueObject } from '../index'


describe('postal-code.value-object', () => {
	it('should be defined', () => {
		const valueObject = ZipCodeValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid zip code', () => {
		const valueObject = ZipCodeValueObject.create('75520140');
		expect(valueObject.isOk()).toBeTruthy();
	});

	it('should get value', () => {
		const valueObject = ZipCodeValueObject.create('75520140').value();
		expect(valueObject.value()).toBe('75520140');
	});

	it('should get value without hyphen', () => {
		const valueObject = ZipCodeValueObject.create('75520-140').value();
		expect(valueObject.value()).toBe('75520140');
	});

	it('should fail if provide an invalid postal code', () => {
		const valueObject = ZipCodeValueObject.create('invalid');
		expect(valueObject.isOk()).toBe(false);
	});


	it('should init an instance with success', () => {
		const init = () => ZipCodeValueObject.init('05583-000');
		expect(init).not.toThrowError();
	});

	it('should throw an error on init an instance with invalid value', () => {
		const init = () => ZipCodeValueObject.init('');
		expect(init).toThrowError();
	});
});
