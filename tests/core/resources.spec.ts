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
     const fakeValueF: IBaseRepository<any> = ({} as unknown) as IBaseRepository<any>;
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
