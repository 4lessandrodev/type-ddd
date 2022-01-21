
/**
 * Auto mapper. Automatically convert one target class to other
 */
export interface IAutoMapper<T, R> {
	convert: ( target: T ) => R;
}

export interface CloneProps {
	isNew: boolean;
}
