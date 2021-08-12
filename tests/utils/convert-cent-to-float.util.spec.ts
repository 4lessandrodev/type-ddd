import { convertValueToFloat } from '../../src/utils/convert-cent-to-float.util';

describe('convert-value-to-float', ()=>{
	it('should be defined', ()=>{
		const converted = convertValueToFloat;
		expect(converted).toBeDefined();
	})

	it('should be defined', ()=>{
		const converted = convertValueToFloat(10900);
		expect(converted).toBe(109.00);
	})

	it('should be defined', ()=>{
		const converted = convertValueToFloat(9901);
		expect(converted).toBe(99.01);
	})
})