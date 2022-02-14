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
	DomainId,
	ValueObject,
	CustomStringValueObject,
} from '@types-ddd';
import { User } from '../../example/simple-user.aggregate';

describe('auto-mapper', () => {
	interface Props {
		password: PasswordValueObject;
		coin: CurrencyValueObject;
		emails: EmailValueObject[];
	}

	class ComplexValueObject extends ValueObject<Props> {
		private constructor(props: Props) {
			super(props);
		}

		get password(): PasswordValueObject {
			return this.props.password;
		}

		get coin(): CurrencyValueObject {
			return this.props.coin;
		}

		get emails(): EmailValueObject[] {
			return this.props.emails;
		}

		public static create(props: Props): Result<ComplexValueObject> {
			return Result.ok(new ComplexValueObject(props));
		}
	}

	interface SocialInfoVOProps {
		links: string[];
		publicEmail?: string;
	}

	class SocialInfoVO extends ValueObject<SocialInfoVOProps> {
		public static MAX_LINKS = 5;

		constructor(props: SocialInfoVOProps) {
			super(props);
		}

		get links() {
			return this.props.links;
		}
		get publicEmail() {
			return this.props.publicEmail;
		}

		public static create(props: {
			links: string[];
			publicEmail: string;
		}): Result<SocialInfoVO> {
			//... validate and do stuff
			return Result.ok(new SocialInfoVO(props));
		}
	}

	interface Model {
		id: string;
		age: number;
		name: string;
		password: string;
		userId: string;
		coin: number;
		hobbies: string[];
		children: Model[];
		parent: Model;
		createdAt: Date;
		updatedAt: Date;
		isDeleted: boolean;
	}

	interface IProps extends BaseDomainEntity {
		name: UserNameValueObject;
		age: BirthdayValueObject;
		password: PasswordValueObject;
		userId?: DomainId;
		coin: CurrencyValueObject;
		parent?: SEntity;
		parentIds: ShortDomainId[];
		hobbies: string[];
		children: User[];
	}

	class SEntity extends Entity<IProps> {
		private constructor(props: IProps) {
			super(props, SEntity.name);
		}

		get name(): UserNameValueObject {
			return this.props.name;
		}

		get age(): BirthdayValueObject {
			return this.props.age;
		}

		get password(): PasswordValueObject {
			return this.props.password;
		}

		get coin(): CurrencyValueObject {
			return this.props.coin;
		}

		get parent(): SEntity | undefined {
			return this.props.parent;
		}

		get children(): User[] {
			return this.props.children;
		}

		get hobbies(): string[] {
			return this.props.hobbies;
		}

		get userId(): DomainId | undefined {
			return this.props.userId;
		}

		get parentIds(): ShortDomainId[] {
			return this.props.parentIds;
		}

		changeName(newName: UserNameValueObject): void {
			this.props.name = newName;
		}

		addChildren(child: User): void {
			this.props.children.push(child);
		}

		public static create(props: IProps): Result<SEntity> {
			return Result.ok(new SEntity(props));
		}
	}

	const currencyVo = CurrencyValueObject.create({
		currency: 'USD',
		value: 1000,
	}).getResult();

	const emailsVo = [
		'valid1@domain.com',
		'valid2@domain.com',
		'valid3@domain.com',
	].map((email) => EmailValueObject.create(email).getResult());

	const passwordVo = PasswordValueObject.create('eb6@18#R7&').getResult();

	const complexValueObject = ComplexValueObject.create({
		coin: currencyVo,
		emails: emailsVo,
		password: passwordVo,
	}).getResult();

	interface IAddress {
		streetNumber: number;
	}
	interface ComplexEntityProps extends BaseDomainEntity {
		password: PasswordValueObject;
		coin: CurrencyValueObject;
		emails: EmailValueObject[];
		isPublic: boolean;
		address?: IAddress;
	}

	class ComplexEntity extends Entity<ComplexEntityProps> {
		private constructor(props: ComplexEntityProps) {
			super(props, ComplexEntity.name);
		}

		get password(): PasswordValueObject {
			return this.props.password;
		}
		get coin(): CurrencyValueObject {
			return this.props.coin;
		}
		get emails(): EmailValueObject[] {
			return this.props.emails;
		}
		get isPublic(): boolean {
			return this.props.isPublic;
		}
		get address(): IAddress | undefined {
			return this.props.address;
		}

		public static create(props: ComplexEntityProps): Result<ComplexEntity> {
			return Result.ok<ComplexEntity>(new ComplexEntity(props));
		}
	}

	it('should get all keys from entity', () => {
		const date = new Date('2020-01-01T03:00:00.000Z');
		const ids = [
			ShortDomainId.create('10d9211bf7f6361a'),
			ShortDomainId.create('20d9211bf7f6361b'),
			ShortDomainId.create('30d9211bf7f6361c'),
			ShortDomainId.create('40d9211bf7f6361d'),
		];

		const entity = SEntity.create({
			ID: ShortDomainId.create('40d9211bf7f6260d'),
			age: BirthdayValueObject.create(date).getResult(),
			name: UserNameValueObject.create('valid name').getResult(),
			password: PasswordValueObject.create(':4Y*3D_hhs8T').getResult(),
			coin: CurrencyValueObject.create({
				value: 10,
				currency: 'BRL',
			}).getResult(),
			hobbies: ['play games', 'play the guitar', 'play soccer'],
			children: [],
			parentIds: ids,
			userId: ShortDomainId.create('70d9211bf7f6361f'),
			parent: SEntity.create({
				ID: ShortDomainId.create('50d9211bf7f6260e'),
				age: BirthdayValueObject.create(date).getResult(),
				name: UserNameValueObject.create('Sub Name').getResult(),
				password: PasswordValueObject.create('subPassword').getResult(),
				coin: CurrencyValueObject.create({
					value: 14,
					currency: 'BRL',
				}).getResult(),
				children: [],
				hobbies: ['play piano', 'running'],
				createdAt: date,
				updatedAt: date,
				isDeleted: false,
				parent: undefined,
				parentIds: [],
			}).getResult(),
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
		}).getResult();

		const modelIds = ids.map((id) => id.uid);

		const expectedResult = {
			id: '40d9211bf7f6260d',
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			userId: '70d9211bf7f6361f',
			age: date,
			children: [],
			parentIds: modelIds,
			name: 'Valid Name',
			hobbies: ['play games', 'play the guitar', 'play soccer'],
			password: ':4Y*3D_hhs8T',
			coin: {
				currency: 'BRL',
				value: 10,
			},
			parent: {
				id: '50d9211bf7f6260e',
				children: [],
				parentIds: [],
				createdAt: date,
				updatedAt: date,
				isDeleted: false,
				hobbies: ['play piano', 'running'],
				age: date,
				name: 'Sub Name',
				password: 'subPassword',
				coin: {
					currency: 'BRL',
					value: 14,
				},
			},
		};

		const mapper = new AutoMapper();

		const model = entity.toObject<Model>();

		expect(model).toEqual(expectedResult);

		const result = mapper.convert(entity);

		expect(result).toEqual(expectedResult);

		const child = User.create({
			ID: ShortDomainId.create(),
			userBirthDay: BirthdayValueObject.create(
				new Date(2002)
			).getResult(),
			userEmail: EmailValueObject.create('valid@domain.com').getResult(),
			userName: UserNameValueObject.create('Valid').getResult(),
			userPassword: PasswordValueObject.create('password123').getResult(),
			createdAt: date,
			updatedAt: date,
		}).getResult();

		entity.addChildren(child);

		const modelWithChild = entity.toObject();

		const modelChild = child.toObject();
		expectedResult.children.push(modelChild as never);

		expect(modelWithChild).toEqual(expectedResult);
	});

	it('should get a value from a value object', () => {
		const autoMapper = new AutoMapper();

		const currency = CurrencyValueObject.create({
			value: 200,
			currency: 'BRL',
		}).getResult();

		const obj = autoMapper.convert(currency);

		expect(obj).toEqual({ currency: 'BRL', value: 200 });

		expect(currency.toObject()).toEqual({ currency: 'BRL', value: 200 });
	});

	it('should get a value from a value object', () => {
		const currentDate = new Date();

		const autoMapper = new AutoMapper();

		const dateVObj = DateValueObject.create(currentDate).getResult();

		const obj = autoMapper.convert(dateVObj);

		expect(obj).toEqual(currentDate);

		expect(dateVObj.toObject()).toEqual(currentDate);
	});

	it('should return value if provide a simple value', () => {
		const autoMapper = new AutoMapper();

		const obj = autoMapper.convert('simple string');

		expect(obj).toBe('simple string');
	});

	it('should return id value as string', () => {
		const autoMapper = new AutoMapper();

		const id = autoMapper.convert(DomainId.create('valid_id'));

		expect(id).toBe('valid_id');
	});

	it('should map a complex value-object to a simple object', () => {
		const publicEmail = 'valid_email@domain.com';
		const links = [
			'https://github.com/4lessandrodev/types-ddd',
			'https://www.npmjs.com/package/types-ddd',
		];

		const expectedResult = { publicEmail, links };

		const valueObjectInstance = SocialInfoVO.create({
			publicEmail,
			links,
		}).getResult();

		const result = valueObjectInstance.toObject();

		expect(result).toEqual(expectedResult);
	});

	it('should map a complex value-object inside an entity to a simple object', () => {
		const currentDate = new Date();
		interface Props extends BaseDomainEntity {
			title: CustomStringValueObject;
			author: SocialInfoVO;
		}

		class PostEntity extends Entity<Props> {
			private constructor(props: Props) {
				super(props, PostEntity.name);
			}

			get author(): SocialInfoVO {
				return this.props.author;
			}

			get title(): CustomStringValueObject {
				return this.props.title;
			}

			public static create(props: Props): Result<PostEntity> {
				// ... do some stuff or validation
				return Result.ok(new PostEntity(props));
			}
		}

		// -------------

		const publicEmail = 'valid_email@domain.com';
		const links = [
			'https://github.com/4lessandrodev/types-ddd',
			'https://www.npmjs.com/package/types-ddd',
		];

		const author = SocialInfoVO.create({ publicEmail, links }).getResult();
		const title = CustomStringValueObject.create(
			'Some simple post tile'
		).getResult();
		const ID = DomainId.create();

		const expectedResult = {
			id: ID.uid,
			title: 'Some simple post tile',
			author: { publicEmail, links },
			isDeleted: false,
			createdAt: currentDate,
			updatedAt: currentDate,
			deletedAt: undefined,
		};

		const postEntity = PostEntity.create({
			ID,
			author,
			title,
			createdAt: currentDate,
			updatedAt: currentDate,
		}).getResult();

		const result = postEntity.toObject();

		expect(result).toEqual(expectedResult);
	});

	it('should convert sub-value object in a value object', () => {
		const result = complexValueObject.toObject();

		expect(result).toBeDefined();
		expect(result).toMatchInlineSnapshot(`
		Object {
		  "coin": Object {
		    "currency": "USD",
		    "value": 1000,
		  },
		  "emails": Array [
		    "valid1@domain.com",
		    "valid2@domain.com",
		    "valid3@domain.com",
		  ],
		  "password": "eb6@18#R7&",
		}
	`);
	});

	it('should convert complex value object from an entity', () => {
		const userName = UserNameValueObject.create('Jane Austin').getResult();
		const currentDate = new Date('2020-01-01 00:00:00');

		interface Props extends BaseDomainEntity {
			name: UserNameValueObject;
			complexVo: ComplexValueObject;
		}

		class User extends Entity<Props> {
			private constructor(props: Props) {
				super(props, User.name);
			}

			get complexVo(): ComplexValueObject {
				return this.props.complexVo;
			}

			get name(): UserNameValueObject {
				return this.props.name;
			}

			public static create(props: Props): Result<User> {
				// ... do some stuff or validation
				return Result.ok(new User(props));
			}
		}

		const user = User.create({
			ID: DomainId.create('valid_id'),
			complexVo: complexValueObject,
			name: userName,
			createdAt: currentDate,
			updatedAt: currentDate,
		}).getResult();

		const obj = user.toObject();

		expect(obj.complexVo).toEqual({
			coin: {
				currency: 'USD',
				value: 1000,
			},
			emails: [
				'valid1@domain.com',
				'valid2@domain.com',
				'valid3@domain.com',
			],
			password: 'eb6@18#R7&',
		});

		expect(obj).toMatchInlineSnapshot(`
		Object {
		  "complexVo": Object {
		    "coin": Object {
		      "currency": "USD",
		      "value": 1000,
		    },
		    "emails": Array [
		      "valid1@domain.com",
		      "valid2@domain.com",
		      "valid3@domain.com",
		    ],
		    "password": "eb6@18#R7&",
		  },
		  "createdAt": 2020-01-01T00:00:00.000Z,
		  "deletedAt": undefined,
		  "id": "valid_id",
		  "isDeleted": false,
		  "name": "Jane Austin",
		  "updatedAt": 2020-01-01T00:00:00.000Z,
		}
	`);
	});

	it('should convert complex value object from an entity', () => {
		const userName = UserNameValueObject.create('Jane Austin').getResult();
		const currentDate = new Date('2020-01-01 00:00:00');

		interface Props extends BaseDomainEntity {
			name: UserNameValueObject;
			complexVo: ComplexValueObject[];
		}

		class User extends Entity<Props> {
			private constructor(props: Props) {
				super(props, User.name);
			}

			get complexVo(): ComplexValueObject[] {
				return this.props.complexVo;
			}

			get name(): UserNameValueObject {
				return this.props.name;
			}

			public static create(props: Props): Result<User> {
				// ... do some stuff or validation
				return Result.ok(new User(props));
			}
		}

		const user = User.create({
			ID: DomainId.create('valid_id'),
			complexVo: [complexValueObject],
			name: userName,
			createdAt: currentDate,
			updatedAt: currentDate,
		}).getResult();

		const obj = user.toObject();

		expect(obj.complexVo).toEqual([
			{
				coin: {
					currency: 'USD',
					value: 1000,
				},
				emails: [
					'valid1@domain.com',
					'valid2@domain.com',
					'valid3@domain.com',
				],
				password: 'eb6@18#R7&',
			},
		]);

		expect(obj).toMatchInlineSnapshot(`
		Object {
		  "complexVo": Array [
		    Object {
		      "coin": Object {
		        "currency": "USD",
		        "value": 1000,
		      },
		      "emails": Array [
		        "valid1@domain.com",
		        "valid2@domain.com",
		        "valid3@domain.com",
		      ],
		      "password": "eb6@18#R7&",
		    },
		  ],
		  "createdAt": 2020-01-01T00:00:00.000Z,
		  "deletedAt": undefined,
		  "id": "valid_id",
		  "isDeleted": false,
		  "name": "Jane Austin",
		  "updatedAt": 2020-01-01T00:00:00.000Z,
		}
	`);
	});

	it('should convert a complex entity to simple object', () => {
		const ID = DomainId.create('some_valid_id');
		const currentDate = new Date('2022-01-01 00:00:00');

		const complexEntity = ComplexEntity.create({
			ID,
			emails: [
				EmailValueObject.create('valid_email@domain.com').getResult(),
			],
			coin: CurrencyValueObject.create({
				currency: 'BRL',
				value: 1000,
			}).getResult(),
			password: PasswordValueObject.create('123@#abcABC').getResult(),
			createdAt: currentDate,
			updatedAt: currentDate,
			isDeleted: false,
			deletedAt: currentDate,
			isPublic: false,
			address: { streetNumber: 20 },
		}).getResult();

		const object = complexEntity.toObject();

		expect(object.address).toEqual({ streetNumber: 20 });
		expect(object.isPublic).toBe(false);

		expect(object).toMatchInlineSnapshot(`
		Object {
		  "address": Object {
		    "streetNumber": 20,
		  },
		  "coin": Object {
		    "currency": "BRL",
		    "value": 1000,
		  },
		  "createdAt": 2022-01-01T00:00:00.000Z,
		  "deletedAt": 2022-01-01T00:00:00.000Z,
		  "emails": Array [
		    "valid_email@domain.com",
		  ],
		  "id": "some_valid_id",
		  "isDeleted": false,
		  "isPublic": false,
		  "password": "123@#abcABC",
		  "updatedAt": 2022-01-01T00:00:00.000Z,
		}
	`);
	});
});
