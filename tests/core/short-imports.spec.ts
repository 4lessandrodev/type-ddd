import { Result, AggregateRoot, BaseDomainEntity } from '../../lib/core';

describe( 'short imports', () => {
	it( 'should accept import all from core index', () => {

		expect( Result ).toBeDefined();
		expect( AggregateRoot ).toBeDefined();
		expect( BaseDomainEntity ).toBeDefined();
		
	} )
} );
