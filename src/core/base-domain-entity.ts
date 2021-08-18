/**
 * @abstract BaseDomainEntity
 *
 * @property `createdAt`:Date
 * @property `updatedAt`:Date
 * @property `isDeleted`:Boolean
 * @property `deletedAt`:Date
 *
 * @description
 * All optional properties
 */

import { DomainId } from "..";

 abstract class BaseDomainEntity {
     constructor(
		  public readonly ID: DomainId,
          public createdAt?: Date,
          public updatedAt?: Date,
          public isDeleted?: boolean,
          public deletedAt?: Date,
     ) {
          this.createdAt = createdAt ?? new Date();
          this.updatedAt = updatedAt ?? new Date();
          this.isDeleted = isDeleted ?? false;
          this.deletedAt = isDeleted ? deletedAt : undefined;
		  Object.freeze(this.ID)
     }
}

export { BaseDomainEntity };
