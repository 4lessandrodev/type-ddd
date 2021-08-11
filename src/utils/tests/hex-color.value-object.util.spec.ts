import { HEXColorValueObject  } from '../hex-color.value-object';
describe('hex-color.value-object', () => {
	it('should be defined', ()=>{
		const valueObject = HEXColorValueObject.create;
		expect(valueObject).toBeDefined()
	})

	it('should fails if try create a rgb as hex color', ()=>{
		const valueObject = HEXColorValueObject.create('rgb(255, 255, 255)');
		expect(valueObject.isFailure).toBeTruthy();
	})

	it('should create a valid hex color', ()=>{
		const valueObject = HEXColorValueObject.create('#ffffff');
		expect(valueObject.isSuccess).toBeTruthy();
	})

	it('should create a valid hex color and get value', ()=>{
		const valueObject = HEXColorValueObject.create('#ffffff');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('#ffffff')
	})

	it('should create a valid hex color and get value', ()=>{
		const valueObject = HEXColorValueObject.create('#4eb7ac');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('#4eb7ac')
	})

	it('should create a valid hex color and get value', ()=>{
		const valueObject = HEXColorValueObject.create('#a78090');
		expect(valueObject.isSuccess).toBeTruthy();
		expect(valueObject.getResult().value).toBe('#a78090')
	})

	it('should fails if try to create an invalid rgb color', ()=>{
		const valueObject = HEXColorValueObject.create('#invalid');
		expect(valueObject.isFailure).toBeTruthy();
	})

	it('should fails if try to create an invalid hex color', ()=>{
		const valueObject = HEXColorValueObject.create('$fff');
		expect(valueObject.isFailure).toBeTruthy();
	})

	it('should fails if try to create an invalid hex color', ()=>{
		const valueObject = HEXColorValueObject.create('fff');
		expect(valueObject.isFailure).toBeTruthy();
	})

	it('should get rgb as hex color', ()=>{
		const valueObject = HEXColorValueObject.create('#ffffff').getResult();
		expect(valueObject.getAsRGB()).toBe('rgb(255, 255, 255)');
	})

	it('should get rgb as hex color', ()=>{
		const valueObject = HEXColorValueObject.create('#CD5C5C').getResult();
		expect(valueObject.getAsRGB()).toBe('rgb(205, 92, 92)');
	})

	it('should get rgb as hex color', ()=>{
		const valueObject = HEXColorValueObject.create('#dc143c').getResult();
		expect(valueObject.getAsRGB()).toBe('rgb(220, 20, 60)');
	})

	it('should get rgb as hex color', ()=>{
		const valueObject = HEXColorValueObject.create('#8b0000').getResult();
		expect(valueObject.getAsRGB()).toBe('rgb(139, 0, 0)');
	})

	it('should get rgb as hex color', ()=>{
		const valueObject = HEXColorValueObject.create('#ff0000').getResult();
		expect(valueObject.getAsRGB()).toBe('rgb(255, 0, 0)');
	})

	it('should get rgb as hex color', ()=>{
		const valueObject = HEXColorValueObject.create('#000000').getResult();
		expect(valueObject.getAsRGB()).toBe('rgb(0, 0, 0)');
	})

	it('should generate a random hex color', ()=>{
		const valueObject = HEXColorValueObject.randomColor();
		const isValid = HEXColorValueObject.isValidValue(valueObject.value);
		expect(isValid).toBeTruthy();
	})
});
