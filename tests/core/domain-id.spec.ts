import DomainId from '../../lib/core/domain-id';

describe('domain-id', () => {
	it('should be defined', () => {
		const id = DomainId.create;
		expect(id).toBeDefined();
	});

	it('should create a new uuid as id', () => {
		const id = DomainId.create().toString();
		expect(id.length).toBeGreaterThan(10);
	});

	it('should accept a provided value as id', () => {
		const id = DomainId.create('provided_id').toString();
		expect(id).toBe('provided_id');
	});

	it('should create a new Id', () => {
		const id = DomainId.create();
		expect(id).toBeInstanceOf(DomainId);
	});

	it('should compare', () => {
		const IdA = DomainId.create('id_a');
		const isEqual = DomainId.create('id_a').equals(IdA);
		expect(isEqual).toBeTruthy();
	});

	it('should compare', () => {
		const IdA = DomainId.create('id_a');
		const isEqual = DomainId.create('id_b').equals(IdA);
		expect(isEqual).toBeFalsy();
	});

	it('should compare', () => {
		const IdA = DomainId.create('id_a');
		const isEqual = DomainId.create('id_a').value.equals(IdA.value);
		expect(isEqual).toBeTruthy();
	});

	it('should compare', () => {
		const IdA = DomainId.create('id_a');
		const isEqual = DomainId.create('id_b').value.equals(IdA.value);
		expect(isEqual).toBeFalsy();
	});

	it('should generate a short id', () => {
		const uuid = DomainId.create();
		const short = uuid.toShort();
		expect(short).toBeDefined();
		expect(short.toString()).toHaveLength(14);
	});

	it('should generate a short id unique', () => {
		const results: string[] = [];

		let i = 0;
		while (i < 1000) {
			const ID = DomainId.create();
			const short = ID.toShort().toString();
			results.push(short);
			i++;
		}
		const uniques = [...new Set(results)];
		// console.table(uniques);

		expect(uniques).toHaveLength(1000);
	});

	it('should generate the same short id', () => {
		const uid = DomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect(uid.toShort().uid).toBe('31fbb4859e3301');
	});

	it('should return the same value if is not an uuid', () => {
		const uid = DomainId.create('valid_id');
		expect(uid.toShort().uid).toBe('valid_id');
	});

	it('should return formatted value ', () => {
		const uid = DomainId.create('long_but_invalid_uuid');
		expect(uid.toShort().uid).toBe('long_but_inval');
	});

	it('should generate the same short id but you ca choose size', () => {
		const uid = DomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect(uid.toShort({ length: 21 }).uid).toBe('31fbb4859e3301fcfe59a');
	});
});
