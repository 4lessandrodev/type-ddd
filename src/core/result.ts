import Logger from '../utils/logger.util';
/*
 * @property `100` Continue
 * @property `101` Switching Protocols
 * @property `102` Processing (WebDAV)
 * @property `200` OK
 * @property `201` Created
 * @property `202` Accepted
 * @property `203` Non-Authoritative Information
 * @property `204` No Content
 * @property `205` Reset Content
 * @property `206` Partial Content
 */
enum SuccessStatusEnum {
	CONTINUE = 100,
	SWITCHING_PROTOCOL = 101,
	PROCESSING = 102,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE = 203,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
}

type SuccessStatus = keyof typeof SuccessStatusEnum;

/**
 *
 * @param error string
 * @param statusCode optional number
 * @returns instance of Result with error
 *
 * @example
 * Result.fail<string>("your error message");
 *
 * @property `300` Multiple Choices
 * @property `301` Moved Permanently
 * @property `302` Found
 * @property `303` See Other
 * @property `304` Not Modified
 * @property `305` Use Proxy
 * @property `306` (Unused)
 * @property `400` Bad Request
 * @property `401` Unauthorized
 * @property `402` Payment Required
 * @property `403` Forbidden
 * @property `404` Not Found
 * @property `405` Method Not Allowed
 * @property `406` Not Acceptable
 * @property `407` Proxy Authentication Required
 * @property `408` Request Timeout
 * @property `409` Conflict
 * @property `410` Gone
 * @property `411` Length Required
 * @property `412` Precondition Failed
 * @property `413` Request Entity Too Large
 * @property `415` Unsupported Media Type
 * @property `422` Unprocessable Entity (WebDAV)
 * @property `451` Unavailable For Legal Reasons
 * @property `500` Internal Server Error
 * @property `501` Not Implemented
 * @property `502` Bad Gateway
 * @property `503` Service Unavailable
 * @property `504` Gateway Timeout
 */
enum ErrorStatusEnum {
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	USE_PROXY = 305,
	UNUSED = 306,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATED_REQUIRED = 407,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	REQUEST_ENTITY_TOO_LARGE = 413,
	UNSUPPORTED_MEDIA_TYPE = 415,
	UNPROCESSABLE_ENTITY = 422,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
}

type ErrorStatus = keyof typeof ErrorStatusEnum;

/**
 * @description
 * Result as its name says, returns an instance capable of identifying
 * whether the processing of a function was successful or failed.
 * And most importantly, it does not throw errors
 */
class Result<T> {
	public readonly isSuccess: boolean;
	public readonly isFailure: boolean;
	/**
	 * @default OK for success
	 * @default PRECONDITION_FAILED for error
	 */
	public readonly statusCode: SuccessStatus | ErrorStatus;
	/**
	 * @default 200 for success
	 * @default 422 for error
	 */
	public readonly statusCodeNumber: number;
	public readonly error: T | string;
	private _value: T;

	public constructor(
		isSuccess: boolean,
		error?: T | string | null,
		statusCode?: SuccessStatus | ErrorStatus | null,
		value?: T
	) {
		if (isSuccess && error) {
			Logger.error(
				'InvalidOperation: A result cannot be successful and contain an error'
			);
			this.statusCodeNumber = 409;
			this.printError();
		}
		if (!isSuccess && !error) {
			Logger.error(
				'InvalidOperation: A failing result needs to contain an error message'
			);
			this.statusCodeNumber = 409;
			this.printError();
		}
		if (statusCode) {
			this.statusCode = statusCode;
			if (isSuccess) {
				this.statusCodeNumber = SuccessStatusEnum[this.statusCode];
			} else {
				this.statusCodeNumber = ErrorStatusEnum[this.statusCode];
			}
		} else if (error && !statusCode) {
			this.statusCode = 'UNPROCESSABLE_ENTITY';
			this.statusCodeNumber = 422;
		} else if (isSuccess && !statusCode) {
			this.statusCode = 'OK';
			this.statusCodeNumber = 200;
		} else {
			this.statusCode = 'BAD_REQUEST';
			Logger.error(
				'Could not define StatusCode for result. By default It was defined as 400'
			);
			this.statusCodeNumber = 400;
			this.statusCode = 'BAD_REQUEST';
			Logger.warn(JSON.stringify(this));
			this.printError();
		}

		this.isSuccess = isSuccess;
		this.isFailure = !isSuccess;
		this.error = error as T;
		this._value = value as T;

		Object.freeze(this);
	}

	private printError(): void {
		let match;
		const stack = new Error().stack ?? '';
		try {
			match = stack.match(/at Object\.\<anonymous\> \(.*/);
		} catch {
			match = stack.match(/  at\s.*  /);
		}
		Logger.error(match[0]);
	}

	/**
	 * @description If success returns an instance of provided class.
	 *
	 * @example
	 * const result = Result.ok<string>("simple string");
	 *
	 * console.log(result.getResult());
	 *
	 * > "simple string"
	 *
	 */
	public getResult(): T {
		if (!this.isSuccess) {
			Logger.error(
				'Can not get the value of an error result. Use errorValue instead.'
			);
			Logger.error(JSON.stringify(this));
			this.printError();
		}
		return this._value;
	}

	/**
	 *
	 * @returns error as string
	 */
	public errorValue(): string {
		return this.error as string;
	}

	/**
	 *
	 * @param value as U
	 * @param statusCode optional number
	 * @returns instance of Result with value
	 *
	 * @example
	 * Result.ok<string>("simple string");
	 *
	 * @property `100` Continue
	 * @property `101` Switching Protocols
	 * @property `102` Processing (WebDAV)
	 * @property `200` OK
	 * @property `201` Created
	 * @property `202` Accepted
	 * @property `203` Non-Authoritative Information
	 * @property `204` No Content
	 * @property `205` Reset Content
	 * @property `206` Partial Content
	 */
	public static ok<U>(value?: U, statusCode?: SuccessStatus): Result<U> {
		return new Result<U>(true, null, statusCode, value);
	}

	/**
	 *
	 * @param error string
	 * @param statusCode optional number
	 * @returns instance of Result with error
	 *
	 * @example
	 * Result.fail<string>("your error message");
	 *
	 * @property `300` Multiple Choices
	 * @property `301` Moved Permanently
	 * @property `302` Found
	 * @property `303` See Other
	 * @property `304` Not Modified
	 * @property `305` Use Proxy
	 * @property `306` (Unused)
	 * @property `400` Bad Request
	 * @property `401` Unauthorized
	 * @property `402` Payment Required
	 * @property `403` Forbidden
	 * @property `404` Not Found
	 * @property `405` Method Not Allowed
	 * @property `406` Not Acceptable
	 * @property `407` Proxy Authentication Required
	 * @property `408` Request Timeout
	 * @property `409` Conflict
	 * @property `410` Gone
	 * @property `411` Length Required
	 * @property `412` Precondition Failed
	 * @property `413` Request Entity Too Large
	 * @property `415` Unsupported Media Type
	 * @property `422` Unprocessable Entity (WebDAV)
	 * @property `451` Unavailable For Legal Reasons
	 * @property `500` Internal Server Error
	 * @property `501` Not Implemented
	 * @property `502` Bad Gateway
	 * @property `503` Service Unavailable
	 * @property `504` Gateway Timeout
	 * @property `505` HTTP Version Not Supported
	 */
	public static fail<U>(error: string, statusCode?: ErrorStatus): Result<U> {
		return new Result<U>(false, error, statusCode);
	}

	/**
	 *
	 * @param results Array of Result
	 * @returns Result with success or error
	 */
	public static combine(results: Result<any>[]): Result<any> {
		for (const result of results) {
			if (result.isFailure) return result;
		}
		return Result.ok();
	}
}

export { Result, SuccessStatus, ErrorStatus };
export default Result;
