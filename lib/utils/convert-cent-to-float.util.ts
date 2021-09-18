const convertCentToFloat = (n: number): number =>
	parseFloat((n / 100).toFixed(3));
export { convertCentToFloat as convertValueToFloat };
export default convertCentToFloat;
