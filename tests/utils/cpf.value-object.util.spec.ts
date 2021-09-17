import { CPFValueObject } from '../../src/utils/cpf.value-object';
describe('cpf.value-object', () => {
	it('should be defined', () => {
		const valueObject = CPFValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid cpf with special chars', () => {
		const valueObject = CPFValueObject.create('754.466.282-92');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('754.466.282-92');
	});

	it('should create a valid cpf only numbers', () => {
		const valueObject = CPFValueObject.create('53534317661');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('53534317661');
	});

	it('should fail if provide an invalid value', () => {
		const valueObject = CPFValueObject.create('754.466.282-920');
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fail if provide an invalid value (digit sum)', () => {
		const valueObject = CPFValueObject.create('754.466.282-01');
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fail if provide an invalid value (digit sum)', () => {
		const valueObject = CPFValueObject.create('75446628201');
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should create a valid cpf only numbers', () => {
		const valueObject = CPFValueObject.create('53534317661');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('53534317661');
	});
});
