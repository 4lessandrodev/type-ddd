import { AggregateRoot, BaseDomainEntity, BirthdayValueObject, CustomStringValueObject as StringVo, Entity, PasswordValueObject, Result, ShortDomainId, State, TMapper, UnitOfWeight, UserNameValueObject, WeightValueObject } from "@types-ddd";

// Props
interface EntityProps extends BaseDomainEntity { 
	password: PasswordValueObject;
	notes: StringVo[];
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
	get notes(): StringVo[] {
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

interface Weight {
	unit: UnitOfWeight;
	value: number;
}

// Model
export interface DeepModel {
	id: string;
	name: string;
	age: Date;
	weights: Weight[];
	children: DeepModelChild[];
}

// Mapper
export class ENToDomainMapper extends State<DeepModelChild> implements TMapper<DeepModelChild, DeepEntity>{
	map ( target: DeepModelChild ): Result<DeepEntity, string>{
		this.startState();

		const notes = target.notes.map( ( n ) => StringVo.create( n ) );
		const noteKeys = this.addManyState( notes );

		this.addState( 'password', PasswordValueObject.create( target.password ) );

		const result = this.checkState();
		if ( result.isFailure ) {
			return Result.fail( result.error );
		}

		return DeepEntity.create( {
			ID: ShortDomainId.create(),
			notes: this.getStateByKeys<StringVo>(noteKeys).map((note) => note.getResult()),
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
		
		const children = target.children.map( ( child ) => this.mapper.map( child ) );
		const childrenKeys = this.addManyState( children );

		this.addState( 'age', BirthdayValueObject.create( target.age ) );
		this.addState( 'name', UserNameValueObject.create( target.name ) );
		
		const weights = target.weights.map( weight => WeightValueObject.create( weight ) );
		const weightKeys = this.addManyState( weights );

		const result = this.checkState();
		if ( result.isFailure ) {
			return Result.fail( result.error );
		}

		return DeepAggregate.create( {
			ID: ShortDomainId.create(),
			children: this.getStateByKeys<DeepEntity>(childrenKeys).map(child => child.getResult()),
			age: this.getStateByKey<BirthdayValueObject>( 'age' ).getResult(),
			name: this.getStateByKey<UserNameValueObject>( 'name' ).getResult(),
			weights: this.getStateByKeys<WeightValueObject>( weightKeys ).map(weight => weight.getResult())
		})
	};
}
