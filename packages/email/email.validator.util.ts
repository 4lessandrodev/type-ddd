/**
 * a-z = 97 - 122
 * 0-9 = 48 - 57
 * 95 = _
 * 45 = -
 * 64 = @
 * 46 = .
 */
const ValidChars = { min: 97, max: 122, specials: [95, 45, 64, 46, 43] };

const ValidCharsNum = { min: 48, max: 57 };

const GetCharCode = (char: string): number =>
	typeof char === 'string' ? char.charCodeAt(0) : 0;

const IsSpecialChar = (char: string): boolean => {
	const code = GetCharCode(char);
	return ValidChars.specials.includes(code);
};

const IsAlphabet = (char: string): boolean => {
	const code = GetCharCode(char);
	const isGreaterThanMin = code >= ValidChars.min;
	const isLessThanMax = code <= ValidChars.max;
	return isGreaterThanMin && isLessThanMax;
};

const IsNumber = (char: string): boolean => {
	const charCode = GetCharCode(char);
	const isValid =
		charCode >= ValidCharsNum.min && charCode <= ValidCharsNum.max;
	return isValid;
};

const IsValidChar = (char: string): boolean => {
	const isAlphabet = IsAlphabet(char);
	const isSpecial = IsSpecialChar(char);
	const isNumber = IsNumber(char);

	return isAlphabet || isSpecial || isNumber;
};

const HasValidLength = (email: string): boolean =>
	typeof email === 'string' && email.length <= 256;

const IsValidPart = (part: string): boolean => {
	const hifen = 45;
	const isValidSpecialChar = (char: string): boolean =>
		GetCharCode(char) === hifen;
	const chars = part.replace(/\./g, '').split('');
	let i = 0;
	while (chars[i]) {
		const isValidChar =
			IsAlphabet(chars[i]) ||
			IsNumber(chars[i]) ||
			isValidSpecialChar(chars[i]);
		if (!isValidChar) return false;
		i++;
	}

	return true;
};

const IsValidOrganizationName = (name: string): boolean => {
	return name.length <= 10 && name.length >= 2;
};

const IsValidCountry = (country: string): boolean => {
	const isValidLength = country.length > 0 && country.length <= 4;
	if (!isValidLength) return false;

	const chars = country.split('');

	let i = 0;
	while (chars[i]) {
		const isChar = IsAlphabet(chars[i]);
		if (!isChar) return false;
		i++;
	}

	return true;
};

const IsValidNick = (email: string): boolean => {
	const nick = email.split('@')?.[0];
	return (
		!nick.startsWith('+') &&
		!nick.endsWith('+') &&
		!nick.startsWith('-') &&
		!nick.endsWith('-')
	);
};

const IsValidDomain = (email: string): boolean => {
	const domain = email.split('@');
	const parts = domain[1].split('.');
	if (parts.length === 1 || parts.length > 3) return false;

	const isInValidStartAndEnd =
		domain[1].startsWith('-') || domain[1].endsWith('-');

	if (isInValidStartAndEnd) return false;

	const isLessThanMax = email.length <= 64;
	if (!isLessThanMax) return false;

	const isValidOrgName = IsValidOrganizationName(parts[1]);

	if (typeof parts[2] === 'string') {
		const isValidCountry = IsValidCountry(parts[2]);
		if (!isValidCountry) return false;
	}

	if (!isValidOrgName) return false;

	let i = 0;
	while (parts[i]) {
		const isValidPart = IsValidPart(parts[i]);
		if (!isValidPart) return false;
		i++;
	}
	return true;
};

/**
 * @description validate email
 * @param email string with @ symbol
 * @returns true if is a valid email and false if not
 */
export const IsValidEmail = (email: string): boolean => {
	const isString: boolean = typeof email === 'string';
	if (!isString) return false;

	const trimEmail = email.trim().toLowerCase();

	const isValidFirsChar: boolean =
		IsAlphabet(trimEmail[0]) || IsNumber(trimEmail[0]);

	if (!isValidFirsChar) return false;

	const hasOnlyOneAt: boolean =
		trimEmail.split('').filter((char) => char === '@').length === 1;
	const hasOnlyOnePlus: boolean =
		trimEmail.split('').filter((char) => char === '+').length > 1;

	if (!hasOnlyOneAt || hasOnlyOnePlus) return false;

	const isValidLength = HasValidLength(trimEmail);

	if (!isValidLength) return false;

	const isValidDomain = IsValidDomain(trimEmail);

	if (!isValidDomain) return false;

	if (!IsValidNick(trimEmail)) return false;

	const hasInvalidChar = trimEmail
		.split('')
		.map((char): boolean => IsValidChar(char))
		.includes(false);

	if (hasInvalidChar) return false;

	return true;
};

export default IsValidEmail;