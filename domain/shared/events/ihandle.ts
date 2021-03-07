/* eslint-disable  */
import { IDomainEvent } from '../index';

export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}
