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
			keys.map((key) => {
				if (this[key] instanceof ValueObject) {
					if (this[key]?.uid !== undefined) {
						valueObj = Object.assign(
							{},
							{ ...valueObj },
							{ [key]: this[key]?.uid }
						);
					} else {
						const props = this?.[key].toObject();
						valueObj = Object.assign(
							{},
							{ ...valueObj },
							{ [key]: props }
						);
					}
				} else {
					if (Array.isArray(this[key])) {
						const isValueObject =
							this[key][0] instanceof ValueObject;

						if (isValueObject) {
							const props = this[key].map(
								(vo: ValueObject<any>) => vo?.toObject()
							);
							valueObj = Object.assign(
								{},
								{ ...valueObj },
								{ [key]: props }
							);
						} else {
							valueObj = Object.assign(
								{},
								{ ...valueObj },
								{ [key]: this.props[key] }
							);
						}
					} else {
						valueObj = Object.assign(
							{},
							{ ...valueObj },
							{ [key]: this.props[key] }
						);
					}
				}
			});

			return valueObj as Readonly<D[keyof D]>;
		}

		valueObj = this?.[keys[0]];

		if (valueObj instanceof ValueObject) {
			valueObj = valueObj.toObject();
		}

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
