import { ISpecification } from './interface/specification.interface';

export abstract class SpecificationComposite<T> implements ISpecification<T> {
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

export class AndSpecification<T> extends SpecificationComposite<T> {
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

export class OrSpecification<T> extends SpecificationComposite<T> {
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

export class OrNotSpecification<T> extends SpecificationComposite<T> {
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

export class AndNotSpecification<T> extends SpecificationComposite<T> {
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

export class NotSpecification<T> extends SpecificationComposite<T> {
	constructor(private readonly other: ISpecification<T>) {
		super();
	}

	isSatisfiedBy(target: T): boolean {
		return !this.other.isSatisfiedBy(target);
	}
}

export default SpecificationComposite;
