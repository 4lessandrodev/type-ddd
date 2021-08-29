import { DomainId } from '../../src';
import { BaseDomainEntity } from '../../src/core/base-domain-entity';

class ClassTest extends BaseDomainEntity {}

describe('base-domain-entity', () => {
	const currentDate = new Date();
	const id = DomainId.create();

	const classTest = new ClassTest(
		id,
		currentDate,
		currentDate,
		true,
		currentDate
	);

	it('should be defined', () => {
		expect(classTest).toBeDefined();
	});

	it('should be defined', () => {
		expect(classTest.ID).toBeDefined();
		expect(classTest.createdAt).toBeDefined();
		expect(classTest.deletedAt).toBeDefined();
		expect(classTest.isDeleted).toBeDefined();
		expect(classTest.updatedAt).toBeDefined();
	});

	it('should be defined', () => {
		expect(classTest.ID).toBe(id);
		expect(classTest.createdAt).toBe(currentDate);
		expect(classTest.deletedAt).toBe(currentDate);
		expect(classTest.isDeleted).toBe(true);
		expect(classTest.updatedAt).toBe(currentDate);
	});
});
