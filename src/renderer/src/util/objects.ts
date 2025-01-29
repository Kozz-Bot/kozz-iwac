export type NotNull<T extends any> = T extends null
	? never
	: T extends undefined
		? never
		: T extends Array<any>
			? NotNull<T[number]>
			: T;

// https://stackoverflow.com/questions/43080547/how-to-override-type-properties-in-typescript
export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

//https://stackoverflow.com/questions/61132262/typescript-deep-partial#61132308
export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;

export type LiteralValue = string | number | boolean | null;

export type JSON =
	| LiteralValue
	| {
			[key: string]: JSON;
	  }
	| JSON[];

// https://stackoverflow.com/questions/65332597/typescript-is-there-a-recursive-keyof
export type RecursiveKeyOf<TObj extends object> = {
	[TKey in keyof TObj & (string | number)]: TObj[TKey] extends any[]
		? `${TKey}`
		: TObj[TKey] extends object
			? `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
			: `${TKey}`;
}[keyof TObj & (string | number)];

export type IsKeyFromObject<Key extends string, Obj> = Obj extends object
	? Key extends keyof Obj
		? true
		: false
	: false;

export type ObjectPropertyAccess<
	Obj extends object,
	Prop extends string,
> = Prop extends keyof Obj
	? Obj[Prop]
	: Prop extends `${infer Key1}.${infer Key2}`
		? Key1 extends keyof Obj
			? Obj[Key1] extends object
				? Key2 extends RecursiveKeyOf<Obj[Key1]>
					? // @ts-ignore IDK why this bitch is complaining
						ObjectPropertyAccess<Obj[Key1], Key2>
					: never
				: never
			: never
		: never;

export type ObjectShapeFromKeys<
	Shape extends string,
	value,
> = Shape extends `${infer Key1}.${infer Key2}`
	? Record<Key1, ObjectShapeFromKeys<Key2, value>>
	: Record<Shape, value>;

type RemovePropertiesFn = <
	Obj extends Record<string, any>,
	Properties extends keyof Obj,
>(
	obj: Obj,
	properties: Properties[]
) => {
	[Key in Exclude<keyof Obj, Properties>]: Obj[Key];
};

type AccessPropertyByShapeFN = <
	Obj extends object,
	Shape extends RecursiveKeyOf<Obj>,
>(
	obj: Obj,
	shape: Shape
) => ObjectPropertyAccess<Obj, Shape>;

/**
 * Returns a new object without the properties that you specified.
 * The original object stays the same.
 * @param obj
 * @param properties
 * @returns New Object
 */
export const removePropertiesFromObject: RemovePropertiesFn = (obj, properties) => {
	const clonedObject = structuredClone(obj);
	properties.forEach(property => delete clonedObject[property]);
	return clonedObject;
};

/**
 * This function traverses the object in the first parameter, applying the
 * changes that the objects in the second parameter specifies.
 * @example
 *  recursiveAssign({foo: 1, bar: { baz: 2 }}, { foo: 2 }) => {foo: 2, bar: { baz: 2 }}
 *  recursiveAssign({foo: 1, bar: { baz: 2 }}, { bar: { baz: 3} }) => {foo: 1, bar: { baz: 3 }}
 * @param oldData
 * @param newData
 * @returns
 */
export const recursiveAssign = <T extends Record<string, any>>(
	oldData: T,
	newData: DeepPartial<T>
) => {
	return Object.entries(newData).reduce((object, [key, value]) => {
		// The part `value.constructor === {}.constructor` is used here in order to avoid
		// calling Object.entries on an object that is not literal, when the object was created
		// by instantiating a class, like `const obj = new ObjClass()`
		if (value && typeof value === 'object' && isPlainObject(value)) {
			const newObject: Record<string, any> = recursiveAssign(
				oldData[key],
				newData[key]
			);

			return {
				...object,
				[key]: {
					...newObject,
				},
			};
		}
		return {
			...object,
			[key]: newData[key] === undefined ? oldData[key] : newData[key],
		};
	}, oldData as T);
};

export const isPlainObject = (maybeObject: any): maybeObject is Object => {
	return {}.constructor === maybeObject.constructor;
};

export const setValueRecursivelyByShape = <Shape extends string, Value>(
	shape: Shape,
	value: Value
): ObjectShapeFromKeys<Shape, Value> => {
	const [currKey, ...rest] = shape.split('.');

	if (rest.length === 0) {
		return {
			[currKey!]: value,
		} as ObjectShapeFromKeys<Shape, Value>;
	} else {
		return {
			[currKey!]: setValueRecursivelyByShape(rest.join('.'), value),
		} as ObjectShapeFromKeys<Shape, Value>;
	}
};

export const accessPropertyByShape: AccessPropertyByShapeFN = (obj, shape) => {
	const [fisrtKey, ...rest] = shape.split('.');

	if (rest.length === 0) {
		return obj[fisrtKey! as keyof typeof obj];
	} else {
		if (!obj[fisrtKey! as keyof typeof obj]) {
			return undefined;
		} else {
			//@ts-ignore
			return accessPropertyByShape(obj[fisrtKey!], rest.join('.'));
		}
	}
};
