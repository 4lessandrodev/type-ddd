import { Fail } from '../../lib';

describe('fail', () => {
	it('should fail to be defined', () => {
		const result = Fail();
		expect(result.isFail()).toBeTruthy();
	});
});
