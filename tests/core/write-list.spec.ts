import WriteList from '../../src/core/write-list';

describe('write-list', () => {
	//---------------------------------------------------
	//Implement write list
	class writeList extends WriteList<string> {
		private constructor(values?: string[]) {
			super(values);
		}

		compareItems(a: string, b: string): boolean {
			return a === b;
		}

		public static create(values?: string[]): writeList {
			return new writeList(values ?? []);
		}
	}
	//---------------------------------------------------

	it('should start empty', () => {
		const list = writeList.create();
		expect(list.isEmpty).toBe(true);
	});

	it('should add one item', () => {
		const list = writeList.create();
		list.add('Hello');
		expect(list.isEmpty).toBe(false);
		expect(list.currentItems.length).toBe(1);
	});

	it('should add many items', () => {
		const list = writeList.create();
		list.addMany(['Hello', 'World']);
		expect(list.currentItems.length).toBe(2);
	});

	it('should start with many initial items', () => {
		const list = writeList.create(['Start', 'Value']);
		expect(list.currentItems.length).toBe(2);
	});

	it('should remove one item', () => {
		const list = writeList.create(['Start', 'Value']);
		list.remove('Value');
		const removed = list.removedItems;
		expect(list.currentItems.length).toBe(1);
		expect(removed[0]).toBe('Value');
	});

	it('should remove many items', () => {
		const list = writeList.create(['Start', 'Value']);
		list.removeMany(['Start', 'Value']);
		const removed = list.removedItems;
		expect(list.currentItems.length).toBe(0);
		expect(list.isEmpty).toBe(true);
		expect(removed).toEqual(['Start', 'Value']);
	});

	it('should exist a item', () => {
		const list = writeList.create(['Start', 'Value']);
		const exists = list.exists('Start');
		expect(exists).toBe(true);
	});
});
