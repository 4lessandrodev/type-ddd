import { UniqueEntityID } from '../';

export interface IDomainEvent {
     dateTimeOccurred: Date;
     getAggregateId(): UniqueEntityID;
}
