import { AggregateRoot, BaseDomainEntity, BirthdayValueObject, CustomStringValueObject, Entity, PasswordValueObject, Result, ShortDomainId, State, TMapper, UserNameValueObject, WeightValueObject } from "@types-ddd";

// Props
interface EntityProps extends BaseDomainEntity { 
	password: PasswordValueObject;
	notes: CustomStringValueObject[];
}

// Props
interface AggregateProps extends BaseDomainEntity { 
	name: UserNameValueObject;
	age: BirthdayValueObject;
	weights: WeightValueObject[];
	children: DeepEntity[];
}

// Entity
export class DeepEntity extends Entity<EntityProps> {
	private constructor (props: EntityProps) {
		super(props, DeepEntity.name)
	}

	get password(): PasswordValueObject{
		return this.props.password;
	};
	get notes(): CustomStringValueObject[] {
		return this.props.notes
	};

	private hasRequiredProps (): boolean {
		return !this.checkProps( ['notes', 'password'] ).isSome( 'undefined' );
	}

	public static create (props: EntityProps): Result<DeepEntity> {
		const deepEntity = new DeepEntity( props );

		const hasRequiredProps = deepEntity.hasRequiredProps();

		if ( !hasRequiredProps ) {
			return Result.fail( 'notes and password are required' );
		}

		return Result.ok( deepEntity );
	}
}

// Aggregate
export class DeepAggregate extends AggregateRoot<AggregateProps> {
	private constructor (props: AggregateProps) {
		super( props, DeepAggregate.name)
	}

	get name() :UserNameValueObject {
		return this.props.name;
	};

	get age() :BirthdayValueObject {
		return this.props.age;
	};
	get weights(): WeightValueObject[] {
		return this.props.weights;
	};
	get children(): DeepEntity[] {
		return this.props.children;
	};

	private hasRequiredProps (): boolean {
		return !this.checkProps( [ 'name', 'age', 'weights', 'children' ] ).isSome( 'undefined' );
	}

	public static create (props: AggregateProps): Result<DeepAggregate> {
		const deepAggregate = new DeepAggregate( props );

		const hasRequiredProps = deepAggregate.hasRequiredProps();

		if ( !hasRequiredProps ) {
			return Result.fail( 'name, age, weights and children are required' );
		}

		return Result.ok( deepAggregate );
	}
}

// Model
export interface DeepModelChild {
	id: string;
	password: string;
	notes: string[];
}

// Model
export interface DeepModel {
	id: string;
	name: string;
	age: Date;
	weights: number[];
	children: DeepModelChild[];
}

// Mapper
export class ENToDomainMapper extends State<DeepModelChild> implements TMapper<DeepModelChild, DeepEntity>{
	map ( target: DeepModelChild ): Result<DeepEntity, string>{
		this.startState();

		target.notes.map( ( n ) => this.addState(
			JSON.stringify( n ) as any, CustomStringValueObject.create( n ) ) );
		this.addState( 'password', PasswordValueObject.create( target.password ) );

		const result = this.checkState();
		if ( result.isFailure ) {
			return Result.fail( result.error );
		}

		return DeepEntity.create( {
			ID: ShortDomainId.create(),
			notes: target.notes
				.map( ( n ) => this
					.getStateByKey<CustomStringValueObject>( JSON.stringify(n) as any ).getResult() ),
			password: this.getStateByKey<PasswordValueObject>('password').getResult()
		})
	};
}

// Mapper
export class AGGToDomainMapper extends State<DeepModel> implements TMapper<DeepModel, DeepAggregate>{

	constructor (
		private readonly mapper: ENToDomainMapper
	) {
		super()
	}

	map ( target: DeepModel ): Result<DeepAggregate, string>{

		this.startState();
		target.children.map(
			( child ) => this.addState(
			JSON.stringify( child ) as any, this.mapper.map( child ) ) );
		this.addState( 'age', BirthdayValueObject.create( target.age ) );
		this.addState( 'name', UserNameValueObject.create( target.name ) );
		target.weights.map(
			( weight ) => this.addState(
				JSON.stringify( weight ) as any, WeightValueObject.create( {
			unit: 'KG', value: weight
		})))

		const result = this.checkState();
		if ( result.isFailure ) {
			return Result.fail( result.error );
		}

		return DeepAggregate.create( {
			ID: ShortDomainId.create(),
			children: target.children.map(
				( child ) => this.getStateByKey<DeepEntity>( JSON.stringify( child ) as any ).getResult() ),
			age: this.getStateByKey<BirthdayValueObject>( 'age' ).getResult(),
			name: this.getStateByKey<UserNameValueObject>( 'name' ).getResult(),
				weights: target.weights.map( ( weight) => this.getStateByKey<WeightValueObject>( JSON.stringify(weight) as any ).getResult()),
			
		})
	};
}
