import Result from '../src/core/result';
import { IUseCase } from '../src/core/use-case.interface'
import Logger from '../src/utils/logger.util';

describe('result', () => {

	const useCase = class fakeCase implements IUseCase<any, any>{
		async execute(){
			return Result.fail<any>("could not create a valid result", 500);
		}
	}

	it('methods should be defined', () => {
		expect(Result.combine).toBeDefined();
		expect(Result.ok).toBeDefined();
		expect(Result.fail).toBeDefined();
	});

	it('error should be defined', () => {
		const error = Result.fail<any>('Error defined');
		expect(error.isFailure).toBe(true);
		expect(error.isSuccess).toBe(false);
		expect(error.error).toBe('Error defined');
	});

	it('success should be defined', () => {
		const success = Result.ok<string>('Success');
		expect(success.isFailure).toBe(false);
		expect(success.isSuccess).toBe(true);
		expect(success.getResult()).toBe('Success');
	});

	it('validations should be defined', () => {
		const success = Result.ok<string>('Success');
		const error = Result.fail<any>('Error defined');
		const validation = Result.combine([success, error]);

		expect(validation.isFailure).toBe(true);
		expect(validation.isSuccess).toBe(false);
	});

	it('validations should be defined', () => {
		const errorA = Result.fail<any>('Error defined');
		const errorB = Result.fail<any>('Error defined');
		const validation = Result.combine([errorA, errorB]);

		expect(validation.isFailure).toBe(true);
		expect(validation.isSuccess).toBe(false);
	});

	it('validations should be defined', () => {
		const successA = Result.ok<any>('Success');
		const successB = Result.ok<any>('Success');
		const validation = Result.combine([successA, successB]);

		expect(validation.isFailure).toBe(false);
		expect(validation.isSuccess).toBe(true);
	});

	it('should return status 200', () => {
		const successA = Result.ok<any>('Success');
		expect(successA.isSuccess).toBe(true);
		expect(successA.statusCode).toBe(200);
	});

	it('should return status 412', () => {
		const successA = Result.fail<any>('error');
		expect(successA.isSuccess).toBe(false);
		expect(successA.statusCode).toBe(412);
	});

	it('should return status 201', () => {
		const successA = Result.ok<any>('Success', 201);
		expect(successA.isSuccess).toBe(true);
		expect(successA.statusCode).toBe(201);
	});

	it('should return status 500', () => {
		const successA = Result.fail<any>('error', 500);
		expect(successA.isSuccess).toBe(false);
		expect(successA.statusCode).toBe(500);
	});

	it('should return status 500', async () => {
		const fake = new useCase();
		const result = await fake.execute();
		expect(result.isFailure).toBe(true);
		expect(result.statusCode).toBe(500);
	});

	it('should throw error if try get value from error result', async ()=>{
		const fake = new useCase();
		const result = await fake.execute();
		expect(result.isFailure).toBe(true);
		Logger.info('Next error on console is only to test handle error with Result.fail')
		const error = ()=> result.getResult();
		expect(error).toThrow();
	})
});
