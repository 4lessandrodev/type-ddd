/**
 * Object search filter
 * @argument key: value
 *
 * @description you may use key as string with number or string value
 *
 * @example { email: "some_email@domain.com" }
 * { id: 1 }
 * { name: "Alessandro" }
 */
type Filter<T = {}> = {
	[K in keyof T]: T[K];
};

export default Filter;
export { Filter };
