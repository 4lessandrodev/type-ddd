import Result from '../../src/core/result';
import { IUseCase } from '../../src/core/use-case.interface';
import Logger from '../../src/utils/logger.util';

describe('result', () => {
	const useCase = class fakeCase implements IUseCase<any, any> {
		async execute() {
			return Result.fail<any>(
				'could not create a valid result',
				'INTERNAL_SERVER_ERROR'
			);
		}
	};

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
		expect(error.statusCodeNumber).toBe(422);
		expect(error.statusCode).toBe('UNPROCESSABLE_ENTITY');
	});

	it('success should be defined', () => {
		const success = Result.ok<string>('Success');
		expect(success.isFailure).toBe(false);
		expect(success.isSuccess).toBe(true);
		expect(success.statusCodeNumber).toBe(200);
		expect(success.statusCode).toBe('OK');
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
		expect(validation.statusCodeNumber).toBe(422);
		expect(validation.statusCode).toBe('UNPROCESSABLE_ENTITY');
	});

	it('validations should be defined', () => {
		const successA = Result.ok<any>('Success');
		const successB = Result.ok<any>('Success');
		const validation = Result.combine([successA, successB]);

		expect(validation.isFailure).toBe(false);
		expect(validation.isSuccess).toBe(true);
		expect(validation.statusCodeNumber).toBe(200);
		expect(validation.statusCode).toBe('OK');
	});

	it('should return status 200', () => {
		const successA = Result.ok<any>('Success');
		expect(successA.isSuccess).toBe(true);
		expect(successA.statusCodeNumber).toBe(200);
		expect(successA.statusCode).toBe('OK');
	});

	it('should return status 412', () => {
		const successA = Result.fail<any>('error');
		expect(successA.isSuccess).toBe(false);
		expect(successA.statusCode).toBe('UNPROCESSABLE_ENTITY');
		expect(successA.statusCodeNumber).toBe(422);
	});

	it('should return status 201', () => {
		const successA = Result.ok<any>('Success', 'CREATED');
		expect(successA.isSuccess).toBe(true);
		expect(successA.statusCodeNumber).toBe(201);
	});

	it('should return status 500', () => {
		const successA = Result.fail<any>('error', 'INTERNAL_SERVER_ERROR');
		expect(successA.isSuccess).toBe(false);
		expect(successA.statusCode).toBe('INTERNAL_SERVER_ERROR');
		expect(successA.statusCodeNumber).toBe(500);
	});

	it('should return status 500', async () => {
		const fake = new useCase();
		const result = await fake.execute();
		expect(result.isFailure).toBe(true);
		expect(result.statusCode).toBe('INTERNAL_SERVER_ERROR');
		expect(result.statusCodeNumber).toBe(500);
	});

	it('error message should be string when result is typed as void', () => {
		Logger.info(
			'THE 13 ERRORS AND 01 WARN BELLOW ON TERMINAL IS ONLY SOME LOGGER TESTS. DO NOT WORRY!'
		);
		const error = Result.fail<void>('Error defined');
		const testeString = (value: string): string => value;
		testeString(error.errorValue());

		expect(error.isFailure).toBe(true);
		expect(error.isSuccess).toBe(false);
		expect(error.errorValue).toBeDefined();
	});

	it('should throw if result isSuccess and isFailure on the same instance', () => {
		jest.spyOn(Logger, 'error').mockClear();
		const logError = jest.spyOn(Logger, 'error');
		new Result(true, true, 'BAD_REQUEST', true);
		expect(logError).toHaveBeenCalled();
	});

	it('should throw if result not isSuccess and not isFailure on the same instance', () => {
		jest.spyOn(Logger, 'error').mockClear();
		const logError = jest.spyOn(Logger, 'error');
		new Result(false, false, 'BAD_REQUEST', false);
		expect(logError).toHaveBeenCalled();
	});

	it('should throw if result has no status code defined', () => {
		jest.spyOn(Logger, 'error').mockClear();
		const logError = jest.spyOn(Logger, 'error');
		new Result(false, false, undefined, false);
		expect(logError).toHaveBeenCalled();
	});

	it('should throw if result has no status code defined', () => {
		jest.spyOn(Logger, 'error').mockClear();
		const logError = jest.spyOn(Logger, 'error');
		const result = new Result(false, false, 'BAD_REQUEST', false);
		result.getResult();
		expect(logError).toHaveBeenCalled();
	});
});
