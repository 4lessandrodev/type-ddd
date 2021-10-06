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
			return new UniqueEntityID(this.props.value.slice(0, 16));
		}

		const onlyNumbs: string = uuid.replace(/[a-z]|[A-Z]|[-]/g, '');
		const numbs = parseInt(onlyNumbs);
		const calc = numbs / 100000 - (Math.log(numbs) + Math.sqrt(numbs));
		const letters: string = uuid.replace(/[0-9]|[-]/g, '');
		const hex32 = calc.toString(32);
		const uid = `${hex32}${letters}`.replace(/[\.]/g, '').slice(0, 16);
		return new UniqueEntityID(uid);
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
