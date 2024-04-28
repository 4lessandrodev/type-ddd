import { Logger, checkEnv } from '@types-ddd';

describe('Logger', () => {
	it('should log if is not production and log is not off', () => {
		process.env.NODE_ENV = undefined;
		process.env.TYPES_DDD_LOGS = undefined;

		const callback = jest.fn(() => 'Info');

		checkEnv(callback);

		expect(callback).toHaveBeenCalled();
	});

	it('should not log if is production and log is not off', () => {
		process.env.NODE_ENV = 'production';
		process.env.TYPES_DDD_LOGS = undefined;

		const callback = jest.fn(() => 'Info');

		checkEnv(callback);

		expect(callback).not.toHaveBeenCalled();
	});

	it('should not log if is not production and log is off', () => {
		process.env.NODE_ENV = undefined;
		process.env.TYPES_DDD_LOGS = 'off';

		const callback = jest.fn(() => 'Info');

		checkEnv(callback);

		expect(callback).not.toHaveBeenCalled();
	});

	it('should log if is production and log is error', () => {
		process.env.NODE_ENV = 'production';
		process.env.TYPES_DDD_LOGS = 'error';

		const callback = jest.fn(() => 'Error');

		checkEnv(callback, 'error');

		expect(callback).toHaveBeenCalled();
	});

	it('should log if is production and log is error', () => {
		process.env.NODE_ENV = 'production';
		process.env.TYPES_DDD_LOGS = 'info';

		const callback = jest.fn(() => 'Info');

		checkEnv(callback, 'info');

		expect(callback).toHaveBeenCalled();
	});

	it('should log if is production and log is warn', () => {
		process.env.NODE_ENV = 'production';
		process.env.TYPES_DDD_LOGS = 'warn';

		const callback = jest.fn(() => 'Warn');

		checkEnv(callback, 'warn');

		expect(callback).toHaveBeenCalled();
	});

	it('should not log if is production and log is error, but is info log', () => {
		process.env.NODE_ENV = 'production';
		process.env.TYPES_DDD_LOGS = 'error';

		const callback = jest.fn(() => 'Error');

		checkEnv(callback, 'info');

		expect(callback).not.toHaveBeenCalled();
	});

	it('should not log if is production and log is off', () => {
		process.env.NODE_ENV = 'production';
		process.env.TYPES_DDD_LOGS = 'off';

		const callback = jest.fn(() => 'Info');

		checkEnv(callback);

		expect(callback).not.toHaveBeenCalled();
	});

	it('logger must print message', () => {
		process.env.NODE_ENV = undefined;
		process.env.TYPES_DDD_LOGS = undefined;
		Logger.info('some success message');
	});
});
