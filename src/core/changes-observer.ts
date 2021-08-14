import { Result } from './result'

interface IChangesObserver<T> {
	reset: ()=> ChangesObserver<T>;
	isAllResultsSuccess: ()=> boolean;
	getResult: ()=> Result<T>;
	add: (result: Result<T>)=> ChangesObserver<T>;
	removeLast: ()=> ChangesObserver<T>;
	removeFirst: ()=> ChangesObserver<T>;
	getResultsQtd:()=> number;
	getLastRemoved: ()=> Readonly<Result<T>> | undefined;
	getLastAdded: ()=> Readonly<Result<T>> | undefined;
}

/**
 * Keep state to check results
 */
class ChangesObserver<T> implements IChangesObserver<T> {
	private results:Result<T>[]=[];
	private removed: Result<T> | undefined;
	private added: Result<T> | undefined;

	private constructor(args?: Result<T>[]){
		this.setItems(args);
		this.added = undefined;
		this.removed = undefined;
	}

	private setItems(args?: Result<T>[]): void {
		if (args) {
			this.results = [...args];
		} else {
			this.results = [];
		}
	}

	/**
	 * 
	 * @returns return last removed item if exists.
	 * If It does not exists return undefined
	 */
	getLastRemoved (): Readonly<Result<T>> | undefined {
		return Object.freeze(this.removed);
	};

	/**
	 * 
	 * @returns return last added item if exists.
	 * If It does not exists return undefined
	 */
	getLastAdded (): Readonly<Result<T>> | undefined {
		return Object.freeze(this.added);
	};

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
	 */
	public add(result: Result<T>):  ChangesObserver<T> {
		this.results = this.results.concat(result);
		this.added = result;
		return this;
	}

	/**
	 * @description remove the last added result from state
	 * @returns removed result or undefined if empty
	 */
	public removeLast():  ChangesObserver<T>{
		this.removed = this.results.pop();
		return this;
	}

	/**
	 * @description remove the first added result from state
	 * @returns removed result or undefined if empty
	 */
	public removeFirst():  ChangesObserver<T> {
		this.removed = this.results.shift();
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
	public getResult(): Result<T> {
		return Result.combine(this.results);
	}

	/**
	 * @description clear all state. Remove all instances
	 * @param args initial state to state
	 */
	public reset(args?: Result<T>[]): ChangesObserver<T> {
		this.setItems(args);
		this.removed = undefined;
		this.added = undefined;
		return this;
	}

	/**
	 * 
	 * @param args results to initial state
	 * @returns instance of ChangesObserver<T>
	 * 
	 * @example 
	 * 
	 * // Starting with initial state:
	 * 
	 * const observer = ChangesObserver.init<string>(
	 * 	[
	 * 		Result.ok<string>("Hello"),
	 * 		Result.ok<string>("World")
	 * 	]
	 * );
	 * 
	 * ...
	 * 
	 * // Starting with no initial state:
	 * 
	 * const observer = ChangesObserver.init<string>();
	 * 
	 * ...
	 * 
	 */
	public static init<T>(args?: Result<T>[]): ChangesObserver<T> {
		return new ChangesObserver<T>(args);
	}
}

export { ChangesObserver };
export default ChangesObserver;
