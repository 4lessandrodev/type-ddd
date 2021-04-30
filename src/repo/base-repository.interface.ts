import Filter from './filter.interface';

/**
 * `DomainAggregate` as Aggregate Entity
 * @example UserAggregate from domain
 *
 * @description define interface for default repository as C.R.Q.S principle.
 * Inject the `connection` and `mapper` on constructor
 *
 * @example
 *    constructor(
 *        private readonly connection: Connection,
 *        private readonly mapper: IMapper<DomainAggregate, Entity>,
 *   ) {}
 *
 * @description Methods to implement
 * @method find
 * @method findOne
 * @method delete
 * @method exists
 * @method save
 */
export default interface IBaseRepository<DomainAggregate> {
     /**
      * @param filter as `{key: value}`
      * @returns Promise with Array of `DomainAggregate` or `null`
      */
     find: (filter: Filter) => Promise<DomainAggregate[] | null>;
     /**
      * @param filter as `{key: value}`
      * @returns Promise with `DomainAggregate` or `null`
      */
     findOne: (filter: Filter) => Promise<DomainAggregate | null>;
     /**
      * @param filter as `{key: value}`
      * @returns Promise `void`
      */
     delete: (filter: Filter) => Promise<void>;
     /**
      * @param filter as `{key: value}`
      * @returns Promise `boolean`
      */
     exists: (filter: Filter) => Promise<boolean>;
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
      *  // if target already exist update it else create new one
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
