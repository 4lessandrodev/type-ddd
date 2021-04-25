/**
 * @description
 * Result as its name says, returns an instance capable of identifying
 * whether the processing of a function was successful or failed.
 * And most importantly, it does not throw errors
 */
export default class Result<T> {
     public isSuccess: boolean;
     public isFailure: boolean;
     public error: T | string;
     private _value: T;

     public constructor(
          isSuccess: boolean,
          error?: T | string | null,
          value?: T,
     ) {
          if (isSuccess && error) {
               throw new Error(
                    'InvalidOperation: A result cannot be successful and contain an error',
               );
          }
          if (!isSuccess && !error) {
               throw new Error(
                    'InvalidOperation: A failing result needs to contain an error message',
               );
          }

          this.isSuccess = isSuccess;
          this.isFailure = !isSuccess;
          this.error = error as T;
          this._value = value as T;

          Object.freeze(this);
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
               console.log(this.error);
               throw new Error(
                    'Can not get the value of an error result. Use errorValue instead.',
               );
          }

          return this._value;
     }

     public errorValue(): T {
          return this.error as T;
     }

     /**
      *
      * @param value as U
      * @returns instance of Result with value
      *
      * @example
      * Result.ok<string>("simple string");
      *
      *
      */
     public static ok<U>(value?: U): Result<U> {
          return new Result<U>(true, null, value);
     }

     /**
      *
      * @param error string
      * @returns instance of Result with error
      *
      * @example
      * Result.fail<string>("your error message");
      */
     public static fail<U>(error: string): Result<U> {
          return new Result<U>(false, error);
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

export { Result };
