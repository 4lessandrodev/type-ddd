import generateRandomTracking from "../../src/utils/generate-random-tracking-code.util"

describe('generate-random-tracking-code.util', () => {
	it('should be defined', ()=>{
		const fun = generateRandomTracking;
		expect(fun).toBeDefined()
	})

	it('should generate a new random value', ()=>{
		const fun = generateRandomTracking();
		expect(fun).toHaveLength(15);
	})

	it('should not repeat value on short time', ()=>{
		const codes: string[] = [];
		let index = 0;
		while (index < 100) {
			codes.push(generateRandomTracking());
			index++
		}
		const uniques = [...new Set(codes)];
		expect(uniques).toHaveLength(100);
	})
});