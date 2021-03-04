import { IDomainEvent } from '../';

export interface IHandle<IDomainEvent> {
     setupSubscriptions(): void;
}
