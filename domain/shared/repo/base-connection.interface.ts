import Filter from './filter.interface'

export default interface IBaseConnection<Entity, ORM> {
     find: (filter: Filter) => Promise<Entity[] | null>;
     delete: (filter: Filter) => Promise<void>;
     exists: (filter: Filter) => Promise<boolean>;
     save: (target: Entity) => Promise<void>;
     get orm():ORM
}

export { IBaseConnection };