import { convertValueToFloat } from '../../lib/utils/convert-cent-to-float.util';

describe('convert-value-to-float', () => {
	it('should be defined', () => {
		const converted = convertValueToFloat;
		expect(converted).toBeDefined();
	});

	it('should be defined', () => {
		const converted = convertValueToFloat(10900);
		expect(converted).toBe(109.0);
	});

	it('should be defined', () => {
		const converted = convertValueToFloat(9901);
		expect(converted).toBe(99.01);
	});
});
