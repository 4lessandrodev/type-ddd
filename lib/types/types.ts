import {
	IUseCase,
	IResultHook,
	EntityMapperPayload,
	IAdapter,
	IAggregate,
	IAutoMapper,
	IPropsValidation,
	EventHandler,
} from 'rich-domain/types';
import { Result } from '../core';
import {
	UID,
	OBJ,
	IValueObject,
	ITeratorConfig,
	ISettings,
	IResultOptions,
	IResultObject,
} from 'rich-domain/types';
import {
	IResultExecute,
	IResult,
	IPublicHistory,
	ICommand,
} from 'rich-domain/types';
import { IProxy, IIterator, IHistory, IEntityHistory } from 'rich-domain/types';
import { IParentName } from 'rich-domain/types';

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
 * type ICanExecuteProxy<Data, Error> = IUseCase<Data, Result<boolean, Error>>;
 * //...
 * const canExecute = { execute: async (data: SignInDto) => Result.ok<boolean>(true) };
 * // ...
 */
export type ICanExecuteProxy<Data, Error> = IUseCase<
	Data,
	Result<boolean | null, Error>
>;
/**
 * @description Method responsible for do something you want after run `execute` method
 *
 * @param data: the param, It must be the same type returned on `execute` method.
 *
 * @argument Error generic type for Error returns if something fails in the process
 * @returns Result instance with payload value.
 *
 * @example
 * type IAfterHookProxy<Payload, Error> = IUseCase<Result<Payload, Error>, Result<Payload, Error>>;
 * //...
 * const afterExecute = { execute: async (data: Result<UserAggregate>) => data };
 * // ...
 */
export type IAfterHookProxy<Payload, Error> = IUseCase<
	Result<Payload, Error>,
	Result<Payload, Error>
>;
/**
 * @description Method responsible for do something you want before run `execute` method.
 *
 * @argument Data generic type for param.
 * @argument Error generic type for Error returns if something fails in the process
 * @returns Result instance with data value. The `execute` method will use data returned from this method.
 *
 * @example
 * type IBeforeHookProxy<Data, Error> = IUseCase<Data, Result<Data, Error>>;
 * //...
 * const beforeExecute = {
 *   execute: async (data: { email: string, password: string }) => ({
 *     email: data.email.toLowerCase(),
 *     password: data.password
 *   });
 * }
 * // ...
 *
 */
export type IBeforeHookProxy<Data, Error> = IUseCase<
	Data,
	Result<Data | null, Error>
>;

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
 *   canExecute: { execute: async (data: SignInDto) => Result.ok<boolean>(true) },
 *   beforeExecute: { execute: async (data: SignInDto) => Result.Ok(data) },
 *   afterExecute: { execute: async (data: Result<UserAggregate>) => data }
 * }
 *
 *
 */
export interface IProxyContext<Data, Payload, Error> {
	execute: IUseCase<Data, Result<Payload, Error>>;
	canExecute?: ICanExecuteProxy<Data, Error>;
	afterExecute?: IAfterHookProxy<Payload, Error>;
	beforeExecute?: IBeforeHookProxy<Data, Error>;
}

/**
 * Object search filter
 * @argument key: value
 *
 * @description you may use key as string with number or string value
 *
 * @example { email: "some_email@domain.com" }
 * { id: 1 }
 * { name: "Alessandro" }
 */
type Filter<T = {}> = {
	[K in keyof T]: T[K];
};

export default Filter;
export {
	Filter,
	IResultHook,
	EntityMapperPayload,
	IAdapter,
	IAggregate,
	IAutoMapper,
	UID,
	OBJ,
	IValueObject,
	ITeratorConfig,
	ISettings,
	IResultOptions,
	IResultObject,
	IResultExecute,
	IResult,
	IPublicHistory,
	ICommand,
	IProxy,
	IIterator,
	IHistory,
	IEntityHistory,
	IParentName,
	IUseCase,
	IPropsValidation,
	EventHandler,
};
