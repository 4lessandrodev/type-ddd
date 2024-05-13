import { CNPJValueObject } from '../index';

describe('cnpj.value-object', () => {
	it('should be defined', () => {
		const valueObject = CNPJValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid cnpj with special chars and remove special chars on get value', () => {
		const valueObject = CNPJValueObject.create('43.909.299/0001-04');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('43909299000104');
	});

	it('should create a valid cnpj with special chars and remove special chars on get value', () => {
		const valueObject = CNPJValueObject.create('80.676.573/0001-79');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('80676573000179');
	});

	it('should create a valid cnpj with special chars and remove special chars on get value', () => {
		const valueObject = CNPJValueObject.create('38331478000177');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('38331478000177');
	});

	it('should create a valid cnpj with special chars and remove special chars on get value', () => {
		const valueObject = CNPJValueObject.create('38.331.478/0001-77');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('38331478000177');
	});

	it('should create a valid cnpj with special chars and remove special chars on get value', () => {
		const valueObject = CNPJValueObject.create('24.050.723/0001-63');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('24050723000163');
	});

	it('should create a valid cnpj with special chars and remove special chars on get value', () => {
		const valueObject = CNPJValueObject.create('93.853.653/0001-02');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('93853653000102');
	});

	it('should create a valid cnpj with special chars and remove special chars on get value', () => {
		const valueObject = CNPJValueObject.create('99.410.207/0001-00');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('99410207000100');
	});

	it('should format a cnpj to add special chars', () => {
		const valueObject =
			CNPJValueObject.create('20.798.751/0001-02').value();
		valueObject.formatToCnpjPattern();
		expect(valueObject.value()).toBe('20.798.751/0001-02');
	});

	it('should format a cnpj to add special chars', () => {
		const valueObject =
			CNPJValueObject.create('65.389.009/0001-81').value();
		valueObject.formatToCnpjPattern();
		expect(valueObject.value()).toBe('65.389.009/0001-81');
	});

	it('should format a cnpj to add special chars', () => {
		const valueObject =
			CNPJValueObject.create('02.470.431/0001-47').value();
		valueObject.formatToCnpjPattern();
		expect(valueObject.value()).toBe('02.470.431/0001-47');
	});

	it('should format a cnpj to add special chars and remove it later', () => {
		const valueObject =
			CNPJValueObject.create('62.412.404/0001-40').value();
		valueObject.formatToCnpjPattern();
		expect(valueObject.value()).toBe('62.412.404/0001-40');
		valueObject.removeSpecialChars();
		expect(valueObject.value()).toBe('62412404000140');
	});

	it('should compare value on instance and provided value', () => {
		const valueObject =
			CNPJValueObject.create('22.606.062/0001-84').value();
		let isEqual = valueObject.compare('invalid');
		expect(isEqual).toBeFalsy();

		isEqual = valueObject.compare('22.606.062/0001-20');
		expect(isEqual).toBeFalsy();

		isEqual = valueObject.compare('22.606.062/0001-84');
		expect(isEqual).toBeTruthy();

		isEqual = valueObject.compare('22606062000155');
		expect(isEqual).toBeFalsy();

		isEqual = valueObject.compare('22606062000184');
		expect(isEqual).toBeTruthy();

		valueObject.formatToCnpjPattern();
		isEqual = valueObject.compare('22606062000184');
		expect(isEqual).toBeTruthy();

		isEqual = valueObject.compare('22.606.062/0001-84');
		expect(isEqual).toBeTruthy();

		valueObject.removeSpecialChars();
		expect(isEqual).toBeTruthy();
	});

	it('should create a valid cnpj only numbers', () => {
		const valueObject = CNPJValueObject.create('60105617000101');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('60105617000101');
	});

	it('should fail if provide an invalid value', () => {
		const valueObject = CNPJValueObject.create('53.462.048/0000-99');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if provide an invalid value (digit sum)', () => {
		const valueObject = CNPJValueObject.create('93.118.559/0001-1');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if provide an invalid value (digit sum)', () => {
		const valueObject = CNPJValueObject.create('93.118.559/0001-100');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if provide an invalid value (digit sum)', () => {
		const valueObject = CNPJValueObject.create('76954860000135');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should fail if provide an invalid value (digit sum) and length', () => {
		const valueObject = CNPJValueObject.create('769548600001350');
		expect(valueObject.isFail()).toBeTruthy();
	});

	it('should create a valid cnpj only numbers', () => {
		const valueObject = CNPJValueObject.create('27729251000168');
		expect(valueObject.isOk()).toBeTruthy();
		expect(valueObject.value().value()).toBe('27729251000168');
	});
});
