/**
 * @interface IHandle
 * @argument IDomainEvent
 * @method setupSubscriptions(): void;
 * @method dispatch(event: IDomainEvent): Promise<void>;
 */
export default interface IHandle<IDomainEvent> {
     setupSubscriptions(): void;
     dispatch(event: IDomainEvent): Promise<void>;
}

export { IHandle };
