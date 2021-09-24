import getUndefinedKeysAsArray from './get-undefined-keys-as-array.util';

enum IApplyValue {
	empty = 'empty',
	null = 'null',
	undefined = 'undefined',
	zero = 'zero',
}

const ValuesKey = {
	empty: '',
	null: null,
	undefined: undefined,
	zero: 0,
};

type ApplyValue = keyof typeof IApplyValue;

/**
 * @param object Object as target to check keys
 * @param includesNull as boolean. if true all nullable values will be considered as undefined.
 * @param applyKeyValue as value to be applied to key. empty string / null / undefined / zero. default empty string
 * @param ignoreSubObject as boolean. if true all subDocuments on object will be considered. default true.
 */
interface Params<T> {
	object: T;
	includesNull: boolean;
	applyKeyValue?: ApplyValue;
	ignoreSubObject?: boolean;
}

/**
 *
 * @param object Object as target to check keys
 * @param includesNull as boolean. if true all nullable values will be considered as undefined.
 * @param applyKeyValue as value to be applied to key. empty string / null / undefined / zero. default empty string
 * @param ignoreSubObject as boolean. if true all subDocuments on object will be considered. default true.
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
const getUndefinedKeysAsObject = <T = {}>(params: Params<T>): Partial<T> => {
	let objResult = {};
	const keys: string[] = getUndefinedKeysAsArray(params);
	if (keys.length < 1) {
		return objResult;
	}

	const valueToApply: ApplyValue = Object.keys(IApplyValue).includes(
		params.applyKeyValue as string
	)
		? (params.applyKeyValue as ApplyValue)
		: 'empty';

	for (const key of keys) {
		const isSubObject = key.includes('.');

		if (!isSubObject) {
			const undefinedKey: Object = { [key]: ValuesKey[valueToApply] };
			objResult = Object.assign(
				{},
				{ ...objResult },
				{ ...undefinedKey }
			);
		} else {
			const subKeys = key.split('.');

			const subObjectKeys = getUndefinedKeysAsObject({
				...params,
				object: params.object[subKeys[0]],
			});

			const subObj = { [subKeys[0]]: { ...subObjectKeys } };

			objResult = Object.assign({}, { ...objResult }, { ...subObj });
		}
	}
	return objResult;
};

export { getUndefinedKeysAsObject };
export default getUndefinedKeysAsObject;
