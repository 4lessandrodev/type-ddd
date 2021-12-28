import { Result } from "../core/result";
import { ChangesObserver } from '../core/changes-observer';
import { Logger } from "../utils/logger.util";
import { ShortDomainId } from '../core/short-domain-id';
import { UniqueEntityID } from '../core/unique-entity-id';

/**
 * `TargetPersistence` as Entity to persist on database and
 * `DomainAggregate` as Aggregate entity from domain
 * @method toPersistence receives a `DomainAggregate` target and transform it on `TargetPersistence`
 * @method toDomain receives a `TargetPersistence` target and transform it on `DomainAggregate`
 *
 */
export default interface IMapper<DomainAggregate, Entity> {
	toDomain: (target: Entity) => DomainAggregate;
	toPersistence: (target: DomainAggregate) => Entity;
}


/**
 * @description a simple interface that determines conversion method from dto to domain
 * @method toDomain
 */
export interface TMapper<TARGET, RESULT, ERROR = string> {
	/**
	 * @param target input
	 * @returns result
	 */
	map: (target: TARGET) => Result<RESULT, ERROR>;
 }

/**
 * @description abstract class Mapper with some default methods.
 * @param Props: refer to Aggregate Props, to define key name
 * @param Error: refer to type error to return on Result instance
 *
 * @method addState: add props to state
 * @method getState: get state as array of result
 * @method getStateByKey: get a prop by a key
 * @method resetState: clear all state
 * @method checkState: check all props in state
 */
export abstract class State<PROPS, ERROR = string> {
	private readonly state: Map<keyof PROPS, Result<unknown, ERROR>>;

	constructor() {
		this.state = new Map();
	}

	/**
	 * @description state is located on array. the size is array length.
	 * @returns state size as number: array length
	 */
	protected getSize (): number {
		return this.state.size;
	}

	/**
	 *
	 * @param key a key of PROPS defined as GENERIC
	 * @param value a result of instance defined on generic type
	 */
	protected addState<VO>(key: keyof PROPS, value: Result<VO, ERROR>): void {
		this.state.delete(key);
		this.state.set(key, value);
	}

	/**
	 * 
	 * @param values Array<Result<VO, ERROR>>
	 * @returns array of generated keys
	 */
	protected addManyState <VO>( values: Array<Result<VO, ERROR>> ): UniqueEntityID[] {
		const keys: UniqueEntityID[] = [];
		values.forEach( ( value ) => {
			const key = ShortDomainId.create().value;
			keys.push( key );
			this.addState( key.uid as any, value );
		} )
		
		return keys;
	}

	/**
	 * 
	 * @param keys Array of UniqueEntityID
	 * @param callback Array of Results to return if keys is not found
	 * @returns Array of result if keys is found or provided callback if not. else returns a empty array
	 */
	protected getStateByKeys<VO, ALT = Result<VO, ERROR>> ( keys: UniqueEntityID[], callback?: Array<ALT> ): Array<Result<VO, ERROR>> | Array<ALT> {

		const values: Array<Result<VO, ERROR>> = [];

		keys.forEach(
			( key ) => {
				if ( this.exists( key.uid as any ) ) {
					values.push( this.getStateByKey( key.uid as any ) );
				} 
			}
		);

		if ( values.length < 1 && callback) {
			return callback;
		}

		if ( values.length < 1 && callback === undefined ) {
			return [];
		}
		
		return values;
	}

	/**
	 * 
	 * @param key a key of PROPS defined as GENERIC
	 * @returns true if key exists or false if not
	 */
	 protected exists (key: keyof PROPS): boolean {
		return this.state.has( key );
	}

	/**
	 *
	 * @returns array of results
	 */
	protected getState(): Array<Result<unknown, ERROR>> {
		return [...this.state.values()];
	}

	/**
	 *
	 * @param key a key of props defined on PROPS generic type
	 * @returns a Result of instance defined as generic type by VO. if key does not exists return Result.fail
	 * 
	 * @param VO is instance result
	 * @param ALT is alternative type to return
	 */
	protected getStateByKey<VO, ALT = Result<VO, ERROR>> (
		key: keyof PROPS, callback?: ALT
	): Result<VO, ERROR> | ALT {
		const existKey = this.exists( key );
		if ( existKey ) {
			return this.state.get( key ) as Result<VO, ERROR>;
		}
		if ( callback ) {
			return callback;
		}
		Logger.warn( `The key: ${key} does not exists on mapper state` );
		return Result.fail<VO, ERROR>({} as unknown as ERROR)
	}

	/**
	 * @description reset all state and clear all props
	 */
	protected resetState(): void {
		this.state.clear();
	}
	
	/**
	 * @description reset start a new state
	 */
		protected startState(): void {
			this.state.clear();
	}

	/**
	 *
	 * @returns a result on check all props on state.
	 */
	protected checkState(): Result<unknown, ERROR> {
		return ChangesObserver.init(this.getState()).getResult();
	}
}
export abstract class FactoryMethod<TARGET, RESULT, ERROR = string> {
	/**
	 * Method to be implemented
	 */
	protected abstract create(): TMapper<TARGET, RESULT, ERROR>;

	/**
	 *
	 * @param domain as aggregate or entity
	 * @returns a result of model
	 */
	public map (domain: TARGET): Result<RESULT, ERROR> {
		const mapper = this.create();
		return mapper.map(domain);
	};
}

export { IMapper };
