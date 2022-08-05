import { ValueObject } from '../core';
import { Result } from '../core';
import calculatePercent from './calculate-percentage.util';
import convertValueToCent from './convert-value-to-cent.util';
import convertCentToFloat from './convert-cent-to-float.util';
const minSafeValue = Math.floor(Number.MIN_SAFE_INTEGER / 100);
const maxSafeValue = Math.floor(Number.MAX_SAFE_INTEGER / 100);

/**
 * @property BRL Brazilian Real
 * @property USD Dollar
 * @property EUR Europe Euro
 * @property JPY Japan yen
 */
enum currency {
	BRL = 'pt-BR', // Brazil '$3.500,00'
	USD = 'en-US', // United States '$3,500.00'
	EUR = 'de-DE', // Europe "123.456,79 €"
	JPY = 'ja-JP', // Japan ¥1250
}

export type ICurrency = keyof typeof currency;

/**
 * @param value as number
 * @param currency as `BRL` `USD` `EUR` `JPY`
 * @property BRL = Brazilian Real
 * @property USD = American Dollar
 * @property EUR = Europe Euro
 * @property JPY = Japan Yen
 * @example
 * { value: 200, currency: 'BRL' }
 *
 */
interface Prop {
	value: number;
	currency: ICurrency;
}

/**
 * @throws MaxValue `90.071.992.537.570`
 * @description Domain Value Object to financial operation
 * @param object `{ value: number, currency: string }`
 * @method create `new instance`
 * @method get value `number`
 * @method get currency `string`
 * @method isSafeValue `boolean`
 * @method getCurrencyString `string`
 * @method add `void`
 * @method divideBy `void`
 * @method subtractBy `void`
 * @method multiplyBy `void`
 * @method addPercent `void`
 * @method subtractPercent `void`
 * @method isPositive `boolean`
 */
class CurrencyValueObject extends ValueObject<Prop> {
	private cents: number;
	private constructor(props: Prop) {
		super(props);
		this.cents = convertValueToCent(props.value);
	}

	value(): number {
		return this.props.value;
	}

	get currency(): ICurrency {
		return this.props.currency;
	}

	/**
	 * @description check if provided value is safe calculation number
	 * @param value number
	 * @returns true if value is safe value else false
	 */
	public static isSafeValue(value: number): boolean {
		if (typeof value !== 'number') {
			return false;
		}
		if (value < minSafeValue || value > maxSafeValue) {
			return false;
		}
		return true;
	}

	/**
	 *
	 * @returns a formatted currency as string `R$ 12,00`
	 */
	getCoin(): string {
		return new Intl.NumberFormat(currency[this.currency], {
			style: 'currency',
			currency: this.currency,
		}).format(this.props.value);
	}

	/**
	 *
	 * @param value as number
	 * @returns true if instance value is greater than provided value. else return false.
	 */
	isGreaterThan(value: number): boolean {
		return this.props.value > value;
	}

	/**
	 *
	 * @param value as number
	 * @returns true if instance value is less than provided value. else return false.
	 */
	isLessThan(value: number): boolean {
		return this.props.value < value;
	}

	/**
	 *
	 * @param value as number
	 * @returns true if instance value is equal to provided value. else return false.
	 */
	isEqualTo(value: number): boolean {
		return this.props.value === value;
	}

	/**
	 * @throws MaxValue `900.719.925.474`
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description add instance value with provided value
	 * @param value number to add
	 * @returns instance of CurrencyValueObject
	 */
	add(value: number): CurrencyValueObject {
		const valueAsCent = convertValueToCent(value);
		this.cents = this.cents + valueAsCent;
		this.props.value = convertCentToFloat(this.cents);
		return this;
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description subtract instance value with provided value
	 * @param value number to subtract
	 * @returns instance of CurrencyValueObject
	 */
	subtractBy(value: number): CurrencyValueObject {
		const valueAsCent = convertValueToCent(value);
		this.cents = this.cents - valueAsCent;
		this.props.value = convertCentToFloat(this.cents);
		return this;
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description divide instance value with provided value
	 * @param value number to divide
	 * @returns instance of CurrencyValueObject
	 */
	divideBy(value: number): CurrencyValueObject {
		this.cents = this.cents / value;
		this.props.value = convertCentToFloat(this.cents);
		return this;
	}

	/**
	 * @throws MaxValue `900.719.925.474`
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description receives a value and multiply with instance value
	 * @param value number to multiply
	 * @returns instance of CurrencyValueObject
	 */
	multiplyBy(value: number): CurrencyValueObject {
		this.cents = this.cents * value;
		this.props.value = convertCentToFloat(this.cents);
		return this;
	}

	/**
	 * @throws MaxValue `900.719.925.474`
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description receives a percentage value and add on instance value
	 * @param percent number as percentage to add on instance value
	 * @returns instance of CurrencyValueObject
	 */
	addPercent(percent: number): CurrencyValueObject {
		const percentage = calculatePercent(this.cents, percent);
		this.cents = this.cents + percentage;
		this.props.value = convertCentToFloat(this.cents);
		return this;
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description subtract a percentage from instance value
	 * @param percent number as percentage
	 * @returns instance of CurrencyValueObject
	 */
	subtractPercent(percent: number): CurrencyValueObject {
		const percentage = calculatePercent(this.cents, percent);
		this.cents = this.cents - percentage;
		this.props.value = convertCentToFloat(this.cents);
		return this;
	}

	/**
	 *
	 * @returns boolean true if instance value is positive else false
	 */
	isPositive(): boolean {
		return this.cents >= 0;
	}

	validation(_key: any, _value: any): boolean {
		const { isNumber, number, isString } = this.validator;

		const option = {
			value: (_val: any) =>
				isNumber(_val) && number(_val).isSafeInteger(),
			currency: (_val: any) =>
				isString(_val) && Object.keys(currency).includes(_val),
		};

		return option[_key](_value);
	}

	/**
	 * @throws MaxValue `90.071.992.537.570`
	 * @description the precision calculation works for up to three decimal numbers `0.000`
	 * @param props object currency and value
	 * @returns Result with instance of CurrencyValueObject
	 */
	public static create(props: Prop): Result<CurrencyValueObject> {
		const isValidCurrency = Object.keys(currency).includes(props.currency);
		if (!isValidCurrency) {
			return Result.fail(`${props.currency} is an invalid currency`);
		}
		if (typeof props.value !== 'number') {
			return Result.fail(`${props.value} is not a number`);
		}
		if (!CurrencyValueObject.isSafeValue(props.value)) {
			return Result.fail(
				`${props.value} is not a safe number, must be between ${minSafeValue} and ${maxSafeValue}`
			);
		}
		return Result.success(new CurrencyValueObject(props));
	}
}

export { CurrencyValueObject };
export default CurrencyValueObject;
