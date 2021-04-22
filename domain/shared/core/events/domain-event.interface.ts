import UniqueEntityID from '../unique-entity-id';

export default interface IDomainEvent {
     dateTimeOccurred: Date;
     getAggregateId(): UniqueEntityID;
}

export { IDomainEvent };
