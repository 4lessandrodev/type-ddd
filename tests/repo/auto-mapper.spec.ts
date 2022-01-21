import {
	BaseDomainEntity,
	BirthdayValueObject,
	Entity,
	PasswordValueObject,
	Result,
	ShortDomainId,
	UserNameValueObject,
	AutoMapper,
	CurrencyValueObject,
	EmailValueObject,
	DateValueObject,
	DomainId
} from "@types-ddd";
import { User } from "../../example/simple-user.aggregate";

describe( 'auto-mapper', () => {

	interface Model {
		id: string;
		age: number;
		name: string,
		password: string,
		userId: string;
		coin: number,
		hobbies: string[],
		children: Model[],
		parent: Model;
		createdAt: Date,
		updatedAt: Date,
		isDeleted: boolean
	}
	
	interface IProps extends BaseDomainEntity {
		name: UserNameValueObject;
		age: BirthdayValueObject;
		password: PasswordValueObject;
		userId?: DomainId;
		coin: CurrencyValueObject;
		parent?: SEntity,
		parentIds: ShortDomainId[],
		hobbies: string[],
		children: User[]
	}

	class SEntity extends Entity<IProps> {
		private constructor ( props: IProps ) {
			super(props, SEntity.name)
		}

		get name (): UserNameValueObject {
			return this.props.name;
		}

		get age (): BirthdayValueObject {
			return this.props.age;
		}

		get password (): PasswordValueObject {
			return this.props.password;
		}

		get coin (): CurrencyValueObject {
			return this.props.coin;
		}

		get parent (): SEntity | undefined {
			return this.props.parent
		}

		get children (): User[] {
			return this.props.children;
		}

		get hobbies (): string[] {
			return this.props.hobbies;
		}

		get userId (): DomainId | undefined {
			return this.props.userId
		}

		get parentIds (): ShortDomainId[] {
			return this.props.parentIds;
		}

		changeName (newName: UserNameValueObject): void {
			this.props.name = newName;
		}

		addChildren ( child: User ): void {
			this.props.children.push( child );
		}

		public static create (props: IProps): Result<SEntity>{
			return Result.ok( new SEntity( props ) );
		}
	}

	it( 'should get all keys from entity', () => {

		const date = new Date( '2020-01-01T03:00:00.000Z' );
		const ids = [
			ShortDomainId.create( '10d9211bf7f6361a' ),
			ShortDomainId.create( '20d9211bf7f6361b' ),
			ShortDomainId.create( '30d9211bf7f6361c' ),
			ShortDomainId.create( '40d9211bf7f6361d' ),
		]
		
		const entity = SEntity.create( {
			ID: ShortDomainId.create('40d9211bf7f6260d'),
			age: BirthdayValueObject.create(date).getResult(),
			name: UserNameValueObject.create('valid name').getResult(),
			password: PasswordValueObject.create( ':4Y*3D_hhs8T' ).getResult(),
			coin: CurrencyValueObject.create( { value: 10, currency: 'BRL' } ).getResult(),
			hobbies: ['play games', 'play the guitar', 'play soccer'],
			children: [],
			parentIds: ids,
			userId: ShortDomainId.create('70d9211bf7f6361f'),
			parent: SEntity.create(
				{
					ID: ShortDomainId.create('50d9211bf7f6260e'),
					age: BirthdayValueObject.create(date).getResult(),
					name: UserNameValueObject.create('Sub Name').getResult(),
					password: PasswordValueObject.create( 'subPassword' ).getResult(),
					coin: CurrencyValueObject.create( { value: 14, currency: 'BRL' } ).getResult(),
					children: [],
					hobbies: ['play piano', 'running'],
					createdAt: date,
					updatedAt: date,
					isDeleted: false,
					parent: undefined,
					parentIds: []
				}
			).getResult(),
			createdAt: date,
			updatedAt: date,
			isDeleted: false
		} ).getResult();

		const modelIds = ids.map( ( id ) => id.uid );

		const expectedResult = {
			id: "40d9211bf7f6260d",
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			userId: '70d9211bf7f6361f',
			age: date,
			children: [],
			parentIds: modelIds,
			name: "Valid Name",
			hobbies: ['play games', 'play the guitar', 'play soccer'],
			password: ":4Y*3D_hhs8T",
			coin: 10,
			parent: {
				id: "50d9211bf7f6260e",
				children: [],
				parentIds: [],
				createdAt: date,
				updatedAt: date,
				isDeleted: false,
				hobbies: ['play piano', 'running'],
				age: date,
				name: "Sub Name",
				password: "subPassword",
				coin: 14
			}
		};

		const mapper = new AutoMapper();

		const model = entity.toObject<Model>();

		expect(model).toEqual(expectedResult)

		const result = mapper.convert( entity );

		expect( result ).toEqual( expectedResult );
		
		const child = User.create( {
			ID: ShortDomainId.create(),
			userBirthDay: BirthdayValueObject.create(new Date(2002)).getResult(),
			userEmail: EmailValueObject.create( 'valid@domain.com' ).getResult(),
			userName: UserNameValueObject.create( 'Valid' ).getResult(),
			userPassword: PasswordValueObject.create( 'password123' ).getResult(),
			createdAt: date,
			updatedAt: date
		}).getResult();

		entity.addChildren(child);

		const modelWithChild = entity.toObject();

		const modelChild = child.toObject();
		expectedResult.children.push( modelChild as never );

		expect(modelWithChild).toEqual(expectedResult);
	} );

	it( 'should get a value from a value object', () => {
		const autoMapper = new AutoMapper();

		const currency = CurrencyValueObject.create( {
			value: 200,
			currency: 'BRL',
		} ).getResult();

		const obj = autoMapper.convert( currency );

		expect( obj ).toEqual( { currency: 'BRL', value: 200 } );

		expect( currency.toObject() ).toEqual( { currency: 'BRL', value: 200 } );
	} );

	it( 'should get a value from a value object', () => {
		
		const currentDate = new Date();

		const autoMapper = new AutoMapper();

		const dateVObj = DateValueObject.create(currentDate).getResult();

		const obj = autoMapper.convert( dateVObj );

		expect( obj ).toEqual( currentDate );

		expect( dateVObj.toObject() ).toEqual( currentDate );
	} );


	it( 'should return value if provide a simple value', () => {
		
		const autoMapper = new AutoMapper();

		const obj = autoMapper.convert( 'simple string' );

		expect( obj ).toBe( 'simple string' );

	} );

	it( 'should return id value as string', () => {
		
		const autoMapper = new AutoMapper();

		const id = autoMapper.convert( DomainId.create('valid_id') );

		expect( id ).toBe( 'valid_id' );

	} );

} );
