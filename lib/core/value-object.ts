interface ValueObjectProps {
	[index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */
export default abstract class ValueObject<T extends ValueObjectProps> {
	protected props: T;

	constructor(props: T) {
		const baseProps: any = {
			...props,
		};

		this.props = baseProps;
	}

	/**
	 * @description Convert value object to a simple data.
	 * @returns string, number or object
	 *
	 * @requires simple-data. It does not support a value object inside another one.
	 */
	toObject<D = T>(): Readonly<D[keyof D]> {
		let valueObj = {};
		const keys = Object.keys(this.props);

		if (keys.length > 1) {
			valueObj = Object.assign(
				{},
				{ ...valueObj },
				{ ...this?.['props'] }
			);

			return valueObj as Readonly<D[keyof D]>;
		}

		valueObj = this?.[keys[0]];
		return valueObj as Readonly<D[keyof D]>;
	}

	public equals(valueObject?: ValueObject<T>): boolean {
		if (valueObject === null || valueObject === undefined) {
			return false;
		}
		if (valueObject.props === undefined) {
			return false;
		}
		return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
	}
}

export { ValueObject };
