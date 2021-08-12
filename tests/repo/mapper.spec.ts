import Result from '../../src/core/result';
import { IMapper } from '../../src/repo/mapper.interface';
import ValueObject from '../../src/core/value-object';
import DomainId from '../../src/core/domain-id';
import { BaseDomainEntity, Entity } from '../../src';

describe('mapper', () => {
     // Interface for name prop
     //-------------------------------------------------------------------
     interface NameProp {
          value: string;
     }
     //-------------------------------------------------------------------
     // Name Value Object
     class NameValueObject extends ValueObject<NameProp> {
          private constructor(prop: NameProp) {
               super(prop);
          }

          get value(): string {
               return this.props.value;
          }

          public static create(name: string): Result<NameValueObject> {
               // must have less than 120 character
               if (name.length > 120) {
                    return Result.fail<NameValueObject>('Name too long');
               }

               return Result.ok<NameValueObject>(
                    new NameValueObject({ value: name }),
               );
          }
     }
     //-------------------------------------------------------------------
     // Interface for age prop
     interface AgeProp {
          value: number;
     }
     //-------------------------------------------------------------------
     // Age value object
     class AgeValueObject extends ValueObject<AgeProp> {
          private constructor(prop: AgeProp) {
               super(prop);
          }

          get value(): number {
               return this.props.value;
          }

          public static create(age: number): Result<AgeValueObject> {
               // A person must have more than 0 year and less than 130
               if (age > 130 && age < 0) {
                    return Result.fail<AgeValueObject>(
                         'Invalid age for a person',
                    );
               }
               return Result.ok<AgeValueObject>(
                    new AgeValueObject({ value: age }),
               );
          }
     }
     //-------------------------------------------------------------------
     // User Entity props
     interface UserProps extends BaseDomainEntity {
          name: NameValueObject;
          age: AgeValueObject;
     }
     //-------------------------------------------------------------------
     // User Entity
     class UserEntity extends Entity<UserProps> {
          private constructor(props: UserProps) {
               super(props, UserEntity.name);
          }

          get age(): AgeValueObject {
               return this.props.age;
          }

          get name(): NameValueObject {
               return this.props.name;
          }

          public static create(props: UserProps): Result<UserEntity> {
               return Result.ok<UserEntity>(new UserEntity(props));
          }
     }
     //-------------------------------------------------------------------
     // Schema persistence - the way to be saved on database
     interface UserSchema {
          id: string;
          name: string;
          age: number;
          createdAt: Date;
          updatedAt: Date;
          isDeleted: boolean;
          deletedAt?: Date;
     }
     //-------------------------------------------------------------------
     // User mapper has responsibility to convert an object from domain to persistence
     class UserMapper implements IMapper<UserEntity, UserSchema> {
          //
          toDomain(target: UserSchema): UserEntity {
               return UserEntity.create(
                    {
						ID: DomainId.create('valid_uuid'),
                         age: AgeValueObject.create(target.age).getResult(),
                         name: NameValueObject.create(target.name).getResult(),
                         createdAt: target.createdAt,
                         deletedAt: target.deletedAt,
                         isDeleted: target.isDeleted,
                         updatedAt: target.updatedAt,
                    },
               ).getResult();
          }
          //
          toPersistence(target: UserEntity): UserSchema {
               return {
                    id: target.id.toString(),
                    name: target.name.value,
                    age: target.age.value,
                    createdAt: target.createdAt,
                    updatedAt: target.updatedAt,
                    isDeleted: target.isDeleted,
                    deletedAt: target.deletedAt,
               };
          }
     }
     //-------------------------------------------------------------------

     it('should convert from persistence to domain', () => {
          const persistence: UserSchema = {
               age: 20,
               createdAt: new Date(),
               id: 'valid_uuid',
               isDeleted: false,
               name: 'John Stuart',
               updatedAt: new Date(),
               deletedAt: undefined,
          };

          const mapper = new UserMapper();

          const domain = mapper.toDomain(persistence);
          expect(domain.age.value).toBe(20);
          expect(domain.name.value).toBe('John Stuart');
          expect(domain.id.toValue()).toBe('valid_uuid');
          expect(domain.isDeleted).toBe(false);
          expect(domain).toBeInstanceOf(UserEntity);
     });

     it('should convert from domain to persistence', () => {
          const domain: UserEntity = UserEntity.create(
               {
				   ID: DomainId.create('valid_uuid'),
                    age: AgeValueObject.create(21).getResult(),
                    createdAt: new Date(),
                    isDeleted: false,
                    name: NameValueObject.create('John Stuart').getResult(),
                    updatedAt: new Date(),
                    deletedAt: undefined,
               }
          ).getResult();

          const mapper = new UserMapper();

          const persistence = mapper.toPersistence(domain);
          expect(persistence.age).toBe(21);
          expect(persistence.name).toBe('John Stuart');
          expect(persistence.id).toBe('valid_uuid');
          expect(persistence.isDeleted).toBe(false);
     });
});
