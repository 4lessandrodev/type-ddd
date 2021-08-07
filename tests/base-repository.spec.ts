import BaseDomainEntity from '../src/core/base-domain-entity';
import Entity from '../src/core/entity';
import Result from '../src/core/result';
import UniqueEntityID from '../src/core/unique-entity-id';
import {IBaseRepository} from '../src/repo/base-repository.interface';
import Filter from '../src/repo/filter.interface';


interface baseId {
	id?: UniqueEntityID
}

interface userProps extends BaseDomainEntity{
	name: string;
}

class UserAggregate extends Entity<userProps> {
	private constructor(props: userProps, id?: UniqueEntityID) {
		super(props, id);
	}
	
	get id(): UniqueEntityID {
		return this._id;
	}
	
	get name(): string {
		return this.props.name;
	}
	
	public static create(
		name: string,
		id?: UniqueEntityID,
	): Result<UserAggregate> {
			return Result.ok<UserAggregate>(new UserAggregate({ name }, id));
		}
	}
	
	const user: UserAggregate = UserAggregate.create("john stuart").getResult();
	const db:UserAggregate[] = [user];

class UserBaseRepo implements IBaseRepository<UserAggregate>{
	async find (
		filter: Filter<Partial<userProps>> // aggregate props
	): Promise<UserAggregate[]>{
		return [user]
	};

	async findOne (
		filter: Filter<Partial<UserAggregate>> // partial aggregate keys
	): Promise<UserAggregate | null>{
		const exists =  db.find((user)=> user.id.equals(filter?.id));
		if (!exists) {
			return null
		}
		return exists;
	};

	async delete (
		filter: Filter<baseId> // base interface only id
	): Promise<void>{
		const index = db.findIndex((user)=> user.id.equals(filter?.id))
		db.splice(index, 1);
	};

	async exists (
		filter: Filter<Partial<UserAggregate>>
	): Promise<boolean>{
		const exists = db.findIndex((user)=> user.name === filter?.name);
		return exists !== -1;
	};

	async save (
		target: UserAggregate
	): Promise<void>{
		db.push(target);
	};
}

describe('base-repository', () => {
	
	it('should be defined', ()=>{
		const repo = new UserBaseRepo();
		expect(repo).toBeDefined()
	})

	it('should infer filter types', async ()=>{
		const exists = await new UserBaseRepo().exists({name: "john stuart"});
		expect(exists).toBe(true);
	})

	it('should accept an interface',async ()=>{
		const repo = new UserBaseRepo();
		const result = await repo.find({name: "john stuart"});
		expect(result).toEqual([user]);
	})

	it('should accept an interface',async ()=>{
		const uniqueId =  new UniqueEntityID();
		const repo = new UserBaseRepo();
		const spy = jest.spyOn(repo, 'delete');
		await repo.delete({id:uniqueId});
		expect(spy).toHaveBeenCalledWith({id:uniqueId})
	})
});
