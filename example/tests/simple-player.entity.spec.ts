import { DomainId, HEXColorValueObject, Result, ShortDomainId, TMapper } from "@types-ddd";
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
	})
});
