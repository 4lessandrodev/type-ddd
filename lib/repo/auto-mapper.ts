import AggregateRoot, { Entity } from "../core/entity";
import { IAutoMapper } from "../types/types";
import { BaseDomainEntity } from "../core/base-domain-entity";
import { ValueObject } from "../core/value-object";

interface DefaultProps extends Partial<BaseDomainEntity> {
	ID: undefined,
	id: string;
}

export const convertEntity = <T extends DefaultProps> ( target: T ): any => {
	let object: DefaultProps = {
		ID: undefined as any,
		id: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: undefined,
		isDeleted: false,
	};

	const keys = Object.keys( target?.['props'] );

	keys.forEach( ( key ) => {

		const subTarget = target?.[key];

		const isEntityOrAggregate = subTarget?.id !== undefined;
		
		if ( isEntityOrAggregate ) {
			const subKeys = convertEntity( subTarget as any );
			object = Object.assign( {}, { ...object }, { [key]: { ...subKeys } } );
		}

		const isArray = Array.isArray( subTarget );
		
		if ( isArray ) {

			if ( subTarget.length > 0 ) {
				const firstElement = subTarget[0]
	
				const isEntityOrAggregate = firstElement instanceof Entity || firstElement instanceof AggregateRoot;

				if ( isEntityOrAggregate ) {
					
					const subKeys = subTarget.map( ( obj ) => convertEntity( obj ) );
					object = Object.assign( {}, { ...object }, { [key]: subKeys } );

				} else if ( firstElement instanceof ValueObject ) {
					
					const subKeys = subTarget.map( ( obj ) => obj.value);
					object = Object.assign( {}, { ...object }, { [key]: subKeys } );

				} else {

					object = Object.assign( {}, { ...object }, { [key]: subTarget } );

				}
			} else {
				object = Object.assign( {}, { ...object }, { [key]: subTarget } );
			}
		}

		if ( key !== 'ID' ) {
			const keys = Object.keys( object );
			const values = Object.values( object );
			
			object = Object.assign( {}, { ...object }, { [key]: subTarget?.value } );

			keys.forEach( ( k , i) => {
				Object.assign( object, { [k]: values[i] } );
			})
		}
	} );
	
	object.id = String( target?.id );
	delete object.ID;
	object.createdAt = target?.createdAt ?? new Date();
	object.updatedAt = target?.updatedAt ?? new Date();
	object.deletedAt = target?.deletedAt as any;
	object.isDeleted = target?.isDeleted;
	return object;
}


export const autoConvertEntityToObject = <T, D>(target: T): D => {
	if ( target instanceof Entity || target instanceof AggregateRoot) {
		const obj = convertEntity( target as any );
		return obj as D;
	}
	return {} as D;
}

export class AutoMapper<T, R> implements IAutoMapper<T, R> {
	convert ( target: T ): R {
		return autoConvertEntityToObject( target );
	}
}
