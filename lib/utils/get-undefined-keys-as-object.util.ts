import getUndefinedKeysAsArray from './get-undefined-keys-as-array.util';

interface Params {
	object: Object;
	includesNull: boolean;
}

/**
 *
 * @param params object and boolean to check or not nullable value
 * @returns object with undefined keys
 * @example
 *
 * const user = {
 *    name: "user name",
 *    age: undefined
 * }
 *
 * const result = getUndefinedKeysAsObject(user);
 *
 * console.log(result);
 * > { age: "" }
 *
 *
 * ...
 *
 * @description
 * You also can get null keys
 *
 * @example
 *
 * const user = {
 *    name: "user name",
 *    age: undefined,
 *    isMarried: null
 * }
 *
 * const result = getUndefinedKeysAsObject(user, { includesNull: true });
 *
 * console.log(result);
 * > { age: "", isMarried: "" }
 *
 *
 * ...
 */
const getUndefinedKeysAsObject = (params: Params): Object => {
	let objResult: Object = {};
	const keys: string[] = getUndefinedKeysAsArray(params);
	if (keys.length < 1) {
		return objResult;
	}

	for (const key of keys) {
		const undefinedKey: Object = { [key]: '' };
		objResult = Object.assign({}, { ...objResult }, { ...undefinedKey });
	}
	return objResult;
};

export { getUndefinedKeysAsObject };
export default getUndefinedKeysAsObject;
