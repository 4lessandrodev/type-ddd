/**
 * `TargetPersistence` as Entity to persist on database and
 * `DomainAggregate` as Aggregate entity from domain
 * @method toPersistence receives a `DomainAggregate` target and transform it on `TargetPersistence`
 * @method toDomain receives a `TargetPersistence` target and transform it on `DomainAggregate`
 *
 */
export default interface IMapper<DomainAggregate, Entity> {
	toDomain: (target: Entity) => DomainAggregate;
	toPersistence: (target: DomainAggregate) => Entity;
}

export { IMapper };
