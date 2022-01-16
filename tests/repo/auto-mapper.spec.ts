import {
	BaseDomainEntity,
	BirthdayValueObject,
	Entity,
	PasswordValueObject,
	Result,
	ShortDomainId,
	UserNameValueObject,
	AutoMapper,
	CurrencyValueObject
} from "@types-ddd";

describe( 'auto-mapper', () => {

	interface Model {
		age: number;
		name: string,
		password: string,
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
		coin: CurrencyValueObject;
		parent?: SEntity,
		hobbies: string[],
		children: SEntity[]
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

		get children (): SEntity[] {
			return this.props.children;
		}

		get hobbies (): string[] {
			return this.props.hobbies;
		}

		changeName (newName: UserNameValueObject): void {
			this.props.name = newName;
		}

		public static create (props: IProps): Result<SEntity>{
			return Result.ok( new SEntity( props ) );
		}
	}

	it( 'should get all keys from entity', () => {

		const date = new Date( '2020-01-01T03:00:00.000Z' );
		
		const entity = SEntity.create( {
			ID: ShortDomainId.create('40d9211bf7f6260d'),
			age: BirthdayValueObject.create(date).getResult(),
			name: UserNameValueObject.create('valid name').getResult(),
			password: PasswordValueObject.create( ':4Y*3D_hhs8T' ).getResult(),
			coin: CurrencyValueObject.create( { value: 10, currency: 'BRL' } ).getResult(),
			hobbies: ['play games', 'play the guitar', 'play soccer'],
			children: [],
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
					parent: undefined
				}
			).getResult(),
			createdAt: date,
			updatedAt: date,
			isDeleted: false
		} ).getResult();

		const expectedResult = {
			id: "40d9211bf7f6260d",
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			age: date,
			children: [],
			name: "Valid Name",
			hobbies: ['play games', 'play the guitar', 'play soccer'],
			password: ":4Y*3D_hhs8T",
			coin: 10,
			parent: {
				id: "50d9211bf7f6260e",
				children: [],
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

		expect( result ).toEqual(expectedResult);

	} );

} );
