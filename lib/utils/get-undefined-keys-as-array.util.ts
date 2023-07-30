interface Params {
	object: Object;
	includesNull: boolean;
	ignoreSubObject?: boolean;
}

/**
 *
 * @param params object and boolean to check or not nullable value
 * @returns array with undefined keys
 * @example
 *
 * const user = {
 *    name: "user name",
 *    age: undefined
 * }
 *
 * const result = getUndefinedKeysAsArray(user);
 *
 * console.log(result);
 * > [ "age" ]
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
 * const result = getUndefinedKeysAsArray(user, { includesNull: true });
 *
 * console.log(result);
 * > [ "age", "isMarried" ]
 *
 *
 * ...
 */
const getUndefinedKeysAsArray = (params: Params): string[] => {
	const undefinedKeys: string[] = [];
	const keys = Object.keys(params?.object ?? {});
	const ignoreSubObj =
		typeof params?.ignoreSubObject === 'undefined'
			? false
			: params.ignoreSubObject;

	if (keys.length < 1) {
		return [];
	}

	for (const key of keys) {
		const objKey = key as keyof Object;
		if (
			typeof params.object[objKey] === 'undefined' ||
			(params.object[objKey] === null && params.includesNull)
		) {
			undefinedKeys.push(key);
		} else if (
			typeof params.object[objKey] === 'object' &&
			ignoreSubObj === false
		) {
			const isArray = Array.isArray(params.object[objKey]);

			if (!isArray) {
				const subUndefinedKeys = getUndefinedKeysAsArray({
					includesNull: params.includesNull,
					object: params.object[objKey],
				});
				subUndefinedKeys.map((undefinedKey) =>
					undefinedKeys.push(`${key}.${undefinedKey}`),
				);
			}
		}
	}

	return undefinedKeys;
};

export { getUndefinedKeysAsArray };
export default getUndefinedKeysAsArray;
