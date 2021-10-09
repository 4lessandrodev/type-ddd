interface Params<T> {
	object: T;
	includesEmptyString?: boolean;
	ignoreSubObject?: boolean;
}

interface CanAddParam {
	value: unknown;
	includesEmptyString: boolean;
}

const canAdd = (param: CanAddParam): boolean => {
	const { value, includesEmptyString } = param;
	return (
		(value !== undefined &&
			includesEmptyString === false &&
			value !== null) ||
		(value !== '' &&
			value !== undefined &&
			includesEmptyString === true &&
			value !== null)
	);
};

/**
 * @description This function removes keys that has undefined/null or empty string value
 * @field null value is considered as undefined
 * @param param Params as Object
 * @example
 * {
 *      object: T;
 *      includesEmptyString?: boolean;
 *      ignoreSubObject?: boolean;
 * }
 * @returns Partial provided object without undefined keys
 * @default includesEmptyString false
 * @default ignoreSubObject false
 * @default object {}
 *
 * @example
 *
 * const obj = {
 *		id: 1,
 *		name: undefined,
 *		age: null,
 *		profile: undefined,
 *		empty: '',
 *	};
 *
 *
 *	const result = removeUndefinedKeysFromObject({ object: obj });
 *  console.log(result);
 *	> { id: 1, empty: "" }
 *
 *
 *
 * ...
 */
export const removeUndefinedKeysFromObject = <T = {}>(
	param: Params<T>
): Partial<T> => {
	//
	let result: Partial<T> = {};
	const keys: string[] = Object.keys(param?.object ?? {});
	//
	if (keys.length < 1) {
		return {};
	}

	const includesEmptyString: boolean =
		param?.includesEmptyString !== undefined
			? param.includesEmptyString
			: false;

	const ignoreSubObject: boolean =
		param?.ignoreSubObject !== undefined ? param.ignoreSubObject : false;

	for (const key of keys) {
		const value = param.object[key];
		const isDate = value instanceof Date;

		if (typeof value === 'object' && !isDate) {
			const isArray = Array.isArray(value);
			if (!isArray && ignoreSubObject === false) {
				const subObjectResult = removeUndefinedKeysFromObject({
					...param,
					object: value,
				});

				const subObject = { [key]: { ...subObjectResult } };

				const resultKeys = Object.keys(subObjectResult).length > 0;

				if (resultKeys) {
					result = Object.assign({}, { ...result }, { ...subObject });
				}
				continue;
			} else if (isArray) {
				// Add Array
				result = Object.assign({}, { ...result }, { [key]: value });
			} else if (!isArray && ignoreSubObject === true) {
				// Ignore subObject. just added value
				result = Object.assign({}, { ...result }, { [key]: value });
			}
		} else if (canAdd({ value, includesEmptyString })) {
			result = Object.assign({}, { ...result }, { [key]: value });
		}
	}
	return result;
};

export default removeUndefinedKeysFromObject;
