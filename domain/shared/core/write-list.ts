export interface IList<T> {
     currentItems: T[] | readonly T[];
     initialItems: T[] | readonly T[];
     newItems: T[] | readonly T[];
     removedItems: T[] | readonly T[];
     isEmpty: boolean;
}

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

     abstract compareItems(a: T, b: T): boolean;

     get isEmpty(): boolean {
          return this.currentItems.length === 0;
     }

     get hasNewItems(): boolean {
          return this.newItems.length > 0;
     }

     private isCurrentItem(item: T): boolean {
          return (
               this.currentItems.filter((v: T) => this.compareItems(item, v))
                    .length !== 0
          );
     }

     private isNewItem(item: T): boolean {
          return (
               this.newItems.filter((v: T) => this.compareItems(item, v))
                    .length !== 0
          );
     }

     private isRemovedItem(item: T): boolean {
          return (
               this.removedItems.filter((v: T) => this.compareItems(item, v))
                    .length !== 0
          );
     }

     private removeFromNew(item: T): void {
          this.newItems = this.newItems.filter(
               (v) => !this.compareItems(v, item),
          );
     }

     private removeFromCurrent(item: T): void {
          this.currentItems = this.currentItems.filter(
               (v) => !this.compareItems(item, v),
          );
     }

     private removeFromRemoved(item: T): void {
          this.removedItems = this.removedItems.filter(
               (v) => !this.compareItems(item, v),
          );
     }

     private wasAddedInitially(item: T): boolean {
          return (
               this.initialItems.filter((v: T) => this.compareItems(item, v))
                    .length !== 0
          );
     }

     exists(item: T): boolean {
          return this.isCurrentItem(item);
     }

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

     addMany(items: T[]): void {
          for (const item of items) {
               this.add(item);
          }
     }

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

     removeMany(items: T[]): void {
          for (const item of items) {
               this.remove(item);
          }
     }
}

export { WriteList };
