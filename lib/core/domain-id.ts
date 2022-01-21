import { ValueObject } from '../core/value-object';
import ShortDomainId from './short-domain-id';
import UniqueEntityID from './unique-entity-id';

interface ILength {
	length:
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21
		| 22
		| 23
		| 24
		| 25
		| 26
		| 27
		| 28
		| 29
		| 30
		| 31
		| 32;
}

/**
 * @extends Entity
 *
 * @param id UniqueEntityID
 *
 * @description param is optional
 * if not provided will generate a new one uuid
 */
class DomainId extends ValueObject<any> {
	public readonly isNew: boolean;
	private constructor(props: UniqueEntityID, isNew: boolean) {
		super( props );
		this.isNew = isNew;
	}

	toShort ( length?: ILength ): string {
		return ShortDomainId.create(this.uid, length).uid
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
	 * @description this method clone the instance value as new ID
	 * @returns DomainId
	 */
	clone (): DomainId {
		const isNew = true;
		return new DomainId(new UniqueEntityID(this.props.value), isNew);
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
	public static create ( id?: string | number ): DomainId {
		const isNew = id !== undefined && id !== null;
		return new DomainId(new UniqueEntityID(id), !isNew);
	}
}

export { DomainId };
export default DomainId;
