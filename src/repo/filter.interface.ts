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
type Filter = {
     [key in string | number]: string | number;
};

export default Filter;
export { Filter };
