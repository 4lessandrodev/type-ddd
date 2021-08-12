import {
	IBaseConnection,
	Filter,
	IList,
	IMapper,
	IUseCase,
	IBaseRepository,
	IDomainEvent,
	IHandle,
	IRepository,
	AggregateRoot,
	BaseRepository,
	DomainEvents,
	DomainId,
	Result,
	UniqueEntityID,
	ValueObject,
	WriteList,
	BaseDomainEntity,
	Entity,
	Identifier,
	ReadList,
	BirthdayValueObject,
	CurrencyValueObject,
	EmailValueObject,
	HEXColorValueObject,
	HomePhoneValueObject,
	Logger,
	MobilePhoneValueObject,
	OrderStatusValueObject,
	PasswordValueObject,
	RGBColorValueObject,
	UserNameValueObject,
	colorConverter,
	colorGenerator,
	passwordGenerator
} from '../../src';

describe('all resources should be defined and available', () => {
	 const fakeValueA: IBaseConnection<
		  any,
		  any
	 > = ({} as unknown) as IBaseConnection<any, any>;
	 const fakeValueB: Filter = ({} as unknown) as Filter;
	 const fakeValueC: IList<any> = ({} as unknown) as IList<any>;
	 const fakeValueD: IMapper<any, any> = ({} as unknown) as IMapper<any, any>;
	 const fakeValueE: IUseCase<any, any> = ({} as unknown) as IUseCase<
		  any,
		  any
	 >;
	 const fakeValueF: IBaseRepository<any, any> = ({} as unknown) as IBaseRepository<any, any>;
	 const fakeValueG: IDomainEvent = ({} as unknown) as IDomainEvent;
	 const fakeValueH: IHandle<any> = ({} as unknown) as IHandle<any>;
	 const fakeValueI: IRepository<
		  any,
		  any,
		  any
	 > = ({} as unknown) as IRepository<any, any, any>;

	 it('resources available', () => {
		  expect(AggregateRoot).toBeDefined();
		  expect(BaseRepository).toBeDefined();
		  expect(DomainEvents).toBeDefined();
		  expect(DomainId).toBeDefined();
		  expect(Result).toBeDefined();
		  expect(UniqueEntityID).toBeDefined();
		  expect(ValueObject).toBeDefined();
		  expect(WriteList).toBeDefined();
		  expect(BaseDomainEntity).toBeDefined();
		  expect(Entity).toBeDefined();
		  expect(Identifier).toBeDefined();
		  expect(ReadList).toBeDefined();
		  expect(BirthdayValueObject).toBeDefined();
		  expect(CurrencyValueObject).toBeDefined();
		  expect(EmailValueObject).toBeDefined();
		  expect(HEXColorValueObject).toBeDefined();
		  expect(HomePhoneValueObject).toBeDefined();
		  expect(Logger).toBeDefined();
		  expect(MobilePhoneValueObject).toBeDefined();
		  expect(OrderStatusValueObject).toBeDefined();
		  expect(PasswordValueObject).toBeDefined();
		  expect(RGBColorValueObject).toBeDefined();
		  expect(UserNameValueObject).toBeDefined();
		  expect(colorConverter).toBeDefined();
		  expect(colorGenerator).toBeDefined();
		  expect(passwordGenerator).toBeDefined();

		  expect(fakeValueA).toBeDefined();
		  expect(fakeValueB).toBeDefined();
		  expect(fakeValueC).toBeDefined();
		  expect(fakeValueD).toBeDefined();
		  expect(fakeValueE).toBeDefined();
		  expect(fakeValueF).toBeDefined();
		  expect(fakeValueG).toBeDefined();
		  expect(fakeValueH).toBeDefined();
		  expect(fakeValueI).toBeDefined();
	 });
});
