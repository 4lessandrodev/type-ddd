import { autoConvertDomainToObject } from '../core/entity';
import { IAutoMapper } from '../types/types';

/**
 * @see entity
 * because circular dependency it was implemented on there and also on value object
 *
 * @see types-ddd/lib/core/entity.ts
 * @see types-ddd/lib/core/value-object.ts
 */

/**
 * @description the auto mapper
 *
 * @param T as target to be provided
 * @param R as Element to returns
 */
export class AutoMapper<T, R> implements IAutoMapper<T, Readonly<R>> {
	convert(target: T): Readonly<R> {
		return autoConvertDomainToObject(target);
	}
}
