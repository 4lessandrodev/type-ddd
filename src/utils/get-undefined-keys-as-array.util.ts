interface Params {
	object: Object;
	includesNull: boolean;
}

/**
 *
 * @param params object and boolean to check or not nullable value
 * @returns array with undefined keys
 */
const getUndefinedKeysAsArray = (params: Params): string[] => {
	const undefinedKeys: string[] = [];
	const keys = Object.keys(params.object);

	if (keys.length < 1) {
		return [];
	}

	for (const key of keys) {
		const objKey = key as keyof Object;
		if (
			typeof params.object[objKey] === 'undefined' ||
			(params.object[objKey] === null && params.includesNull)
		)
			undefinedKeys.push(key);
	}

	return undefinedKeys;
};

export { getUndefinedKeysAsArray };
export default getUndefinedKeysAsArray;
