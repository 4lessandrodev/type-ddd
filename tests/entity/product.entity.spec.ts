import { Entity, Ok, Result, UID, ValueObject } from 'rich-domain';

describe('entity', () => {
	describe('toObject', () => {
		class Name extends ValueObject<{ value: string }> {
			private constructor(props: { value: string }) {
				super(props);
			}

			public static create(value: string): Result<Name> {
				return Ok(new Name({ value }));
			}
		}

		interface Props {
			id?: UID;
			price: number;
			name: Name;
			additionalInfo: string[];
			createdAt?: Date;
			updatedAt?: Date;
		}

		class Product extends Entity<Props> {
			private constructor(props: Props) {
				super(props);
			}
			public static create(props: Props): Result<Product> {
				return Ok(new Product(props));
			}
		}

		it('should infer types to aggregate on toObject method', () => {
			const name = Name.create('orange').value();
			const props: Props = {
				name,
				additionalInfo: ['from brazil'],
				price: 10,
			};
			const orange = Product.create(props).value();

			const object = orange.toObject();
			expect(object.additionalInfo).toEqual(['from brazil']);
			expect(object.name.value).toBe('orange');
			expect(orange.get('name').get('value')).toBe('orange');
			expect(object.price).toBe(10);
		});
	});
});
