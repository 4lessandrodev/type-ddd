import { getRandomChar } from './generate-random-tracking-code.util';

export interface PinProps {
	numbersLength: 3 | 4 | 5 | 6 | 7;
	lettersLength: 0 | 3 | 4 | 5 | 6 | 7;
}

export const pinGenerator = (props: PinProps): string => {
	const { numbersLength, lettersLength } = props;
	let index = 0;
	let pinNumbers = '';
	let pinLetters = '';
	let pinResult = '';
	while (index < numbersLength && index < 7) {
		pinNumbers += Math.trunc(Math.random() * 10);
		index++;
	}

	index = 0;
	while (index < lettersLength && index < 7) {
		pinLetters += getRandomChar();
		index++;
	}

	if (lettersLength > 0) {
		pinResult = `${pinLetters}-${pinNumbers}`;
	} else {
		pinResult = pinNumbers;
	}

	return pinResult;
};

export default pinGenerator;
