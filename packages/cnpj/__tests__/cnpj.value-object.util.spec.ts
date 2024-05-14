import CNPJValueObject from '../index';

describe('CNPJ Value Object', () => {
	describe('Creation and Definition', () => {
		it('should be able to create a CNPJ value object', () => {
			const valueObject = CNPJValueObject.create;
			expect(valueObject).toBeDefined();
		});

		it('should create a valid CNPJ with special characters removed', () => {
			const valueObject = CNPJValueObject.create('43.909.299/0001-04');
			expect(valueObject.isOk()).toBeTruthy();
			expect(valueObject.value().value()).toBe('43909299000104');
		});

		it('should create a valid CNPJ with numbers only', () => {
			const valueObject = CNPJValueObject.create('60105617000101');
			expect(valueObject.isOk()).toBeTruthy();
			expect(valueObject.value().value()).toBe('60105617000101');
		});

		it('should initialize an instance without error', () => {
			const init = () => CNPJValueObject.init('27729251000168');
			expect(init).not.toThrowError();
		});

		it('should throw an error when initializing with an invalid value', () => {
			const init = () => CNPJValueObject.init('invalid');
			expect(init).toThrowError();
		});
	});

	describe('Validation', () => {
		it('should return true for a valid CNPJ', () => {
			const isValid = CNPJValueObject.isValid('43.909.299/0001-04');
			expect(isValid).toBeTruthy();
		});

		it('should return false for an invalid CNPJ', () => {
			const isValid = CNPJValueObject.isValid('invalid');
			expect(isValid).toBeFalsy();
		});

		it('should fail for an invalid CNPJ', () => {
			const valueObject = CNPJValueObject.create('53.462.048/0000-99');
			expect(valueObject.isFail()).toBeTruthy();
		});

		it('should fail for an invalid CNPJ (digit sum)', () => {
			const valueObject = CNPJValueObject.create('93.118.559/0001-1');
			expect(valueObject.isFail()).toBeTruthy();
		});

		it('should fail for an invalid CNPJ (digit sum)', () => {
			const valueObject = CNPJValueObject.create('93.118.559/0001-100');
			expect(valueObject.isFail()).toBeTruthy();
		});
	});

	describe('Formatting', () => {
		it('should format a CNPJ with special characters', () => {
			const valueObject =
				CNPJValueObject.create('20.798.751/0001-02').value();
			expect(valueObject.toPattern()).toBe('20.798.751/0001-02');
		});

		it('should format a CNPJ with special characters', () => {
			const valueObject =
				CNPJValueObject.create('65.389.009/0001-81').value();
			expect(valueObject.toPattern()).toBe('65.389.009/0001-81');
		});

		it('should format a CNPJ with special characters', () => {
			const valueObject =
				CNPJValueObject.create('02.470.431/0001-47').value();
			expect(valueObject.toPattern()).toBe('02.470.431/0001-47');
		});

		it('should format a CNPJ with special characters and remove them later', () => {
			const valueObject =
				CNPJValueObject.create('62.412.404/0001-40').value();
			expect(valueObject.toPattern()).toBe('62.412.404/0001-40');
		});
	});

	describe('Comparison', () => {
		it('should correctly compare the value in the instance with the provided value', () => {
			const validCNPJ = '22.606.062/0001-84';
			const valueObject = CNPJValueObject.create(validCNPJ).value();
		
			// Compare with invalid CNPJ
			let isEqual = valueObject.compare('invalid');
			expect(isEqual).toBeFalsy();
		
			// Compare with different valid CNPJ
			isEqual = valueObject.compare('22.606.062/0001-20');
			expect(isEqual).toBeFalsy();
		
			// Compare with the same valid CNPJ
			isEqual = valueObject.compare(validCNPJ);
			expect(isEqual).toBeTruthy();
		
			// Compare with a valid CNPJ with different format
			isEqual = valueObject.compare('22606062000155');
			expect(isEqual).toBeFalsy();
		
			// Compare with a valid CNPJ with the same value but different format
			isEqual = valueObject.compare('22606062000184');
			expect(isEqual).toBeTruthy();
		
			// Compare with the same valid CNPJ
			isEqual = valueObject.compare('22.606.062/0001-84');
			expect(isEqual).toBeTruthy();
		});

		it('should compare two instances', () => {

			const instanceA = CNPJValueObject.init('22.606.062/0001-84');
			const instanceB = CNPJValueObject.init('22.606.062/0001-84');

			expect(instanceA.compare(instanceB)).toBeTruthy();
		});

		it('should return false when comparing with null', () => {
			const instanceA = CNPJValueObject.init('22.606.062/0001-84');
			expect(instanceA.compare(null as any)).toBeFalsy();
		});
	});

	describe('Special Character Removal', () => {
		it('should remove special characters from a string', () => {
			const value = CNPJValueObject.removeSpecialChars('93.118.559/0001-10');
			expect(value).toBe('93118559000110');
		});

		it('should remove special characters from a string', () => {
			const value = CNPJValueObject.addMask('93118559000110');
			expect(value).toBe('93.118.559/0001-10');
		});
	});
});
