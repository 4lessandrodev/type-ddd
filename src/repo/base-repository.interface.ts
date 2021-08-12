import Filter from './filter.interface';

/**
 * `DomainAggregate` as Aggregate Entity
 * `FilterKeys` as interface with keys type to filter on search
 * @example UserAggregate from domain
 * export class userRepository extends IBaseRepository<DomainAggregate, FilterKeys> {
 * 		// Methods ...
 * }
 *
 * @description define interface for default repository as C.R.Q.S principle.
 * Inject the `connection` and `mapper` on constructor
 *
 * @example
 *    constructor(
 *        private readonly connection: Connection,
 *        private readonly mapper: IMapper<DomainAggregate, Model>,
 *   ) {}
 *
 * @description Methods to implement
 * @method find
 * @method findOne
 * @method delete
 * @method exists
 * @method save
 */
export default interface IBaseRepository<DomainAggregate, FilterKeys> {
	 /**
	  * @param filter as `{key: value}`
	  * @returns Promise with Array of `DomainAggregate` or `null`
	  * @description you may define dynamic types
	  * @example 
	  * 
	  * // Dynamic interface
	  * 
	  * interface IKeys {
	  * 	id: string
	  * }
	  * 
	  * // your repository method
	  * 
	  * async find(filter: Filter<Partial<IKeys>>): Promise<DomainAggregate> {
	  * 	return this.conn.find(filter);
	  * }
	  * 
	  * // calling your repo method
	  * 
	  * repo.find<IKeys>({ id: "my-id" }); // Ok
	  * 
	  * repo.find<IKeys>({ id: 10 }); // Fails... id must be string
	  * 
	  * ...
	  */
	 find:(filter: Filter<Partial<FilterKeys>>) => Promise<DomainAggregate[] | null>;

	 /**
	  * @param filter as `{key: value}`
	  * @returns Promise with `DomainAggregate` or `null`
	  * @description you may define dynamic types
	  * @example 
	  * 
	  * // Dynamic interface
	  * 
	  * interface IKeys {
	  * 	id: string
	  * }
	  * 
	  * async findOne(filter: Filter<Partial<IKeys>>): Promise<DomainAggregate> {
	  * 	return this.conn.findOne(filter);
	  * }
	  * 
	  * // calling your repo method
	  * 
	  * repo.findOne<IKeys>({ id: "my-id" }); // Ok
	  * 
	  * repo.findOne<IKeys>({ id: 10 }); // Fails... id must be string
	  * 
	  * ...
	  */
	 findOne:(filter: Filter<Partial<FilterKeys>>) => Promise<DomainAggregate | null>;

	 /**
	  * @param filter as `{key: value}`
	  * @returns Promise `void`
	  * @description you may define dynamic types
	  * @example 
	  * 
	  * // Dynamic interface
	  * 
	  * interface IKeys {
	  * 	id: string
	  * }
	  * 
	  * async delete(filter: Filter<Partial<IKeys>>):  Promise<void> {
	  * 	return this.conn.delete(filter);
	  * }
	  * 
	  * repo.delete({ id: "my-id" }); // Ok
	  * 
	  * repo.delete({ id: 10 }); // Fails... id must be string
	  * 
	  * ...
	  */
	 delete:(filter: Filter<Partial<FilterKeys>>) => Promise<void>;

	 /**
	  * @param filter as `{key: value}`
	  * @returns Promise `boolean`
	  * @description you may define dynamic types
	  * @example 
	  * 
	  * // Dynamic interface
	  * 
	  * interface IKeys {
	  * 	id: string
	  * }
	  * 
	  * async exists(filter: Filter<Partial<IKeys>>): Promise<DomainAggregate> {
	  * 	return this.conn.exists(filter);
	  * }
	  * 
	  * repo.exists({ id: "my-id" }); // Ok
	  * 
	  * repo.exists({ id: 10 }); // Fails... id must be string
	  * 
	  * ...
	  */
	 exists:(filter: Filter<Partial<FilterKeys>>) => Promise<boolean>;

	 /**
	  * @param target as DomainAggregate
	  * @returns Promise `void`
	  *
	  * @description this method must update or create on cascade
	  *
	  * @example
	  * async save(target: DomainAggregate): Promise<void> {
	  *
	  *  const persistenceTarget = this.mapper.toPersistence(target);
	  *
	  *  const { id } = persistenceTarget;
	  *
	  *  exist = await this.exists({ id });
	  *
	  *  // if target already exist just update It.
	  *  if (exist) {
	  *       await this.connection.update(persistenceTarget);
	  *  } else {
	  *       await this.connection.create(persistenceTarget);
	  *  }
	  * }
	  *
	  */
	 save: (target: DomainAggregate) => Promise<void>;
}

export { IBaseRepository };
