import { DomainId, HEXColorValueObject } from "@types-ddd";
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
	})
});
