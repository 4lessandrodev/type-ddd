import isValidCnpjDigit from '../../lib/utils/check-cnpj-digit.util';
import {
	formatValueToCnpjPattern,
	removeSpecialCharsFromCnpj,
} from '../../lib/utils/check-cnpj-digit.util';
describe('is-valid-cnpj-digits', () => {
	it('should be defined', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit;
		expect(isValidCnpjDigitFn).toBeDefined();
	});

	it('should return false if provide a value less than 11 char', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit('506595900001');
		expect(isValidCnpjDigitFn).toBe(false);
	});

	it('should return false if provide word instead numbers', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit('invalid_val');
		expect(isValidCnpjDigitFn).toBe(false);
	});

	it('should return false if provide a value with invalid sum', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit('39.060.118/0001-41');
		expect(isValidCnpjDigitFn).toBe(false);
	});

	it('should return false if provide a value with invalid sum', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit('50659590000140');
		expect(isValidCnpjDigitFn).toBe(false);
	});

	it('should return true and validate with success', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit('50659590000137');
		expect(isValidCnpjDigitFn).toBe(true);
	});

	it('should return true and validate with success', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit('05.718.081/0001-83');
		expect(isValidCnpjDigitFn).toBe(true);
	});

	it('should return true and validate with success', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit('39.434.735/0001-69');
		expect(isValidCnpjDigitFn).toBe(true);
	});

	it('should return true and validate with success', () => {
		const isValidCnpjDigitFn = isValidCnpjDigit('47.091.193/0001-05');
		expect(isValidCnpjDigitFn).toBe(true);
	});

	it('should format cnpj from pattern to only numbers', () => {
		const isValidCnpjDigitFn =
			removeSpecialCharsFromCnpj('39.604.284/0001-60');
		expect(isValidCnpjDigitFn).toBe('39604284000160');
	});

	it('should format cnpj from pattern to only numbers', () => {
		const isValidCnpjDigitFn = removeSpecialCharsFromCnpj('39604284000160');
		expect(isValidCnpjDigitFn).toBe('39604284000160');
	});

	it('should format cnpj from pattern to only numbers', () => {
		const isValidCnpjDigitFn =
			removeSpecialCharsFromCnpj('val.cnpj.str-d0');
		expect(isValidCnpjDigitFn).toBe('valcnpjstrd0');
	});

	it('should format cnpj from only numbers to pattern', () => {
		const isValidCnpjDigitFn = formatValueToCnpjPattern('39604284000160');
		expect(isValidCnpjDigitFn).toBe('39.604.284/0001-60');
	});

	it('should format cnpj from only numbers to pattern', () => {
		const isValidCnpjDigitFn = formatValueToCnpjPattern('39604284000160');
		expect(isValidCnpjDigitFn).toBe('39.604.284/0001-60');
	});

	it('should format cnpj from only numbers to pattern', () => {
		const isValidCnpjDigitFn = formatValueToCnpjPattern('vacnppj00strd0');
		expect(isValidCnpjDigitFn).toBe('va.cnp.pj0/0str-d0');
	});
});
