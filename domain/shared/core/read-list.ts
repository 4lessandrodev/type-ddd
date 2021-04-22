import WriteList, { IList } from './write-list';

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

     get isEmpty(): boolean {
          return this?.currentItems.length === 0;
     }
}

export { ReadList };
