export abstract class BaseDomainEntity {
  constructor(
    public createdAt?: Date,
    public updatedAt?: Date,
    public isDeleted?: boolean,
  ) {
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.isDeleted = isDeleted ?? false;
  }
}
