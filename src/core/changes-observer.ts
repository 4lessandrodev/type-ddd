import { Result } from './result';

interface IChangesObserver<T, F> {
	reset: () => ChangesObserver<T, F>;
	isAllResultsSuccess: () => boolean;
	getResult: () => Result<T, F>;
	add: (result: Result<T, F>) => ChangesObserver<T, F>;
	removeLast: () => ChangesObserver<T, F>;
	removeFirst: () => ChangesObserver<T, F>;
	getResultsQtd: () => number;
	getLastRemoved: () => Readonly<Result<T, F>> | null;
	getLastAdded: () => Readonly<Result<T, F>> | null;
	getAllAddedResults: () => Readonly<Result<T, F>[]>;
}

/**
 * @description Keep Results in state to check them
 * @summary Based on builder it returns his own instance on add a new Result
 * @argument T: Generic type to return as success value
 * @argument F: Generic type to return as error value if result is failure.
 * @default T unknown
 * @default F unknown
 * @see Result
 *
 * @example
 * const observer = ChangesObserver.init();
 *
 * const isAllSuccess = observer
 *  .add(Result.ok('1'))
 *  .add(Result.ok('2'))
 *  .add(Result.ok('3'))
 *  .isAllResultsSuccess();
 *
 * console.log(isAllSuccess)
 * > true
 *
 * ...
 */
class ChangesObserver<T, F> implements IChangesObserver<T, F> {
	private results: Result<T, F>[] = [];
	private removed: Result<T, F> | null;
	private added: Result<T, F> | null;

	private constructor(args?: Result<T, F>[]) {
		this.setItems(args);
		this.added = null;
		this.removed = null;
	}

	private setItems(args?: Result<T, F>[]): void {
		if (args) {
			this.results = [...args];
		} else {
			this.results = [];
		}
	}

	/**
	 *
	 * @returns return last removed item if exists.
	 * If It does not exists return null
	 */
	getLastRemoved(): Readonly<Result<T, F>> | null {
		return Object.freeze(this.removed);
	}

	/**
	 *
	 * @returns return last added item if exists.
	 * If It does not exists return null
	 */
	getLastAdded(): Readonly<Result<T, F>> | null {
		return Object.freeze(this.added);
	}

	/**
	 *
	 * @returns return quantity of results are on instance state
	 */
	public getResultsQtd(): number {
		return this.results.length;
	}

	/**
	 *
	 * @param result add a new result on state of instance
	 * @returns instance of ChangesObserver
	 */
	public add(result: Result<T, F>): ChangesObserver<T, F> {
		this.results = this.results.concat(result);
		this.added = result;
		return this;
	}

	/**
	 * @description remove the last added result from state
	 * @returns instance of ChangesObserver
	 */
	public removeLast(): ChangesObserver<T, F> {
		const lasRemoved = this.results.pop();
		if (lasRemoved) {
			this.removed = lasRemoved;
		}
		return this;
	}

	/**
	 * @description remove the first added result from state
	 * @returns instance of ChangesObserver
	 */
	public removeFirst(): ChangesObserver<T, F> {
		const lasRemoved = this.results.shift();
		if (lasRemoved) {
			this.removed = lasRemoved;
		}
		return this;
	}

	/**
	 * @description check if all result on state is success
	 * @returns true if all result are ok. If some is failure return false
	 */
	public isAllResultsSuccess(): boolean {
		return Result.combine(this.results).isSuccess;
	}

	/**
	 * @description check all results on instance state and create a new one with result
	 * @returns instance of result of all checked state. If some is failure return a instance of Result.fail
	 */
	public getResult(): Result<T, F> {
		return Result.combine(this.results);
	}

	/**
	 * @description clear all state. Remove all instances
	 * @virtual also reset last added and last removed
	 * @param args initial state to state
	 * @returns instance of ChangesObserver
	 */
	public reset(args?: Result<T, F>[]): ChangesObserver<T, F> {
		this.setItems(args);
		this.removed = null;
		this.added = null;
		return this;
	}

	/**
	 *
	 * @returns All added Results
	 */
	public getAllAddedResults(): Readonly<Result<T, F>[]> {
		return Object.freeze(this.results);
	}

	/**
	 *
	 * @param args optional results to initial state
	 * @description Keep Results in state to check them
	 * @summary Based on builder it returns his own instance on add a new Result
	 * @argument T: Generic type to return as success value
	 * @argument F: Generic type to return as error value if result is failure.
	 * @default T unknown
	 * @default F unknown
	 * @see Result
	 *
	 * @example
	 * const observer = ChangesObserver.init<any, any>();
	 *
	 * const isAllSuccess = observer
	 *  .add(Result.ok('1'))
	 *  .add(Result.ok('2'))
	 *  .add(Result.ok('3'))
	 *  .isAllResultsSuccess();
	 *
	 * console.log(isAllSuccess)
	 * > true
	 *
	 * ...
	 */
	public static init<T = unknown, F = unknown>(
		args?: Result<T, F>[]
	): ChangesObserver<T, F> {
		return new ChangesObserver<T, F>(args);
	}
}

export { ChangesObserver };
export default ChangesObserver;
