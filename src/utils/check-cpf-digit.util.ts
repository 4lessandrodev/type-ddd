interface CpfDigits {
	penultimateDigit: number;
	ultimateDigit: number;
}

const removeSpecialCharsFromCpfRegex = /[\.]|[-]/g;

const removeSpecialCharsFromCpf = (cpf: string): string => {
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

const calculateCpfDigits = (cpfNumbers: number[]): CpfDigits => {
	const factor = 11;
	let index = 0;
	let startAuxValue = 10;
	let totalFirstDigit = 0;

	while (index < 9) {
		totalFirstDigit = totalFirstDigit + cpfNumbers[index] * startAuxValue;
		startAuxValue--;
		index++;
	}

	const calcPDigit = totalFirstDigit % factor;
	const resultPDigit = factor - calcPDigit;
	const zeroIfPGreaterThanNine = resultPDigit <= 9 ? resultPDigit : 0;
	const penultimateDigit = zeroIfPGreaterThanNine;

	index = 0;
	startAuxValue = 11;
	totalFirstDigit = 0;

	cpfNumbers.push(penultimateDigit);

	while (index < 10) {
		totalFirstDigit = totalFirstDigit + cpfNumbers[index] * startAuxValue;
		startAuxValue--;
		index++;
	}

	const calcUDigit = totalFirstDigit % factor;
	const resultUDigit = factor - calcUDigit;
	const zeroIfGreaterThanNine = resultUDigit <= 9 ? resultUDigit : 0;
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
