import { getIntegerAsCent } from '../../src/utils/get-integer-as-cents.util';

describe('get-integer-as-cent.util', ()=>{
	it('should be defined', ()=>{
		const integer = getIntegerAsCent;
		expect(integer).toBeDefined()
	})

	it('should get integer', ()=>{
		const integer = getIntegerAsCent(99.20);
		expect(integer).toBe(9900);
	})

	it('should get integer', ()=>{
		const integer = getIntegerAsCent(1200.01);
		expect(integer).toBe(120000);
	})

	it('should get integer', ()=>{
		const integer = getIntegerAsCent(0.99);
		expect(integer).toBe(0);
	})

	it('should get integer', ()=>{
		const integer = getIntegerAsCent(-0.99);
		expect(integer).toBe(-0);
	})

	it('should get integer', ()=>{
		const integer = getIntegerAsCent(0.00);
		expect(integer).toBe(0);
	})
})