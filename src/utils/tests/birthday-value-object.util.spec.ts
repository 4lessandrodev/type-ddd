import { BirthdayValueObject } from '../birthday.value-object';

describe('birthday.value-object', () => {
	it('should be defined', ()=>{
		const valueObject = BirthdayValueObject.create;
		expect(valueObject).toBeDefined();
	})

	it('should create a birthday with success', ()=>{
		const date = new Date();
		date.setFullYear(2000, 1, 1);
		const valueObject = BirthdayValueObject.create(date);
		expect(valueObject.isSuccess).toBe(true);
	})

	it('should get value with success', ()=>{
		const date = new Date();
		date.setFullYear(2000, 1, 1);
		const valueObject = BirthdayValueObject.create(date).getResult();
		expect(valueObject.value).toBe(date);
	})

	it('should fail if provide an invalid value', ()=>{
		const date = new Date();
		date.setFullYear(1900);
		const valueObject = BirthdayValueObject.create(date);
		expect(valueObject.isFailure).toBe(true);
	})

	it('should return age', ()=>{
		const birth = new Date();
		birth.setTime(1596939967044);

		const valueObject = BirthdayValueObject.create(birth).getResult();
		expect(valueObject.getAgeInYears()).toBeGreaterThanOrEqual(1);
	})

	it('should return age', ()=>{
		const birth = new Date();
		birth.setTime(965787967044);

		const valueObject = BirthdayValueObject.create(birth).getResult();
		expect(valueObject.getAgeInYears()).toBeGreaterThanOrEqual(21);
	})
});