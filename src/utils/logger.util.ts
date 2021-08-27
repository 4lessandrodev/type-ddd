import pino from 'pino';

const config = {
	prettyPrint: {
		colorize: true,
		levelFirst: true,
		messageFormat: '{levelLabel} {pid} {msg}',
		translateTime: 'HH:MM:ss',
		ignore: 'pid,hostname',
	},
};

const Logger = {
	info: (message: string) => pino(config).info({}, message),
	error: (message: string) => pino(config).error({}, message),
	warn: (message: string) => pino(config).warn({}, message),
};

export { Logger };
export default Logger;
