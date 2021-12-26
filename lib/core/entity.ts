// import DomainEvents from './events/domain-events';
import IDomainEvent from './events/domain-event.interface';
import Logger from '../utils/logger.util';
import BaseDomainEntity from './base-domain-entity';
import DomainId from './domain-id';
import UniqueEntityID from './unique-entity-id';
import { FactoryMethod, TMapper } from '../repo/mapper.interface';
import Result from './result';

type Type = 'undefined' | 'symbol' | 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string'

export class DomainEvents {
	private static handlersMap: any = {};
	private static markedAggregates: AggregateRoot<any>[] = [];

	/**
	 * @method markAggregateForDispatch
	 * @static
	 * @desc Called by aggregate root objects that have created domain
	 * events to eventually be dispatched when the infrastructure commits
	 * the unit of work.
	 */
	public static markAggregateForDispatch(
		aggregate: AggregateRoot<any>
	): void {
		const aggregateFound = !!this.findMarkedAggregateByID(
			aggregate.id.value
		);

		if (!aggregateFound) {
			this.markedAggregates.push(aggregate);
		}
	}

	private static dispatchAggregateEvents(
		aggregate: AggregateRoot<any>
	): void {
		this.logDomainEventDispatch(aggregate);

		aggregate.domainEvents.forEach((event: IDomainEvent) =>
			this.dispatch(event)
		);
	}

	private static logDomainEventDispatch(aggregate: AggregateRoot<any>): void {
		const thisClass = Reflect.getPrototypeOf(this);
		const domainEventClass = Reflect.getPrototypeOf(aggregate);

		Logger.info(
			`[Domain Event Dispatched]: ${thisClass?.constructor.name} => ${domainEventClass?.constructor.name}`
		);
	}

	private static removeAggregateFromMarkedDispatchList(
		aggregate: AggregateRoot<any>
	): void {
		// console.log('removing aggregate from marked', JSON.stringify(aggregate));
		const index = this.markedAggregates.findIndex((a) =>
			a.equals(aggregate)
		);
		this.markedAggregates.splice(index, 1);
	}

	private static findMarkedAggregateByID(
		id: UniqueEntityID
	): AggregateRoot<any> | null {
		let found: any = null;
		for (const aggregate of this.markedAggregates) {
			if (aggregate.id.value.equals(id)) {
				found = aggregate;
			}
		}

		return found;
	}

	/**
	 *
	 * @param id `UniqueEntityID` refers to Aggregate Id
	 * It will dispatch all events for aggregate
	 */
	public static dispatchEventsForAggregate(id: UniqueEntityID): void {
		const aggregate = this.findMarkedAggregateByID(id);

		if (aggregate) {
			this.dispatchAggregateEvents(aggregate);
			aggregate.clearEvents();
			this.removeAggregateFromMarkedDispatchList(aggregate);
		}
	}

	/**
	  *
	  * @param callback function to call when dispatch event
	  * @param eventClassName className to identify the event have to call
	  *
	  * @example 
	  * 
	  * class AfterUserCreated implements IHandle<UserCreatedEvent> {
		  constructor() {
			   this.setupSubscriptions();
		  }
		  setupSubscriptions(): void {
			   DomainEvents.register(
					(event) => this.dispatch(Object.assign(event)),
					UserCreatedEvent.name,
			   );
		  }
		  async dispatch(event: UserCreatedEvent): Promise<void> {
			   // Implement your logical code here
			   console.log('LOGIC EXECUTED BY EVENT');
		  }
	 }
	  *
	  */
	public static register(
		callback: (event: IDomainEvent) => void,
		eventClassName: string
	): void {
		if (!this.handlersMap.hasOwnProperty(eventClassName)) {
			this.handlersMap[eventClassName] = [];
		}
		this.handlersMap[eventClassName].push(callback);
	}

	public static clearHandlers(): void {
		this.handlersMap = {};
	}

	public static clearMarkedAggregates(): void {
		this.markedAggregates = [];
	}

	private static dispatch(event: IDomainEvent): void {
		const eventClassName: string = event.constructor.name;

		if (this.handlersMap.hasOwnProperty(eventClassName)) {
			const handlers: any[] = this.handlersMap[eventClassName];
			for (const handler of handlers) {
				handler(event);
			}
		}
	}
}

const isEntity = (v: any): v is Entity<any> => {
	return v instanceof Entity;
};

/**
 * @extends BaseDomainEntity
 * @protected _id: UniqueEntityID
 * @protected props: T
 */
abstract class Entity<T extends BaseDomainEntity> {
	protected readonly _id: DomainId;
	protected readonly props: T;
	private readonly entityName: string;

	/**
	 *
	 * @param props proprieties as T
	 * @param entityName entity name as string
	 */
	constructor(props: T, entityName: string) {
		this._id = props.ID;
		this.props = props;
		this.entityName = entityName;
	}
	/**
	 * @returns Date
	 */
	get createdAt(): Date {
		return this.props.createdAt ?? new Date();
	}

	/**
	 * @returns DomainId
	 */
	get id(): DomainId {
		return this._id;
	}

	/**
	 * @description combination of ClassName and instance id.shortUid
	 * @returns hash code `[ClassName]`:`[id.shortUid]`
	 */
	getHashCode(): UniqueEntityID {
		const name = `@${this.entityName}`;
		return new UniqueEntityID(`${name}:${this._id.uid}`);
	}

	/**
	 * @returns Date
	 */
	get updatedAt(): Date {
		return this.props.updatedAt ?? new Date();
	}

	/**
	 * 
	 * @param keys Array of entity keys
	 * @returns methods to check
	 */
	checkProps ( keys: Array<keyof T> ) {
		type KEY = keyof Object;
		return {
			/**
			 * 
			 * @param type `undefined` `symbol` `bigint` `boolean` `function` `number` `object` `string` as string
			 * @returns boolean. true if some value has type provided
			 */
			isSome: (type: Type): boolean => {
				const results = keys.map( ( key ) => typeof this.props[key as KEY] !== type );
				return results.includes( false );
			},
			/**
			 * 
			 * @param type `undefined` `symbol` `bigint` `boolean` `function` `number` `object` `string` as string
			 * @returns boolean. true if all value has type provided
			 */
			isAll: (type: Type):boolean => {
				const results = keys.map( ( key ) => typeof this.props[key as KEY] !== type );
				return !results.includes( true );
			},
			/**
			 * 
			 * @param prop ValueObject or Entity class
			 * @returns boolean. true if all values is instance of provided class
			 */
			isInstanceOf: (prop: any): boolean => {
				const results = keys.map( ( key ) => this.props[key as KEY] instanceof prop );
				return !results.includes( false );
			}
		}
	}

	/**
	 * @returns Boolean
	 */
	get isDeleted(): boolean {
		return this.props.isDeleted ?? false;
	}

	/**
	 * @returns Date or Undefined
	 */
	get deletedAt(): Date | undefined {
		return this.props.deletedAt;
	}

	/**
	 * 
	 * @param target instance as domain entity or model
	 * @param factory a mapper creator that implements FactoryMethod abstract
	 * @returns a result with entity instance
	 */
	static build<TARGET, RESULT, ERROR = string> (
		target: TARGET, factory: FactoryMethod<TARGET, RESULT, ERROR> | TMapper<TARGET, RESULT, ERROR>
	):Result<RESULT, ERROR> {
		return factory.map(target)
	}

	/**
	 * 
	 * @description param T as persistence model
	 * @param mapper as implementation of TMapper OR FactoryMethod
	 * @returns a instance of T
	 */
	toObject<T, E =string > (mapper: TMapper<this, T, E> | FactoryMethod<this, T, E>): T {
		return mapper.map( this ).getResult();
	}

	/**
	 *
	 * @param object as Entity<T>
	 * @returns boolean
	 */
	public equals(object?: Entity<T>): boolean {
		if (object == null || object == undefined) {
			return false;
		}

		if (this === object) {
			return true;
		}

		if (!isEntity(object)) {
			return false;
		}

		return this._id.equals(object._id);
	}
}

/**
 * @abstract AggregateRoot<T>
 * @extends Entity<T> props
 * @type
 * T refers to Props
 *
 * This class receive props from implementation
 */
export default abstract class AggregateRoot<
	T extends BaseDomainEntity
> extends Entity<T> {
	private _domainEvents: IDomainEvent[] = [];

	get domainEvents(): IDomainEvent[] {
		return this._domainEvents;
	}

	protected addDomainEvent(domainEvent: IDomainEvent): void {
		//	Add the domain event to this aggregate's list of domain events
		this._domainEvents.push(domainEvent);
		//	Add this aggregate instance to the domain event's list of aggregates who's
		//	events it eventually needs to dispatch.

		DomainEvents.markAggregateForDispatch(this);
		//	Log the domain event
		this.logDomainEventAdded(domainEvent);
	}

	public clearEvents(): void {
		this._domainEvents.splice(0, this._domainEvents.length);
	}

	private logDomainEventAdded(domainEvent: IDomainEvent): void {
		const thisClass = Reflect.getPrototypeOf(this);
		const domainEventClass = Reflect.getPrototypeOf(domainEvent);
		Logger.info(
			`[Domain Event Created]: ${thisClass?.constructor.name} => ${domainEventClass?.constructor.name}`
		);
	}
}

export { Entity, AggregateRoot };
