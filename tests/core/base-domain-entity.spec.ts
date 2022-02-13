import { DomainId } from '../../lib';
import { BaseDomainEntity } from '../../lib/core/base-domain-entity';

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

	it('should keep immutable', () => {
		expect(classTest).toMatchInlineSnapshot(`
		ClassTest {
		  "ID": DomainId {
		    "isNew": true,
		    "props": Object {
		      "value": "${id.uid}",
		    },
		  },
		  "createdAt": ${currentDate.toISOString()},
		  "deletedAt": ${currentDate.toISOString()},
		  "isDeleted": true,
		  "updatedAt": ${currentDate.toISOString()},
		}
	`);
	});
});
