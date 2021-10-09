import { removeUndefinedKeysFromObject } from '../../lib/utils/remove-undefined-keys-from-object.util';

describe('remove-undefined-keys-from-object', () => {
	it('should be defined', () => {
		const remove = removeUndefinedKeysFromObject;
		expect(remove).toBeDefined();
	});

	it('should remove undefined keys from simple object', () => {
		const obj = {
			id: 1,
			name: undefined,
			age: null,
			profile: undefined,
			empty: '',
		};

		const remove = removeUndefinedKeysFromObject({
			object: obj,
		});

		expect(remove).toEqual({ id: 1, empty: '' });
	});

	it('should remove undefined keys from simple object', () => {
		const obj = {
			id: 1,
			name: undefined,
			age: null,
			profile: undefined,
			empty: '',
			grades: [7, 8, 9, 5],
		};

		const remove = removeUndefinedKeysFromObject({
			object: obj,
		});

		expect(remove).toEqual({ id: 1, empty: '', grades: [7, 8, 9, 5] });
	});

	it('should remove empty string keys from simple object', () => {
		const obj = {
			id: 1,
			name: undefined,
			age: null,
			profile: undefined,
			empty: '',
			grades: [7, 8, 9, 5],
		};

		const remove = removeUndefinedKeysFromObject({
			object: obj,
			includesEmptyString: true,
		});

		expect(remove).toEqual({ id: 1, grades: [7, 8, 9, 5] });
	});

	it('should remove empty string keys from sub object', () => {
		const obj = {
			id: 1,
			grades: [7, 8, 9, 5],
			profile: {
				name: '',
				age: 21,
				favoriteMovies: ['Star Wars', 'Hulk'],
			},
			empty: '',
		};

		const remove = removeUndefinedKeysFromObject({
			object: obj,
			includesEmptyString: true,
		});
		expect(remove).toEqual({
			id: 1,
			grades: [7, 8, 9, 5],
			profile: { age: 21, favoriteMovies: ['Star Wars', 'Hulk'] },
		});
	});

	it('should remove ignore sub object', () => {
		const obj = {
			id: 1,
			grades: [7, 8, 9, 5],
			profile: {
				name: '',
				age: 21,
				favoriteMovies: ['Star Wars', 'Hulk'],
			},
			empty: '',
		};

		const remove = removeUndefinedKeysFromObject({
			object: obj,
			includesEmptyString: true,
			ignoreSubObject: true,
		});
		expect(remove).toEqual({
			id: 1,
			grades: [7, 8, 9, 5],
			profile: {
				age: 21,
				favoriteMovies: ['Star Wars', 'Hulk'],
				name: '',
			},
		});
	});

	it('should not remove dates from object', () => {
		const currentDate = new Date();
		const obj = {
			id: 1,
			name: undefined,
			age: null,
			profile: undefined,
			empty: '',
			createdAt: currentDate,
			updatedAt: currentDate,
		};

		const remove = removeUndefinedKeysFromObject({
			object: obj,
		});

		expect(remove).toEqual({
			id: 1,
			empty: '',
			createdAt: currentDate,
			updatedAt: currentDate,
		});
	});

	it('should not remove dates from sub object', () => {
		const currentDate = new Date();
		const obj = {
			id: 1,
			name: undefined,
			age: null,
			profile: {
				name: undefined,
				createdAt: currentDate,
				updatedAt: currentDate,
			},
			empty: '',
			createdAt: currentDate,
			updatedAt: currentDate,
		};

		const remove = removeUndefinedKeysFromObject({
			object: obj,
		});

		expect(remove).toEqual({
			id: 1,
			empty: '',
			profile: {
				createdAt: currentDate,
				updatedAt: currentDate,
			},
			createdAt: currentDate,
			updatedAt: currentDate,
		});
	});
});
