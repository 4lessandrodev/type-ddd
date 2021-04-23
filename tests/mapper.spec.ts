import BaseDomainEntity from '../src/core/base-domain-entity';
import Entity from '../src/core/entity';
import Result from '../src/core/result';
import UniqueEntityID from '../src/core/unique-entity-id';
import { IMapper } from '../src/repo/mapper.interface';
import ValueObject from '../src/core/value-object';
import DomainId from '../src/core/domain-id';

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
     // User Enity props
     interface UserProps extends BaseDomainEntity {
          name: NameValueObject;
          age: AgeValueObject;
     }
     //-------------------------------------------------------------------
     // User Entity
     class UserEntity extends Entity<UserProps> {
          private constructor(props: UserProps, id?: UniqueEntityID) {
               super(props, id);
          }

          get id(): UniqueEntityID {
               return this._id;
          }

          get age(): AgeValueObject {
               return this.props.age;
          }

          get name(): NameValueObject {
               return this.props.name;
          }

          public static create(
               props: UserProps,
               id?: UniqueEntityID,
          ): Result<UserEntity> {
               return Result.ok<UserEntity>(new UserEntity(props, id));
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
     // User mapper has responsability to convert an object from domain to persistence
     class UserMapper implements IMapper<UserEntity, UserSchema> {
          //
          toDomain(target: UserSchema): UserEntity {
               return UserEntity.create(
                    {
                         age: AgeValueObject.create(target.age).getResult(),
                         name: NameValueObject.create(target.name).getResult(),
                         createdAt: target.createdAt,
                         deletedAt: target.deletedAt,
                         isDeleted: target.isDeleted,
                         updatedAt: target.updatedAt,
                    },
                    DomainId.create(target.id).id,
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
                    age: AgeValueObject.create(21).getResult(),
                    createdAt: new Date(),
                    isDeleted: false,
                    name: NameValueObject.create('John Stuart').getResult(),
                    updatedAt: new Date(),
                    deletedAt: undefined,
               },
               DomainId.create('valid_uuid').id,
          ).getResult();

          const mapper = new UserMapper();

          const persistence = mapper.toPersistence(domain);
          expect(persistence.age).toBe(21);
          expect(persistence.name).toBe('John Stuart');
          expect(persistence.id).toBe('valid_uuid');
          expect(persistence.isDeleted).toBe(false);
     });
});
