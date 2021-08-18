import getUndefinedKeysAsArray from "./get-undefined-keys-as-array.util";

interface Params {
	object: Object;
	includesNull: boolean;
}

/**
 * 
 * @param params object and boolean to check or not nullable value
 * @returns array with undefined keys
 */
const getUndefinedKeysAsObject = (params: Params): Object => {
	let objResult: Object = {};
	const keys: string[] = getUndefinedKeysAsArray(params);
	if (keys.length < 1) {
		return objResult;
	}

	for (let key of keys) {
		let undefinedKey: Object = { [key]: '' };
		objResult = Object.assign({}, { ...objResult }, { ...undefinedKey });
	}
	return objResult;
}

export { getUndefinedKeysAsObject };
export default getUndefinedKeysAsObject;
