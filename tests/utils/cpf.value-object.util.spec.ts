import { CPFValueObject } from '../../lib/utils/cpf.value-object';

describe('cpf.value-object', () => {
	it('should be defined', () => {
		const valueObject = CPFValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid cpf with special chars and remove special chars on get value', () => {
		const valueObject = CPFValueObject.create('667.324.914-58');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('66732491458');
	});

	it('should create a valid cpf with special chars and remove special chars on get value', () => {
		const valueObject = CPFValueObject.create('934.665.143-12');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('93466514312');
	});

	it('should create a valid cpf with special chars and remove special chars on get value', () => {
		const valueObject = CPFValueObject.create('690.574.738-60');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('69057473860');
	});

	it('should create a valid cpf with special chars and remove special chars on get value', () => {
		const valueObject = CPFValueObject.create('324.123.359-66');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('32412335966');
	});

	it('should create a valid cpf with special chars and remove special chars on get value', () => {
		const valueObject = CPFValueObject.create('673.761.543-02');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('67376154302');
	});

	it('should create a valid cpf with special chars and remove special chars on get value', () => {
		const valueObject = CPFValueObject.create('024.815.901-12');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('02481590112');
	});

	it('should create a valid cpf with special chars and remove special chars on get value', () => {
		const valueObject = CPFValueObject.create('754.179.880-06');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('75417988006');
	});

	it('should format a cpf to add special chars', () => {
		const valueObject = CPFValueObject.create('667.324.914-58').value();
		valueObject?.formatToCpfPattern();
		expect(valueObject?.value()).toBe('667.324.914-58');
	});

	it('should format a cpf to add special chars', () => {
		const valueObject = CPFValueObject.create('578.363.883-87').value();
		valueObject?.formatToCpfPattern();
		expect(valueObject?.value()).toBe('578.363.883-87');
	});

	it('should format a cpf to add special chars', () => {
		const valueObject = CPFValueObject.create('844.676.543-80').value();
		valueObject?.formatToCpfPattern();
		expect(valueObject?.value()).toBe('844.676.543-80');
	});

	it('should format a cpf to add special chars and remove it later', () => {
		const valueObject = CPFValueObject.create('667.324.914-58').value();
		valueObject?.formatToCpfPattern();
		expect(valueObject?.value()).toBe('667.324.914-58');
		valueObject?.removeSpecialChars();
		expect(valueObject?.value()).toBe('66732491458');
	});

	it('should compare value on instance and provided value', () => {
		const valueObject = CPFValueObject.create('549.777.281-14').value();
		let isEqual = valueObject?.compare('invalid');
		expect(isEqual).toBeFalsy();

		isEqual = valueObject?.compare('549.777.281-15');
		expect(isEqual).toBeFalsy();

		isEqual = valueObject?.compare('549.777.281-14');
		expect(isEqual).toBeTruthy();

		isEqual = valueObject?.compare('54977728314');
		expect(isEqual).toBeFalsy();

		isEqual = valueObject?.compare('54977728114');
		expect(isEqual).toBeTruthy();

		valueObject?.formatToCpfPattern();
		isEqual = valueObject?.compare('54977728114');
		expect(isEqual).toBeTruthy();

		isEqual = valueObject?.compare('549.777.281-14');
		expect(isEqual).toBeTruthy();

		valueObject?.removeSpecialChars();
		expect(isEqual).toBeTruthy();
	});

	it('should create a valid cpf only numbers', () => {
		const valueObject = CPFValueObject.create('53534317661');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('53534317661');
	});

	it('should fail if provide an invalid value', () => {
		const valueObject = CPFValueObject.create('754.466.282-920');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if provide an invalid value (digit sum)', () => {
		const valueObject = CPFValueObject.create('754.466.282-01');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if provide an invalid value (digit sum)', () => {
		const valueObject = CPFValueObject.create('75446628201');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should create a valid cpf only numbers', () => {
		const valueObject = CPFValueObject.create('53534317661');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('53534317661');
	});

	it('should create a valid cpf only numbers', () => {
		const valueObject = CPFValueObject.create('02481590112');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value()?.value()).toBe('02481590112');
	});
});
