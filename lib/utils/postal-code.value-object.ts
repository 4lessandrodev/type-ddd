import { ValueObject } from '../core';
import { Result } from '../core';
const regexHash = /^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$/;

interface Prop {
	value: string;
}

class PostalCodeValueObject extends ValueObject<Prop> {
	protected static readonly DISABLE_SETTER: boolean = true;
	protected static readonly REGEX = regexHash;
	protected static readonly MESSAGE: string = 'Invalid postal code';

	private constructor(prop: Prop) {
		super(prop, { disableSetters: PostalCodeValueObject.DISABLE_SETTER });
	}

	/**
	 * @returns value as string. always only numbers
	 * @example 75520140
	 */
	value(): string {
		return this.props.value.replace(/-|\./g, '');
	}

	validation(value: string): boolean {
		return PostalCodeValueObject.isValidProps(value);
	}

	/**
	 *
	 * @param value PostalCode as string
	 * @returns true if value match with pattern and false if do not.
	 */
	public static isValidProps(value: string): boolean {
		return this.validator.string(value).match(PostalCodeValueObject.REGEX);
	}

	public static create(value: string): Result<PostalCodeValueObject> {
		if (!PostalCodeValueObject.isValidProps(value)) {
			return Result.fail(PostalCodeValueObject.MESSAGE);
		}
		return Result.Ok(new PostalCodeValueObject({ value }));
	}
}

export { PostalCodeValueObject };
export default PostalCodeValueObject;
