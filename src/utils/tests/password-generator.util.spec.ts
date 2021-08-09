import passwordGenerator from "../password-generator.util"

describe('password-generator.util', ()=>{

	it('should be defined', ()=>{
		const generator = passwordGenerator;
		expect(generator).toBeDefined()
	})

	it('should generate a random password with 8 chars', ()=>{
		const password = passwordGenerator(8);
		expect(password).toHaveLength(8)
	})

	it('should generate a random password with 10 chars', ()=>{
		const password = passwordGenerator(10);
		expect(password).toHaveLength(10)
	})

	it('should generate a random password with 12 chars', ()=>{
		const password = passwordGenerator(12);
		expect(password).toHaveLength(12)
	})

	it('should generate a random password with 14 chars', ()=>{
		const password = passwordGenerator(14);
		expect(password).toHaveLength(14)
	})

	it('should generate a random password with 16 chars', ()=>{
		const password = passwordGenerator(16);
		expect(password).toHaveLength(16)
	})

	it('should generate a random password with 18 chars', ()=>{
		const password = passwordGenerator(18);
		expect(password).toHaveLength(18)
	})
})