interface CpfDigits {
	penultimateDigit: number;
	ultimateDigit: number;
}

const removeSpecialCharsFromCpfRegex = /[\.]|[-]/g;

export const formatValueToCpfPattern = (cpf: string): string => {
	const cpfValue = removeSpecialCharsFromCpf(cpf);
	let formattedValue: string = '';
	let index: number = 0;

	while (formattedValue.length < 14 && index < 11) {
		if (index === 3 || index === 6) {
			formattedValue += '.';
		} else if (index === 9) {
			formattedValue += '-';
		}
		formattedValue += cpfValue[index];
		index++;
	}

	return formattedValue;
};

export const removeSpecialCharsFromCpf = (cpf: string): string => {
	return cpf.replace(removeSpecialCharsFromCpfRegex, '');
};

const getCpfDigitsNumbers = (cpf: string): CpfDigits => {
	const lastTwoNumbers = cpf.slice(cpf.length - 2);
	const penultimateDigit = parseInt(lastTwoNumbers[0]);
	const ultimateDigit = parseInt(lastTwoNumbers[1]);

	return {
		penultimateDigit,
		ultimateDigit,
	};
};

const transformCpfInArrNumber = (cpf: string): number[] => {
	var arr: number[] = [];

	let index = 0;
	while (index < 9) {
		arr.push(parseInt(cpf[index]));
		index++;
	}

	return arr;
};

export const calculateCpfDigits = (cpfNumbers: number[]): CpfDigits => {
	const factor = 11;
	let index = 0;
	let startAuxValue = 10;
	let totalForDigit = 0;

	while (index < 9) {
		totalForDigit = totalForDigit + cpfNumbers[index] * startAuxValue;
		startAuxValue--;
		index++;
	}

	const calcPDigit = totalForDigit % factor;
	const resultPDigit = factor - calcPDigit;
	const zeroIfPGreaterThanNine = resultPDigit >= 9 ? 0 : resultPDigit;
	const penultimateDigit = zeroIfPGreaterThanNine;

	index = 0;
	startAuxValue = 11;
	totalForDigit = 0;

	cpfNumbers.push(penultimateDigit);

	while (index < 10) {
		totalForDigit = totalForDigit + cpfNumbers[index] * startAuxValue;
		startAuxValue--;
		index++;
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

export const isValidCpfDigit = (cpf: string): boolean => {
	const onlyNumbers = removeSpecialCharsFromCpf(cpf);

	if (onlyNumbers.length !== 11) {
		return false;
	}

	const digits = getCpfDigitsNumbers(onlyNumbers);
	const arrNumbers = transformCpfInArrNumber(onlyNumbers);
	const validDigits = calculateCpfDigits(arrNumbers);

	return (
		digits.penultimateDigit === validDigits.penultimateDigit &&
		digits.ultimateDigit === validDigits.ultimateDigit
	);
};

export default isValidCpfDigit;
