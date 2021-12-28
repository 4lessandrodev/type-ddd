import { AGGToDomainMapper, DeepAggregate, ENToDomainMapper } from "../deep-aggregate";

describe( 'deep-aggregate', () => {
	it( 'should deep create entities', () => {

		const nestMapper = new ENToDomainMapper();
		const mapper = new AGGToDomainMapper( nestMapper );
		
		const result = DeepAggregate.build( {
			id: 'valid_id',
			age: new Date('2000-01-01 00:00'),
			children: [
				{
					id: 'valid_id1',
					notes: ['note1', 'note2', 'note3'],
					password: 'valid_pass'
				},
				{
					id: 'valid_id2',
					notes: ['note1', 'note2', 'note3'],
					password: 'valid_pass'
				}
			],
			name: 'valid_name',
			weights: [
				{ value: 10, unit: 'KG' },
				{ value: 7, unit: 'MG' },
				{ value: 3, unit: 'OZ' },
				{ value: 21, unit: 'TON' }
			]
		}, mapper );

		expect( result.isSuccess ).toBeTruthy();
		expect( result.getResult() ).toBeInstanceOf( DeepAggregate );
		expect( result.getResult().children ).toHaveLength( 2 );
		expect( result.getResult().weights ).toHaveLength( 4 );
		expect( result.getResult().children[0].notes ).toHaveLength( 3 );
		expect( result.getResult().children[1].notes ).toHaveLength( 3 );
	})
} )
