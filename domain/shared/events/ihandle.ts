/* eslint-disable  */
import { IDomainEvent } from './idomain-event';

export interface IHandle<IDomainEvent> {
     setupSubscriptions(): void;
}
