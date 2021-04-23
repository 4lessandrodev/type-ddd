import UniqueEntityID from './unique-entity-id';
import BaseDomainEntity from './base-domain-entity';

const isEntity = (v: any): v is Entity<any> => {
     return v instanceof Entity;
};

/**
 * @extends BaseDomainEntity
 * @protected _id: UniqueEntityID
 * @protected props: T
 */
export default abstract class Entity<T extends BaseDomainEntity> {
     protected readonly _id: UniqueEntityID;
     protected readonly props: T;

     constructor(props: T, id?: UniqueEntityID) {
          this._id = id ? id : new UniqueEntityID();
          this.props = props;
     }
     /**
      * @returns Date
      */
     get createdAt(): Date {
          return this.props.createdAt ?? new Date();
     }

     /**
      * @returns Date
      */
     get updatedAt(): Date {
          return this.props.updatedAt ?? new Date();
     }

     /**
      * @returns Boolean
      */
     get isDeleted(): boolean {
          return this.props.isDeleted ?? false;
     }

     /**
      * @returns Date or Undefined
      */
     get deletedAt(): Date | undefined {
          return this.props.deletedAt;
     }

     /**
      *
      * @param object as Entity<T>
      * @returns boolean
      */
     public equals(object?: Entity<T>): boolean {
          if (object == null || object == undefined) {
               return false;
          }

          if (this === object) {
               return true;
          }

          if (!isEntity(object)) {
               return false;
          }

          return this._id.equals(object._id);
     }
}

export { Entity };
