import { UniqueEntityID } from '../index';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
