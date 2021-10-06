import { ValueObject } from '../core/value-object';
import UniqueEntityID from './unique-entity-id';
const isUUID =
	/[0-9|a-z]{8}[-][0-9|a-z]{4}[-][0-9|a-z]{4}[-][0-9|a-z]{4}[-][0-9|a-z]{12}/;
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

	toShort(): UniqueEntityID {
		const uuid: string = this.props.value;
		const isUuid = isUUID.test(uuid);

		if (!isUuid) {
			return new UniqueEntityID(this.props.value.slice(0, 14));
		}

		const parts = this.props.value.split('-');
		const total =
			parseInt(parts[4], 16) -
			(parseInt(parts[0], 16) -
				parseInt(parts[1], 16) -
				parseInt(parts[2], 16) -
				parseInt(parts[3], 16));
		let uid = total.toString(16);

		let complete = 'x';
		while (uid.length < 14) {
			uid = `${uid}${complete}`;
			complete = complete + 'x';
		}

		return new UniqueEntityID(uid.slice(0, 14));
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
