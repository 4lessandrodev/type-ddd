import {
	Result,
	IBeforeHookProxy,
	IAfterHookProxy,
	ICanExecuteProxy,
	TSProxy,
} from '@types-ddd/core';
import { IUseCase } from 'rich-domain';

describe('proxy.pattern', () => {
	interface DataDto {
		email: string;
	}
	let useCase: IUseCase<DataDto, Result<string>>;
	let beforeExecuteHook: IBeforeHookProxy<DataDto, string>;
	let afterExecuteHook: IAfterHookProxy<string, string>;
	let canExecuteProxy: ICanExecuteProxy<DataDto, string>;

	beforeEach(() => {
		useCase = {
			execute: async (data: DataDto): Promise<Result<string>> =>
				Result.Ok(data.email),
		};

		beforeExecuteHook = {
			execute: async (data: DataDto): Promise<Result<DataDto>> =>
				Result.Ok({
					email: data.email.toLowerCase(),
				}),
		};

		afterExecuteHook = {
			execute: async (data: Result<string>): Promise<Result<string>> =>
				data,
		};

		canExecuteProxy = {
			execute: async (data: DataDto): Promise<Result<boolean>> => {
				const isValidEmail = data.email === 'valid_email@domain.com';

				if (isValidEmail) return Result.Ok(true);

				return Result.fail('invalid email');
			},
		};
	});

	it('should run execute with success', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}

		const proxy = new OnlyExecute({ execute: useCase });

		const result = await proxy.execute({ email: 'valid_email@domain.com' });

		expect(result.isOk()).toBeTruthy();
		expect(result.value()).toBe('valid_email@domain.com');
	});

	it('should fail next step if execute fails', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}

		const proxy = new OnlyExecute({
			execute: { execute: async () => Result.fail('fails') },
			afterExecute: { execute: async (data) => data },
		});

		const result = await proxy.execute({ email: 'valid_email@domain.com' });

		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('fails');
	});

	it('should can execute if provide a valid email', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}
		const validateFn = { canExecuteProxy };
		const validateSpy = jest.spyOn(validateFn.canExecuteProxy, 'execute');

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: validateFn.canExecuteProxy,
		});

		const result = await proxy.execute({ email: 'valid_email@domain.com' });

		expect(validateSpy).toHaveBeenCalledWith({
			email: 'valid_email@domain.com',
		});
		expect(result.isOk()).toBeTruthy();
		expect(result.value()).toBe('valid_email@domain.com');
	});

	it('should cannot execute if provide an invalid email', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}
		const validateSpy = jest.spyOn(canExecuteProxy, 'execute');

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: canExecuteProxy,
		});

		const result = await proxy.execute({
			email: 'invalid_email@domain.com',
		});

		expect(validateSpy).toHaveBeenCalledWith({
			email: 'invalid_email@domain.com',
		});
		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('invalid email');
	});

	it('should cannot execute if result has a false value', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}
		const validateSpy = jest.spyOn(canExecuteProxy, 'execute');

		jest.spyOn(canExecuteProxy, 'execute').mockImplementationOnce(
			async () => Result.Ok(false),
		);

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: canExecuteProxy,
		});

		const result = await proxy.execute({
			email: 'invalid_email@domain.com',
		});

		expect(validateSpy).toHaveBeenCalledWith({
			email: 'invalid_email@domain.com',
		});
		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('blocked by canExecute hook on proxy');
	});

	it('should run before hook if provide one', async () => {
		/** This hook transform email to lowerCase */
		class OnlyExecute extends TSProxy<DataDto, string> {}
		const validateSpy = jest.spyOn(beforeExecuteHook, 'execute');

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: canExecuteProxy,
			beforeExecute: beforeExecuteHook,
		});

		const result = await proxy.execute({ email: 'VALID_EMAIL@DOMAIN.COM' });

		expect(validateSpy).toHaveBeenCalledWith({
			email: 'VALID_EMAIL@DOMAIN.COM',
		});

		expect(result.isOk()).toBeTruthy();
		expect(result.value()).toBe('valid_email@domain.com');
	});

	it('should run after hook if provide one', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}
		const validateSpy = jest.spyOn(afterExecuteHook, 'execute');

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: canExecuteProxy,
			beforeExecute: beforeExecuteHook,
			afterExecute: afterExecuteHook,
		});

		const result = await proxy.execute({ email: 'VALID_EMAIL@DOMAIN.COM' });

		expect(validateSpy).toHaveBeenCalledWith(
			Result.Ok('valid_email@domain.com'),
		);

		expect(result.isOk()).toBeTruthy();
		expect(result.value()).toBe('valid_email@domain.com');
	});

	it('should run after hook if provide one', async () => {
		const afterMock = {
			execute: async (data: Result<string>): Promise<Result<string>> => {
				return Result.Ok(data.value() + '@AFTER-HOOK');
			},
		};
		const validateSpy = jest.spyOn(afterMock, 'execute');

		class OnlyExecute extends TSProxy<DataDto, string> {}

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: canExecuteProxy,
			beforeExecute: beforeExecuteHook,
			afterExecute: afterMock,
		});

		const result = await proxy.execute({ email: 'VALID_EMAIL@DOMAIN.COM' });

		expect(validateSpy).toHaveBeenCalledWith(
			Result.Ok('valid_email@domain.com'),
		);

		expect(result.isOk()).toBeTruthy();
		expect(result.value()).toBe('valid_email@domain.com@AFTER-HOOK');
	});

	it('should get error if after hook step fails', async () => {
		const afterMock = {
			execute: async (data: Result<string>): Promise<Result<string>> => {
				return Result.fail(data.value() + '@fail' + '@AFTER-HOOK');
			},
		};
		const validateSpy = jest.spyOn(afterMock, 'execute');

		class OnlyExecute extends TSProxy<DataDto, string> {}

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: canExecuteProxy,
			beforeExecute: beforeExecuteHook,
			afterExecute: afterMock,
		});

		const result = await proxy.execute({ email: 'VALID_EMAIL@DOMAIN.COM' });

		expect(validateSpy).toHaveBeenCalledWith(
			Result.Ok('valid_email@domain.com'),
		);

		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('valid_email@domain.com@fail@AFTER-HOOK');
	});

	it('should do not call canExecute if beforeExecute fails', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}

		const hooks = {
			canExecute: canExecuteProxy,
			beforeExecute: beforeExecuteHook,
			afterExecute: afterExecuteHook,
		};

		const beforeExecuteSpy = jest
			.spyOn(hooks.beforeExecute, 'execute')
			.mockImplementationOnce(async () =>
				Result.fail('@hook:before:fails'),
			);

		const canExecuteSpy = jest.spyOn(hooks.canExecute, 'execute');
		const afterExecuteSpy = jest.spyOn(hooks.afterExecute, 'execute');

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: hooks.canExecute,
			beforeExecute: hooks.beforeExecute,
			afterExecute: hooks.afterExecute,
		});

		const result = await proxy.execute({
			email: 'invalid_value@domain.com',
		});

		expect(beforeExecuteSpy).toHaveBeenCalledWith({
			email: 'invalid_value@domain.com',
		});
		expect(canExecuteSpy).not.toHaveBeenCalled();
		expect(afterExecuteSpy).not.toHaveBeenCalled();
		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('@hook:before:fails');
	});

	it('should do not call execute if canExecute fails', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}

		const hooks = {
			canExecute: canExecuteProxy,
			beforeExecute: beforeExecuteHook,
			afterExecute: afterExecuteHook,
		};

		const canExecuteSpy = jest
			.spyOn(hooks.canExecute, 'execute')
			.mockImplementationOnce(async () =>
				Result.fail('@hook:canExecute:fails'),
			);

		const useCaseSpy = jest.spyOn(useCase, 'execute');
		const beforeExecuteSpy = jest.spyOn(hooks.beforeExecute, 'execute');
		const afterExecuteSpy = jest.spyOn(hooks.afterExecute, 'execute');

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: hooks.canExecute,
			beforeExecute: hooks.beforeExecute,
			afterExecute: hooks.afterExecute,
		});

		const result = await proxy.execute({
			email: 'invalid_value@domain.com',
		});

		expect(canExecuteSpy).toHaveBeenCalledWith({
			email: 'invalid_value@domain.com',
		});
		expect(beforeExecuteSpy).toHaveBeenCalledWith({
			email: 'invalid_value@domain.com',
		});
		expect(afterExecuteSpy).not.toHaveBeenCalled();
		expect(useCaseSpy).not.toHaveBeenCalled();
		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('@hook:canExecute:fails');
	});

	it('should do not call afterExecute if execute fails', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}

		const hooks = {
			canExecute: canExecuteProxy,
			beforeExecute: beforeExecuteHook,
			afterExecute: afterExecuteHook,
		};

		const useCaseSpy = jest
			.spyOn(useCase, 'execute')
			.mockImplementationOnce(async () =>
				Result.fail('@hook:execute:fails'),
			);

		const canExecuteSpy = jest.spyOn(hooks.canExecute, 'execute');
		const beforeExecuteSpy = jest.spyOn(hooks.beforeExecute, 'execute');
		const afterExecuteSpy = jest.spyOn(hooks.afterExecute, 'execute');

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: hooks.canExecute,
			beforeExecute: hooks.beforeExecute,
			afterExecute: hooks.afterExecute,
		});

		const result = await proxy.execute({ email: 'valid_email@domain.com' });

		expect(useCaseSpy).toHaveBeenCalledWith({
			email: 'valid_email@domain.com',
		});
		expect(canExecuteSpy).toHaveBeenCalledWith({
			email: 'valid_email@domain.com',
		});
		expect(beforeExecuteSpy).toHaveBeenCalledWith({
			email: 'valid_email@domain.com',
		});
		expect(afterExecuteSpy).not.toHaveBeenCalled();
		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('@hook:execute:fails');
	});

	it('should return fails if afterExecute hook fails', async () => {
		class OnlyExecute extends TSProxy<DataDto, string> {}

		const hooks = {
			canExecute: canExecuteProxy,
			beforeExecute: beforeExecuteHook,
			afterExecute: afterExecuteHook,
		};

		jest.spyOn(hooks.afterExecute, 'execute').mockImplementationOnce(
			async () => Result.fail('@hook:after:fails'),
		);

		const useCaseSpy = jest.spyOn(useCase, 'execute');
		const canExecuteSpy = jest.spyOn(hooks.canExecute, 'execute');
		const beforeExecuteSpy = jest.spyOn(hooks.beforeExecute, 'execute');

		const proxy = new OnlyExecute({
			execute: useCase,
			canExecute: hooks.canExecute,
			beforeExecute: hooks.beforeExecute,
			afterExecute: hooks.afterExecute,
		});

		const result = await proxy.execute({ email: 'valid_email@domain.com' });

		expect(useCaseSpy).toHaveBeenCalledWith({
			email: 'valid_email@domain.com',
		});
		expect(canExecuteSpy).toHaveBeenCalledWith({
			email: 'valid_email@domain.com',
		});
		expect(beforeExecuteSpy).toHaveBeenCalledWith({
			email: 'valid_email@domain.com',
		});
		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('@hook:after:fails');
	});
});
