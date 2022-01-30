// import DomainEvents from './events/domain-events';
import IDomainEvent from './events/domain-event.interface';
import Logger from '../utils/logger.util';
import BaseDomainEntity from './base-domain-entity';
import DomainId from './domain-id';
import UniqueEntityID from './unique-entity-id';
import { FactoryMethod, TMapper } from '../repo/mapper.interface';
import Result from './result';
import { ValueObject } from "../core/value-object";
import ShortDomainId from './short-domain-id';

enum ValidTypes {
	'undefined' = 'undefined',
	'symbol' = 'symbol',
	'bigint' = 'bigint',
	'boolean' = 'boolean',
	'function' = 'function',
	'number' = 'number',
	'object' = 'object',
	'string' = 'string',
	'null' = 'null'
}

type Type = keyof typeof ValidTypes;
type CustomType = any;

export interface BaseModelProps {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

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

interface DefaultProps extends Partial<BaseDomainEntity> {
	ID: undefined,
	id: string;
}

export const convertEntity = <T extends DefaultProps> ( target: T ): any => {
	let object: DefaultProps = {
		ID: undefined as any,
		id: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: undefined,
		isDeleted: false,
	};

	const keys = Object.keys( target?.['props'] );

	keys.forEach( ( key ) => {

		const subTarget = target?.[key];

		const isId = subTarget instanceof DomainId || subTarget instanceof ShortDomainId;

		if ( isId ) {
			object = Object.assign( {}, { ...object }, { [key]: subTarget?.uid } );
		}

		const isEntityOrAggregate = subTarget?.id !== undefined;
		
		if ( isEntityOrAggregate ) {
			const subKeys = convertEntity( subTarget as any );
			object = Object.assign( {}, { ...object }, { [key]: { ...subKeys } } );
		}

		const isArray = Array.isArray( subTarget );
		
		if ( isArray ) {

			if ( subTarget.length > 0 ) {
				const firstElement = subTarget[0]
	
				const isEntityOrAggregate = firstElement instanceof Entity || firstElement instanceof AggregateRoot;

				if ( isEntityOrAggregate ) {
					
					const subKeys = subTarget.map( ( obj ) => convertEntity( obj ) );
					object = Object.assign( {}, { ...object }, { [key]: subKeys } );

				} else if ( firstElement instanceof ValueObject ) {
					
					if ( firstElement instanceof DomainId || ShortDomainId ) {
						const subKeys = subTarget.map( ( obj ) => obj?.uid);
						object = Object.assign( {}, { ...object }, { [key]: subKeys } );

					} else {
						const subKeys = subTarget.map( ( obj ) => obj?.toObject());
						object = Object.assign( {}, { ...object }, { [key]: subKeys } );
					}

				} else {

					object = Object.assign( {}, { ...object }, { [key]: subTarget } );

				}
			} else {
				object = Object.assign( {}, { ...object }, { [key]: subTarget } );
			}
		}

		
		if ( key !== 'ID' ) {
			const keys = Object.keys( object );
			const values = Object.values( object );
			
			if ( typeof subTarget?.toObject === 'function' ) {
				object = Object.assign( {}, { ...object }, { [key]: subTarget?.toObject() } );
			} else {
				object = Object.assign( {}, { ...object }, { [key]: subTarget?.value } );
			}
			
			keys.forEach( ( k , i) => {
				Object.assign( object, { [k]: values[i] } );
			})
		}
	} );
	
	object.id = String( target?.id );
	delete object.ID;
	object.createdAt = target?.createdAt ?? new Date();
	object.updatedAt = target?.updatedAt ?? new Date();
	object.deletedAt = target?.deletedAt as any;
	object.isDeleted = target?.isDeleted;
	return object;
}


export const autoConvertDomainToObject = <T, D>(target: T): Readonly<D> => {
	if ( target instanceof Entity || target instanceof AggregateRoot) {
		const obj = convertEntity( target as any );
		return obj as D;
	}
	
	if ( target instanceof ValueObject ) {
		let valueObj = {};

		const isId = target instanceof DomainId || target instanceof ShortDomainId;

		if ( isId ) {
			return target?.uid as unknown as D;
		}

		const keys = Object.keys( target?.['props'] );

		if ( keys.length > 1 ) {

			valueObj = Object.assign( {}, { ...valueObj }, { ...target?.['props'] } );

			return valueObj as D;
		}

		valueObj = target?.[keys[0]];
		return valueObj as D;
	}
	return target as unknown as D;
}


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
	constructor ( props: T, entityName: string ) {
		this._id = props.ID;
		this.props = props;
		this.entityName = entityName;
	}
	/**
	 * @returns Date
	 */
	get createdAt (): Date {
		return this.props.createdAt ?? new Date();
	}

	/**
	 * @returns DomainId
	 */
	get id (): DomainId {
		return this._id;
	}

	/**
	 * @description combination of ClassName and instance id.shortUid
	 * @returns hash code `[ClassName]`:`[id.shortUid]`
	 */
	getHashCode (): UniqueEntityID {
		const name = `@${this.entityName}`;
		return new UniqueEntityID( `${name}:${this._id.uid}` );
	}

	/**
	 * @returns Date
	 */
	get updatedAt (): Date {
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
			 * @param type `undefined` `symbol` `bigint` `boolean` `function` `number` `object` `string` or `null` as string
			 * @returns boolean. true if some value has type provided
			 */
			isSome: ( type: Type ): boolean => {

				if ( type === 'null' ) {
					const results = keys.map( ( key ) => this.props[key as KEY] !== null );
					return results.includes( false );
				}
				const results = keys.map( ( key ) => typeof this.props[key as KEY] !== type );
				return results.includes( false );
			},
			/**
			 * 
			 * @param type `undefined` `symbol` `bigint` `boolean` `function` `number` `object` `string` or `null` as string
			 * @returns boolean. true if all value has type provided
			 */
			isAll: ( type: Type ): boolean => {
				const results = keys.map( ( key ) => typeof this.props[key as KEY] !== type );
				return !results.includes( true );
			},
			/**
			 * 
			 * @param prop ValueObject or Entity class
			 * @returns boolean. true if all values is instance of provided class
			 */
			isInstanceOf: ( prop: any ): boolean => {
				const results = keys.map( ( key ) => this.props[key as KEY] instanceof prop );
				return !results.includes( false );
			},
			/**
			 * 
			 * @param customTypes any type you need validate
			 * @returns boolean if type is equal returns true and false if not.
			 */
			hasSomeTypes: ( customTypes: CustomType[] | Type[] ): boolean => {

				const results: boolean[] = [];

				customTypes.forEach( ( customType ) => {

					if ( customType in ValidTypes ) {

						if ( customType === 'null' ) {
							
							const typeValidationResult = keys
								.map( ( key ) => this.props[key as KEY] !== null );
							results.push( ...typeValidationResult );

						} else {
							const typeValidationResult = keys
								.map( ( key ) => typeof this.props[key as KEY] !== customType );
							results.push( ...typeValidationResult );
						}

					} else {
						const typeValidationResult = keys
							.map( ( key ) => this.props[key as KEY] !== customType );
						results.push( ...typeValidationResult );
					}

				} )

				return results.includes( false );
			}
		}
	}

	/**
	 * @returns Boolean
	 */
	get isDeleted (): boolean {
		return this.props.isDeleted ?? false;
	}

	/**
	 * @returns Date or Undefined
	 */
	get deletedAt (): Date | undefined {
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
	): Result<RESULT, ERROR> {
		return factory.map( target )
	}

	/**
	 * 
	 * @description param T as persistence model
	 * @param mapper as implementation of TMapper OR FactoryMethod
	 * @returns a instance of T
	 * 
	 * @requires
	 * Entity getters must have the same name defined on props
	 * 
	 * @summary
	 * If you do not provide a custom mapper the instance will use `auto-mapper` It is on beta
	 * @version beta
	 */
	toObject<D = T & BaseModelProps, E = string> ( mapper?: TMapper<this, D, E> | FactoryMethod<this, D, E> ): D extends T ? Readonly<Omit<{ [K in keyof D]: any }, 'ID'>> : D {
		if ( mapper ) {
			return mapper.map( this ).getResult() as D extends T ? Readonly<Omit<{ [K in keyof D]: any }, 'ID'>> : D;
		}
		return autoConvertDomainToObject<this, D>( this ) as D extends T ? Readonly<Omit<{ [K in keyof D]: any }, 'ID'>> : D;
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
