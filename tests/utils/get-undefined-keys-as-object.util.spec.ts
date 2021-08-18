import getUndefinedKeysAsObject from '../../src/utils/get-undefined-keys-as-object.util';

describe('get-undefined-keys-as-array.util', ()=>{

	const obj = {
		name: 'username',
		email: 'some@domain.com',
		terms: {
			ip: '127.0.0.1',
			browser: 'firefox'
		},
		something: undefined,
		age: undefined,
		createdAt: undefined,
		notes: null,
		address: null
	}

	it('should be defined', ()=>{
		expect(getUndefinedKeysAsObject).toBeDefined()
	})

	it('should identify undefined keys without nullable keys', ()=>{
		const keys = getUndefinedKeysAsObject({ object: obj, includesNull: false });
		expect(keys).toEqual({ something: '', age: '', createdAt: '' });
	})

	it('should identify undefined keys with nullable keys', ()=>{
		const keys = getUndefinedKeysAsObject({ object: obj, includesNull: true });
		expect(keys).toEqual({ something: '', age: '', createdAt: '', notes: '', address: '' });
	})

	it('should return an empty object if provided not undefined keys', ()=>{
		const keys = getUndefinedKeysAsObject({ object: { id: '1', name: 'some' }, includesNull: true });
		expect(keys).toEqual({});
	})

	it('should return an empty object if provided not undefined keys', ()=>{
		const keys = getUndefinedKeysAsObject({ object: { id: '1', name: 'some', note: null }, includesNull: false });
		expect(keys).toEqual({});
	})

	it('should return an empty object if provided not undefined keys', ()=>{
		const keys = getUndefinedKeysAsObject({ object: { id: '1', name: 'some', note: null }, includesNull: true });
		expect(keys).toEqual({ note: '' });
	})

	it('should return an empty object if provided empty obj', ()=>{
		const keys = getUndefinedKeysAsObject({ object: { }, includesNull: true });
		expect(keys).toEqual({});
	})
})
