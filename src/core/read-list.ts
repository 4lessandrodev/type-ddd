import WriteList, { IList } from './write-list';

/**
 * @implements IList<T>
 * @readonly `initialItems`: Array<T>
 * @readonly `currentItems`: Array<T>
 * @readonly `newItems`: Array<T>
 * @readonly `removedItems`: Array<T>
 *
 * @description return a readonly list with methods
 */
export default class ReadList<T> implements IList<T> {
	initialItems: readonly T[];
	currentItems: readonly T[];
	newItems: readonly T[];
	removedItems: readonly T[];

	constructor(list?: WriteList<T>) {
		this.currentItems = list?.currentItems ?? [];
		this.newItems = list?.newItems ?? [];
		this.removedItems = list?.removedItems ?? [];
		this.initialItems = list?.initialItems ?? [];
	}

	/**
	 * @returns boolean
	 */
	get isEmpty(): boolean {
		return this?.currentItems.length === 0;
	}
}

export { ReadList };
