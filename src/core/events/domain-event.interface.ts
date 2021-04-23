import UniqueEntityID from '../unique-entity-id';

/**
 * @property dateTimeOccurred: Date;
 * @property getAggregateId(): UniqueEntityID;
 *
 * `UniqueEntityID` refer to Aggregate Id
 */
export default interface IDomainEvent {
     dateTimeOccurred: Date;
     getAggregateId(): UniqueEntityID;
}

export { IDomainEvent };
