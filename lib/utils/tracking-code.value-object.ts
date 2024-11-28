import { ValueObject } from '../core';
import { Result } from '../core';
import generateRandomTracking from './generate-random-tracking-code.util';
const regexHash = /^[0-9|A-Z]{3}-[\w]{1}[0-9]{5}-[0-9]{4}$/;

interface OrderIdProps {
	value: string;
}

class TrackingCodeValueObject extends ValueObject<OrderIdProps> {
	protected static readonly REGEX = regexHash;
	protected static readonly MESSAGE: string =
		'Invalid value for Tracking code';

	private constructor(props: OrderIdProps) {
		super(props);
	}

	/**
	 * @returns value as string
	 */
	value(): string {
		return this.props.value;
	}

	/**
	 *
	 * @returns tracking code as string
	 */
	public static generate(): string {
		return generateRandomTracking();
	}

	/**
	 *
	 * @param code value as string
	 * @returns true if code match with pattern or false if not
	 * @pattern
	 * XXX-A99999-9999
	 */
	public static isValidProps(code: string): boolean {
		return this.validator.string(code).match(TrackingCodeValueObject.REGEX);
	}

	validation(value: string): boolean {
		return TrackingCodeValueObject.isValidProps(value);
	}

	/**
	 * @description generate a random tracking code.
	 * The value is optional. If you not provide a new one will be generated.
	 * @param code optional
	 * @returns Result of TrackingCode
	 * @pattern
	 * XXX-A99999-9999
	 */
	public static create(
		code?: string,
	): Result<TrackingCodeValueObject | null> {
		const value = code ?? TrackingCodeValueObject.generate();
		if (code) {
			if (!TrackingCodeValueObject.isValidProps(code)) {
				return Result.fail(TrackingCodeValueObject.MESSAGE);
			}
		}
		return Result.Ok(new TrackingCodeValueObject({ value }));
	}
}

export { TrackingCodeValueObject };
export default TrackingCodeValueObject;
