import { Result } from '../core';
import { IUseCase } from '../core/use-case.interface';

/**
 * Auto mapper. Automatically convert one target class to other
 */
export interface IAutoMapper<T, R> {
	convert: (target: T) => R;
}

export interface CloneProps {
	isNew: boolean;
}

/**
 * @description Method responsible for blocking or allowing the function to run
 *
 * @argument Data generic type for param.
 * @argument Error generic type for Error returns if something fails in the process
 * @returns Result instance with boolean value. true if can execute and false if not.
 *
 * type ICanExecuteProxy<Data, Error> = ( data: Data ) => Promise<Result<boolean, Error>>;
 * //...
 * const canExecute = async (data: SignInDto) => Result.ok<boolean>(true);
 * // ...
 */
export type ICanExecuteProxy<Data, Error> = (
	data: Data
) => Promise<Result<boolean, Error>>;
/**
 * @description Method responsible for do something you want after run `execute` method
 *
 * @param data: the param, It must be the same type returned on `execute` method.
 *
 * @argument Error generic type for Error returns if something fails in the process
 * @returns Result instance with payload value.
 *
 * @example
 * type IAfterHookProxy<Payload, Error> = ( data?: Result<Payload, Error> ) => Promise<Result<Payload, Error>>;
 * //...
 * const afterExecute = async (data: Result<UserAggregate>) => data;
 * // ...
 */
export type IAfterHookProxy<Payload, Error> = (
	data: Result<Payload, Error>
) => Promise<Result<Payload, Error>>;
/**
 * @description Method responsible for do something you want before run `execute` method.
 *
 * @argument Data generic type for param.
 * @argument Error generic type for Error returns if something fails in the process
 * @returns Result instance with data value. The `execute` method will use data returned from this method.
 *
 * @example
 * type IBeforeHookProxy<Data, Error> = ( data?: Data ) => Promise<Result<Data, Error>>;
 * //...
 * const beforeExecute = async (data: { email: string, password: string }) => ({
 *   email: data.email.toLowerCase(),
 *   password: data.password
 * });
 * // ...
 *
 */
export type IBeforeHookProxy<Data, Error> = (
	data: Data
) => Promise<Result<Data, Error>>;

/**
 * @description Context parameters for a proxy class instance.
 * @argument Data generic type to be informed as a parameter when calling hooks `canExecute`, `beforeHook` and `execute` functions.
 * @argument Payload type for the generic type to be returned in the function `execute` and on `afterExecute`.
 * @argument Error type for the generic Error on Result used on each function.
 *
 * @returns Object with context
 *
 * @example
 *
 * interface SignInDto {
 *   email: string;
 *   password: string;
 * }
 *
 * // context param
 * {
 *   execute: new SignInUseCase(), // returns a Result<UserAggregate>
 *   canExecute: async (data: SignInDto) => Result.ok<boolean>(true),
 *   beforeExecute: async (data: SignInDto) => Result.ok(data),
 *   afterExecute: async (data: Result<UserAggregate>) => data
 * }
 *
 *
 */
export interface IContext<Data, Payload, Error> {
	execute: IUseCase<Data, Result<Payload, Error>>;
	canExecute?: ICanExecuteProxy<Data, Error>;
	afterExecute?: IAfterHookProxy<Payload, Error>;
	beforeExecute?: IBeforeHookProxy<Data, Error>;
}
