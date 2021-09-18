import { transformValueToMoney } from '../../lib/utils/transform-value-to-money.util';

describe('transforma-value-to-money.util', () => {
	it('should be defined', () => {
		const money = transformValueToMoney;
		expect(money).toBeDefined();
	});

	it('should transform value to money', () => {
		const money = transformValueToMoney(89.902222222);
		expect(money).toBe(89.902);
	});

	it('should transform value to money', () => {
		const money = transformValueToMoney(0.091);
		expect(money).toBe(0.091);
	});

	it('should transform value to money', () => {
		const money = transformValueToMoney(0.099);
		expect(money).toBe(0.099);
	});

	it('should transform value to money', () => {
		const money = transformValueToMoney(9999.01);
		expect(money).toBe(9999.01);
	});
});
