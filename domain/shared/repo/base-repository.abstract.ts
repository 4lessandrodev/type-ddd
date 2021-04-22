import IBaseConnection from './base-connection.interface';
import Filter from './filter.interface';
import IMapper from './mapper.interface';

interface IBaseRepository<DomainAggregate> {
     find: (filter: Filter) => Promise<DomainAggregate[] | null>;
     delete: (filter: Filter) => Promise<void>;
     exists: (filter: Filter) => Promise<boolean>;
     save: (target: DomainAggregate) => Promise<void>;
}

/**
 * Your repository must extends to this one
 */
abstract class BaseRepository<DomainAggregate, Entity, ORM>
     implements IBaseRepository<DomainAggregate> {
     constructor(
          protected readonly connection: IBaseConnection<Entity, ORM>,
          protected readonly mapper: IMapper<DomainAggregate, Entity>,
     ) {}
     //
     async find(filter: Filter): Promise<DomainAggregate[] | null> {
          const targets = await this.connection.find(filter);
          if (!targets) {
               return null;
          }
          return targets.map(this.mapper.toDomain);
     }
     //
     async delete(filter: Filter): Promise<void> {
          await this.connection.delete(filter);
     }
     //
     async exists(filter: Filter): Promise<boolean> {
          const exist = this.connection.exists(filter);
          return !!exist;
     }
     //
     async save(target: DomainAggregate): Promise<void> {
          const persistenceValue = this.mapper.toPersistence(target);
          await this.connection.save(persistenceValue);
     }
}

export default interface IRepository<DomainAggregate, Entity, ORM>
     extends BaseRepository<DomainAggregate, Entity, ORM> {}

export { IRepository };
