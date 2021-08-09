import { getDecimalAsCent } from '../get-decimal-as-cent.util';

describe('get-decimal-as-cent.util', ()=>{
	it('should be defined', ()=>{
		const decimal = getDecimalAsCent;
		expect(decimal).toBeDefined()
	})

	it('should get decimal', ()=>{
		const decimal = getDecimalAsCent(99.20);
		expect(decimal).toBe(20);
	})

	it('should get decimal', ()=>{
		const decimal = getDecimalAsCent(1200.01);
		expect(decimal).toBe(1);
	})

	it('should get decimal', ()=>{
		const decimal = getDecimalAsCent(0.99);
		expect(decimal).toBe(99);
	})

	it('should get decimal', ()=>{
		const decimal = getDecimalAsCent(-0.99);
		expect(decimal).toBe(-99);
	})

	it('should get decimal', ()=>{
		const decimal = getDecimalAsCent(0.00);
		expect(decimal).toBe(0);
	})

	it('should get decimal', ()=>{
		const decimal = getDecimalAsCent(0.005);
		expect(decimal).toBe(0.5);
	})

	it('should get decimal', ()=>{
		const decimal = getDecimalAsCent(0.004);
		expect(decimal).toBe(0.4);
	})
})
