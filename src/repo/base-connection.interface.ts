import Filter from './filter.interface';

/**
 * `TargetEntity` as Entity to persist on database and
 * `ORM` as instance or connection or installed ORM
 * @example UserSchema from infra
 * @example TypeORM installed instance
 *
 * @method find:
 * @method delete:
 * @method exists:
 * @method update:
 * @method create:
 * @method orm:
 */
export default interface IBaseConnection<Entity, ORM> {
     find: (filter: Filter) => Promise<Entity[] | null>;
     delete: (filter: Filter) => Promise<void>;
     exists: (filter: Filter) => Promise<boolean>;
     update: (target: Entity) => Promise<void>;
     create: (target: Entity) => Promise<void>;
     orm(): ORM;
}

export { IBaseConnection };
