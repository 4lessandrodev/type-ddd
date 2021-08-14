import { Result, ValueObject } from "..";
import calculatePercent from "./calculate-percentage.util";
import convertValueToCent from "./convert-value-to-cent.util";
import convertCentToFloat from "./convert-cent-to-float.util";
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
	value: number,
	currency: ICurrency
}

/**
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
class CurrencyValueObject extends ValueObject<Prop>{
	private cents: number;
	private constructor(props: Prop){
		super(props);
		this.cents = convertValueToCent(props.value);
	}

	get value(): number {
		return this.props.value
	}

	get currency(): ICurrency {
		return this.props.currency
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
	getCurrencyString(): string {
		return new Intl.NumberFormat(currency[this.currency],
			{ style: 'currency', currency: this.currency}).format(this.props.value);
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description add instance value with provided value
	 * @param value number to add
	 * @returns instance of Result type number with calculation result
	 */
	add(value: number): Result<number> {
		if (!CurrencyValueObject.isSafeValue(value)) {
			return Result.fail<number>(
				`${value} is not a safe number, must be between ${minSafeValue} and ${maxSafeValue}`
			)
		}
		if (this.cents >= maxSafeValue){
			return Result.fail<number>('The result is so large for calculate');
		}
		const valueAsCent = convertValueToCent(value);
		if ((this.cents + valueAsCent) >= maxSafeValue){
			return Result.fail<number>('The result is so large for calculate');
		}
		
		this.cents = (this.cents + valueAsCent);
		this.props.value = convertCentToFloat(this.cents);
		return Result.ok<number>(this.props.value);
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description subtract instance value with provided value
	 * @param value number to subtract
	 * @returns instance of Result type number with calculation result
	 */
	subtractBy(value: number): Result<number> {
		if (!CurrencyValueObject.isSafeValue(value)) {
			return Result.fail<number>(
				`${value} is not a safe number, must be between ${minSafeValue} and ${maxSafeValue}`
			)
		}
		if (this.cents <= minSafeValue){
			return Result.fail<number>('The result is so large for calculate');
		}
		const valueAsCent = convertValueToCent(value);
		if ((this.cents - valueAsCent) <= minSafeValue){
			return Result.fail<number>('The result is so large for calculate');
		}
		
		this.cents = (this.cents - valueAsCent);
		this.props.value = convertCentToFloat(this.cents);
		return Result.ok<number>(this.props.value);
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description divide instance value with provided value
	 * @param value number to divide
	 * @returns instance of Result type number with calculation result
	 */
	divideBy(value: number): Result<number> {
		if (!CurrencyValueObject.isSafeValue(value)) {
			return Result.fail<number>(
				`${value} is not a safe number, must be between ${minSafeValue} and ${maxSafeValue}`
			)
		}
		if (this.cents <= minSafeValue){
			return Result.fail<number>('The result is so small for calculate');
		}
		if ((this.cents / value) <= minSafeValue){
			return Result.fail<number>('The result is so small for calculate');
		}
		this.cents = (this.cents / value);
		this.props.value = convertCentToFloat(this.cents);
		return Result.ok<number>(this.props.value);
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description receives a value and multiply with instance value
	 * @param value number to multiply
	 * @returns instance of Result type number with calculation result
	 */
	multiplyBy(value: number): Result<number> {
		if (value < 0.1 && value > -0.1) {
			return Result.fail<number>('Invalid value to calculate. Value must be greater than 0.1');
		}
		if (!CurrencyValueObject.isSafeValue(value)) {
			return Result.fail<number>(
				`${value} is not a safe number, must be between ${minSafeValue} and ${maxSafeValue}`
			)
		}
		if (this.cents >= maxSafeValue){
			return Result.fail<number>('The result is so large for calculate');
		}
		if (((this.cents * value) >= maxSafeValue)) {
			return Result.fail<number>('The result is so large for calculate');
		}
		this.cents = (this.cents * value);
		this.props.value = convertCentToFloat(this.cents);
		return Result.ok<number>(this.props.value);
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description receives a percentage value and add on instance value
	 * @param percent number as percentage to add on instance value
	 * @returns instance of Result type number with calculation result
	 */
	addPercent(percent: number): Result<number> {
		if (!CurrencyValueObject.isSafeValue(percent)) {
			return Result.fail<number>(
				`${percent} is not a safe number, must be between ${minSafeValue} and ${maxSafeValue}`
			)
		}
		if (this.cents >= maxSafeValue){
			return Result.fail<number>('The result is so large for calculate');
		}
		const percentage = calculatePercent(this.cents, percent);
		if ((percentage + this.cents) >= maxSafeValue) {
			return Result.fail<number>('The result is so large for calculate');
		}
		this.cents = (this.cents + percentage);
		this.props.value = convertCentToFloat(this.cents);
		return Result.ok<number>(this.props.value);
	}

	/**
	 * @event `update` this method may not has effect on the instance value. always check the returned result.
	 * @description subtract a percentage from instance value
	 * @param percent number as percentage
	 * @returns instance of Result type number with calculation result
	 */
	subtractPercent(percent: number): Result<number> {
		if (!CurrencyValueObject.isSafeValue(percent)) {
			return Result.fail<number>(
				`${percent} is not a safe number, must be between ${minSafeValue} and ${maxSafeValue}`
			)
		}
		if (this.cents <= minSafeValue){
			return Result.fail<number>('The result is so large for calculate');
		}
		const percentage = calculatePercent(this.cents, percent);
		if ((this.cents - percentage) <= minSafeValue) {
			return Result.fail<number>('The result is so large for calculate');
		}
		this.cents = this.cents - percentage;
		this.props.value = convertCentToFloat(this.cents);
		return Result.ok<number>(this.props.value);
	}

	/**
	 * 
	 * @returns boolean true if instance value is positive else false
	 */
	isPositive(): boolean {
		return this.cents >= 0;
	}

	/**
	 * @description the precision calculation works for up to three decimal numbers `0.000`
	 * @param props object currency and value
	 * @returns Result with instance of CurrencyValueObject
	 */
	public static create(props: Prop): Result<CurrencyValueObject>{
		const isValidCurrency = Object.keys(currency).includes(props.currency);
		if (!isValidCurrency) {
			return Result.fail<CurrencyValueObject>(`${props.currency} is an invalid currency`);
		}
		if (typeof props.value !== 'number') {
			return Result.fail<CurrencyValueObject>(`${props.value} is not a number`);
		}
		if (!CurrencyValueObject.isSafeValue(props.value)) {
			return Result.fail<CurrencyValueObject>(
				`${props.value} is not a safe number, must be between ${minSafeValue} and ${maxSafeValue}`
			);
		}
		return Result.ok<CurrencyValueObject>(new CurrencyValueObject(props));
	}
}

export { CurrencyValueObject };
export default CurrencyValueObject;
