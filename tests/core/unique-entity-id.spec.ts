import { UniqueEntityID } from '../../lib/core/unique-entity-id';

describe('unique-entity-id', () => {
	it('should create a new random unique entity id', () => {
		const id = new UniqueEntityID();
		expect(id.toString().length).toBeGreaterThan(20);
	});

	it('should not repeat values for entity id', () => {
		let index = 0;
		const randomIds: UniqueEntityID[] = [];

		while (index < 20) {
			randomIds.push(new UniqueEntityID());
			index++;
		}

		const uniqueIds: UniqueEntityID[] = [...new Set(randomIds)];
		expect(uniqueIds.length).toBe(randomIds.length);
	});

	it('should create a new id with provided value', () => {
		const id = new UniqueEntityID('my_value');

		expect(id.toString()).toBe('my_value');
	});

	it('should compare two different values', () => {
		const idA = new UniqueEntityID('my_value_A');
		const idB = new UniqueEntityID('my_value_B');
		const idC = new UniqueEntityID('my_value_A');

		expect(idA.equals(idB)).toBe(false);
		expect(idA.equals(idC)).toBe(true);
	});
});
