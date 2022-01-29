import { Result, AggregateRoot, BaseDomainEntity } from '../../dist/core';

describe( 'short imports', () => {
	it( 'should accept import all from core index', () => {

		expect( Result ).toBeDefined();
		expect( AggregateRoot ).toBeDefined();
		expect( BaseDomainEntity ).toBeDefined();
		
	} )
} );
