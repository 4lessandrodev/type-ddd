import { Result, ValueObject } from '..';
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
	get value(): string {
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
	public static isValidValue(code: string): boolean {
		return regexHash.test(code);
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
			if (!TrackingCodeValueObject.isValidValue(code)) {
				return Result.fail<TrackingCodeValueObject>(
					'Invalid value for Tracking code'
				);
			}
		}
		return Result.ok<TrackingCodeValueObject>(
			new TrackingCodeValueObject({ value })
		);
	}
}

export { TrackingCodeValueObject };
export default TrackingCodeValueObject;
