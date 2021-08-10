import Entity from './entity';
import UniqueEntityID from './unique-entity-id';

/**
 * @extends Entity
 *
 * @param id UniqueEntityID
 *
 * @description param is optional
 * if not provided will generate a new one uuid
 */
class DomainId extends Entity<any> {
	 private constructor(id?: UniqueEntityID) {
		super(null, id);
	 }

	 /**
	  * @returns UniqueEntityID
	  */
	 get id(): UniqueEntityID {
		return this._id;
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
