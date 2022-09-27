import { Fail, Ok } from '../../lib';

describe('result', () => {
	describe('fail', () => {
		it('should create a fail', () => {
			const result = Fail('error message');
			expect(result.isFail()).toBeTruthy();
		});
	});

	describe('should create ok', () => {
		it('should create success', () => {
			const result = Ok(null);
			expect(result.isOk()).toBeTruthy();
		});
	});
});
