export interface ISpecification<T> {
	isSatisfiedBy: (target: T) => boolean;
	and: (other: ISpecification<T>) => ISpecification<T>;
	or: (other: ISpecification<T>) => ISpecification<T>;
	andNot: (other: ISpecification<T>) => ISpecification<T>;
	orNot: (other: ISpecification<T>) => ISpecification<T>;
	not: () => ISpecification<T>;
}

export abstract class Specification<T> implements ISpecification<T> {
	abstract isSatisfiedBy(target: T): boolean;

	and(other: ISpecification<T>): ISpecification<T> {
		return new AndSpecification<T>(this, other);
	}

	or(other: ISpecification<T>): ISpecification<T> {
		return new OrSpecification<T>(this, other);
	}

	orNot(other: ISpecification<T>): ISpecification<T> {
		return new OrNotSpecification<T>(this, other);
	}

	andNot(other: ISpecification<T>): ISpecification<T> {
		return new AndNotSpecification<T>(this, other);
	}

	not(): ISpecification<T> {
		return new NotSpecification<T>(this);
	}
}

export class AndSpecification<T> extends Specification<T> {
	constructor(
		private readonly one: ISpecification<T>,
		private readonly other: ISpecification<T>,
	) {
		super();
	}

	isSatisfiedBy(target: T): boolean {
		return (
			this.one.isSatisfiedBy(target) && this.other.isSatisfiedBy(target)
		);
	}
}

export class OrSpecification<T> extends Specification<T> {
	constructor(
		private readonly one: ISpecification<T>,
		private readonly other: ISpecification<T>,
	) {
		super();
	}

	isSatisfiedBy(target: T): boolean {
		return (
			this.one.isSatisfiedBy(target) || this.other.isSatisfiedBy(target)
		);
	}
}

export class OrNotSpecification<T> extends Specification<T> {
	constructor(
		private readonly one: ISpecification<T>,
		private readonly other: ISpecification<T>,
	) {
		super();
	}

	isSatisfiedBy(target: T): boolean {
		return (
			(this.one.isSatisfiedBy(target) ||
				this.other.isSatisfiedBy(target)) !== true
		);
	}
}

export class AndNotSpecification<T> extends Specification<T> {
	constructor(
		private readonly one: ISpecification<T>,
		private readonly other: ISpecification<T>,
	) {
		super();
	}

	isSatisfiedBy(target: T): boolean {
		return (
			(this.one.isSatisfiedBy(target) &&
				this.other.isSatisfiedBy(target)) !== true
		);
	}
}

export class NotSpecification<T> extends Specification<T> {
	constructor(private readonly other: ISpecification<T>) {
		super();
	}

	isSatisfiedBy(target: T): boolean {
		return !this.other.isSatisfiedBy(target);
	}
}

export default Specification;
