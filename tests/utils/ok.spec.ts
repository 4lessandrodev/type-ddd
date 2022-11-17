import { Ok } from '../../lib';

describe('Ok', () => {
	it('should Ok to be defined', () => {
		const result = Ok();
		expect(result.isOk()).toBeTruthy();
	});
});
