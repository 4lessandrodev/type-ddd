import { BaseDomainEntity, DateValueObject, DomainId, Entity, HEXColorValueObject, Result, ShortDomainId, TMapper, UserNameValueObject } from "@types-ddd";
import { Player } from "../simple-player.entity";

describe('simple-player.entity', () => {
		
	it('should be defined', ()=> {
		const player = Player.create;
		expect(player).toBeDefined()
	})

	it('should create a valid player', ()=> {

		// 	Create value objects
		const teamColor = HEXColorValueObject.randomColor();
		const ID = DomainId.create();
		const userId = DomainId.create();

		// Create player
		const player = Player.create({ ID, teamColor, userId });
		expect(player.isSuccess).toBeTruthy();
	})

	it('should getters be defined', ()=> {

		// 	Create value objects
		const teamColor = HEXColorValueObject.randomColor();
		const ID = DomainId.create();
		const userId = DomainId.create();

		// Create player
		const player = Player.create({ ID, teamColor, userId }).getResult();

		expect(player.id).toBeDefined();
		expect(player.userId).toBeDefined();
		expect(player.teamColor).toBeDefined();
		expect(player.isDeleted).toBeDefined();
		expect(player.createdAt).toBeDefined();
		expect(player.getHashCode).toBeDefined();
	})

	it('should change team color', ()=> {

		// 	Create value objects
		const teamColor = HEXColorValueObject.randomColor();
		const ID = DomainId.create();
		const userId = DomainId.create();

		// Create player
		const player = Player.create({ ID, teamColor, userId }).getResult();

		const oldColor = player.teamColor.value;

		player.changeColor(HEXColorValueObject.randomColor());
		const isDiffColor = oldColor !== player.teamColor.value;

		expect(isDiffColor).toBeTruthy();
	} )
	
	it('should create a valid player with short id', ()=> {

		// 	Create value objects
		const teamColor = HEXColorValueObject.randomColor();
		const ID = ShortDomainId.create();
		const userId = DomainId.create();

		// Create player
		const player = Player.create({ ID, teamColor, userId });
		expect( player.isSuccess ).toBeTruthy();
		
	} )
	
	it( 'should validate the entity props', () => {

		// 	Create value objects
		const teamColor = HEXColorValueObject.randomColor();
		const ID = ShortDomainId.create();
		const userId = DomainId.create();

		// Create player
		const player = Player.create( { ID, teamColor, userId } ).getResult();
		
		const isInstance = player
			.checkProps( ['teamColor'] )
			.isInstanceOf( HEXColorValueObject );
		
		expect( isInstance ).toBeTruthy();
	} )
	
	it( 'should validate the entity props', () => {

		// 	Create value objects
		const teamColor = HEXColorValueObject.randomColor();
		const ID = ShortDomainId.create();
		const userId = DomainId.create();

		// Create player
		const player = Player.create( { ID, teamColor, userId } ).getResult();
		
		const isInstance = player
			.checkProps( ['teamColor', 'userId'] )
			.isInstanceOf( HEXColorValueObject );
		
		expect( isInstance ).toBeFalsy();

		const isAllUndefined = player
			.checkProps( ['teamColor', 'userId', 'age'] )
			.isAll('undefined');
		
		expect( isAllUndefined ).toBeFalsy();

		const isSomeUndefined = player
			.checkProps( ['teamColor', 'userId', 'age'] )
			.isSome('undefined');
		
		expect( isSomeUndefined ).toBeTruthy();
	} )
	
	it( 'should transform a entity on persistence model', () => {

		interface IPlayer {
			id: string;
			teamColor: string;
			userId: string;
		}

		class PlayerToObjectMapper implements TMapper<Player, IPlayer>{
			map ( target: Player ): Result<IPlayer, string> {
				return Result.ok( {
					id: target.id.uid,
					teamColor: target.teamColor.value,
					userId: target.userId.uid
				})
			};
		}

		// 	Create value objects
		const teamColor = HEXColorValueObject.randomColor();
		const ID = ShortDomainId.create();
		const userId = DomainId.create();

		// Create player
		const player = Player.create( { ID, teamColor, userId } ).getResult();

		const model = player.toObject<IPlayer>( new PlayerToObjectMapper() );
		
		expect( model ).toEqual( {
			id: ID.uid,
			teamColor: teamColor.value,
			userId: userId.uid
		})
	} )
	
	it( 'should validate different types from aggregate', () => {

		interface Props extends BaseDomainEntity {
			age?: DateValueObject;
			userId: ShortDomainId;
			teamColor: HEXColorValueObject;
			name?: UserNameValueObject;
		}

		class Example extends Entity<Props> {
			private constructor (props: Props) {
				super( props, Example.name );
			}

			get age(): DateValueObject | undefined {
			return this.props.age;
			};
			get userId(): ShortDomainId{
				return this.props.userId;
			};
			get teamColor(): HEXColorValueObject {
				return this.props.teamColor;
			};
			get name(): UserNameValueObject | null {
				return this.props.name ?? null;
			};

			public static create ( props: Props ): Result<Example> {
				return Result.ok( new Example( props ) );
			}

		}

		// 	Create value objects
		const teamColor = HEXColorValueObject.randomColor();
		const ID = ShortDomainId.create();
		const userId = DomainId.create();
		
		// Create player
		const player = Example.create( { ID, teamColor, userId, name: null as any } ).getResult();
		
		const isNullable = player.checkProps( ['age'] ).isSome( 'null' );
		const isUndefined = player.checkProps( ['age'] ).isSome( 'undefined' );

		// is undefined
		expect( player.age ).toBeUndefined();
		expect( isNullable ).toBeFalsy();
		expect( isUndefined ).toBeTruthy();

		const nullableName = player.checkProps( ['name'] ).isSome( 'null' );
		expect( player.name ).toBeNull();
		expect( nullableName ).toBeTruthy();

		const typesResult = player.checkProps( ['age', 'name'] ).hasSomeTypes( ['null', 'undefined'] );
		expect( typesResult ).toBeTruthy();

		const player2 = Example.create( { ID, teamColor, userId, age: null as any } ).getResult();

		const typesResult2 = player2.checkProps( ['age'] ).hasSomeTypes( ['null', 'undefined'] );
		expect( typesResult2 ).toBeTruthy();
	})
});
