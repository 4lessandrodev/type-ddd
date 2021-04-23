import IBaseConnection from '../src/repo/base-connection.interface';
import IRepository, {
     BaseRepository,
} from '../src/repo/base-repository.abstract';
import IMapper from '../src/repo/mapper.interface';

describe('respository', () => {
     const ORM = {
          getOne: jest.fn(),
     };

     type typeORM = typeof ORM;

     const Connection: IBaseConnection<any, typeORM> = {
          delete: jest.fn(),
          exists: jest.fn(),
          find: jest.fn(),
          orm: () => ORM,
          save: jest.fn(),
     };

     const Mapper: IMapper<any, any> = {
          toDomain: jest.fn(),
          toPersistence: jest.fn(),
     };

     class Repository
          extends BaseRepository<any, any, typeORM>
          implements IRepository<any, any, typeORM> {
          constructor(
               protected readonly connection: IBaseConnection<any, typeORM>,
               protected readonly mapper: IMapper<any, any>,
          ) {
               super(connection, mapper);
          }
     }

     it('should be defined', () => {
          const repo = new Repository(Connection, Mapper);
          expect(repo).toBeDefined();
     });

     it('should be defined', () => {
          const repo = new Repository(Connection, Mapper);
          expect(repo.delete).toBeDefined();
     });

     it('should be defined', () => {
          const repo = new Repository(Connection, Mapper);
          expect(repo.exists).toBeDefined();
     });

     it('should be defined', () => {
          const repo = new Repository(Connection, Mapper);
          expect(repo.find).toBeDefined();
     });

     it('should be defined', () => {
          const repo = new Repository(Connection, Mapper);
          expect(repo.save).toBeDefined();
     });
});
