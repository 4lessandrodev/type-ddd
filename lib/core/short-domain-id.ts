import { calculateCpfDigits as createDigit } from '../utils/check-cpf-digit.util';
import { ValueObject } from './value-object';
import UniqueEntityID from './unique-entity-id';
import { CloneProps } from '../types/types';

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
class ShortDomainId extends ValueObject<any> {
	public readonly isNew: boolean;
	private constructor(props: UniqueEntityID, isNew: boolean) {
		super( props );
		this.isNew = isNew;
	}

	/**
	 *
	 * @param param length to define id size
	 * @returns string with short id value
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
	toShort(param?: ILength): string {
		const length = param?.length ?? 16;
		const uuid: string = this.props.value;
		const isUuid = isUUID.test(uuid);

		if (!isUuid) {
			return new UniqueEntityID(this.props.value.slice(0, length)).uid;
		}

		const parts = this.props.value.split('-');
		// get each part of uuid. transform in number and subtract each
		const total =
			parseInt(parts[4], 16) -
			(parseInt(parts[0], 16) -
				parseInt(parts[1], 16) -
				parseInt(parts[2], 16) -
				parseInt(parts[3], 16));

		// get last part from uuid as string
		const lastPart = parseInt(parts[4], 16).toString();
		// transform calc to hex
		let uid = total.toString(16);
		// transform calc to arr
		const arr = [...lastPart].reverse();
		// remove dash from original uuid
		const original = uuid.replace(/[-]/g, '');
		// reverse value
		const reverse = [...original].reverse().toString().replace(/\,/g, '');
		// calculate digit sum from calc
		const sum = createDigit(arr.map((v) => parseInt(v)));
		// get values to complete the length if result is less than 14 chars
		const complete = `${sum.penultimateDigit}${sum.ultimateDigit}${reverse}`;
		// add value completion to id
		uid = `${uid}${complete}`;

		return new UniqueEntityID(uid.slice(0, length)).uid;
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
	 * > "31fbb4859e3301fb"
	 */
	get uid(): string {
		return new UniqueEntityID(this.props.value).uid;
	}
	
	/**
	 * @description this method clone the instance value as new ID
	 * @description if you do not want the clone instance as new, you must provide false on props.isNew
	 * @returns DomainId
	 */
	 clone (props?: CloneProps): ShortDomainId {
		const isNew = props ? props.isNew : true;
		return new ShortDomainId(new UniqueEntityID(this.props.value), isNew);
	}

	/**
	 * @extends Entity
	 *
	 * @param id UniqueEntityID
	 * @param length as { length: 16 }
	 * 
	 * @default 16
	 * @variation 14 to 32
	 *
	 * @description param is optional
	 * if not provided will generate a new one value like `31fbb4859e3301fb`
	 */
	public static create ( id?: string | number, length?: ILength ): ShortDomainId {
		const isNew = id !== undefined && id !== null;
		const shortUid = new ShortDomainId(new UniqueEntityID(id), !isNew).toShort( length );
		return new ShortDomainId(new UniqueEntityID(shortUid), !isNew)
	}
}

export { ShortDomainId };
export default ShortDomainId;
