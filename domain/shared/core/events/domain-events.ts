import AggregateRoot from '../aggregate-root';
import UniqueEntityID from '../unique-entity-id';
import IDomainEvent from './domain-event.interface';
export default class DomainEvents {
     private static handlersMap: any = {};
     private static markedAggregates: AggregateRoot<any>[] = [];

     /**
      * @method markAggregateForDispatch
      * @static
      * @desc Called by aggregate root objects that have created domain
      * events to eventually be dispatched when the infrastructure commits
      * the unit of work.
      */

     public static markAggregateForDispatch(
          aggregate: AggregateRoot<any>,
     ): void {
          const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

          if (!aggregateFound) {
               this.markedAggregates.push(aggregate);
          }
     }

     private static dispatchAggregateEvents(
          aggregate: AggregateRoot<any>,
     ): void {
          this.logDomainEventDispatch(aggregate);

          aggregate.domainEvents.forEach((event: IDomainEvent) =>
               this.dispatch(event),
          );
     }

     private static logDomainEventDispatch(
          aggregate: AggregateRoot<any>,
     ): void {
          const thisClass = Reflect.getPrototypeOf(this);
          const domainEventClass = Reflect.getPrototypeOf(aggregate);

          console.info(
               '[Domain Event Dispatched]:',
               thisClass?.constructor.name,
               '==>',
               domainEventClass?.constructor.name,
          );
     }
     private static removeAggregateFromMarkedDispatchList(
          aggregate: AggregateRoot<any>,
     ): void {
          // console.log('removing aggreagete from marked', JSON.stringify(aggregate));
          const index = this.markedAggregates.findIndex((a) =>
               a.equals(aggregate),
          );
          this.markedAggregates.splice(index, 1);
     }

     private static findMarkedAggregateByID(
          id: UniqueEntityID,
     ): AggregateRoot<any> | null {
          let found = null;
          for (const aggregate of this.markedAggregates) {
               if (aggregate.id.equals(id)) {
                    found = aggregate;
               }
          }

          return found;
     }

     public static dispatchEventsForAggregate(id: UniqueEntityID): void {
          const aggregate = this.findMarkedAggregateByID(id);

          if (aggregate) {
               this.dispatchAggregateEvents(aggregate);
               aggregate.clearEvents();
               this.removeAggregateFromMarkedDispatchList(aggregate);
          }
     }

     public static register(
          callback: (event: IDomainEvent) => void,
          eventClassName: string,
     ): void {
          if (!this.handlersMap.hasOwnProperty(eventClassName)) {
               this.handlersMap[eventClassName] = [];
          }
          this.handlersMap[eventClassName].push(callback);
     }

     public static clearHandlers(): void {
          this.handlersMap = {};
     }

     public static clearMarkedAggregates(): void {
          this.markedAggregates = [];
     }

     private static dispatch(event: IDomainEvent): void {
          const eventClassName: string = event.constructor.name;

          if (this.handlersMap.hasOwnProperty(eventClassName)) {
               const handlers: any[] = this.handlersMap[eventClassName];
               for (const handler of handlers) {
                    handler(event);
               }
          }
     }
}

export { DomainEvents };
