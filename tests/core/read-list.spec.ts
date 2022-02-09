import WriteList from '../../lib/core/write-list';
import ReadList from '../../lib/core/read-list';
import { BaseDomainEntity, DomainId, Entity, Result } from '../../lib';

describe('read-list', () => {
	//
	//---------------------------------------------------
	//Implement write list
	class GradesList extends WriteList<number> {
		private constructor(values?: number[]) {
			super(values);
		}

		compareItems(a: number, b: number): boolean {
			return a === b;
		}

		public static create(values?: number[]): GradesList {
			return new GradesList(values ?? []);
		}
	}
	//---------------------------------------------------

	//
	interface UserProps extends BaseDomainEntity {
		name: string;
		grades: GradesList;
	}

	class User extends Entity<UserProps> {
		private constructor(props: UserProps) {
			super(props, User.name);
		}

		// On get method return a ReadList and it is readOnly
		get grades(): ReadList<number> {
			return this.props.grades;
		}

		public static create(props: UserProps): Result<User> {
			return Result.ok(new User(props));
		}
	}

	it('should toThrow if try edit a read list', () => {
		const user = User.create({
			ID: DomainId.create(),
			grades: GradesList.create([7, 8, 6]),
			name: 'John',
		}).getResult();

		const validate = {
			// @ts-expect-error
			addMany: user.grades.addMany,
			// @ts-expect-error
			remove: user.grades.remove,
			// @ts-expect-error
			add: user.grades.add,
			// @ts-expect-error
			removeMany: user.grades.removeMany,
		};

		const failAdd = () => validate.add();
		const failAddMany = () => validate.add();
		const failRemove = () => validate.add();
		const failRemoveMany = () => validate.add();

		expect(failAdd).toThrow();
		expect(failAddMany).toThrow();
		expect(failRemove).toThrow();
		expect(failRemoveMany).toThrow();
	});
});
