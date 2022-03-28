import pino, { LoggerOptions } from 'pino';

const config: LoggerOptions = {
	transport: {
		target: 'pino-pretty',
		options: {
			translateTime: 'HH:MM:ss',
			messageFormat: '{levelLabel} {pid} {msg}',
			ignore: 'pid,hostname',
			prettyPrint: {
				colorize: true,
				levelFirst: true,
			},
		},
	},
};

type LogsType = 'error' | 'info' | 'warn';

export const checkEnv = (callback: Function, type?: LogsType): void => {
	const isProduction = process.env.NODE_ENV === 'production';
	const isLogOff = process.env.TYPES_DDD_LOGS === 'off';
	const errorTypeMatch = process.env.TYPES_DDD_LOGS === type;

	if ((!isProduction && !isLogOff) || errorTypeMatch) {
		callback();
	}
};
pino();
const Logger = {
	info: (message: string) => {
		const callback = () => pino(config).info({}, message);
		checkEnv(callback, 'info');
	},
	error: (message: string) => {
		const callback = () => pino(config).error({}, message);
		checkEnv(callback, 'error');
	},
	warn: (message: string) => {
		const callback = () => pino(config).warn({}, message);
		checkEnv(callback, 'warn');
	},
};

export { Logger };
export default Logger;
