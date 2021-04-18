/* eslint-disable  */
import { IDomainEvent } from './domain-event.interface';

export interface IHandle<IDomainEvent> {
     setupSubscriptions(): void;
}
