import IBaseConnection from './base-connection.interface';
import IBaseRepository from './base-repository.interface';
import Filter from './filter.interface';
import IMapper from './mapper.interface';

/**
 * `Schema` as Entity to persist on database and
 * `DomainAggregate` as Aggregate Entity
 * `ORM` as instance or connection or installed ORM
 * @example UserSchema from infra
 * @example UserAggregate from domain
 * @example ORM return method types `findOne` `finMany` ...
 *
 * @implements IBaseRepository
 * @see IBaseRepository
 */
export default abstract class BaseRepository<DomainAggregate, Entity, ORM>
     implements IBaseRepository<DomainAggregate, Entity> {
     /**
      *
      * @param connection instance of ORM connection
      * @param mapper instance of entity mapper
      *
      * @example
      * ConnectionInterface<TargetPersistence, ORM>,
      *
      * @example
      * MapperInterface<TargetPersistence, DomainAggregate >,
      */
     constructor(
          protected readonly connection: IBaseConnection<Entity, ORM>,
          protected readonly mapper: IMapper<DomainAggregate, Entity>,
     ) {}
     //
     /**
      *
      * @param filter
      * @returns DomainAggregate as Array or null
      */
     async find(filter: Filter): Promise<DomainAggregate[] | null> {
          const targets = await this.connection.find(filter);
          if (!targets) {
               return null;
          }
          return targets.map(this.mapper.toDomain);
     }
     //
     /**
      *
      * @param filter
      * @returns DomainAggregate as Array or null
      */
     async findOne(filter: Filter): Promise<DomainAggregate | null> {
          const target = await this.connection.findOne(filter);
          if (!target) {
               return null;
          }
          return this.mapper.toDomain(target);
     }
     //
     /**
      *
      * @param filter
      * @returns Promise Void
      */
     async delete(filter: Filter): Promise<void> {
          const exist = await this.connection.exists(filter);
          if (exist) {
               await this.connection.delete(filter);
          }
     }
     //
     /**
      *
      * @param filter
      * @returns Promise Boolean. `True` if exists and `False` else
      */
     async exists(filter: Filter): Promise<boolean> {
          const exist = this.connection.exists(filter);
          return !!exist;
     }
     //
     /**
      *
      * @param target as Domain Aggregate
      * @returns Promise Void
      *
      * @description for this operation is required target must has once of attributes bellow
      * for identify if is an update or create operation
      *
      * @requires `id`
      *
      * @requires `_id`
      */
     async save(target: DomainAggregate): Promise<void> {
          const persistenceValue = this.mapper.toPersistence(target);

          let exist: boolean = false;

          // @ts-expect-error
          const { id = undefined, _id = undefined } = target;

          // Check if provided id or _id to validate target already exists
          if (id) {
               exist = await this.connection.exists({ id });
          } else if (_id) {
               exist = await this.connection.exists({ _id });
          }

          // if target already exist update it else create it
          if (exist) {
               await this.connection.update(persistenceValue);
          } else {
               await this.connection.create(persistenceValue);
          }
     }
}

/**
 * @extends BaseRepository
 *
 * @argument `Schema` as Entity to persist on database and
 * @argument `DomainAggregate` as Aggregate Entity
 * @argument `ORM` as instance or connection or installed ORM
 */
export interface IRepository<DomainAggregate, Entity, ORM>
     extends BaseRepository<DomainAggregate, Entity, ORM> {}

export { BaseRepository };
