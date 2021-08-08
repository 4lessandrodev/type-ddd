import getDecimalAsCent from "./get-decimal-as-cent.util";
import getIntegerAsCent from "./get-integer-as-cents.util";
import transformValueToMoney from "./transform-value-to-money.util";

const convertValueToCent = (n: number): number => {
	const value = getIntegerAsCent(transformValueToMoney(n)) + getDecimalAsCent(transformValueToMoney(n));
	const monetary = parseFloat(value.toFixed(3));
	return monetary;
}
export { convertValueToCent };
export default convertValueToCent;