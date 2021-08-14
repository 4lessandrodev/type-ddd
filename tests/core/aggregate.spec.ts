import UniqueEntityID from '../../src/core/unique-entity-id';
import Result from '../../src/core/result';
import DomainId from '../../src/core/domain-id';
import IDomainEvent from '../../src/core/events/domain-event.interface';
import IHandle from '../../src/core/events/handle.interface';
import DomainEvents from '../../src/core/events/domain-events';
import Logger from '../../src/utils/logger.util';
import { AggregateRoot, BaseDomainEntity } from '../../src';

describe('aggregate', () => {
	 //
	 // Base interface props
	 //-----------------------------------------------------------
	 interface UserProps extends BaseDomainEntity {
		 ID: DomainId;
		 name: string;
	 }
	 // Define User Aggregate
	 //-----------------------------------------------------------
	 class UserAggregate extends AggregateRoot<UserProps> {
		  private constructor(props: UserProps) {
			   super(props, UserAggregate.name);
		  }

		  get name(): string {
			   return this.props.name;
		  }

		  public addEvent(domainEvent: IDomainEvent) {
			   this.addDomainEvent(domainEvent);
		  }

		  public static create(props: UserProps): Result<UserAggregate> {
			  const {ID, name} = props;
			   return Result.ok<UserAggregate>(new UserAggregate({ ID, name }));
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
			   return this.user.id.value;
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
		  async dispatch(_event: UserCreatedEvent): Promise<void> {
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
		  const user = UserAggregate.create({ID: DomainId.create(), name: 'username'});
		  expect(user.isSuccess).toBe(true);
	 });

	 it('should create a new aggregate instance with new uuid', () => {
		 const user = UserAggregate.create({ID: DomainId.create(), name: 'username'});
		  expect(user.getResult().id).toBeDefined();
	 });

	 it('should create a new aggregate instance with name', () => {
		 const user = UserAggregate.create({ID: DomainId.create(), name: 'username'});
		  expect(user.getResult().name).toBe('username');
	 });

	 it('should create a new aggregate instance with provided id', () => {
		  // Generate a domain id
		  const ID = DomainId.create('valid_uuid');

		 const user = UserAggregate.create({ID, name: 'username'});
		  expect(user.getResult().id.toValue()).toBe('valid_uuid');
	 });

	 it('should add a new domain event on aggregate and dispatch it', async () => {
		  // Create user aggregate instance
		  const user = UserAggregate.create({ID: DomainId.create(), name: 'username'}).getResult();

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
		  DomainEvents.dispatchEventsForAggregate(user.id.value);

		  expect(user.domainEvents.length).toBe(0);
	 });

	 it('should get hashCode', () => {
		const user = UserAggregate.create({ID: DomainId.create('bd2ad9fa-864d-4962-a7d5-dbb0f9c0ed69'), name: 'username'});
		 expect(user.getResult().getHashCode().toString()).toBe('@UserAggregate:bd2ad9fa-864d-4962-a7d5-dbb0f9c0ed69');
	});
});