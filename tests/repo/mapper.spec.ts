import Result from '../../lib/core/result';
import { IMapper, IMapper2, IMapper3, Mapper, FactoryMapper2, FactoryMapper3 } from '../../lib/repo/mapper.interface';
import ValueObject from '../../lib/core/value-object';
import DomainId from '../../lib/core/domain-id';
import { BaseDomainEntity, Entity, ShortDomainId } from '../../lib';

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
			// must have less than 50 character
			if (name.length > 50) {
				return Result.fail<NameValueObject>('Name too long');
			}

			return Result.ok<NameValueObject>(
				new NameValueObject({ value: name })
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
			if (age > 130 || age < 0) {
				return Result.fail<AgeValueObject>('Invalid age for a person');
			}
			return Result.ok<AgeValueObject>(
				new AgeValueObject({ value: age })
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
			return UserEntity.create({
				ID: DomainId.create('valid_uuid'),
				age: AgeValueObject.create(target.age).getResult(),
				name: NameValueObject.create(target.name).getResult(),
				createdAt: target.createdAt,
				deletedAt: target.deletedAt,
				isDeleted: target.isDeleted,
				updatedAt: target.updatedAt,
			}).getResult();
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
		// Mapper2
		class UserMapper2 extends Mapper<UserProps> implements IMapper3<UserSchema, UserEntity> {

			convert( target: UserSchema ): Result<UserEntity, string> {
				this.resetState();
				this.addState( 'name', NameValueObject.create( target.name ) );
				this.addState( 'age', AgeValueObject.create( target.age ) );

				const stateResult = this.checkState();
				if ( stateResult.isFailure ) {
					return Result.fail( stateResult.error );
				}

				return UserEntity.create( {
					ID: ShortDomainId.create(),
					age: this.getStateByKey<AgeValueObject>( 'age' ).getResult(),
					name: this.getStateByKey<NameValueObject>('name').getResult()
				})

			};

		}
	//-------------------------------------------------------------------
	// base mapper

	class BaseMapper extends Mapper<UserSchema> { 

		GET_STATE () {
			return this.getState();
		}

		ADD_STATE ( age: number ) {
			this.addState<AgeValueObject>('age', AgeValueObject.create(age))
		}

		CLEAR_STATE () {
			this.resetState();
		}

		GET_BY_KEY (key: keyof UserSchema) {
			return this.getStateByKey<AgeValueObject>( key );
		}

		CHECK_STATE () {
			return this.checkState();
		}

		GET_QUANTITY () {
			return this.getSize();
		}
	};
	
	//-------------------------------------------------------------------
	// factory method

	interface Dto {
		id: string;
		name: string;
		age: number;
	}

	// Mapper concrete implementation: Implement IMapper2 or IMapper3
	// param: Dto > use case default params;
	// param: UserEntity > Domain Entity: Aggregate or Entity
	// param: schema > Persistence model: the interface that represents database model
	// param: string > the error value to be returned if occurs some conflict
	class MapperImplementation implements IMapper2<Dto, UserEntity, UserSchema, string> {

		dtoToDomain ( dto: Dto ): Result<UserEntity, string> {
			return UserEntity.create( {
				ID: ShortDomainId.create(),
				age: AgeValueObject.create( dto.age ).getResult(),
				name: NameValueObject.create(dto.name).getResult()
			})
		}

		modelToDomain ( model: UserSchema): Result<UserEntity, string> {
			return UserEntity.create( {
				ID: ShortDomainId.create(),
				age: AgeValueObject.create( model.age ).getResult(),
				name: NameValueObject.create(model.name).getResult()
			})
		}

		domainToModel ( domain: UserEntity ): UserSchema {
			return {
				id: domain.id.uid,
				age: domain.age.value,
				name: domain.name.value,
				createdAt: domain.createdAt,
				updatedAt: domain.updatedAt,
				isDeleted: domain.isDeleted
			}
		}
	}

	// Mapper creator: Factory to create a mapper instance
	class UserMapperCreator extends FactoryMapper2<Dto, UserEntity, UserSchema, string> {
		protected create (): IMapper2<Dto, UserEntity, UserSchema, string> {
			return new MapperImplementation();
		}
	}
	
	// Client code, this function receives a factory and returns a domain entity
	const CreateEntity = <DTO, ENTITY, SCHEMA, ERROR> ( factory: FactoryMapper2<DTO, ENTITY, SCHEMA, ERROR>, dto: DTO ) => {
		return factory.dtoToDomain( dto );
	}

	//-------------------------------------------------------------------
	// simple mapper converter

	class SimpleMapper implements IMapper3<Dto, UserEntity> {
		convert ( target: Dto ) : Result<UserEntity, string>{
			return UserEntity.create( {
				ID: ShortDomainId.create( target.id ),
				age: AgeValueObject.create( target.age ).getResult(),
				name: NameValueObject.create(target.name).getResult()
			})
		};
	}

	class SimpleMapperCreator extends FactoryMapper3<Dto, UserEntity> {
		protected create(): IMapper3<Dto, UserEntity, string> {
			return new SimpleMapper();
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
		const domain: UserEntity = UserEntity.create({
			ID: DomainId.create('valid_uuid'),
			age: AgeValueObject.create(21).getResult(),
			createdAt: new Date(),
			isDeleted: false,
			name: NameValueObject.create('John Stuart').getResult(),
			updatedAt: new Date(),
			deletedAt: undefined,
		}).getResult();

		const mapper = new UserMapper();

		const persistence = mapper.toPersistence(domain);
		expect(persistence.age).toBe(21);
		expect(persistence.name).toBe('John Stuart');
		expect(persistence.id).toBe('valid_uuid');
		expect(persistence.isDeleted).toBe(false);
	} );
	
	it( 'should create a valid user with mapper2', () => {
		const mapper = new UserMapper2();

		const entity = mapper.convert( {
			id: ShortDomainId.create().uid,
			age: 21,
			createdAt: new Date(),
			isDeleted: false,
			name: 'valid name',
			updatedAt: new Date()
		} )
		
		expect( entity.isSuccess ).toBeTruthy();
		expect( entity.getResult().age.value ).toBe(21);
		expect( entity.getResult().name.value ).toBe('valid name');
	} )
	
	it( 'should fail if provide an invalid value', () => {
		const mapper = new UserMapper2();

		const entity = mapper.convert( {
			id: ShortDomainId.create().uid,
			age: 21,
			createdAt: new Date(),
			isDeleted: false,
			name: 'long_invalid_name_length'.repeat( 5 ),
			updatedAt: new Date()
		} )
		
		expect( entity.isFailure ).toBeTruthy();
	} );

	it( 'should start with 0 state and add one', () => {
		const baseMapper = new BaseMapper();
		expect( baseMapper.GET_QUANTITY() ).toBe( 0 );
		baseMapper.ADD_STATE( 18 );
		expect( baseMapper.GET_QUANTITY() ).toBe( 1 );
	} )
	
	it( 'should clear state', () => {
		const baseMapper = new BaseMapper();
		baseMapper.ADD_STATE( 18 );
		expect( baseMapper.GET_QUANTITY() ).toBe( 1 );
		baseMapper.CLEAR_STATE();
		expect( baseMapper.GET_QUANTITY() ).toBe( 0 );
	} )
	
	it( 'should check state', () => {
		const baseMapper = new BaseMapper();
		baseMapper.ADD_STATE( 18 );
		expect( baseMapper.CHECK_STATE().isSuccess).toBeTruthy( );
	} )
	
	it( 'should check state', () => {
		const baseMapper = new BaseMapper();
		baseMapper.ADD_STATE( 1800 );
		expect(baseMapper.CHECK_STATE().isFailure).toBeTruthy( );
	} )
	
	it( 'should get state by key', () => {
		const baseMapper = new BaseMapper();
		baseMapper.ADD_STATE( 18 );
		const state = baseMapper.GET_BY_KEY( 'age' );
		expect( state.getResult().value ).toBe( 18 );
	} )
	
	it( 'should implement factory method mapper', () => {
		const entity = CreateEntity( new UserMapperCreator(), {
			id: 'valid_id',
			age: 21,
			name: 'valid_name'
		} );

		expect( entity.getResult() ).toBeInstanceOf( UserEntity );
	} );

	it( 'should build a model with static method on entity', () => {

		const domainEntity = UserEntity.create( {
			ID: ShortDomainId.create(),
			age: AgeValueObject.create( 18 ).getResult(),
			name: NameValueObject.create( 'valid_name' ).getResult()
		} ).getResult();

		const model = UserEntity.buildToModel( domainEntity, new UserMapperCreator() );
		expect( model ).toBeDefined();
		expect( model.name ).toBe( 'valid_name' );
		expect( model.age ).toBe(18);
	} );

	it( 'should build a domain entity with static method on entity from model', () => {

		const model: UserSchema = {
			id: 'valid_id',
			age: 18,
			updatedAt: new Date(),
			createdAt: new Date(),
			isDeleted: false,
			name: 'valid_name'
		}

		const result = UserEntity.buildFromModel( model, new UserMapperCreator() );
		expect( result.isSuccess ).toBeTruthy();
		expect( result.getResult().age.value ).toBe( 18 )
		expect( result.getResult().name.value ).toBe( 'valid_name' )
	} );

	it( 'should build a domain entity with static method on entity from dto', () => {

		const dto: Dto = {
			id: 'valid_id',
			age: 18,
			name: 'valid_name'
		}

		const result = UserEntity.buildFromDto( dto, new UserMapperCreator() );
		expect( result.isSuccess ).toBeTruthy();
		expect( result.getResult().age.value ).toBe( 18 )
		expect( result.getResult().name.value ).toBe( 'valid_name' )
	} );

	it( 'should convert a model to domain entity using a simple mapper creator', () => {
		const simpleMapper = new SimpleMapperCreator();
		const entity = simpleMapper.convert( {
			id: 'valid_id',
			name: 'valid_name',
			age: 21,
		} );

		expect( entity ).toBeDefined();
		expect( entity.isSuccess ).toBeTruthy();
		expect( entity.getResult().name.value ).toBe('valid_name');
		expect( entity.getResult().age.value ).toBe(21);
		expect( entity.getResult().id.uid ).toBe('valid_id');
	})
});
