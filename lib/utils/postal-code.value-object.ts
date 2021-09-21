import { ValueObject } from '../core/value-object';
import Result from '../core/result';
const regexHash = /^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$/;

interface Prop {
	value: string;
}

class PostalCodeValueObject extends ValueObject<Prop> {
	private constructor(prop: Prop) {
		super(prop);
	}

	/**
	 * @returns value as string. always only numbers
	 * @example 75520140
	 */
	get value(): string {
		return this.props.value.replace(/-/g, '');
	}

	/**
	 *
	 * @param value PostalCode as string
	 * @returns true if value match with pattern and false if do not.
	 */
	public static isValidValue(value: string): boolean {
		return regexHash.test(value);
	}

	public static create(value: string): Result<PostalCodeValueObject> {
		if (!PostalCodeValueObject.isValidValue(value)) {
			return Result.fail<PostalCodeValueObject>('Invalid postal code');
		}
		return Result.ok<PostalCodeValueObject>(
			new PostalCodeValueObject({ value })
		);
	}
}

export { PostalCodeValueObject };
export default PostalCodeValueObject;
