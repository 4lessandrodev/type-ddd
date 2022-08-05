import { ValueObject } from '../core';
import { Result } from '../core';
import generateRandomTracking from './generate-random-tracking-code.util';
const regexHash = /^[0-9|A-Z]{3}-[\w]{1}[0-9]{5}-[0-9]{4}$/;

interface OrderIdProps {
	value: string;
}

class TrackingCodeValueObject extends ValueObject<OrderIdProps> {
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
		return this.validator.string(code).match(regexHash);
	}

	validation(_key: any, _value: any): boolean {
		return this.validator.string(_value).match(regexHash);
	}

	/**
	 * @description generate a random tracking code.
	 * The value is optional. If you not provide a new one will be generated.
	 * @param code optional
	 * @returns Result of TrackingCode
	 * @pattern
	 * XXX-A99999-9999
	 */
	public static create(code?: string): Result<TrackingCodeValueObject> {
		const value = code ?? TrackingCodeValueObject.generate();
		if (code) {
			if (!TrackingCodeValueObject.isValidProps(code)) {
				return Result.fail('Invalid value for Tracking code');
			}
		}
		return Result.success(new TrackingCodeValueObject({ value }));
	}
}

export { TrackingCodeValueObject };
export default TrackingCodeValueObject;
