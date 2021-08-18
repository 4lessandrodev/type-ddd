import { convertValueToCent } from '../../src/utils/convert-value-to-cent.util'

describe('convert-value-to-cent.util',()=>{
	it('should be defined', ()=>{
		const cents = convertValueToCent;
		expect(cents).toBeDefined();
	})

	it('should convert real to cents', ()=>{
		const cents = convertValueToCent(5.00);
		expect(cents).toBe(500);
	})

	it('should convert real to cents', ()=>{
		const cents = convertValueToCent(5.01);
		expect(cents).toBe(501);
	})

	it('should convert real to cents', ()=>{
		const cents = convertValueToCent(5.015);
		expect(cents).toBe(501.5);
	})

	it('should convert real to cents', ()=>{
		const cents = convertValueToCent(99.0009);
		expect(cents).toBe(9900.1);
	})

	it('should convert real to cents', ()=>{
		const cents = convertValueToCent(999999.88);
		expect(cents).toBe(99999988);
	})

	it('should convert real to cents', ()=>{
		const cents = convertValueToCent(-102.89);
		expect(cents).toBe(-10289);
	})

	it('should convert real to cents', ()=>{
		const cents = convertValueToCent(-0.89);
		expect(cents).toBe(-89);
	})
})