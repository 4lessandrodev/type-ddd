import { UniqueEntityID } from '../unique-entity-id';

export interface IDomainEvent {
     dateTimeOccurred: Date;
     getAggregateId(): UniqueEntityID;
}
