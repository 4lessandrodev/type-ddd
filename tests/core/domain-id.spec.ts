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

	it('should GET the same id', () => {
		const ID = DomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect(ID.uid).toBe('461235de-ec04-48aa-af94-31fbfa95efcf');
	} );
	
	it('should convert to short uid', () => {
		const ID = DomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect(ID.toShort()).toBe('31fbb4859e3301fc');
	} );
	
	it('should create a new id', () => {
		const ID = DomainId.create();
		expect( ID.isNew ).toBeTruthy();
	} );
	
	it('should create a new id', () => {
		const ID = DomainId.create('461235de-ec04-48aa-af94-31fbfa95efcf');
		expect( ID.isNew ).toBeFalsy();
	});
});
