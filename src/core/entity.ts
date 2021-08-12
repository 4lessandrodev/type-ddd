import DomainEvents from './events/domain-events';
import IDomainEvent from './events/domain-event.interface';
import Logger from '../utils/logger.util';
import { BaseDomainEntity, DomainId, UniqueEntityID } from '..';


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
	private readonly entityName: string | undefined;
	
	constructor(props: T, entityName?: string) {
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
			return this._id
		}
		
		/**
		 * 
		 * @returns hash code [ClassName]:[id]
		 */
		getHashCode(): UniqueEntityID {
			const name = this.entityName ? `@${this.entityName}` : '@Entity';
			return new UniqueEntityID(`${name}:${this._id.toString()}`);
	}
	
	/**
	 * @returns Date
	 */
	get updatedAt(): Date {
		return this.props.updatedAt ?? new Date();
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
 * T referes to Props
 *
 * This class receive props from implementation
 */
 export default abstract class AggregateRoot<T extends BaseDomainEntity> extends Entity<T> {

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
		   Logger.info(`[Domain Event Created]: ${thisClass?.constructor.name} => ${domainEventClass?.constructor.name}`);
   }
}

export { Entity, AggregateRoot };
