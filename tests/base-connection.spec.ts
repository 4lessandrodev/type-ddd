import IBaseConnection from '../src/repo/base-connection.interface';
import Filter from '../src/repo/filter.interface';

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

          async find(filter: Filter): Promise<Target[]> {
               return this.conn.findMany(filter);
          }
          async delete(filter: Filter): Promise<void> {
               return this.conn.delete(filter);
          }
          async exists(filter: Filter): Promise<boolean> {
               const exist = await this.conn.findOne(filter);
               return !!exist;
          }
          async save(target: Target): Promise<void> {
               const exist = await this.conn.findOne(target);
               if (exist) {
                    await this.conn.update(target);
               } else {
                    await this.conn.create(target);
               }
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

     it('orm should define', () => {
          const connection = new Connection(ORM);
          expect(connection.orm).toBeDefined();
     });

     it('save should define', () => {
          const connection = new Connection(ORM);
          expect(connection.save).toBeDefined();
     });
});
