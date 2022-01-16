import { Entity } from "../core/entity";
import { IAutoMapper } from "../types/types";
import { BaseDomainEntity } from "../core/base-domain-entity";

interface DefaultProps extends Partial<BaseDomainEntity> {
	ID: undefined,
	id: string;
}

export const ConvertEntity = <T extends DefaultProps> ( target: T ): any => {
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
		if ( key !== 'ID' ) {
			object = Object.assign( {}, { ...object }, { [key]: target[key]?.value } );
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

export class AutoMapper<T, R> implements IAutoMapper<T, R> {
	convert ( target: T ): R {
		if ( target instanceof Entity ) {
			const obj = ConvertEntity( target as any );
			return obj as R;
		}
		return {} as R;
	};
}
