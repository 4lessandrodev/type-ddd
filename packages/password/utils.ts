const upper = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'X',
	'Y',
	'Z',
	'W',
];
const lower = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'x',
	'y',
	'z',
	'w',
];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const special = [
	'!',
	'-',
	'@',
	'$',
	'#',
	'%',
	'&',
	'*',
	'_',
	'+',
	'?'
];
const availableChars = [upper, lower, numbers, special];

export type ILength = 8 | 10 | 12 | 14 | 16 | 18;

const getChar = (chars: string[]) =>
	chars[Math.floor(Math.random() * chars.length)];

/**
 *
 * @param length password length as number 8/10/12/14/16/18
 * @returns string password as plainText
 * @default 14 chars is recommended for strongest password
 */
const passwordGenerator = (length: ILength): string => {
	let strongPassword = '';
	let round = 0;
	while (round < length) {
		const random = Math.floor(Math.random() * availableChars.length);
		strongPassword += getChar(availableChars[random]);
		round++;
	}

	return strongPassword;
};

export { passwordGenerator };
export default passwordGenerator;
