import Logger from "../utils/logger.util";

type SuccessStatus = 100 | 101 | 102 | 200 | 201 | 202 | 203 | 204 | 205 | 206;
type ErrorStatus = 300 | 301 | 302 | 303 | 304 | 305 | 306 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 422 | 500 | 501 | 502 | 503 | 504 | 505;

/**
 * @description
 * Result as its name says, returns an instance capable of identifying
 * whether the processing of a function was successful or failed.
 * And most importantly, it does not throw errors
 */
 class Result<T> {
	  public isSuccess: boolean;
	  public isFailure: boolean;
	  public statusCode: SuccessStatus | ErrorStatus;
	  public error: T | string;
	  private _value: T;
 
	  public constructor(
		   isSuccess: boolean,
		   error?: T | string | null,
		   statusCode?: SuccessStatus | ErrorStatus | null,
		   value?: T
	  ) {
		   if (isSuccess && error) {
			   Logger.error('InvalidOperation: A result cannot be successful and contain an error');
			   this.printError();
			}
			if (!isSuccess && !error) {
				Logger.error( 'InvalidOperation: A failing result needs to contain an error message');
				this.printError();
			}
			if (statusCode) {
				this.statusCode = statusCode;
			} else if (error && !statusCode) {
				this.statusCode = 412;
			} else if (isSuccess && !statusCode) {
				this.statusCode = 200;
			} else {
				this.statusCode = 400;
				Logger.error('Could not define StatusCode for result');
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
				Logger.error('Can not get the value of an error result. Use errorValue instead.');
				Logger.error(JSON.stringify(this));
				this.printError();
			}
			return this._value;
	  }
 
	  public errorValue(): T {
		   return this.error as T;
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
