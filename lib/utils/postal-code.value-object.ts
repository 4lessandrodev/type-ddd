import { ValueObject } from '../core';
import { Result } from '../core';
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
	value(): string {
		return this.props.value.replace(/-/g, '');
	}

	validation(_key: any, _value: any): boolean {
		return this.validator.string(_value).match(regexHash);
	}

	/**
	 *
	 * @param value PostalCode as string
	 * @returns true if value match with pattern and false if do not.
	 */
	public static isValidValue(value: string): boolean {
		return this.validator.string(value).match(regexHash);
	}

	public static create(value: string): Result<PostalCodeValueObject> {
		if (!PostalCodeValueObject.isValidValue(value)) {
			return Result.fail('Invalid postal code');
		}
		return Result.success(new PostalCodeValueObject({ value }));
	}
}

export { PostalCodeValueObject };
export default PostalCodeValueObject;
