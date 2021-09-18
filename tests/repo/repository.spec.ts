import IBaseConnection from '../../lib/repo/base-connection.interface';
import IRepository, {
	BaseRepository,
} from '../../lib/repo/base-repository.abstract';
import IMapper from '../../lib/repo/mapper.interface';

describe('repository', () => {
	// Define an ORM type
	const ORM = {
		findOne: () => 1,
		findMany: () => [1, 2, 3],
		exist: () => true,
	};

	type typeORM = typeof ORM;
	//
	// Mock connection
	const Connection: IBaseConnection<any, typeORM> = {
		exists: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		create: jest.fn(),
		orm: () => ORM,
	};
	// Mapper mock
	const Mapper: IMapper<any, any> = {
		toDomain: jest.fn(),
		toPersistence: jest.fn(),
	};
	//
	const mockRepo = class mock extends BaseRepository<
		string | { id: string } | { _id: string },
		any,
		typeORM
	> {};

	class Repository
		extends BaseRepository<any, any, typeORM>
		implements IRepository<any, any, typeORM>
	{
		constructor(
			protected readonly connection: IBaseConnection<any, typeORM>,
			protected readonly mapper: IMapper<any, any>
		) {
			super(connection, mapper);
		}
	}

	// Clear all mocks before each test
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		const repo = new Repository(Connection, Mapper);
		expect(repo).toBeDefined();
	});

	it('should be defined', () => {
		const repo = new Repository(Connection, Mapper);
		expect(repo.delete).toBeDefined();
	});

	it('should be defined', () => {
		const repo = new Repository(Connection, Mapper);
		expect(repo.exists).toBeDefined();
	});

	it('should be defined', () => {
		const repo = new Repository(Connection, Mapper);
		expect(repo.find).toBeDefined();
	});

	it('should be defined', () => {
		const repo = new Repository(Connection, Mapper);
		expect(repo.save).toBeDefined();
	});

	it('should not call delete method from connection if register does not exist', async () => {
		const instance = new mockRepo(Connection, Mapper);

		//Mock find methods, it is used on delete method
		jest.spyOn(instance, 'exists').mockResolvedValueOnce(false);

		//
		await instance.delete({ id: 'valid_id' });
		expect(Connection.delete).not.toHaveBeenCalled();
	});

	it('should call find method', async () => {
		const instance = new mockRepo(Connection, Mapper);
		await instance.find({ id: 'valid_id' });
		expect(Connection.find).toHaveBeenCalled();
	});

	it('should call findOne method', async () => {
		const instance = new mockRepo(Connection, Mapper);
		await instance.findOne({ id: 'valid_id' });
		expect(Connection.findOne).toHaveBeenCalled();
	});

	it('should call save method and update on connection', async () => {
		// Mock exist from connection cause save method uses to check if target alread exist
		// if exist calls update else create
		jest.spyOn(Connection, 'exists').mockResolvedValueOnce(true);

		const instance = new mockRepo(Connection, Mapper);
		await instance.save({ id: 'exists' });
		expect(Connection.update).toHaveBeenCalled();
	});

	it('should call save method and update on connection', async () => {
		// Mock exist from connection cause save method uses to check if target alread exist
		// if exist calls update else create
		jest.spyOn(Connection, 'exists').mockResolvedValueOnce(true);

		const instance = new mockRepo(Connection, Mapper);
		await instance.save({ _id: 'exists' });
		expect(Connection.update).toHaveBeenCalled();
	});

	it('should call save method and create on connection', async () => {
		// Mock exist from connection cause save method uses to check if target alread exist
		// if exist calls update else create
		jest.spyOn(Connection, 'exists').mockResolvedValueOnce(false);

		const instance = new mockRepo(Connection, Mapper);
		await instance.save('valid_entity');
		expect(Connection.create).toHaveBeenCalled();
	});

	it('should call exists method', async () => {
		const instance = new mockRepo(Connection, Mapper);
		//
		//Mock find methods
		jest.spyOn(Connection, 'exists').mockResolvedValueOnce(true);
		//
		await instance.exists({ email: 'valid_email@mail.com' });
		expect(Connection.exists).toHaveBeenCalled();
	});

	it('should call delete method from connection', async () => {
		const instance = new mockRepo(Connection, Mapper);

		//Mock find methods, it is used on delete method
		jest.spyOn(instance, 'exists').mockResolvedValueOnce(true);

		await instance.delete({ id: 'valid_id' });
		expect(Connection.delete).toHaveBeenCalled();
	});

	it('should call orm method from connection', () => {
		const orm = Connection.orm();
		expect(orm.findOne()).toBe(1);
	});
});
