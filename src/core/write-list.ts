/**
 * @interface IList
 */
export interface IList<T> {
	 currentItems: T[] | readonly T[];
	 initialItems: T[] | readonly T[];
	 newItems: T[] | readonly T[];
	 removedItems: T[] | readonly T[];
	 isEmpty: boolean;
}

/**
 * @type T
 * @implements IList
 * @property `currentItems`:Array
 * @property `initialItems`:Array
 * @property `newItems`:Array
 * @property `removedItems`:Array
 */
export default abstract class WriteList<T> implements IList<T> {
	 currentItems: T[];
	 initialItems: T[];
	 newItems: T[];
	 removedItems: T[];

	 constructor(initialItems?: T[]) {
		  this.currentItems = initialItems ?? [];
		  this.initialItems = initialItems ?? [];
		  this.newItems = [];
		  this.removedItems = [];
	 }

	 /**
	  *
	  * @param a item type T
	  * @param b item type T
	  * @returns boolean
	  */
	 abstract compareItems(a: T, b: T): boolean;

	 /**
	  * @returns boolean
	  * @description check the lengh of current items
	  */
	 get isEmpty(): boolean {
		  return this.currentItems.length === 0;
	 }

	 /**
	  * @returns boolean
	  * @description check the lengh of newItems items
	  */
	 get hasNewItems(): boolean {
		  return this.newItems.length > 0;
	 }

	 /**
	  *
	  * @param item type T
	  * @returns boolean
	  *
	  * @description check if provided item is on current Items
	  */
	 private isCurrentItem(item: T): boolean {
		  return (
			   this.currentItems.filter((v: T) => this.compareItems(item, v))
					.length !== 0
		  );
	 }

	 /**
	  *
	  * @param item type T
	  * @returns boolean
	  *
	  * @description check if provided item is on newItems
	  */
	 private isNewItem(item: T): boolean {
		  return (
			   this.newItems.filter((v: T) => this.compareItems(item, v))
					.length !== 0
		  );
	 }

	 /**
	  *
	  * @param item type T
	  * @returns boolean
	  *
	  * @description check if provided item is on removedItems
	  */
	 private isRemovedItem(item: T): boolean {
		  return (
			   this.removedItems.filter((v: T) => this.compareItems(item, v))
					.length !== 0
		  );
	 }

	 /**
	  *
	  * @param item type T
	  *
	  * @description remove provided item from newItems
	  */
	 private removeFromNew(item: T): void {
		  this.newItems = this.newItems.filter(
			   (v) => !this.compareItems(v, item),
		  );
	 }

	 /**
	  *
	  * @param item type T
	  *
	  * @description remove provided item from currentItems
	  */
	 private removeFromCurrent(item: T): void {
		  this.currentItems = this.currentItems.filter(
			   (v) => !this.compareItems(item, v),
		  );
	 }

	 /**
	  *
	  * @param item type T
	  *
	  * @description remove provided item from removedItems
	  */
	 private removeFromRemoved(item: T): void {
		  this.removedItems = this.removedItems.filter(
			   (v) => !this.compareItems(item, v),
		  );
	 }

	 /**
	  *
	  * @param item type T
	  * @returns boolean if provided item is on initialItems
	  */
	 private wasAddedInitially(item: T): boolean {
		  return (
			   this.initialItems.filter((v: T) => this.compareItems(item, v))
					.length !== 0
		  );
	 }

	 /**
	  *
	  * @param item type T
	  * @returns boolean
	  *
	  * @description check if provided item is on currentItems
	  */
	 exists(item: T): boolean {
		  return this.isCurrentItem(item);
	 }

	 /**
	  *
	  * @param item type T
	  *
	  * @description add item on currentItems
	  * 
	  *  
	  * @example if (this.isRemovedItem(item)) {
			   this.removeFromRemoved(item);
		  }

		 if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
			   this.newItems.push(item);
		  }

		  if (!this.isCurrentItem(item)) {
			   this.currentItems.push(item);
		  }
	  */
	 add(item: T): void {
		  if (this.isRemovedItem(item)) {
			   this.removeFromRemoved(item);
		  }

		  if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
			   this.newItems.push(item);
		  }

		  if (!this.isCurrentItem(item)) {
			   this.currentItems.push(item);
		  }
	 }

	 /**
	  *
	  * @param items type T
	  * @access @method `add` for each item
	  */
	 addMany(items: T[]): void {
		  for (const item of items) {
			   this.add(item);
		  }
	 }

	 /**
	  *
	  * @param item type T
	  * @access @method `removeFromCurrent`
	  */
	 remove(item: T): void {
		  this.removeFromCurrent(item);

		  if (this.isNewItem(item)) {
			   this.removeFromNew(item);
			   return;
		  }

		  if (!this.isRemovedItem(item)) {
			   this.removedItems.push(item);
		  }
	 }

	 /**
	  *
	  * @param items type T
	  * @access @method `remove` for each item
	  */
	 removeMany(items: T[]): void {
		  for (const item of items) {
			   this.remove(item);
		  }
	 }
}

export { WriteList };
