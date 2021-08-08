import getIntegerAsCent from "./get-integer-as-cents.util";

const getDecimalAsCent = (n: number): number => (n * 100) - getIntegerAsCent(n);
export { getDecimalAsCent };
export default getDecimalAsCent;