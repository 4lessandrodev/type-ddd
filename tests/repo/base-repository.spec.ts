import { BaseDomainEntity, DomainId, Entity } from '../../src/';
import Result from '../../src/core/result';
import { IBaseRepository } from '../../src/repo/base-repository.interface';
import Filter from '../../src/repo/filter.interface';

interface IFilterKeys {
	name: string;
	email: string;
	id: string;
}

interface userProps extends BaseDomainEntity {
	name: string;
}

class UserAggregate extends Entity<userProps> {
	private constructor(props: userProps) {
		super(props, UserAggregate.name);
	}

	get name(): string {
		return this.props.name;
	}

	public static create(name: string): Result<UserAggregate> {
		return Result.ok<UserAggregate>(
			new UserAggregate({ ID: DomainId.create('valid_id'), name })
		);
	}
}

const user: UserAggregate = UserAggregate.create('john stuart').getResult();
const db: UserAggregate[] = [user];

class UserBaseRepo implements IBaseRepository<UserAggregate, IFilterKeys> {
	async find(
		_filter: Filter<Partial<IFilterKeys>> // aggregate props
	): Promise<UserAggregate[]> {
		return [user];
	}

	async findOne(
		filter: Filter<Partial<IFilterKeys>> // partial aggregate keys
	): Promise<UserAggregate | null> {
		const exists = db.find(
			(user) => user.id.value.toString() === filter?.id
		);
		if (!exists) {
			return null;
		}
		return exists;
	}

	async delete(
		_filter: Filter<Partial<IFilterKeys>> // base interface only id
	): Promise<void> {
		const index = db.findIndex((user) => user.id.equals());
		db.splice(index, 1);
	}

	async exists(filter: Filter<Partial<IFilterKeys>>): Promise<boolean> {
		const exists = db.findIndex((user) => user.name === filter?.name);
		return exists !== -1;
	}

	async save(target: UserAggregate): Promise<void> {
		db.push(target);
	}
}

describe('base-repository', () => {
	it('should be defined', () => {
		const repo = new UserBaseRepo();
		expect(repo).toBeDefined();
	});

	it('should infer filter types', async () => {
		const exists = await new UserBaseRepo().exists({ name: 'john stuart' });
		expect(exists).toBe(true);
	});

	it('should accept an interface', async () => {
		const repo = new UserBaseRepo();
		const result = await repo.find({ name: 'john stuart' });
		expect(result).toEqual([user]);
	});

	it('should accept an interface', async () => {
		const repo = new UserBaseRepo();
		const spy = jest.spyOn(repo, 'delete');

		await repo.delete({ id: 'valid_id' });
		expect(spy).toHaveBeenCalledWith({ id: 'valid_id' });
	});
});
