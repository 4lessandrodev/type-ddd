import ShortDomainId from '../../lib/core/short-domain-id';

describe('short-domain-id', () => {
	it('should be defined', () => {
		const id = ShortDomainId.create;
		expect(id).toBeDefined();
	});

	it('should create a new uuid as id', () => {
		const id = ShortDomainId.create().toString();
		expect(id.length).toBeGreaterThan(10);
	});

	it('should accept a provided value as id', () => {
		const id = ShortDomainId.create('provided_id').toString();
		expect(id).toBe('provided_id');
	});

	it('should create a new Id', () => {
		const id = ShortDomainId.create();
		expect(id).toBeInstanceOf(ShortDomainId);
	});

	it('should compare', () => {
		const IdA = ShortDomainId.create('id_a');
		const isEqual = ShortDomainId.create('id_a').equals(IdA);
		expect(isEqual).toBeTruthy();
	});

	it('should compare', () => {
		const IdA = ShortDomainId.create('id_a');
		const isEqual = ShortDomainId.create('id_b').equals(IdA);
		expect(isEqual).toBeFalsy();
	});

	it('should compare', () => {
		const IdA = ShortDomainId.create('id_a');
		const isEqual = ShortDomainId.create('id_a').value.equals(IdA.value);
		expect(isEqual).toBeTruthy();
	});

	it('should compare', () => {
		const IdA = ShortDomainId.create('id_a');
		const isEqual = ShortDomainId.create('id_b').value.equals(IdA.value);
		expect(isEqual).toBeFalsy();
	});

	it('should generate a short id', () => {
		const uuid = ShortDomainId.create();
		expect(uuid.toString()).toHaveLength(16);
	});

	it('should generate a short id unique', () => {
		const results: string[] = [];

		let i = 0;
		while (i < 1000) {
			const ID = ShortDomainId.create();
			results.push(ID.uid);
			i++;
		}
		const uniques = [...new Set(results)];
		//console.table(uniques);

		expect(uniques).toHaveLength(1000);
	});

	it('should generate the same short id', () => {
		const id = ShortDomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect(id.uid).toBe('31fbb4859e3301fc');
	});

	it('should return the same value if is not an uuid', () => {
		const id = ShortDomainId.create('valid_id');
		expect(id.uid).toBe('valid_id');
	});

	it('should return formatted value ', () => {
		const id = ShortDomainId.create('long_but_invalid_uid');
		expect(id.uid).toBe('long_but_invalid');
	});

	it('should generate the same short id but you ca choose size', () => {
		const id = ShortDomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf', { length: 21 });
		expect(id.uid).toBe('31fbb4859e3301fcfe59a');
	});

	it('should GET the same short id', () => {
		const ID = ShortDomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf', { length: 14 });
		expect(ID.uid).toBe('31fbb4859e3301');
	});

	it('should GET the same id', () => {
		const ID = ShortDomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect(ID.uid).toBe('31fbb4859e3301fc');
	} );
	
	it('should GET the same id', () => {
		const ID = ShortDomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect(ID.toValue()).toBe('31fbb4859e3301fc');
	} );
	
	it('should create a new id', () => {
		const ID = ShortDomainId.create();
		expect( ID.isNew ).toBeTruthy();
	} );
	
	it('should create a new id', () => {
		const ID = ShortDomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect( ID.isNew ).toBeFalsy();
	} );
	
	it('should clone existing id as a new one', () => {
		const ID = ShortDomainId.create('31fbb4859e3301fc');
		expect( ID.isNew ).toBeFalsy();

		const NEW_ID = ID.clone();
		expect( NEW_ID.isNew ).toBeTruthy();
		expect( NEW_ID.uid ).toBe('31fbb4859e3301fc');
	} );
	
	it('should clone existing id as existing', () => {
		const ID = ShortDomainId.create('31fbb4859e3301fc');
		expect( ID.isNew ).toBeFalsy();

		const NEW_ID = ID.clone({ isNew: false });
		expect( NEW_ID.isNew ).toBeFalsy();
		expect( NEW_ID.uid ).toBe('31fbb4859e3301fc');
	});
});
