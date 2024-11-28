import { Result, ValueObject } from 'rich-domain';

export enum Currencies {
	USD = 'USD', // Dólar Americano
	EUR = 'EUR', // Euro
	JPY = 'JPY', // Iene Japonês
	GBP = 'GBP', // Libra Esterlina
	AUD = 'AUD', // Dólar Australiano
	CAD = 'CAD', // Dólar Canadense
	CHF = 'CHF', // Franco Suíço
	CNY = 'CNY', // Renminbi Chinês
	SEK = 'SEK', // Coroa Sueca
	NZD = 'NZD', // Dólar da Nova Zelândia
	KRW = 'KRW', // Won Sul-Coreano
	SGD = 'SGD', // Dólar de Singapura
	NOK = 'NOK', // Coroa Norueguesa
	MXN = 'MXN', // Peso Mexicano
	INR = 'INR', // Rúpia Indiana
	BRL = 'BRL', // Real Brasileiro
	RUB = 'RUB', // Rublo Russo
	ZAR = 'ZAR', // Rand Sul-Africano
	TRY = 'TRY', // Lira Turca
	HKD = 'HKD', // Dólar de Hong Kong
}

export enum Locales {
	'en-US' = 'en-US', // Inglês (Estados Unidos)
	'en-GB' = 'en-GB', // Inglês (Reino Unido)
	'en-CA' = 'en-CA', // Inglês (Canadá)
	'en-AU' = 'en-AU', // Inglês (Austrália)
	'en-NZ' = 'en-NZ', // Inglês (Nova Zelândia)
	'fr-FR' = 'fr-FR', // Francês (França)
	'fr-CA' = 'fr-CA', // Francês (Canadá)
	'es-ES' = 'es-ES', // Espanhol (Espanha)
	'es-MX' = 'es-MX', // Espanhol (México)
	'pt-BR' = 'pt-BR', // Português (Brasil)
	'pt-PT' = 'pt-PT', // Português (Portugal)
	'de-DE' = 'de-DE', // Alemão (Alemanha)
	'it-IT' = 'it-IT', // Italiano (Itália)
	'ja-JP' = 'ja-JP', // Japonês (Japão)
	'ko-KR' = 'ko-KR', // Coreano (Coreia do Sul)
	'zh-CN' = 'zh-CN', // Chinês (China)
	'zh-TW' = 'zh-TW', // Chinês (Taiwan)
	'ru-RU' = 'ru-RU', // Russo (Rússia)
}

type Locale = keyof typeof Locales;
type Currency = keyof typeof Currencies;

class Money extends ValueObject<number> {
	protected static readonly MESSAGE: string = 'Invalid money value';

	private constructor(prop: number) {
		super(prop);
	}

	value(): number {
		return this.props;
	}

	/**
	 * @description Validate if provided value is a valid money value.
	 * @param value The value to validate.
	 * @returns A boolean indicating whether the provided value is a valid money value.
	 */
	public static isValid(value: number): boolean {
		return this.isValidProps(value);
	}

	/**
	 * @description Validate if provided value is a valid money value.
	 * @param value The value to validate.
	 * @returns A boolean indicating whether the provided value is a valid money value.
	 */
	public static isValidProps(value: number): boolean {
		return this.validator.number(value).isSafeInteger();
	}

	/**
	 * @description Formats the money value as currency according to the specified currency and locale.
	 * @param currency The currency code or enum representing the currency. Defaults to Brazilian Real (BRL).
	 * @param locale The locale code or enum representing the locale. Defaults to Brazilian Portuguese (pt-BR).
	 * @returns A string representing the money value formatted as currency.
	 */
	coin(currency?: Currency | Currencies, locale?: Locale | Locales): string {
		return Intl.NumberFormat(locale ?? Locales['pt-BR'], {
			currency: currency ?? Currencies.BRL,
			style: 'currency'
		}).format(this.value());
	}

	/**
	 * @description Performs addition with another Money object or a numeric value.
	 * @param money The Money object or numeric value to add.
	 * @returns A new Money object representing the result of the addition.
	 */
	sum(money: Money | number): Money {
		const current = this.value();
		const target = money instanceof Money ? money.value() : money;
		const total = this.util.number(current).sum(target, { fractionDigits: 3 });
		return new Money(total);
	}

	/**
	 * @description Performs subtraction with another Money object or a numeric value.
	 * @param money The Money object or numeric value to subtract.
	 * @returns A new Money object representing the result of the subtraction.
	 */
	subtract(money: Money | number): Money {
		const current = this.value();
		const target = money instanceof Money ? money.value() : money;
		const total = this.util.number(current).subtract(target, { fractionDigits: 3 });
		return new Money(total);
	}

	/**
	 * @description Performs multiplication with another Money object or a numeric value.
	 * @param money The Money object or numeric value to multiply by.
	 * @returns A new Money object representing the result of the multiplication.
	 */
	multiply(money: Money | number): Money {
		const current = this.value();
		const target = money instanceof Money ? money.value() : money;
		const total = this.util.number(current).multiplyBy(target, { fractionDigits: 3 });
		return new Money(total);
	}

	/**
	 * @description Performs division with another Money object or a numeric value.
	 * @param money The Money object or numeric value to divide by.
	 * @returns A new Money object representing the result of the division.
	 */
	divide(money: Money | number): Money {
		const current = this.value();
		const target = money instanceof Money ? money.value() : money;
		const total = this.util.number(current).divideBy(target, { fractionDigits: 3 });
		return new Money(total);
	}

	/**
	 * @description Adds a percentage to the money value.
	 * @param percent The percentage to add.
	 * @returns A new Money object representing the result of adding the percentage.
	 */
	addPercent(percent: number): Money {
		const current = this.value();
		const multiply = this.util.number(current).multiplyBy(percent);
		const percents = this.util.number(multiply).divideBy(100);
		const total = this.util.number(percents).sum(current, { fractionDigits: 3 });
		return new Money(total);
	}

	/**
	 * @description Calculates the percentage of the money value.
	 * @param percent The percentage to calculate.
	 * @returns A new Money object representing the calculated percentage.
	 */
	percent(percent: number): Money {
		const current = this.value();
		const multiply = this.util.number(current).multiplyBy(percent);
		const percents = this.util.number(multiply).divideBy(100, { fractionDigits: 3 });
		return new Money(percents);
	}

	/**
	 * @description Checks if the money value is greater than the provided value.
	 * @param value The value to compare.
	 * @returns A boolean indicating whether the money value is greater than the provided value.
	 */
	isGt(value: Money | number): boolean {
		const target = value instanceof Money ? value.value() : value;
		const current = this.value();
		return this.validator.number(current).isGreaterThan(target);
	}

	/**
	 * @description Checks if the money value is greater than or equal to the provided value.
	 * @param value The value to compare.
	 * @returns A boolean indicating whether the money value is greater than or equal to the provided value.
	 */
	isGte(value: Money | number): boolean {
		const target = value instanceof Money ? value.value() : value;
		const current = this.value();
		return this.validator.number(current).isGreaterOrEqualTo(target);
	}

	/**
	 * @description Checks if the money value is less than the provided value.
	 * @param value The value to compare.
	 * @returns A boolean indicating whether the money value is less than the provided value.
	 */
	isLt(value: Money | number): boolean {
		const target = value instanceof Money ? value.value() : value;
		const current = this.value();
		return this.validator.number(current).isLessThan(target);
	}

	/**
	 * @description Checks if the money value is less than or equal to the provided value.
	 * @param value The value to compare.
	 * @returns A boolean indicating whether the money value is less than or equal to the provided value.
	 */
	isLte(value: Money | number): boolean {
		const target = value instanceof Money ? value.value() : value;
		const current = this.value();
		return this.validator.number(current).isLessOrEqualTo(target);
	}

	/**
	 * @description Checks if the money value is equal to the provided value.
	 * @param value The value to compare.
	 * @returns A boolean indicating whether the money value is equal to the provided value.
	 */
	isEq(value: Money | number): boolean {
		const target = value instanceof Money ? value.value() : value;
		const current = this.value();
		return this.validator.number(current).isEqualTo(target);
	}

	/**
	 * @description Checks if the money value is positive.
	 * @returns A boolean indicating whether the money value is positive.
	 */
	isPos(): boolean {
		return this.validator.number(this.props).isPositive();
	}

	/**
	 * @description Checks if the money value is negative.
	 * @returns A boolean indicating whether the money value is negative.
	 */
	isNeg(): boolean {
		return this.validator.number(this.props).isNegative();
	}

	/**
	 * @description Checks if the money value is zero.
	 * @returns A boolean indicating whether the money value is zero.
	 */
	isZero(): boolean {
		return this.validator.number(this.props).isEqualTo(0);
	}

	/**
	 * @description Makes the money value positive.
	 * @returns A new Money object with a positive value.
	 */
	makePos(): Money {
		const value = this.value();
		if (this.validator.number(value).isNegative()) {
			return new Money(value * -1);
		}
		return new Money(value);
	}

	/**
	 * @description Makes the money value negative.
	 * @returns A new Money object with a negative value.
	 */
	makeNeg(): Money {
		const value = this.value();
		if (this.validator.number(value).isPositive()) {
			return new Money(value * -1);
		}
		return new Money(value);
	}

	/**
	 * @description Creates a new Money object with a value of zero.
	 * @returns A new Money object initialized with a value of zero.
	 */
	public static zero(): Money {
		return new Money(0);
	}

	/**
	 * @description Creates a new Money object with a value of one.
	 * @returns A new Money object initialized with a value of one.
	 */
	public static one(): Money {
		return new Money(1);
	}

	/**
	 * @description Creates a new Money object with a value of ten.
	 * @returns A new Money object initialized with a value of ten.
	 */
	public static ten(): Money {
		return new Money(10);
	}

	/**
	 * @description Creates a new Money object with a value of one hundred.
	 * @returns A new Money object initialized with a value of one hundred.
	 */
	public static one_hundred(): Money {
		return new Money(100);
	}

	/**
	 * @description Creates a new Money object with a value of one thousand.
	 * @returns A new Money object initialized with a value of one thousand.
	 */
	public static one_thousand(): Money {
		return new Money(1000);
	}

	/**
	 * @description Performs summation of two values.
	 * @param a The first value to sum, which can be a number or a Money object.
	 * @param b The second value to sum, which can be a number or a Money object.
	 * @returns The result of the summation as a number.
	 */
	public static sum(a: number | Money, b: number | Money): number {
		const valueA = a instanceof Money ? a.value() : a;
		const valueB = b instanceof Money ? b.value() : b;
		return this.util.number(valueA).sum(valueB, { fractionDigits: 3 });
	}

	/**
	 * @description Performs division of two values.
	 * @param a The numerator value, which can be a number or a Money object.
	 * @param b The denominator value, which can be a number or a Money object.
	 * @returns The result of the division as a number.
	 */
	public static divide(a: number | Money, b: number | Money): number {
		const valueA = a instanceof Money ? a.value() : a;
		const valueB = b instanceof Money ? b.value() : b;
		return this.util.number(valueA).divideBy(valueB, { fractionDigits: 3 });
	}

	/**
	 * @description Performs multiplication of two values.
	 * @param a The first value to multiply, which can be a number or a Money object.
	 * @param b The second value to multiply, which can be a number or a Money object.
	 * @returns The result of the multiplication as a number.
	 */
	public static multiply(a: number | Money, b: number | Money): number {
		const valueA = a instanceof Money ? a.value() : a;
		const valueB = b instanceof Money ? b.value() : b;
		return this.util.number(valueA).multiplyBy(valueB, { fractionDigits: 3 });
	}

	/**
	 * @description Performs subtraction of two values.
	 * @param a The minuend value, which can be a number or a Money object.
	 * @param b The subtrahend value, which can be a number or a Money object.
	 * @returns The result of the subtraction as a number.
	 */
	public static subtract(a: number | Money, b: number | Money): number {
		const valueA = a instanceof Money ? a.value() : a;
		const valueB = b instanceof Money ? b.value() : b;
		return this.util.number(valueA).subtract(valueB, { fractionDigits: 3 });
	}

	/**
	 * @description Rounds down the money value to the nearest integer.
	 * @returns A new Money object representing the rounded-down value.
	 */
	floor(): Money {
		const ceil = Math.floor(this.props);
		return new Money(ceil);
	};

	/**
	 * @description Rounds up the money value to the nearest integer.
	 * @returns A new Money object representing the rounded-up value.
	 */
	ceil(): Money {
		const ceil = Math.ceil(this.props);
		return new Money(ceil);
	}

	/**
	 * @description Generates a closure that performs arithmetic operations with a predefined initial value.
	 * @param initial The initial value for arithmetic operations.
	 * @returns An object containing functions for performing `summation`, `division`, `multiplication`, and `subtraction` with the initial value.
	 */
	public static closure(initial: number) {
		return {
			sum: (value: number): number => Money.sum(initial, value),
			divide: (value: number): number => Money.divide(initial, value),
			multiply: (value: number): number => Money.multiply(initial, value),
			subtract: (value: number): number => Money.subtract(initial, value)
		};
	}

	/**
	 * @description Calculates the simple interest based on the provided rate and periods.
	 * @param rate The interest rate as a percentage.
	 * @param periods The number of periods over which the interest is applied.
	 * @returns A new Money object representing the calculated interest.
	 * @throws {Error} If either the rate or periods is negative.
	 */
	interest(rate: number, periods: number): Money {
		if (
			this.validator.number(rate).isNegative() ||
			this.validator.number(periods).isNegative()
		) {
			throw new Error('period and rate must be greater than zero');
		}
		const rateBy100 = this.util.number(rate).divideBy(100);
		const amount = this.util.number(this.props).multiplyBy(rateBy100);
		const interest = this.util.number(amount).multiplyBy(periods);
		return new Money(interest);
	}

	/**
	 * @description Finds the maximum value among the provided Money objects.
	 * @param values An array of Money objects.
	 * @returns A new Money object representing the maximum value found.
	 */
	public static max(values: Money[]): Money {
		const arr = values.map((item): number => item.value());
		const max = Math.max(...arr);
		return new Money(max);
	}

	/**
	 * @description Finds the minimum value among the provided Money objects.
	 * @param values An array of Money objects.
	 * @returns A new Money object representing the minimum value found.
	 */
	public static min(values: Money[]): Money {
		const arr = values.map((item): number => item.value());
		const max = Math.min(...arr);
		return new Money(max);
	}

	/**
	 * @description Calculates the compound interest based on the provided rate and periods.
	 * @param rate The interest rate as a percentage.
	 * @param periods The number of periods over which the interest is applied.
	 * @returns A new Money object representing the calculated compound interest.
	 * @throws {Error} If either the rate or periods is negative.
	 */
	compoundInterest(rate: number, periods: number): Money {
		if (
			this.validator.number(rate).isNegative() ||
			this.validator.number(periods).isNegative()
		) {
			throw new Error('period and rate must be greater than zero');
		};
		const rateBy100 = this.util.number(rate).divideBy(100);
		const base = this.util.number(rateBy100).sum(1);
		const pow = Math.pow(base, periods);
		const amount = this.util.number(this.props).multiplyBy(pow);
		const compoundInterest = this.util.number(amount).subtract(this.props, { fractionDigits: 3 });
		return new Money(compoundInterest);
	}

	/**
	 * @description Generates a random Money value within the specified range.
	 * @param min The minimum value of the range.
	 * @param max The maximum value of the range.
	 * @returns A new Money object representing a random value within the specified range.
	 */
	public static random(min: number, max: number): Money {
		if (min >= max) return Money.zero();
		const randomValue = Math.random() * (max - min) + min;
		const roundedValue = Math.round(randomValue * 100) / 100;
		return new Money(roundedValue);
	}

	/**
	 * @description Calculates the average value among the provided Money objects.
	 * @param values An array of Money objects.
	 * @returns A new Money object representing the average value of the Money objects.
	 */
	public static average(values: Money[]): Money {
		const items = values.length;
		const calc = (prev: Money, current: Money): Money => current.sum(prev);
		const total = values.reduce(calc, Money.zero());
		return total.divide(items);
	}

	/**
	 * @description Converts the current Money value to another currency using the provided exchange rate.
	 * @param exchangeRate The exchange rate, which can be a Money object representing the rate or a number.
	 * @returns A new Money object representing the converted value.
	 */
	convertTo(exchangeRate: Money | number): Money {
		const current = this.value();
		const rate = exchangeRate instanceof Money ? exchangeRate.value() : exchangeRate;
		const value = this.util.number(current).multiplyBy(rate, { fractionDigits: 3 });
		return new Money(value);
	}

	/**
	 * @description Initializes a Money object with the provided value.
	 * @param value The initial value for the Money object.
	 * @returns A new Money object initialized with the provided value.
	 * @throws {Error} If the provided value is invalid.
	 */
	public static init(value: number): Money {
		const isValidValue = Money.isValidProps(value);
		if (!isValidValue) throw new Error(Money.MESSAGE);
		return new Money(value);
	}

	/**
	 * @description Creates a Result object containing a Money object initialized with the provided value.
	 * @param value The initial value for the Money object.
	 * @returns A Result object containing either a Money object or an error message.
	 */
	public static create(value: number): Result<Money | null> {
		if (!Money.isValidProps(value)) {
			return Result.fail(Money.MESSAGE);
		}
		return Result.Ok(new Money(value));
	};
}

export { Money };
export default Money;
