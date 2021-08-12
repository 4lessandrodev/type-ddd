import { ValueObject } from '..';
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

	 toString(){
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
