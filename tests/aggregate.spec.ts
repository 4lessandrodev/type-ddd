import AggregateRoot from '../src/core/aggregate-root';
import UniqueEntityID from '../src/core/unique-entity-id';
import Result from '../src/core/result';
import DomainId from '../src/core/domain-id';
import IDomainEvent from '../src/core/events/domain-event.interface';
import IHandle from '../src/core/events/handle.interface';
import DomainEvents from '../src/core/events/domain-events';
import Logger from '../src/utils/logger.util';

describe('aggregate', () => {
	 //
	 // Base interface props
	 //-----------------------------------------------------------
	 interface userProps {
		  name: string;
	 }
	 // Define User Aggregate
	 //-----------------------------------------------------------
	 class UserAggregate extends AggregateRoot<userProps> {
		  private constructor(props: userProps, id?: UniqueEntityID) {
			   super(props, id);
		  }

		  get id(): UniqueEntityID {
			   return this._id;
		  }

		  get name(): string {
			   return this.props.name;
		  }

		  public addEvent(domainEvent: IDomainEvent) {
			   this.addDomainEvent(domainEvent);
		  }

		  public static create(
			   name: string,
			   id?: UniqueEntityID,
		  ): Result<UserAggregate> {
			   return Result.ok<UserAggregate>(new UserAggregate({ name }, id));
		  }
	 }
	 //-----------------------------------------------------------
	 // Create User Aggregate Domain Event
	 class UserCreatedEvent implements IDomainEvent {
		  public dateTimeOccurred: Date;
		  public user: UserAggregate;

		  constructor(user: UserAggregate) {
			   this.dateTimeOccurred = new Date();
			   this.user = user;
		  }

		  getAggregateId(): UniqueEntityID {
			   return this.user.id;
		  }
	 }
	 //-----------------------------------------------------------
	 // Create event action dispatcher
	 class AfterUserCreated implements IHandle<UserCreatedEvent> {
		  constructor() {
			   this.setupSubscriptions();
		  }
		  setupSubscriptions(): void {
			   DomainEvents.register(
					(event) => this.dispatch(Object.assign(event)),
					UserCreatedEvent.name,
			   );
		  }
		  async dispatch(event: UserCreatedEvent): Promise<void> {
			   // Implement your logical code here
			   Logger.info('LOGIC EXECUTED BY EVENT');
		  }
	 }
	 //-----------------------------------------------------------

	 it('should be defined', () => {
		  const user = UserAggregate.create;
		  expect(user).toBeDefined();
	 });

	 it('should create a new aggregate instance', () => {
		  const user = UserAggregate.create('username');
		  expect(user.isSuccess).toBe(true);
	 });

	 it('should create a new aggregate instance with new uuid', () => {
		  const user = UserAggregate.create('username');
		  expect(user.getResult().id).toBeDefined();
	 });

	 it('should create a new aggregate instance with name', () => {
		  const user = UserAggregate.create('username');
		  expect(user.getResult().name).toBe('username');
	 });

	 it('should create a new aggregate instance with provided id', () => {
		  // Generate a domain id
		  const id: UniqueEntityID = DomainId.create('valid_uuid').id;

		  const user = UserAggregate.create('username', id);
		  expect(user.getResult().id.toValue()).toBe('valid_uuid');
	 });

	 it('should add a new domain event on aggregate and dispach it', async () => {
		  // Create user aggregate instance
		  const user = UserAggregate.create('username').getResult();

		  // None domain event on user
		  expect(user.domainEvents.length).toBe(0);

		  // Instantiate the UserCreatedEvent as new domain event
		  const event = new UserCreatedEvent(user);

		  // Add domain event to user
		  user.addEvent(event);

		  expect(user.domainEvents.length).toBe(1);

		  // Instantiate the dispatcher, this is an observer
		  new AfterUserCreated();

		  // dispatch domain event added on aggregate
		  DomainEvents.dispatchEventsForAggregate(user.id);

		  expect(user.domainEvents.length).toBe(0);
	 });
});
