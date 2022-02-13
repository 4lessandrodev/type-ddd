import { BaseDomainEntity } from '../../lib/core/base-domain-entity';
import { Result } from '../../lib/core/result';
import { DomainId, Entity } from '../../lib';

describe('entity', () => {
	// Define Car interface props
	//---------------------------------------------------------------
	interface CarProps extends BaseDomainEntity {
		color: string;
		year: number;
	}
	//---------------------------------------------------------------
	// Define Car Entity Class
	class Car extends Entity<CarProps> {
		private constructor(props: CarProps) {
			super(props, Car.name);
		}

		get color(): string {
			return this.props.color;
		}

		get year(): number {
			return this.props.year;
		}

		public static create(props: CarProps): Result<Car> {
			// Your business validation logic
			// You should use rules before create entity instance
			if (props.year < 1960) {
				return Result.fail<Car>('The car is so old');
			}
			return Result.ok<Car>(new Car(props));
		}
	}
	//---------------------------------------------------------------
	it('should be defined', () => {
		const car = Car.create;
		expect(car).toBeDefined();
	});

	it('should create a valid instance', () => {
		const car = Car.create({
			ID: DomainId.create(),
			color: 'BLUE',
			year: 2000,
		});
		expect(car.isSuccess).toBe(true);
		expect(car.getResult().color).toBe('BLUE');
		expect(car.getResult().year).toBe(2000);
		// The attributes bellow is defined automatically for aggregate and entities
		// cause extends BaseDomainEntity
		expect(car.getResult().isDeleted).toBe(false);
		expect(car.getResult().createdAt.getDay()).toBe(new Date().getDay());
		expect(car.getResult().updatedAt.getDay()).toBe(new Date().getDay());
	});

	it('should fail on try create so old car, business logic', () => {
		const car = Car.create({
			ID: DomainId.create(),
			color: 'BLUE',
			year: 1900,
		});
		expect(car.isFailure).toBe(true);
		expect(car.error).toBe('The car is so old');
	});

	it('should get hashCode', () => {
		const car = Car.create({
			ID: DomainId.create('143150b2-47b6-4d97-945b-289f821c7fb9'),
			color: 'BLUE',
			year: 2021,
		}).getResult();
		// short uid
		expect(car.getHashCode().uid).toBe(
			'@Car:143150b2-47b6-4d97-945b-289f821c7fb9'
		);

		expect(car.getHashCode()).toMatchInlineSnapshot(`
		UniqueEntityID {
		  "value": "@Car:143150b2-47b6-4d97-945b-289f821c7fb9",
		}
	`);
	});
});
