import isValidCpfDigit from '../../src/utils/check-cpf-digit.util';
describe('is-valid-cpf-digits', () => {
	it('should be defined', () => {
		const isValidCpfDigitFn = isValidCpfDigit;
		expect(isValidCpfDigitFn).toBeDefined();
	});

	it('should return false if provide a value less than 11 char', () => {
		const isValidCpfDigitFn = isValidCpfDigit('727254778');
		expect(isValidCpfDigitFn).toBe(false);
	});

	it('should return false if provide word instead numbers', () => {
		const isValidCpfDigitFn = isValidCpfDigit('invalid_val');
		expect(isValidCpfDigitFn).toBe(false);
	});

	it('should return false if provide a value with invalid sum', () => {
		const isValidCpfDigitFn = isValidCpfDigit('766.682.694-01');
		expect(isValidCpfDigitFn).toBe(false);
	});

	it('should return false if provide a value with invalid sum', () => {
		const isValidCpfDigitFn = isValidCpfDigit('76668269401');
		expect(isValidCpfDigitFn).toBe(false);
	});

	it('should return true and validate with success', () => {
		const isValidCpfDigitFn = isValidCpfDigit('76668269400');
		expect(isValidCpfDigitFn).toBe(true);
	});

	it('should return true and validate with success', () => {
		const isValidCpfDigitFn = isValidCpfDigit('730.208.487-41');
		expect(isValidCpfDigitFn).toBe(true);
	});

	it('should return true and validate with success', () => {
		const isValidCpfDigitFn = isValidCpfDigit('641.482.734-79');
		expect(isValidCpfDigitFn).toBe(true);
	});

	it('should return true and validate with success', () => {
		const isValidCpfDigitFn = isValidCpfDigit('48153676474');
		expect(isValidCpfDigitFn).toBe(true);
	});
});
