const generatePartOne = (): number => {
	const currentDate = new Date();
	const startsYear = 1900;
	const partOne = currentDate.getDate() + (currentDate.getFullYear() - startsYear) + currentDate.getMonth() + currentDate.getDay() + currentDate.getHours() + currentDate.getMinutes();
	return partOne;
}

const getRandomChar = (): string => {
	const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
	const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
	return randomLetter;
}

const generatePartTwo = (): string => {
	const currentDate = new Date();
	const partTwo =	currentDate.getMilliseconds() + currentDate.getMinutes() + Math.floor(Math.random() * 100) + '0000';
	return partTwo;
}

const controllerNumber = (): string => {
	const value = new Date().getTime().toString(16);
	return value.slice(value.length - 2).toUpperCase();
}

const generateRandomTracking = (): string => {
	const partOne = generatePartOne();
	const partTwo = generatePartTwo();
	const randomLetter = getRandomChar();
	const controller = controllerNumber() + getRandomChar();
	
	const normalize = partTwo.slice(0, 4);
	const order = partOne + normalize;
	
	let sum = 0;
	for (let digit = 0; digit < order.length; digit++) {
		var value = order.slice(digit, digit + 1);
		sum += parseInt(value);
	}
	const middle = `${randomLetter}${partOne}${sum}000`;
	return `${controller}-${middle.slice(0,6)}-${normalize}`;
}

export { generateRandomTracking };
export default generateRandomTracking;
