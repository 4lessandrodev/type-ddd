import IBaseConnection from '../../src/repo/base-connection.interface';
import Filter from '../../src/repo/filter.interface';

describe('base-connection', () => {
     const ORM = {
          findMany: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          create: jest.fn(),
          delete: jest.fn(),
     };

     type typeORM = typeof ORM;

     // Create connection class
     //---------------------------------------------------------------------
     class Connection<Target> implements IBaseConnection<Target, typeORM> {
          constructor(private readonly conn: typeORM) {}

          async update(target: Target): Promise<void> {
               await this.conn.update(target);
          }

          async create(target: Target): Promise<void> {
               await this.conn.create(target);
          }

          async find(filter: Filter): Promise<Target[]> {
               return this.conn.findMany(filter);
          }

          async findOne(filter: Filter): Promise<Target> {
               return this.conn.findOne(filter);
          }

          async delete(filter: Filter): Promise<void> {
               return this.conn.delete(filter);
          }

          async exists(filter: Filter): Promise<boolean> {
               const exist = await this.conn.findOne(filter);
               return !!exist;
          }

          orm(): typeORM {
               return this.conn;
          }
     }
     //---------------------------------------------------------------------
     it('instance should define', () => {
          const connection = new Connection(ORM);
          expect(connection).toBeDefined();
     });

     it('delete should define', () => {
          const connection = new Connection(ORM);
          expect(connection.delete).toBeDefined();
     });

     it('exists should define', () => {
          const connection = new Connection(ORM);
          expect(connection.exists).toBeDefined();
     });

     it('find should define', () => {
          const connection = new Connection(ORM);
          expect(connection.find).toBeDefined();
     });

     it('find should define', () => {
          const connection = new Connection(ORM);
          expect(connection.findOne).toBeDefined();
     });

     it('orm should define', () => {
          const connection = new Connection(ORM);
          expect(connection.orm).toBeDefined();
     });

     it('create should define', () => {
          const connection = new Connection(ORM);
          expect(connection.create).toBeDefined();
     });

     it('update should define', () => {
          const connection = new Connection(ORM);
          expect(connection.update).toBeDefined();
     });
});
