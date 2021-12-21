import { Result } from "../core/result";
import { ChangesObserver } from '../core/changes-observer';
const OBJ = {};
type GENERIC = typeof OBJ;

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
 * @description a simple interface that determines 3 methods
 * @method dtoToDomain
 * @method modelToDomain
 * @method domainToModel
 */
export interface IMapper2<DTO = GENERIC, AGGREGATE = GENERIC, MODEL = GENERIC, ERROR = string> {
	dtoToDomain: (dto: DTO) => Result<AGGREGATE, ERROR>;
	modelToDomain: (model: MODEL) => Result<AGGREGATE, ERROR>;
	domainToModel: (domain: AGGREGATE) => MODEL;
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
export abstract class Mapper<PROPS = GENERIC, ERROR = string> {
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
	 * @param label a key of PROPS defined as GENERIC
	 * @param value a result of instance defined on generic type
	 */
	protected addState<VO>(label: keyof PROPS, value: Result<VO, ERROR>): void {
		this.state.delete(label);
		this.state.set(label, value);
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
	 * @param label a key of props defined on PROPS generic type
	 * @returns a Result of instance defined as generic type by VO
	 */
	protected getStateByKey<VO = GENERIC>(label: keyof PROPS): Result<VO, ERROR> {
		return this.state.get(label) as Result<VO, ERROR>;
	}

	/**
	 * @description reset all state and clear all props
	 */
	protected resetState(): void {
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

/**
 * @description A abstract factory
 * @method dtoToDomain
 * @method modelToDomain
 * @method domainToModel
 * 
 * @summary You must implement the create method
 * 
 * @template
 * abstract create(): IMapper2<DTO, AGGREGATE, MODEL, ERROR>;
 */
export abstract class FactoryMapper2<DTO = GENERIC, AGGREGATE = GENERIC, MODEL = GENERIC, ERROR = string> {
	/**
	 * Method to be implemented
	 */
	protected abstract create(): IMapper2<DTO, AGGREGATE, MODEL, ERROR>;

	/**
	 *
	 * @param dto as props
	 * @returns a result with aggregate instance
	 */
	public dtoToDomain(dto: DTO): Result<AGGREGATE, ERROR> {
		const mapper = this.create();
		return mapper.dtoToDomain(dto);
	}

	/**
	 *
	 * @param model instance as persistence class
	 * @returns a result of aggregate
	 */
	public modelToDomain (model: MODEL): Result<AGGREGATE, ERROR> {
		const mapper = this.create();
		return mapper.modelToDomain(model);
	};

	/**
	 *
	 * @param domain as aggregate or entity
	 * @returns a result of model
	 */
	public domainToModel (domain: AGGREGATE): MODEL {
		const mapper = this.create();
		return mapper.domainToModel(domain);
	};
}

/**
 * @description a simple interface that determines 1 methods
 * @param TARGET what you will receive as param on convert method.
 * @param RESULT the convert result to be returned
 * @method convert
 */
 export interface IMapper3<TARGET = GENERIC, RESULT = GENERIC, ERROR = string> {
	convert: (target: TARGET) => Result<RESULT, ERROR>;
}

/**
 * @description A abstract factory
 * @method convert
 */
 export abstract class FactoryMapper3<TARGET = GENERIC, RESULT = GENERIC, ERROR = string> {
	protected abstract create(): IMapper3<TARGET, RESULT, ERROR>;

	/**
	 *
	 * @param target as props
	 * @returns a result with target instance
	 */
	public convert(target: TARGET): Result<RESULT, ERROR> {
		const mapper = this.create();
		return mapper.convert(target);
	}
}

export { IMapper };
