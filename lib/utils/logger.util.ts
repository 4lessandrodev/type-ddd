import pino from 'pino';
import { LoggerOptions } from 'pino';

class DefaultLogger {
	protected static pino: any;
	protected static config: LoggerOptions = {
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

	public static init() {
		if (!DefaultLogger.pino) {
			this.pino = pino(DefaultLogger.config);
		}
		return this.pino;
	}
}

type LogsType = 'error' | 'info' | 'warn';

export const checkEnv = (callback: Function, type?: LogsType): void => {
	const isProduction = process.env.NODE_ENV === 'production';
	const isLogOff = process.env.TYPES_DDD_LOGS === 'off';
	const errorTypeMatch = process.env.TYPES_DDD_LOGS === type;

	if ((!isProduction && !isLogOff) || errorTypeMatch) {
		callback();
	}
};

const Logger = {
	info: (message: string) => {
		const callback = () => DefaultLogger.init().info({}, message);
		checkEnv(callback, 'info');
	},
	error: (message: string) => {
		const callback = () => DefaultLogger.init().error({}, message);
		checkEnv(callback, 'error');
	},
	warn: (message: string) => {
		const callback = () => DefaultLogger.init().warn({}, message);
		checkEnv(callback, 'warn');
	},
};

export { Logger };
export default Logger;
