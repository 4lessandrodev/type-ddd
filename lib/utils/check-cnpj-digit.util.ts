interface CnpjDigits {
	penultimateDigit: number;
	ultimateDigit: number;
}

const removeSpecialCharsFromCnpjRegex = /[\.]|[-]|[\/]/g;

export const formatValueToCnpjPattern = (cnpj: string): string => {
	const cnpjValue = removeSpecialCharsFromCnpj(cnpj);
	let formattedValue: string = '';
	let index: number = 0;

	while (formattedValue.length < 18 && index < 17) {
		if (index === 2 || index === 5) {
			formattedValue += '.';
		} else if (index === 8) {
			formattedValue += '/';
		} else if (index === 12) {
			formattedValue += '-';
		}
		formattedValue += cnpjValue[index];
		index++;
	}

	return formattedValue;
};

export const removeSpecialCharsFromCnpj = (cnpj: string): string => {
	return cnpj.replace(removeSpecialCharsFromCnpjRegex, '');
};

const getCnpjDigitsNumbers = (cnpj: string): CnpjDigits => {
	const lastTwoNumbers = cnpj.slice(cnpj.length - 2);
	const penultimateDigit = parseInt(lastTwoNumbers[0]);
	const ultimateDigit = parseInt(lastTwoNumbers[1]);

	return {
		penultimateDigit,
		ultimateDigit,
	};
};

const transformCnpjInArrNumber = (cnpj: string): number[] => {
	var arr: number[] = [];

	let index = 0;
	while (index < 12) {
		arr.push(parseInt(cnpj[index]));
		index++;
	}

	return arr;
};

const calculateCnpjDigits = (cnpjNumbers: number[]): CnpjDigits => {
	const factor = 11;
	let index = cnpjNumbers.length - 1;
	let startAuxValue = 2;
	let totalForDigit = 0;

	while (index >= 0) {
		totalForDigit = totalForDigit + cnpjNumbers[index] * startAuxValue;
		startAuxValue = startAuxValue === 9 ? 2 : startAuxValue + 1;
		index--;
	}

	const calcPDigit = totalForDigit % factor;
	const resultPDigit = factor - calcPDigit;
	const zeroIfPGreaterThanNine = resultPDigit >= 9 ? 0 : resultPDigit;
	const penultimateDigit = zeroIfPGreaterThanNine;

	cnpjNumbers.push(penultimateDigit);

	index = cnpjNumbers.length - 1;
	startAuxValue = 2;
	totalForDigit = 0;

	while (index >= 0) {
		totalForDigit = totalForDigit + cnpjNumbers[index] * startAuxValue;
		startAuxValue = startAuxValue === 9 ? 2 : startAuxValue + 1;
		index--;
	}

	const calcUDigit = totalForDigit % factor;
	const resultUDigit = factor - calcUDigit;
	const zeroIfGreaterThanNine = resultUDigit > 9 ? 0 : resultUDigit;
	const ultimateDigit = zeroIfGreaterThanNine;

	return {
		penultimateDigit,
		ultimateDigit,
	};
};

export const isValidCnpjDigit = (cnpj: string): boolean => {
	const onlyNumbers = removeSpecialCharsFromCnpj(cnpj);

	if (onlyNumbers.length !== 14) {
		return false;
	}

	const digits = getCnpjDigitsNumbers(onlyNumbers);
	const arrNumbers = transformCnpjInArrNumber(onlyNumbers);
	const validDigits = calculateCnpjDigits(arrNumbers);

	console.log(digits);
	console.log(validDigits);

	return (
		digits.penultimateDigit === validDigits.penultimateDigit &&
		digits.ultimateDigit === validDigits.ultimateDigit
	);
};

export default isValidCnpjDigit;
