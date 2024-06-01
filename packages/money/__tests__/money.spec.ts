import { Money } from '../index';

describe('money', () => {
	describe('create', () => {
		it('should create instance with success', () => {
			const result = Money.create(1);
			expect(result.isOk()).toBeTruthy();
		});

		it('should create instance with success', () => {
			const result = Money.create(-1);
			expect(result.isOk()).toBeTruthy();
		});

		it('should create instance with success', () => {
			const result = Money.init(1);
			expect(result.value()).toBe(1);
		});

		it('should create instance with success', () => {
			const result = Money.init(-1);
			expect(result.value()).toBe(-1);
		});

		it('should return fail', () => {
			const result = Money.create(Number.MAX_SAFE_INTEGER + 1);
			expect(result.isFail()).toBeTruthy();
		});

		it('should return fail', () => {
			const result = Money.create(Number.MIN_SAFE_INTEGER - 1);
			expect(result.isFail()).toBeTruthy();
		});

		it('should throws', () => {
			const result = () => Money.init(Number.MAX_SAFE_INTEGER + 1);
			expect(result).toThrowError();
		});

		it('should throws', () => {
			const result = () => Money.init(Number.MIN_SAFE_INTEGER - 1);
			expect(result).toThrowError();
		});

		it('should return 0', () => {
			const amount = Money.zero();
			expect(amount.value()).toBe(0);
		});

		it('should return 10', () => {
			const amount = Money.ten();
			expect(amount.value()).toBe(10);
		});

		it('should return 100', () => {
			const amount = Money.one_hundred();
			expect(amount.value()).toBe(100);
		});

		it('should return 1000', () => {
			const amount = Money.one_thousand();
			expect(amount.value()).toBe(1000);
		});
	});

	describe('isValid', () => {
		it('should return false', () => {
			const isValid = Money.isValid(Number.MIN_SAFE_INTEGER - 1);
			expect(isValid).toBeFalsy();
		});

		it('should return false', () => {
			const isValid = Money.isValid(Number.MAX_SAFE_INTEGER + 1);
			expect(isValid).toBeFalsy();
		});

		it('should return true', () => {
			const isValid = Money.isValid(1000);
			expect(isValid).toBeTruthy();
		});

		it('should return true', () => {
			const isValid = Money.isValid(-1000);
			expect(isValid).toBeTruthy();
		});
	});

	describe('coin', () => {
		it('should transform to coin', () => {
			const total = Money.one_hundred();
			expect(total.coin('BRL', 'pt-BR')).toBe('R$ 100,00');
			expect(total.coin('USD', 'pt-BR')).toBe('US$ 100,00');
			expect(total.coin('USD', 'en-US')).toBe('$100.00');
			expect(total.coin('BRL', 'en-US')).toBe('R$100.00');
		});

		it('should get default', () => {
			const coin = Money.one().coin();
			expect(coin).toBe('R$ 1,00');
		});
	});

	describe('sum', () => {
		it('should sum with success', () => {
			const total = Money.one_thousand();
			const amount = total.sum(Money.ten());
			expect(amount.value()).toBe(1010);
		});

		it('should sum with success', () => {
			const total = Money.one_thousand();
			const amount = total.sum(10);
			expect(amount.value()).toBe(1010);
		});

		it('should sum with success', () => {
			const total = Money.one_thousand();
			const amount = total.sum(-10);
			expect(amount.value()).toBe(990);
		});
	});

	describe('subtract', () => {
		it('should subtract with success', () => {
			const total = Money.one_thousand();
			const amount = total.subtract(10);
			expect(amount.value()).toBe(990);
		});

		it('should subtract with success', () => {
			const total = Money.one_thousand();
			const amount = total.subtract(Money.ten());
			expect(amount.value()).toBe(990);
		});

		it('should subtract with success', () => {
			const total = Money.one_thousand();
			const amount = total.subtract(-10);
			expect(amount.value()).toBe(1010);
		});

		it('should subtract with success', () => {
			const total = Money.subtract(1, 10);
			expect(total).toBe(-9);
			expect(Money.subtract(Money.one(), Money.ten())).toBe(-9);
		});
	});

	describe('multiply', () => {
		it('should return 100', () => {
			const ten = Money.ten();
			const total = ten.multiply(Money.ten());
			expect(total.value()).toBe(100);
		});

		it('should return 100', () => {
			const ten = Money.ten();
			const total = ten.multiply(10);
			expect(total.value()).toBe(100);
		});
	});

	describe('divide', () => {
		it('should return 10', () => {
			const amount = Money.one_hundred();
			const total = amount.divide(10);
			expect(total.value()).toBe(10);
		});

		it('should return 10', () => {
			const amount = Money.one_hundred();
			const total = amount.divide(Money.ten());
			expect(total.value()).toBe(10);
		});
	});

	describe('addPercent', () => {
		it('should add percent with success', () => {
			const money = Money.init(200);
			expect(money.addPercent(20).value()).toBe(240);
		});

		it('should discount percent with success', () => {
			const money = Money.init(200);
			expect(money.addPercent(-20).value()).toBe(160);
		});
	});

	describe('percent', () => {
		it('should return 10', () => {
			const amount = Money.one_hundred();
			const total = amount.percent(10);
			expect(total.value()).toBe(10);
		});

		it('should return -50', () => {
			const amount = Money.one_hundred().multiply(5);
			const total = amount.percent(-10);
			expect(total.value()).toBe(-50);
		});
	});

	describe('isGt', () => {
		it('should return true', () => {
			const a = Money.one_hundred();
			const b = Money.ten();
			expect(a.isGt(b)).toBeTruthy();
			expect(a.isGt(10)).toBeTruthy();
		});

		it('should return false', () => {
			const a = Money.one_hundred();
			const b = Money.ten();
			expect(b.isGt(a)).toBeFalsy();
			expect(Money.ten().isGt(Money.ten())).toBeFalsy();
			expect(Money.ten().isGt(10)).toBeFalsy();
		});
	});

	describe('isGte', () => {
		it('should return true', () => {
			const a = Money.one_hundred();
			const b = Money.ten();
			expect(a.isGte(b)).toBeTruthy();
			expect(Money.one_hundred().isGte(Money.ten())).toBeTruthy();
			expect(Money.ten().isGte(10)).toBeTruthy();
		});

		it('should return false', () => {
			const a = Money.one_hundred();
			const b = Money.ten();
			expect(b.isGte(a)).toBeFalsy();
			expect(b.isGte(11)).toBeFalsy();
		});
	});

	describe('isLt', () => {
		it('should return true', () => {
			const a = Money.ten();
			const b = Money.one_hundred();
			expect(a.isLt(b)).toBeTruthy();
			expect(a.isLt(11)).toBeTruthy();
		});

		it('should return false', () => {
			const a = Money.ten();
			const b = Money.one_hundred();
			expect(b.isLt(a)).toBeFalsy();
			expect(a.isLt(5)).toBeFalsy();
		});
	});

	describe('isLte', () => {
		it('should return true', () => {
			const a = Money.ten();
			const b = Money.ten();
			expect(a.isLte(b)).toBeTruthy();
			expect(a.isLte(b.sum(1))).toBeTruthy();
			expect(a.isLte(10)).toBeTruthy();
			expect(a.isLte(11)).toBeTruthy();
		});

		it('should return false', () => {
			const a = Money.ten();
			const b = Money.one_hundred();
			expect(b.isLte(a)).toBeFalsy();
			expect(a.isLte(5)).toBeFalsy();
		});
	});

	describe('isEq', () => {
		it('should return true', () => {
			const a = Money.ten();
			const b = Money.ten();
			expect(a.isEq(b)).toBeTruthy();
			expect(a.isEq(10)).toBeTruthy();
		});

		it('should return false', () => {
			const a = Money.ten();
			const b = Money.one_hundred();
			expect(b.isEq(a)).toBeFalsy();
			expect(a.isEq(5)).toBeFalsy();
		});
	});

	describe('isPos', () => {
		it('should return true', () => {
			const money = Money.ten();
			expect(money.isPos()).toBeTruthy();
		});

		it('should return false', () => {
			const money = Money.ten().makeNeg();
			expect(money.isPos()).toBeFalsy();
		});
	});

	describe('isNeg', () => {
		it('should return true', () => {
			const money = Money.ten().makeNeg();
			expect(money.isNeg()).toBeTruthy();
		});

		it('should return false', () => {
			const money = Money.ten();
			expect(money.isNeg()).toBeFalsy();
		});
	});

	describe('isZero', () => {
		it('should return true', () => {
			const money = Money.zero();
			expect(money.isZero()).toBeTruthy();
		});

		it('should return false', () => {
			const money = Money.ten();
			expect(money.isZero()).toBeFalsy();
		});
	});

	describe('makePos', () => {
		it('should return true', () => {
			const money = Money.init(-10).makePos();
			expect(money.isPos()).toBeTruthy();
		});

		it('should return false', () => {
			const money = Money.init(10).makeNeg();
			expect(money.isPos()).toBeFalsy();
		});

		it('should continue positive', () => {
			const money = Money.init(10).makePos();
			expect(money.isPos()).toBeTruthy();
		});
	});

	describe('makeNeg', () => {
		it('should return true', () => {
			const money = Money.init(10).makeNeg();
			expect(money.isNeg()).toBeTruthy();
		});

		it('should return false', () => {
			const money = Money.init(-10).makePos();
			expect(money.isNeg()).toBeFalsy();
		});

		it('should return true', () => {
			const money = Money.init(-10).makeNeg();
			expect(money.isNeg()).toBeTruthy();
		});
	});

	describe('sum', () => {
		it('should return 200', () => {
			const amount = Money.one_hundred();
			const total = amount.sum(amount);
			expect(total.value()).toBe(200);
			expect(amount.sum(100).value()).toBe(200);
			expect(Money.sum(amount, amount)).toBe(200);
			expect(Money.sum(amount, amount)).toBe(200);
		});

		it('should return 0', () => {
			const amount = Money.one_hundred();
			const total = amount.sum(amount.makeNeg());
			expect(total.value()).toBe(0);
			expect(amount.sum(-100).value()).toBe(0);
			expect(Money.sum(-100, 100)).toBe(0);
		});
	});

	describe('divide', () => {
		it('should return 50', () => {
			const amount = Money.one_hundred();
			const total = amount.divide(2);
			expect(total.value()).toBe(50);
			expect(amount.divide(2).value()).toBe(50);
			expect(Money.divide(amount, 2)).toBe(50);
		});

		it('should return 1', () => {
			const amount = Money.one_hundred();
			const total = amount.divide(amount);
			expect(total.value()).toBe(1);
			expect(amount.divide(100).value()).toBe(1);
			expect(Money.divide(amount, amount)).toBe(1)
		});
	});

	describe('multiply', () => {
		it('should return 81', () => {
			const amount = Money.ten().subtract(1);
			expect(amount.multiply(9).value()).toBe(81);
			expect(amount.multiply(amount).value()).toBe(81);
			expect(Money.multiply(9, 9)).toBe(81);
		});

		it('should return 81', () => {
			const amount = Money.ten().subtract(1).makeNeg();
			expect(amount.multiply(9).value()).toBe(-81);
			expect(amount.multiply(amount).value()).toBe(81);
			expect(Money.multiply(amount, amount)).toBe(81);
		});
	});

	describe('subtract', () => {
		it('should return 50', () => {
			const amount = Money.one_hundred();
			const total = amount.subtract(amount.divide(2));
			expect(total.value()).toBe(50);
			expect(amount.subtract(50).value()).toBe(50);
			expect(Money.subtract(amount, 50)).toBe(50);
		});
	});

	describe('floor', () => {
		it('should return 101', () => {
			const amount = Money.one_hundred().sum(1.5);
			expect(amount.floor().value()).toBe(101);
		});
	});

	describe('ceil', () => {
		it('should return 102', () => {
			const amount = Money.one_hundred().sum(1.5);
			expect(amount.ceil().value()).toBe(102);
		});
	});

	describe('closure', () => {
		it('should calc', () => {
			const closure = Money.closure(100);
			expect(closure.sum(20)).toBe(120);
			expect(closure.subtract(20)).toBe(80);
			expect(closure.divide(2)).toBe(50);
			expect(closure.multiply(2)).toBe(200);
		});
	});

	describe('calcInterest', () => {
		it('should calculate interest', () => {
			const total = Money.one_hundred();
			const amount = total.interest(1.5, 36);
			expect(amount.value()).toBe(54);
		});

		it('should throw', () => {
			const total = Money.one_hundred();
			const calc = (rate: number, period: number) => total.interest(rate, period);
			expect(() => calc(-1, 36)).toThrowError();
			expect(() => calc(1, -36)).toThrowError();
		});
	});

	describe('calcCompoundInterest', () => {
		it('should calculate interest', () => {
			const total = Money.one_hundred();
			const amount = total.compoundInterest(1.5, 36);
			expect(amount.value()).toBe(70.913);
		});

		it('should throw', () => {
			const total = Money.one_hundred();
			const calc = (rate: number, period: number) => total.compoundInterest(rate, period);
			expect(() => calc(-1, 36)).toThrowError();
			expect(() => calc(1, -36)).toThrowError();
		});
	});

	describe('max', () => {
		it('should return 1000', () => {
			const arr = [Money.ten(), Money.one_hundred(), Money.zero(), Money.one_thousand()];
			expect(Money.max(arr).value()).toBe(1000);
		});
	});

	describe('min', () => {
		it('should return 0', () => {
			const arr = [Money.ten(), Money.one_hundred(), Money.zero(), Money.one_thousand()];
			expect(Money.min(arr).value()).toBe(0);
		});
	});

	describe('random', () => {
		it('should return value between 100 and 1000', () => {
			const random = Money.random(100, 1000);
			expect(random.isGte(100) && random.isLte(1000)).toBeTruthy();
		});

		it('should return 0', () => {
			const random = Money.random(10, 10);
			expect(random.value()).toBe(0);
		});
	});

	describe('average', () => {
		it('should', () => {
			const cl = Money.closure(100);
			const a = Money.init(cl.sum(20));
			const b = Money.init(cl.sum(10));
			const c = Money.init(cl.subtract(5));
			expect(Money.average([a, b, c]).value()).toBe(108.333);
		});
	});

	describe('convertTo', () => {
		it('should convert to real', () => {
			const dollar = Money.one_hundred();
			const reals = dollar.convertTo(5);
			expect(reals.value()).toBe(500);
		});

		it('should convert to real', () => {
			const dollar = Money.one_hundred();
			const reals = dollar.convertTo(Money.one().multiply(5));
			expect(reals.value()).toBe(500);
		});

		it('should convert to dollars', () => {
			const reals = Money.one_hundred();
			const dollars = reals.convertTo(0.2);
			expect(dollars.value()).toBe(20);
		});

		it('should convert to dollars', () => {
			const reals = Money.one_hundred();
			const dollars = reals.convertTo(Money.init(0.2));
			expect(dollars.value()).toBe(20);
		});
	});
});
