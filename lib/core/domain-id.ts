import { calculateCpfDigits } from '../utils/check-cpf-digit.util';
import { ValueObject } from '../core/value-object';
import UniqueEntityID from './unique-entity-id';
const isUUID =
	/[0-9|a-z]{8}[-][0-9|a-z]{4}[-][0-9|a-z]{4}[-][0-9|a-z]{4}[-][0-9|a-z]{12}/;

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
	private constructor(props: UniqueEntityID) {
		super(props);
	}

	/**
	 *
	 * @param param length to define id size
	 * @returns UniqueEntityID with short id as value
	 * @default length 14
	 *
	 * @example
	 * const ID = DomainId.create().toShort({ length: 21 })
	 *
	 * console.log(ID.uid)
	 * > "31fbb4859e3301fcfe59a"
	 *
	 * ...
	 */
	toShort(param?: ILength): UniqueEntityID {
		const length = param?.length ?? 14;
		const uuid: string = this.props.value;
		const isUuid = isUUID.test(uuid);

		if (!isUuid) {
			return new UniqueEntityID(this.props.value.slice(0, length));
		}

		const parts = this.props.value.split('-');
		const total =
			parseInt(parts[4], 16) -
			(parseInt(parts[0], 16) -
				parseInt(parts[1], 16) -
				parseInt(parts[2], 16) -
				parseInt(parts[3], 16));
		let uid = total.toString(16);

		const lastPart = parseInt(parts[4], 16).toString();
		const arr = [...lastPart].reverse();
		const original = uuid.replace(/[-]/g, '');
		const reverse = [...original].reverse().toString().replace(/\,/g, '');

		const sum = calculateCpfDigits(arr.map((v) => parseInt(v)));
		const complete = `${sum.penultimateDigit}${sum.ultimateDigit}${reverse}`;
		uid = `${uid}${complete}`;

		return new UniqueEntityID(uid.slice(0, length));
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
