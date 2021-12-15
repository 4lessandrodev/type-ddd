import { ValueObject } from '../core/value-object';
import UniqueEntityID from './unique-entity-id';

/**
 * @extends Entity
 *
 * @param id UniqueEntityID
 *
 * @description param is optional
 * if not provided will generate a new one uuid
 */
class DomainId extends ValueObject<any> {
	private constructor(props: UniqueEntityID) {
		super(props);
	}

	toString(): string {
		return new UniqueEntityID(this.props.value).toString();
	}

	toValue(): string | number {
		return new UniqueEntityID(this.props.value).toValue();
	}
	/**
	 * @returns UniqueEntityID
	 */
	get value(): UniqueEntityID {
		return new UniqueEntityID(this.props.value);
	}

	/**
	 * @returns uid as string
	 * @example
	 * > "461235de-ec04-48aa-af94-31fbfa95efcf"
	 */
	get uid(): string {
		return new UniqueEntityID(this.props.value).uid;
	}

	/**
	 * @extends Entity
	 *
	 * @param id UniqueEntityID
	 *
	 * @description param is optional
	 * if not provided will generate a new one uuid
	 */
	public static create(id?: string | number): DomainId {
		return new DomainId(new UniqueEntityID(id));
	}
}

export { DomainId };
export default DomainId;
