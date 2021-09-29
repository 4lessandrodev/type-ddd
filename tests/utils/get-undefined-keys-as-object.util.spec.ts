import getUndefinedKeysAsObject from '../../lib/utils/get-undefined-keys-as-object.util';

describe('get-undefined-keys-as-array.util', () => {
	const obj = {
		name: 'username',
		email: 'some@domain.com',
		terms: {
			ip: '127.0.0.1',
			browser: 'firefox',
		},
		something: undefined,
		age: undefined,
		createdAt: undefined,
		notes: null,
		address: null,
	};

	it('should be defined', () => {
		expect(getUndefinedKeysAsObject).toBeDefined();
	});

	it('should identify undefined keys without nullable keys', () => {
		const keys = getUndefinedKeysAsObject({
			object: obj,
			includesNull: false,
		});
		expect(keys).toEqual({ something: '', age: '', createdAt: '' });
	});

	it('should identify undefined keys with nullable keys', () => {
		const keys = getUndefinedKeysAsObject({
			object: obj,
			includesNull: true,
		});
		expect(keys).toEqual({
			something: '',
			age: '',
			createdAt: '',
			notes: '',
			address: '',
		});
	});

	it('should identify undefined keys with empty keys', () => {
		const keys = getUndefinedKeysAsObject({
			object: obj,
			includesNull: true,
			applyKeyValue: 'empty',
		});
		expect(keys).toEqual({
			something: '',
			age: '',
			createdAt: '',
			notes: '',
			address: '',
		});
	});

	it('should identify undefined keys with null value', () => {
		const keys = getUndefinedKeysAsObject({
			object: {
				id: undefined,
				prop: null,
				name: 'Peter',
				profile: {
					points: null,
					game: 'got',
					total: undefined,
				},
			},
			includesNull: true,
			applyKeyValue: 'null',
		});
		expect(keys).toEqual({
			id: null,
			prop: null,
			profile: {
				points: null,
				total: null,
			},
		});
	});

	it('should identify undefined keys with undefined value', () => {
		const keys = getUndefinedKeysAsObject({
			object: {
				id: undefined,
				prop: null,
				name: 'Peter',
				profile: {
					points: null,
					game: 'got',
					total: undefined,
				},
			},
			includesNull: true,
			applyKeyValue: 'undefined',
		});
		expect(keys).toEqual({
			id: undefined,
			prop: undefined,
			profile: {
				points: undefined,
				total: undefined,
			},
		});
	});

	it('should identify undefined keys with null value', () => {
		const keys = getUndefinedKeysAsObject({
			object: {
				id: undefined,
				prop: null,
				name: 'Peter',
				profile: {
					points: null,
					game: 'got',
					total: undefined,
				},
			},
			includesNull: true,
			applyKeyValue: 'zero',
		});
		expect(keys).toEqual({
			id: 0,
			prop: 0,
			profile: {
				points: 0,
				total: 0,
			},
		});
	});

	it('should return an empty object if provided not undefined keys', () => {
		const keys = getUndefinedKeysAsObject({
			object: { id: '1', name: 'some' },
			includesNull: true,
		});
		expect(keys).toEqual({});
	});

	it('should return an empty object if provided not undefined keys', () => {
		const keys = getUndefinedKeysAsObject({
			object: { id: '1', name: 'some', note: null },
			includesNull: false,
		});
		expect(keys).toEqual({});
	});

	it('should return an empty object if provided not undefined keys', () => {
		const keys = getUndefinedKeysAsObject({
			object: { id: '1', name: 'some', note: null },
			includesNull: true,
		});
		expect(keys).toEqual({ note: '' });
	});

	it('should return an empty object if provided empty obj', () => {
		const keys = getUndefinedKeysAsObject({
			object: {},
			includesNull: true,
		});
		expect(keys).toEqual({});
	});

	it('should get undefined keys for subObject', () => {
		const keys = getUndefinedKeysAsObject({
			object: {
				name: 'Andres',
				mother: 'Lane',
				father: undefined,
				uncle: null,
				profile: {
					age: 21,
					grades: [5, 8, 9],
					isMarried: false,
					movies: ['matrix'],
					series: undefined,
					note: null,
					child: {
						note: null,
						age: undefined,
						name: 'Luck',
						grades: [5, 8, 9],
					},
				},
			},
			includesNull: true,
			ignoreSubObject: false,
		});

		expect(keys).toEqual({
			father: '',
			uncle: '',
			profile: { series: '', note: '', child: { note: '', age: '' } },
		});
	});

	it('should get undefined keys for subObject by default and not include null', () => {
		const keys = getUndefinedKeysAsObject({
			object: {
				name: 'Andres',
				mother: 'Lane',
				father: undefined,
				uncle: null,
				profile: {
					age: 21,
					grades: [5, 8, 9],
					isMarried: false,
					movies: ['matrix'],
					series: undefined,
					note: null,
					child: {
						note: null,
						age: undefined,
						name: 'Luck',
						grades: [5, 8, 9],
					},
				},
			},
			includesNull: false,
		});

		expect(keys).toEqual({
			father: '',
			profile: { series: '', child: { age: '' } },
		});
	});

	it('should get undefined keys not included subObject ', () => {
		const keys = getUndefinedKeysAsObject({
			object: {
				name: 'Andres',
				mother: 'Lane',
				father: undefined,
				uncle: null,
				profile: {
					age: 21,
					grades: [5, 8, 9],
					isMarried: false,
					movies: ['matrix'],
					series: undefined,
					note: null,
					child: {
						note: null,
						age: undefined,
						name: 'Luck',
						grades: [5, 8, 9],
					},
				},
			},
			includesNull: true,
			ignoreSubObject: true,
		});

		expect(keys).toEqual({
			father: '',
			uncle: '',
		});
	});

	it('should return object as string path', () => {
		const object = {
			name: 'Andres',
			mother: 'Lane',
			father: undefined,
			uncle: null,
			profile: {
				age: 21,
				grades: [5, 8, 9],
				isMarried: false,
				movies: ['matrix'],
				series: undefined,
				note: null,
				child: {
					note: null,
					age: undefined,
					name: 'Luck',
					grades: [5, 8, 9],
				},
			},
		};
		const keys = getUndefinedKeysAsObject({
			object,
			includesNull: true,
			keyAsStringPath: true,
		});

		console.log(keys);

		expect(keys).toEqual({
			father: '',
			uncle: '',
			'profile.series': '',
			'profile.note': '',
			'profile.child.note': '',
			'profile.child.age': '',
		});
	});
});
