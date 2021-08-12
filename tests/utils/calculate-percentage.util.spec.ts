import { calculatePercent } from '../../src/utils/calculate-percentage.util';

describe('calculate-percentage.util', ()=>{
	it('should be defined', ()=>{
		const calculate = calculatePercent
		expect(calculate).toBeDefined()
	})

	it('should calculate a valid percentual', ()=>{
		const calculate = calculatePercent(50, 5);
		expect(calculate).toBe(2.5)
	})

	it('should calculate a valid percentual', ()=>{
		const calculate = calculatePercent(0, 0);
		expect(calculate).toBe(0)
	})

	it('should calculate a valid percentual', ()=>{
		const calculate = calculatePercent(1000, 0);
		expect(calculate).toBe(0)
	})

	it('should calculate a valid percentual', ()=>{
		const calculate = calculatePercent(0, 50);
		expect(calculate).toBe(0)
	})

	it('should calculate a valid percentual', ()=>{
		const calculate = calculatePercent(1000, 10);
		expect(calculate).toBe(100)
	})

	it('should calculate a valid percentual', ()=>{
		const calculate = calculatePercent(1000, -10);
		expect(calculate).toBe(-100)
	})

	it('should calculate a valid percentual', ()=>{
		const calculate = calculatePercent(1, 1);
		expect(calculate).toBe(0.01)
	})

	it('should calculate a valid percentual', ()=>{
		const calculate = calculatePercent(1, 0.1);
		expect(calculate).toBe(0.001)
	})
})