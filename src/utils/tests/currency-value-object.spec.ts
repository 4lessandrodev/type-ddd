import {CurrencyValueObject} from '../currency.value-object';

describe('currency.value-object', ()=>{
	it('should be defined',()=>{
		const valueObject = CurrencyValueObject.create;
		expect(valueObject).toBeDefined()
	})

	it('should create a valid currency', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 10 });
		expect(valueObject.isSuccess).toBeTruthy();
	})

	it('should get value and currency', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 10 }).getResult();
		expect(valueObject.value).toBe(10);
		expect(valueObject.currency).toBe('BRL');
	})

	it('should result positive value', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 10 }).getResult();
		expect(valueObject.isPositive()).toBeTruthy()
	})

	it('should result negative value', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: -10 }).getResult();
		expect(valueObject.isPositive()).toBeFalsy()
	})

	it('should not be a safe value to calculate', ()=>{
		const isSafeNumber = CurrencyValueObject.isSafeValue(Number.MAX_SAFE_INTEGER);
		expect(isSafeNumber).toBeFalsy()
	})

	it('should not be a safe value to calculate', ()=>{
		const isSafeNumber = CurrencyValueObject.isSafeValue(Number.MIN_SAFE_INTEGER);
		expect(isSafeNumber).toBeFalsy()
	})

	it('should be a safe value to calculate', ()=>{
		const isSafeNumber = CurrencyValueObject.isSafeValue(Number.MIN_SAFE_INTEGER / 202);
		expect(isSafeNumber).toBeTruthy()
	})

	it('should be a safe value to calculate', ()=>{
		const isSafeNumber = CurrencyValueObject.isSafeValue(Number.MAX_SAFE_INTEGER / 202);
		expect(isSafeNumber).toBeTruthy()
	})

	it('should return a formatted currency as BRL', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 10 }).getResult();
		expect(valueObject.getCurrencyString()).toBe('R$\xa010,00');
	})

	it('should return a formatted currency as EUR', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'EUR', value: 10 }).getResult();
		expect(valueObject.getCurrencyString()).toBe('10,00\xa0€');
	})

	it('should return a formatted currency as JPY', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'JPY', value: 10 }).getResult();
		expect(valueObject.getCurrencyString()).toBe('￥10');
	})

	it('should return a formatted currency as USD', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'USD', value: 10 }).getResult();
		expect(valueObject.getCurrencyString()).toBe('$10.00');
	})

	it('should sum a thousand value with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 2500 }).getResult();
		valueObject.add(1999);
		expect(valueObject.value).toBe(4499);
	})

	it('should sum a cents value with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.08 }).getResult();
		valueObject.add(0.02);
		expect(valueObject.value).toBe(0.10);
	})

	it('should sum a cents value with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.01 }).getResult();
		valueObject.add(0.02);
		expect(valueObject.value).toBe(0.03);
	})

	it('should sum a cents value with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.01 }).getResult();
		valueObject.add(3);
		expect(valueObject.value).toBe(3.01);
	})

	it('should multiply a cent value with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.03 }).getResult();
		valueObject.multiplyBy(0.5);
		expect(valueObject.value).toBe(0.015);
	})

	it('should multiply a cent value with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.03 }).getResult();
		valueObject.multiplyBy(3);
		expect(valueObject.value).toBe(0.09);
	})

	it('should multiply a thousand value with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 1200 }).getResult();
		valueObject.multiplyBy(2);
		expect(valueObject.value).toBe(2400);
	})

	it('should not multiply an unsafe thousand value', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 999999999999 }).getResult();
		valueObject.multiplyBy(9999999999999);
		expect(valueObject.value).toBe(999999999999);
	})

	it('should multiply a safe thousand value', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 999999999 }).getResult();
		valueObject.multiplyBy(70);
		expect(valueObject.value).toBe(69999999930);
	})

	it('should subtract 200 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 1200 }).getResult();
		valueObject.subtractBy(200);
		expect(valueObject.value).toBe(1000);
	})

	it('should subtract 0.90 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 99 }).getResult();
		valueObject.subtractBy(0.90);
		expect(valueObject.value).toBe(98.10);
	})

	it('should subtract 0.2 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.7 }).getResult();
		valueObject.subtractBy(0.2);
		expect(valueObject.value).toBe(0.5);
	})

	it('should subtract 1.7 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.7 }).getResult();
		valueObject.subtractBy(1.7);
		expect(valueObject.value).toBe(-1);
	})

	it('should divide for 0.9 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 100 }).getResult();
		valueObject.divideBy(0.9);
		expect(valueObject.value).toBe(111.111);
	})

	it('should divide for 2 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 100 }).getResult();
		valueObject.divideBy(2);
		expect(valueObject.value).toBe(50);
	})

	it('should divide for 0.5 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.90 }).getResult();
		valueObject.divideBy(0.5);
		expect(valueObject.value).toBe(1.8);
	})

	it('should fails if try sum an unsafe value', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.90 }).getResult();
		const result = valueObject.add(Number.MAX_SAFE_INTEGER);
		expect(result.isFailure).toBe(true);
	})

	it('should fails if try sum and already has an unsafe value', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 9999999999999 }).getResult();
		const result = valueObject.add(9);
		expect(result.isFailure).toBe(true);
	})

	it('should fails if result sum is unsafe value', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 999999999999 }).getResult();
		const result = valueObject.add(999999999999999);
		expect(result.isFailure).toBe(true);
	})

	it('should fails if try create a currency with unsafe value', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 999999999999999 });
		expect(valueObject.isFailure).toBe(true);
	})

	it('should not validate unsafe value', ()=>{
		const valueObject = CurrencyValueObject.isSafeValue("9999" as any);
		expect(valueObject).toBe(false);
	})

	it('should fails if provide an invalid value', ()=>{
		const valueObject = CurrencyValueObject.create({value: "999" as any, currency: 'USD'});
		expect(valueObject.isSuccess).toBe(false);
	})

	it('should fails if provide an invalid currency', ()=>{
		const valueObject = CurrencyValueObject.create({value: 20, currency: 'INVALID' as any});
		expect(valueObject.isSuccess).toBe(false);
	})

	it('should add percentage for 50 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 50 }).getResult();
		valueObject.addPercent(10);
		expect(valueObject.value).toBe(55);
	})

	it('should add percentage for 0.50 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.50 }).getResult();
		valueObject.addPercent(10);
		expect(valueObject.value).toBe(0.55);
	})

	it('should subtract percentage for 50 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 50 }).getResult();
		valueObject.subtractPercent(10);
		expect(valueObject.value).toBe(45);
	})

	it('should subtract percentage for 0.50 with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.50 }).getResult();
		valueObject.subtractPercent(10);
		expect(valueObject.value).toBe(0.45);
	})

	it('should made many operation with success', ()=>{
		const valueObject = CurrencyValueObject.create({ currency: 'BRL', value: 0.50 }).getResult();
		valueObject.add(0.50); // 1
		valueObject.multiplyBy(50); // 50
		valueObject.divideBy(2); // 25
		valueObject.subtractBy(5); // 20
		valueObject.add(80); // 100
		valueObject.addPercent(2); // 102
		valueObject.subtractBy(2); // 100
		valueObject.subtractPercent(30); // 70
		expect(valueObject.value).toBe(70);
	})
})
