import {
	BaseDomainEntity,
	BirthdayValueObject,
	Entity,
	PasswordValueObject,
	Result,
	ShortDomainId,
	UserNameValueObject,
	AutoMapper,
	Logger
} from "@types-ddd";

describe( 'auto-mapper', () => {
	
	interface IProps extends BaseDomainEntity {
		name: UserNameValueObject;
		age: BirthdayValueObject;
		password: PasswordValueObject;
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
			createdAt: date,
			updatedAt: date,
			isDeleted: false
		} ).getResult();

		const mapper = new AutoMapper();

		const result = mapper.convert( entity );

		Logger.info( result as any );

		expect(result).toEqual({
			id: "40d9211bf7f6260d",
			age: date,
			name: "Valid Name",
			password: ":4Y*3D_hhs8T",
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			deletedAt: undefined,
		})

	} );

} );