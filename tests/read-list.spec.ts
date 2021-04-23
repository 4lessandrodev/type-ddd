import Entity from '../src/core/entity';
import UniqueEntityID from '../src/core/unique-entity-id';
import WriteList from '../src/core/write-list';
import ReadList from '../src/core/read-list';
import BaseDomainEntity from '../src/core/base-domain-entity';

describe('read-list', () => {
     //
     //---------------------------------------------------
     //Implement write list
     class GradesList extends WriteList<number> {
          private constructor(values?: number[]) {
               super(values);
          }

          compareItems(a: number, b: number): boolean {
               return a === b;
          }

          public static create(values?: number[]): GradesList {
               return new GradesList(values ?? []);
          }
     }
     //---------------------------------------------------

     //
     interface UserProps extends BaseDomainEntity {
          name: string;
          grades: GradesList;
     }

     class User extends Entity<UserProps> {
          private constructor(props: UserProps, id?: UniqueEntityID) {
               super(props, id);
          }

          // On get method return a ReadList and it is readOnly
          get grades(): ReadList<number> {
               return this.props.grades;
          }

          public static create(props: UserProps, id?: UniqueEntityID): User {
               return new User(props, id);
          }
     }

     it('should toThrow if try edit a read list', () => {
          const user = User.create({
               grades: GradesList.create([7, 8, 6]),
               name: 'John',
          });

          const validate = {
               // @ts-expect-error
               addMany: user.grades.addMany,
               // @ts-expect-error
               remove: user.grades.remove,
               // @ts-expect-error
               add: user.grades.add,
               // @ts-expect-error
               removeMany: user.grades.removeMany,
          };

          const failAdd = () => validate.add();
          const failAddMany = () => validate.add();
          const failRemove = () => validate.add();
          const failRemoveMany = () => validate.add();

          expect(failAdd).toThrow();
          expect(failAddMany).toThrow();
          expect(failRemove).toThrow();
          expect(failRemoveMany).toThrow();
     });
});
