export abstract class BaseDomainEntity {
     constructor(
          public createdAt?: Date,
          public updatedAt?: Date,
          public isDeleted?: boolean,
          public deletedAt?: Date,
     ) {
          this.createdAt = createdAt ?? new Date();
          this.updatedAt = updatedAt ?? new Date();
          this.isDeleted = isDeleted ?? false;
          this.deletedAt = isDeleted ? deletedAt : undefined;
     }
}
