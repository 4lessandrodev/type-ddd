import CNPJValueObject from '../index';

describe('cnpj.value-object', () => {
	describe('Creation and Definition', () => {
		it('should be defined', () => {
			const valueObject = CNPJValueObject.create;
			expect(valueObject).toBeDefined();
		});

		it('should create a valid CNPJ with special characters and remove special characters when getting the value', () => {
			const valueObject = CNPJValueObject.create('43.909.299/0001-04');
			expect(valueObject.isOk()).toBeTruthy();
			expect(valueObject.value().value()).toBe('43909299000104');
		});

		it('should create a valid CNPJ with numbers only', () => {
			const valueObject = CNPJValueObject.create('60105617000101');
			expect(valueObject.isOk()).toBeTruthy();
			expect(valueObject.value().value()).toBe('60105617000101');
		});

		it('should initialize an instance successfully', () => {
			const init = () => CNPJValueObject.init('27729251000168');
			expect(init).not.toThrowError();
		});

		it('should throw an error when initializing an instance with an invalid value', () => {
			const init = () => CNPJValueObject.init('invalid');
			expect(init).toThrowError();
		});
	});

	describe('Validation', () => {
		it('should return true if providing an invalid value', () => {
			const isValid = CNPJValueObject.isValid('43.909.299/0001-04');
			expect(isValid).toBeTruthy();
		});

		it('should return false if providing an invalid value', () => {
			const isValid = CNPJValueObject.isValid('invalid');
			expect(isValid).toBeFalsy();
		});

		it('should fail if providing an invalid value', () => {
			const valueObject = CNPJValueObject.create('53.462.048/0000-99');
			expect(valueObject.isFail()).toBeTruthy();
		});

		it('should fail if providing an invalid value (digit sum)', () => {
			const valueObject = CNPJValueObject.create('93.118.559/0001-1');
			expect(valueObject.isFail()).toBeTruthy();
		});

		it('should fail if providing an invalid value (digit sum)', () => {
			const valueObject = CNPJValueObject.create('93.118.559/0001-100');
			expect(valueObject.isFail()).toBeTruthy();
		});
	});

	describe('Formatting', () => {
		it('should format a CNPJ to add special characters', () => {
			const valueObject =
				CNPJValueObject.create('20.798.751/0001-02').value();
			expect(valueObject.toPattern()).toBe('20.798.751/0001-02');
		});

		it('should format a CNPJ to add special characters', () => {
			const valueObject =
				CNPJValueObject.create('65.389.009/0001-81').value();
			expect(valueObject.toPattern()).toBe('65.389.009/0001-81');
		});

		it('should format a CNPJ to add special characters', () => {
			const valueObject =
				CNPJValueObject.create('02.470.431/0001-47').value();
			expect(valueObject.toPattern()).toBe('02.470.431/0001-47');
		});

		it('should format a CNPJ to add special characters and remove them later', () => {
			const valueObject =
				CNPJValueObject.create('62.412.404/0001-40').value();
			expect(valueObject.toPattern()).toBe('62.412.404/0001-40');
		});
	});

	describe('Comparison', () => {
		it('should compare the value in the instance and the provided value', () => {
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

			isEqual = valueObject.compare('22606062000184');
			expect(isEqual).toBeTruthy();

			isEqual = valueObject.compare('22.606.062/0001-84');
			expect(isEqual).toBeTruthy();
		});

		it('should compare two instances', () => {

			const instanceA = CNPJValueObject.init('22.606.062/0001-84');
			const instanceB = CNPJValueObject.init('22.606.062/0001-84');

			expect(instanceA.compare(instanceB)).toBeTruthy();
		});

		it('should return false if comparing null', () => {
			const instanceA = CNPJValueObject.init('22.606.062/0001-84');
			expect(instanceA.compare(null as any)).toBeFalsy();
		});
	});

	describe('Special Character Removal', () => {
		it('should remove special characters from a string', () => {
			const value = CNPJValueObject.removeSpecialChars('93.118.559/0001-100');
			expect(value).toBe('931185590001100');
		});
	});
});