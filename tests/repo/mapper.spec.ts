import Result from '../../lib/core/result';
import { IMapper, State, FactoryMethod, TMapper } from '../../lib/repo/mapper.interface';
import ValueObject from '../../lib/core/value-object';
import DomainId from '../../lib/core/domain-id';
import { BaseDomainEntity, Entity, Logger, ShortDomainId } from '../../lib';

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
	class UserDomainEntity extends Entity<UserProps> {
		private constructor(props: UserProps) {
			super(props, UserDomainEntity.name);
		}

		get age(): AgeValueObject {
			return this.props.age;
		}

		get name(): NameValueObject {
			return this.props.name;
		}

		public static create(props: UserProps): Result<UserDomainEntity> {
			return Result.ok<UserDomainEntity>(new UserDomainEntity(props));
		}
	}
	//-------------------------------------------------------------------
	// Schema persistence - the way to be saved on database
	interface UserModel {
		id: string;
		name: string;
		age: number;
		createdAt?: Date;
		updatedAt?: Date;
		isDeleted?: boolean;
		deletedAt?: Date;
	}
	//-------------------------------------------------------------------
	// User mapper has responsibility to convert an object from domain to persistence
	class UserMapper implements IMapper<UserDomainEntity, UserModel> {
		//
		toDomain(target: UserModel): UserDomainEntity {
			return UserDomainEntity.create({
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
		toPersistence(target: UserDomainEntity): UserModel {
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
		class UserMapper2 extends State<UserProps> implements TMapper<UserModel, UserDomainEntity> {
			map( target: UserModel ): Result<UserDomainEntity, string> {
				this.resetState();
				target.name && this.addState( 'name', NameValueObject.create( target.name ) );
				target.age && this.addState( 'age', AgeValueObject.create( target.age ) );

				const stateResult = this.checkState();
				if ( stateResult.isFailure ) {
					return Result.fail( stateResult.error );
				}

				return UserDomainEntity.create( {
					ID: ShortDomainId.create(),
					age: this.getStateByKey<AgeValueObject>( 'age', AgeValueObject.create( 18 ))?.getResult(),
					name: this.getStateByKey<NameValueObject>('name', NameValueObject.create('default'))?.getResult()
				})

			};

		}
	//-------------------------------------------------------------------
	// base mapper

	class BaseMapper extends State<UserModel> { 

		GET_STATE () {
			return this.getState();
		}

		ADD_STATE ( age: number ) {
			this.addState<AgeValueObject>('age', AgeValueObject.create(age))
		}

		CLEAR_STATE () {
			this.resetState();
		}

		EXISTS (key: keyof UserModel) {
			return this.exists(key)
		}

		GET_BY_KEY (key: keyof UserModel) {
			return this.getStateByKey<AgeValueObject>( key );
		}

		GET_BY_KEY_WITH_CALLBACK (
			key: keyof UserModel, callback: Result<AgeValueObject>
		) {
			return this.getStateByKey<AgeValueObject>( key, callback );
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

	// Mapper concrete implementation: Implement IMapper2 or IMapper3
	// param: TARGET > the input param;
	// param: TARGET > the output param;
	// param: ERROR > the error value to be returned if occurs some conflict
	class UserToModelMapper implements TMapper<UserDomainEntity, UserModel> {
		// input is domain entity
		map ( domain: UserDomainEntity ): Result<UserModel> {
			// output persistence instance
			return Result.ok( {
				id: domain.id.uid,
				age: domain.age.value,
				name: domain.name.value,
				createdAt: domain.createdAt,
				updatedAt: domain.updatedAt,
				isDeleted: domain.isDeleted
			})
		}
	}

	// Mapper creator: Factory to create a mapper instance
	class UserToModelFactory extends FactoryMethod<UserDomainEntity, UserModel> {
		protected create (): TMapper<UserDomainEntity, UserModel, string> {
			return new UserToModelMapper();
		}
	}
	
	// factory method

	// Mapper concrete implementation: Implement IMapper2 or IMapper3
	// param: TARGET > the input param;
	// param: TARGET > the output param;
	// param: ERROR > the error value to be returned if occurs some conflict
	class UserToDomainMapper extends State<UserModel> implements TMapper<UserModel, UserDomainEntity> {
		// input persistence instance
		map ( model: UserModel): Result<UserDomainEntity> {

			// start a new state
			this.startState();
			this.addState( 'age', AgeValueObject.create( model.age ) );
			this.addState( 'name', NameValueObject.create( model.name ) );
			
			// check if has errors
			const result = this.checkState();
			if ( result.isFailure ) {
				return Result.fail( result.error );
			}

			// output domain entity instance
			return UserDomainEntity.create( {
				ID: ShortDomainId.create(model.id),
				age: this.getStateByKey<AgeValueObject>('age').getResult(),
				name: this.getStateByKey<NameValueObject>('name').getResult(),
				createdAt: model.createdAt,
				updatedAt: model.updatedAt
			})
		}
	}

	// Mapper creator: Factory to create a mapper instance
	class UserToDomainFactory extends FactoryMethod<UserModel, UserDomainEntity> {
		protected create (): TMapper<UserModel, UserDomainEntity> {
			return new UserToDomainMapper();
		}
	}

	// Client code, this function receives a factory and returns a domain entity
	const CreateEntity = <DTO, ENTITY, ERROR> (
		factory: FactoryMethod<DTO, ENTITY, ERROR>, dto: DTO
	) => {
		return factory.map( dto );
	}
	//-------------------------------------------------------------------
	

	it('should convert from persistence to domain', () => {
		const persistence: UserModel = {
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
		expect(domain).toBeInstanceOf(UserDomainEntity);
	});

	it('should convert from domain to persistence', () => {
		const domain: UserDomainEntity = UserDomainEntity.create({
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

		const entity = mapper.map( {
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

		const entity = mapper.map( {
			id: ShortDomainId.create().uid,
			age: 21,
			createdAt: new Date(),
			isDeleted: false,
			name: 'long_invalid_name_length'.repeat( 5 ),
			updatedAt: new Date()
		} )
		
		expect( entity.isFailure ).toBeTruthy();
	} );

		
	it( 'should create a default name if not provide a value', () => {
		const mapper = new UserMapper2();

		const entity = mapper.map( {
			id: ShortDomainId.create().uid,
			age: 21,
			createdAt: new Date(),
			isDeleted: false,
			updatedAt: new Date()
		} as UserModel)
		
		expect( entity.isFailure ).toBeFalsy();
		expect( entity.getResult().name.value ).toBe('default');
	} );

	it( 'should create a default age if not provide a value', () => {
		const mapper = new UserMapper2();

		const entity = mapper.map( {
			id: ShortDomainId.create().uid,
			name: 'oliver',
			createdAt: new Date(),
			isDeleted: false,
			updatedAt: new Date()
		} as UserModel)
		
		expect( entity.isFailure ).toBeFalsy();
		expect( entity.getResult().age.value ).toBe(18);
	} );

	it( 'should create a default age and name if not provide values', () => {
		const mapper = new UserMapper2();

		const entity = mapper.map( {
			id: ShortDomainId.create().uid,
			createdAt: new Date(),
			isDeleted: false,
			updatedAt: new Date()
		} as UserModel)
		
		expect( entity.isFailure ).toBeFalsy();
		expect( entity.getResult().age.value ).toBe(18);
		expect( entity.getResult().name.value ).toBe('default');
	} );

	it( 'should start with 0 state and add one', () => {
		const baseMapper = new BaseMapper();
		expect( baseMapper.GET_QUANTITY() ).toBe( 0 );
		baseMapper.ADD_STATE( 18 );
		expect( baseMapper.GET_QUANTITY() ).toBe( 1 );
	} )

	it( 'should print a fail message if the key does not exists', () => {
		const baseMapper = new BaseMapper();
		Logger.info('THE ERROR PRINTED BELOW IS JUST A TEST')
		expect( baseMapper.GET_BY_KEY( 'isDeleted' ).isFailure ).toBeTruthy();
		baseMapper.GET_BY_KEY( 'isDeleted' )?.getResult();
	} )

	it( 'should return false if key does not exists', () => {
		const baseMapper = new BaseMapper();
		expect( baseMapper.EXISTS( 'isDeleted' ) ).toBeFalsy();
	} )

	it( 'should return true if key exists', () => {
		const baseMapper = new BaseMapper();
		baseMapper.ADD_STATE( 8 );
		expect( baseMapper.EXISTS( 'age' ) ).toBeTruthy();
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

	it( 'should get a state from callback', () => {
		const baseMapper = new BaseMapper();
		expect( baseMapper.GET_BY_KEY_WITH_CALLBACK('age', AgeValueObject.create(18)).isSuccess).toBeTruthy( );
		expect( baseMapper.GET_BY_KEY_WITH_CALLBACK('age', AgeValueObject.create(18)).getResult().value).toBe(18);
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
		expect( state?.getResult()?.value ).toBe( 18 );
	} )
	
	it( 'should implement factory method mapper', () => {
		const entity = CreateEntity( new UserToDomainFactory(), {
			id: 'valid_id',
			age: 21,
			name: 'valid_name',
			createdAt: new Date(),
			isDeleted: false,
			updatedAt: new Date()
		} );

		expect( entity.getResult() ).toBeInstanceOf( UserDomainEntity );
	} );

	it( 'should build a model with static method on entity', () => {

		const domainEntity = UserDomainEntity.create( {
			ID: ShortDomainId.create(),
			age: AgeValueObject.create( 18 ).getResult(),
			name: NameValueObject.create( 'valid_name' ).getResult()
		} ).getResult();

		const model = UserDomainEntity.build( domainEntity, new UserToModelFactory() );
		expect( model.isSuccess ).toBeTruthy();
		expect( model.getResult().name ).toBe( 'valid_name' );
		expect( model.getResult().age ).toBe(18);
	} );

	it( 'should build a domain entity with static method on entity from model', () => {

		const model: UserModel = {
			id: 'valid_id',
			age: 18,
			updatedAt: new Date(),
			createdAt: new Date(),
			isDeleted: false,
			name: 'valid_name'
		}

		const result = UserDomainEntity.build( model, new UserToDomainFactory() );
		expect( result.isSuccess ).toBeTruthy();
		expect( result.getResult().age.value ).toBe( 18 )
		expect( result.getResult().name.value ).toBe( 'valid_name' )
	} );


	it( 'should convert a model to domain entity using a simple mapper creator', () => {
		const simpleMapper = new UserToDomainMapper();
		const entity = simpleMapper.map( {
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
