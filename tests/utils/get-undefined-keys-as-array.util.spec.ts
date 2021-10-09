import getUndefinedKeysAsArray from '../../lib/utils/get-undefined-keys-as-array.util';

describe('get-undefined-keys-as-array.util', () => {
	const currentDate = new Date();
	const obj = {
		name: 'username',
		email: 'some@domain.com',
		terms: {
			ip: '127.0.0.1',
			browser: 'firefox',
			createdAt: currentDate,
		},
		something: undefined,
		age: undefined,
		createdAt: undefined,
		notes: null,
		address: null,
		updatedAt: currentDate,
	};

	it('should be defined', () => {
		expect(getUndefinedKeysAsArray).toBeDefined();
	});

	it('should identify undefined keys without nullable keys', () => {
		const keys = getUndefinedKeysAsArray({
			object: obj,
			includesNull: false,
		});
		expect(keys).toEqual(['something', 'age', 'createdAt']);
	});

	it('should identify undefined keys with nullable keys', () => {
		const keys = getUndefinedKeysAsArray({
			object: obj,
			includesNull: true,
		});
		expect(keys).toEqual([
			'something',
			'age',
			'createdAt',
			'notes',
			'address',
		]);
	});

	it('should return an empty array if provided not undefined keys', () => {
		const keys = getUndefinedKeysAsArray({
			object: { id: '1', name: 'some' },
			includesNull: true,
		});
		expect(keys).toEqual([]);
	});

	it('should return an empty array if provided not undefined keys', () => {
		const keys = getUndefinedKeysAsArray({
			object: { id: '1', name: 'some', note: null },
			includesNull: false,
		});
		expect(keys).toEqual([]);
	});

	it('should return an empty array if provided not undefined keys', () => {
		const keys = getUndefinedKeysAsArray({
			object: { id: '1', name: 'some', note: null },
			includesNull: true,
		});
		expect(keys).toEqual(['note']);
	});

	it('should return an empty array if provided empty obj', () => {
		const keys = getUndefinedKeysAsArray({
			object: {},
			includesNull: true,
		});
		expect(keys).toEqual([]);
	});

	it('should get sub key', () => {
		const keys = getUndefinedKeysAsArray({
			object: {
				test: 'hello',
				val: undefined,
				profile: {
					isMarried: undefined,
					age: 21,
					children: {
						isMarried: undefined,
						age: 21,
					},
					grades: [9, 7, 6],
				},
				grades: [9, 7, 6],
			},
			includesNull: false,
		});
		expect(keys).toEqual([
			'val',
			'profile.isMarried',
			'profile.children.isMarried',
		]);
	});

	it('should get sub key', () => {
		const keys = getUndefinedKeysAsArray({
			object: {
				test: 'hello',
				val: undefined,
				profile: {
					me: undefined,
					age: 21,
					children: {
						isMarried: undefined,
						nick: undefined,
						age: 21,
					},
					grades: [9, 7, 6],
				},
				grades: [9, 7, 6],
			},
			includesNull: false,
		});
		expect(keys).toEqual([
			'val',
			'profile.me',
			'profile.children.isMarried',
			'profile.children.nick',
		]);
	});

	it('should get only simple keys not included sub object', () => {
		const keys = getUndefinedKeysAsArray({
			object: {
				test: 'hello',
				val: undefined,
				profile: {
					isMarried: undefined,
					age: 21,
					children: {
						isMarried: undefined,
						age: 21,
					},
					grades: [9, 7, 6],
				},
				grades: [9, 7, 6],
			},
			includesNull: false,
			ignoreSubObject: true,
		});
		expect(keys).toEqual(['val']);
	});
});
