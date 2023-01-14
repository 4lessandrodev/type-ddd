# types-ddd documentation

## About the lib

The library was created to support developers in developing domain-rich applications.

Full documentation.
Version 3.x


This lib use as core [rich-domain](https://www.npmjs.com/package/rich-domain)

### Simple App Example

A simple app example available on [link](https://github.com/4lessandrodev/ddd-app)

---
## Documentation

### Folders
Folders structure suggestion
Divided by

- Domain layer
- Application layer
- Infra layer

```shell
  $ tree
  .
  ├── package.json
  ├── README.md
  └── src
       ├── configs
       │    └── env
       │
       ├── shared
       │    └── infra
       │         └── server  
       │
       └── modules
            │ 
            └── [module-name]
                  │ 
                  │── domain
                  │     ├── value-objects
                  │     ├── entities
                  │     ├── aggregates
                  │     ├── events
                  │     ├── subscriptions
                  │     ├── adapter
                  │     ├── repository-interface
                  │     └── domain-services
                  │ 
                  ├── application
                  │     └── use-cases 
                  │ 
                  └── infra
                        ├── models
                        └── repository

```

---

### Result

What is Result:

`Result` is a class that encapsulates the result of an operation and stores the success or failure state without throws the application.

#### Interface and Generic Types

- A = `Payload` optional default `void`
- B = `Error` optional default `string`
- C = `MetaData` optional default `{}`

```ts

IResult<A, B, C>;

```

Alternative shortcuts

```ts

import { Ok, Fail } from 'types-ddd';

// Success use case

return Ok();

// OR 

return Ok<string>('success message');

// Failure use case

return Fail('error message here');

```

Example how to use generic types.
First let's create our interfaces to use as generic type.
- The type of data to be retrieved can be any type you want.


```tS

// Payload type
interface IData { data: string };

// Error type
interface IError { message: string };

// MetaData type
interface IMeta { arg: number };

```

Now let's implement a function that return the result below

```ts

IResult<IData, IError, IMeta>;

```
So let's implement that on a simple function.

```ts

const isEven = (value: number): Result<IData, IError, IMeta> => {

	const isPairValue = value % 2 === 0;
	const metaData: IMeta = { arg: value };
	
	if (isPairValue) {
		
		// success payload 
		const payload: IData = { data: `${value} is even` };

		// return success
		return Ok(payload, metaData);
	}

	// failure payload 
	const error: IError = { message: `${value} is not even` };

	// return failure
	return Fail(error, metaData);
};


```
Here we have a function that returns success if the value informed is even and returns failure if it is odd.

Success Case

```ts

const result = isEven(42);

console.log(result.isOk());

> true

console.log(result.value());

> 'Object { data: "42 is even" }'

console.log(result.metaData());

> 'Object { arg: 42 }'

console.log(result.error());

> null

```
Failure Case

```ts

const result = isEven(43);

console.log(result.isFail());

> true

console.log(result.error());

> 'Object { message: "43 is not even" }'

console.log(result.metaData());

> 'Object { arg: 43 }'

console.log(result.value());

> null

```

#### Void

The most simple void success example.<br>
Let's see the same example using void.

```ts

const checkEven = (value: number): Result<void> => {

	const isPair = value % 2 === 0;

	// success case
	if(isPair) return Ok(); 
	
	// failure case
	return Fail('not enven');
}

```
Using the function as success example

```ts

const result: Result<void> = checkEven(42);

console.log(result.isOk());

> true

console.log(result.isFail());

> false

console.log(result.error());

> null

console.log(result.value());

> null

console.log(result.metaData());

> 'Object {}'

```

Fail example

```ts

const result: Result<void> = checkEven(43);

console.log(result.isFail());

> true

console.log(result.isOk());

> false

console.log(result.error());

> "not even"

console.log(result.value());

> null

console.log(result.metaData());

> 'Object {}'

```

#### toObject method
you can get a summarized object with the properties of an instance of a `Result`

```ts

console.log(result.toObject());

> Object
`{
	"data": null, 
	"error": "not even", 
	"isFail": true, 
	"isOk": false, 
	"metaData": Object {}
 }`

```

#### Hooks

In the instances of a Result there are two hooks that allow the execution of a command according to the state.

```ts

class Command implements ICommand<void, void> {
	execute(): void {
		console.log("running command ...");
	}
}

const myCommand = new Command();

const result = Result.Ok();

result.execute(myCommand).on('Ok');

> "running command ..."

```

You might also want to pass arguments to the command

```ts

class Command implements ICommand<string, void> {
	execute(error: string): void {
		console.log(error);
	}
}

const myCommand = new Command();

const result = Result.fail('something went wrong');

result.execute(myCommand).withData(result.error()).on('fail');

> "something went wrong"

```

#### Combine

You can use the static `combine` function of `Result` to check many instances if any are failed it will return the instance with error state.

Success example 

```ts

const resultA = Result.Ok();
const resultB = Result.Ok();
const resultC = Result.Ok();

const result = Result.combine([resultA, resultB, resultC]);

console.log(result.isOk());

> true

```
Failure example 

```ts

const resultA = Result.Ok();
const resultB = Result.fail('oops err');
const resultC = Result.Ok();

const result = Result.combine([resultA, resultB, resultC]);

// OR you can use Combine function

const result = Combine([resultA, resultB, resultC]);

console.log(result.isOk());

> false

console.log(result.error());

> 'oops err'

```

---


### ID

What is ID:
A symbol which uniquely identifies an object or record.<br>
In this Lib all IDs are generated by domain and uses uuid v4.

#### Create New
Create a new uuid.

```ts

// ID main

const id = ID.create();

// OR Id as function

const id = Id();

// OR id instance

const id = id.create();

console.log(id.value());

> "eb9c563c-719d-4872-b303-0a82921351f7"

```

#### Short New
Create a short id

```ts

const id = ID.short();

console.log(id.value());

> "EB9C563DB4872BF7"

```

#### Create Existing
Create a id with provided value

```ts

const id = ID.create('this-is-my-id-01');

console.log(id.value());

> "this-is-my-id-01"

```

#### Compare ids
The id instance has a method to compare two ids.

```ts

const idA = ID.short('this-is-my-id-01');
const idB = ID.short('this-is-my-id-02');

console.log(idA.equal(idB));

> false

console.log(idB.equal(idB));

> true

```

#### IsNew
Check if id instance is has a new value

```ts

const idA = ID.create('this-is-my-id-01');
const idB = ID.create();

console.log(idA.isNew());

> false

console.log(idB.isNew());

> true

```

#### Type for ID
Define type for ID

```ts

import { UID, ID } from 'types-ddd';

// UID type
let id: UID;

// ID value
id = ID.create();


```

---

### ValueObject

What is value object:

- Are only identified by their values, not by their ids (for example money is a value object as long as we are not tracking individual banknotes, if we need to track individual banknotes then it should be a banknote entity)
- Can be used to measure or describe things (name, description, amount, height, date, time, range, address, etc.)
- You can combine other value types that usually go together into a new value object type, like address (city, street, country, postal code) or ...range, or ...type
- Prefer to put the behavior on value objects rather than on entities because value objects are immutable and do not have side effects (like changing their state or changing the state of any entity)
- Can be part of an entity
- Should be immutable, behaviors should not change the state of a value object, but can rather create a new value object (should act similar to C# strings, structs, ints, and other value types)
- Can be persisted but only as part of an entity, not individually.


#### Simple Value Object.

Value objects extend to `ValueObject` class have private constructor and public static method called `create`.<br>
The `create` method receives the props which by default is an object with the key `value`.

the value object below is a base example without any kind of validation

```ts

import { IResult, Result, ValueObject } from "types-ddd";

export interface NameProps {
	value: string;
}

export class Name extends ValueObject<NameProps>{
	private constructor(props: NameProps) {
		super(props);
	}

	public static create(value: string): IResult<Name> {
		return Ok(new Name({ value }));
	}
}

export default Name;

```

Now that we have defined our value object class, we can create an instance.<br>
The `create` method returns an instance of Name encapsulated by the `Result`, so it is important to always assess whether the result is a success before getting the value.

```ts

const result = Name.create('Jane');

console.log(result.isOk());

> true

const name = result.value();

console.log(name.get('value'));

> "Jane"

```

Once we have an instance of a value object, we can use some methods that the library makes available.

By default setters are enabled

```ts

// Prefer to create new instance instead of changing value to value object. Do not use set to value object.

name.set('value').to('John');

console.log(name.get('value'));

> "John"

```

When you use the `set` or `change` function to modify the state, each change is saved in a history

```ts

console.log(name.history().count());

> 2

// back to old value on history
name.history().back();

console.log(name.get('value'));

> "Jane"

```

> **We don't advise you to use state change of a value object. Create a new one instead of changing its state. However the library will leave that up to you to decide.**

To disable the setters of a value object use the parameters below in the super.<br>
This property disables the set function of the value object.

```ts

constructor(props: NameProps){
	super(props, { disableSetters: true })
}

```

Now when trying to change the value using `set` or `change` it will not be modified.

```ts

console.log(name.get('value'));

> "John"

name.set('value').to('James');

console.log(name.get('value'));

> "John"

```

#### Using validation

Validation before create instance.<br>
A validator instance is available in the "Value Object" domain class.

```ts

import { Ok, Fail, Result, ValueObject } from "types-ddd";

export interface NameProps {
	value: string;
}

export class Name extends ValueObject<NameProps>{
	private constructor(props: NameProps) {
		super(props);
	}

	public static isValidProps({ value }: NameProps): boolean {
		const { string } = this.validator;
		return string(value).hasLengthBetweenOrEqual(3, 30);
	}

	public static create(value: string): Result<Name> {
		const message = 'name must have length min 3 and max 30 char';

		if (!this.isValidProps({ value })) return Fail(message);

		return Ok(new Name({ value }));
	}
}

export default Name;

```

Now when you try to instantiate a name, the value will be checked and if it doesn't meet the validation requirements, a `Result` will be returned with an error state.

```ts

const empty = '';

const result = Name.create(empty);

console.log(result.isFail());

> true

console.log(result.error());

> "name must have length min 3 and max 30 char"

console.log(result.value());

> null

```

#### Validation before set

The `isValidProps` Method validates properties when creating a new instance, but which method validates before modifying a value?
For this there is the method `validation`

The validation method takes two arguments, the first the `key` of props and the second the `value`.
So when calling the `set` or `change` function, this method will be called automatically to validate the value, if it doesn't pass the validation, the value is not changed.

> There must be a validation for each "props" key

```ts

validation<Key extends keyof Props>(value: Props[Key], key: Key): boolean {
	
	const { number } = this.validator;

	const options: IPropsValidation<Props> = {
		value: (value: number) => number.isBetween(0, 130),
	} 

	return options[key](value);
};

```

In case your value object has only one attribute you can simply use the already created static validation method.<br>
Let's see a complete example as below

```ts

import { Result, Result, ValueObject } from "types-ddd";

export interface NameProps {
	value: string;
}

export class Name extends ValueObject<NameProps>{
	private constructor(props: NameProps) {
		super(props);
	}

	validation(value: string): boolean {
		return Name.isValidProps({ value });
	}

	public static isValidProps({ value }: NameProps): boolean {
		const { string } = this.validator;
		return string(value).hasLengthBetween(3, 30);
	}

	public static create(value: string): IResult<Name> {
		const message = 'name must have length min 3 and max 30 char';

		if (!this.isValidProps({ value })) return Fail(message);

		return Ok(new Name({ value }));
	}
}

export default Name;

```

Let's test the instance and the validation method.<br>
Value is not modified if it does not pass validation.

```ts

const result = Name.create('Jane');

console.log(result.isOk());

> true

const name = result.value();

console.log(name.get('value'));

> "Jane"

const empty = '';

name.set('value').to(empty);

console.log(name.get('value'));

> "Jane"

name.set('value').to("Jack");

console.log(name.get('value'));

> "Jack"

```

#### toObject
This method transforms a complex object into a simple object or value.<br>
This method is useful for cases where you have value objects inside other value objects

```ts

const street = Street.create('Dom Juan').value();

const number = Number.create(42).value();

const result = Address.create({ street, number });

const address = result.value();

console.log(address.toObject());

> Object 
`{
	"street": "Dom Juan", 
	"number": 42,
 }`

```

#### Clone
This method creates a new instance with the same properties as the current value object.

```ts

const result = Name.create('Sammy');

const originalName = result.value();

console.log(originalName.value());

> "Sammy"

const clone = originalName.clone();

console.log(clone.isOk());

> true

const clonedName = clone.value();

console.log(clonedName.value());

> "Sammy"

```

Clone being a new instance does not change the properties of the original value object

```ts

clonedName.change('value', 'Jones');

console.log(clonedName.value());

> "Jones"

console.log(originalName.value());

> "Sammy"

```

#### createMany

Sometimes you will need to create many instances of different value objects and for that there is static method available `createMany` on value objects, entity and aggregate.

```ts

const itemPrice = Class<PriceProps>(ProductPrice, { value: price });
const itemName = Class<NameProps>(ProductName, { value: name });
const itemQtd = Class<QtdProps>(ProductQtd, { value: qtd });

const { data, result } = ValueObject.createMany([ itemPrice, itemName, itemQtd ]);

// you check if all value objects are ok
if (result.isFail()) return Result.fail(result.error());

// you can get instances from iterator data. In the same order as the array
const price = data.next().value() as ProductPrice;  // index 0
const name = data.next().value() as ProductName;    // index 1
const quantity = data.next().value() as ProductQtd; // index 2

const product = Product.create({ name, price, quantity });

```

---

### Entity

What is value object:

- Live longer than the application, should endure restarts, and are persisted and read from data sources (DB, file system, network, etc.)
- Have an id (preferably a GUID rather than a DB generated int because business transactions do not rely on persistence, can be persisted after other operations carried out in model's behavior)
- Have entity semantics (equality and `GetHashCode()` defined by class name + id)
- Behavior in an entity mostly orchestrates value objects for a use case
- Entity class should not have public property setters, setting a property should be a behavior method
- Entities should not have bidirectional relations (depending on the bounded context, either an egg can have a chicken or a chicken can have eggs, but not both)
- Entity relations should not reflect the complete set of DB foreign key relationships, should be bare down to the minimum for performing the behavior inside the bounded context
- Entity relations should not hold a reference to another entity class, it can only keep the id of another entity
- If a business transaction needs a reference to other entities in relation, aggregates should be used instead (aggregates can hold a reference to other aggregate roots, which are entity classes by definition)

#### Simple Entity

Entities extend to `Entity` class, have private constructor and public static method called `create`.
The `create` method receives the props which by default is an object with the key `id`.

the entity below is a base example without any kind of validation

```ts

interface UserProps { id?: UID, name: Name, age: Age };

export class User extends Entity<UserProps>{
	private constructor(props: UserProps){
		super(props)
	}

	public static create(props: UserProps): IResult<User> {
		return Result.Ok(new User(props));
	}
}

export default User;

```

`id` is a reserved word and must have the type `UID` or `string`.

All attributes for an entity must be value object except id.

```ts

const nameAttr = Name.create('James');
const ageAttr = Age.create(21);

// always check if value objects are success
const voResult = Combine([ nameAttr, ageAttr ])

console.log(voResult.isOk());

> true

const name = nameAttr.value();

const age = ageAttr.value();

// if you don't provide a value for the id it will be generated automatically
const result = User.create({ name, age });

console.log(result.isOk());

> true

```

#### toObject

when you extend entity class you get some methods from domain class, one of them is `toObject` method.<br>
In the entity, this method aims to transform a domain class into a simple object, that is, all value objects are transformed into simple attributes.

```ts

const user = result.value();

console.log(user.toObject());

> Object
`{
	age: 21,
	name: "James",
	createdAt: "2022-08-13T03:51:25.738Z",
	updatedAt: "2022-08-13T03:51:25.738Z"
	id: "0709220f-7c2f-41e2-b535-151926286893",
 }`

```

#### with id value

you can create an instance by entering an id

```ts

const name = nameAttr.value();

const id = ID.create('a3a5ea9d-7c57-4743-8a9b-5315fad365d0');

const result = User.create({ id, age, name });

console.log(result.isOk());

> true 

const user = result.value();

console.log(user.toObject());

> Object
`{
	age: 21,
	name: "James",
	createdAt: "2022-08-13T03:51:25.738Z",
	updatedAt: "2022-08-13T03:51:25.738Z"
	id: "a3a5ea9d-7c57-4743-8a9b-5315fad365d0",
 }`

```

#### isNew

Check if instance is a new entity.<br> if you provide do not provide an id the entity will be considered as a new created entity instance.

```ts

// no id provided
const newUserResult = User.create({ name, age });

cons newUser = newUserResult.value();

console.log(newUser.isNew());

> true

// id provided
const userResult = User.create({ id, name, age });

cons user = userResult.value();

console.log(user.isNew());

> false

```

#### isValidProps

Validating props before create an instance.<br> Here you can apply your business validation.

```ts

public static isValidProps({ name, age }: UserProps): boolean {
	
	// your business validation 
	const isValidName = doSomeBusinessValidation(name);
	const isValidAge = doSomeBusinessValidation(age);

	return isValidName && isValidAge;
}

```

Let's apply our props validation method to our entity class

```ts

interface UserProps { id?: UID, name: Name, age: Age };

export class User extends Entity<UserProps>{
	private constructor(props: UserProps){
		super(props)
	}

	public static isValidProps({ name, age }: UserProps): boolean {
		// your business validation 
		const isValidName = doSomeBusinessValidation(name);
		const isValidAge = doSomeBusinessValidation(age);

		return isValidName && isValidAge;
	}

	public static create(props: UserProps): IResult<User> {

		const isValidRules = User.isValidProps(props);
		if(!isValidRules) return Result.fail('invalid props');

		return Result.Ok(new User(props));
	}
}

export default User;

```

#### change

in entities you can easily change an attribute with `change` or `set` method

```ts

const result = Name.create('Larry');

const newName = result.value();

user.change("name", newName);

console.log(user.get("name").value());

> "Larry"

```

#### Validation before change

The `isValidProps` Method validates properties when creating a new instance, but which method validates before modifying a value?<br>
For this there is the method `validation`

The validation method takes two arguments, the first the `key` of props and the second the `value`.
So when calling the `set` or `change` function, this method will be called automatically to validate the value, if it doesn't pass the validation, the value is not changed.

> There must be a validation for each "props" key

```ts

validation<Key extends keyof Props>(value: Props[Key], key: Key): boolean {

	const options: IPropsValidation<Props> = {
		name: (value: Name) => doSomeBusinessValidation(value),
		age: (value: Age) => doSomeBusinessValidation(value)
	} 

	return options[key](value);
};

```

Let's apply our validation method to our entity.<br> Now if the validation does not pass the value will not be changed.

```ts

interface UserProps { id?: UID, name: Name, age: Age };

export class User extends Entity<UserProps>{
	private constructor(props: UserProps){
		super(props)
	}

	validation<Key extends keyof Props>(value: Props[Key], key: Key): boolean {
		const options: IPropsValidation<Props> = {
			name: (value: Name) => doSomeBusinessValidation(value),
			age: (value: Age) => doSomeBusinessValidation(value)
		} 
		return options[key](value);
	};

	public static isValidProps({ name, age }: UserProps): boolean {
		// your business validation 
		const isValidName = doSomeBusinessValidation(name);
		const isValidAge = doSomeBusinessValidation(age);
		return isValidName && isValidAge;
	}

	public static create(props: UserProps): IResult<User> {

		const isValidRules = User.isValidProps(props);
		if(!isValidRules) return Result.fail('invalid props');

		return Result.Ok(new User(props));
	}
}

export default User;

```

#### disableSetters

To disable the setters of an entity use the parameters below in the super.<br>
This property disables the set function of the entity.

```ts

constructor(props: NameProps){
	super(props, { disableSetters: true })
}

```

#### clone entity

you can clone an entity and get a new instance

```ts

const result = User.create({ id, age, name });

console.log(result.isOk());

> true 

const user = result.value();

 const clonedUser = user.clone();

 const newUser = clonedUser.value();

 const newNameResult = Name.create('Luke');

 const newName = newNameResult.value();

 clonedUser.set('name').to(newName);

 console.log(user.get('name').value());

 > "James"

 console.log(clonedUser.get('name').value());

 > "Luke"

```

#### compare entities

You can compare two entities.

`compare` just check props values and id value. `deepEqual` check props values, id, types and history.

```ts

const isEqual = user1.isEqual(user2);

console.log(isEqual);

> false


```

#### history

Each operation to change any entity state property generates a history.<br>
At any time you can return to a previous state

```ts

const result = User.create({ name, age });

const user = result.value();

console.log(user.toObject());

> Object
`{
	age: 21,
	name: "James",
	createdAt: "2022-08-13T03:51:25.738Z",
	updatedAt: "2022-08-13T03:51:25.738Z",
	id: "0709220f-7c2f-41e2-b535-151926286893"
 }`

// first history is initial props on create an instance
console.log(user.history().count());

> 1

user.set('name').to(newName);

console.log(user.toObject());

> Object
`{
	age: 21,
	name: "Luke",
	createdAt: "2022-08-13T03:51:25.738Z",
	updatedAt: "2022-08-13T03:52:25.738Z",
	id: "0709220f-7c2f-41e2-b535-151926286893"
 }`

// On change name create a new history
console.log(user.history().count());

> 2

// back to history 1
user.history().back();

console.log(user.toObject());

> Object
`{
	age: 21,
	name: "James",
	createdAt: "2022-08-13T03:51:25.738Z",
	updatedAt: "2022-08-13T03:51:25.738Z",
	id: "0709220f-7c2f-41e2-b535-151926286893"
 }`

```

---

### Aggregate

What is aggregate:

- Encapsulate and are composed of entity classes and value objects that change together in a business transaction
- Aggregates are a transactional graph of model objects
- Aggregate root should be an entity, an aggregate can even be a single entity
- Aggregate can keep a reference to other aggregate roots, but not to other entity classes which are not aggregate roots themselves
- Aggregate should not keep a reference to other aggregate root entity classes if those other entities do not change together with this aggregate root entity
- Aggregate can also keep the id of another entity, but keeping too many foreign key ids is a code smell (why?)
- If deleting an entity has a cascade effect on the other entities referenced by class in the object graph, these entities are part of the same aggregate, if not, they should not be inside this aggregate

The aggregate has the same methods already mentioned in the entity.
And in addition to the entity methods, there is another one that is responsible for managing the `domain's events`.

#### Simple Aggregate

```ts

export interface ProductProps {
	id?: UID;
	name: ProductName;
	price: ProductPrice;
	createdAt?: Date;
	updatedAt?: Date;
}

// extends to Aggregate
export class Product extends Aggregate<ProductProps>{
	private constructor(props: ProductProps) {
		super(props);
	}

	public static create(props: ProductProps): IResult<Product> {
		return Result.Ok(new Product(props));
	}
}

export default Product;

```

#### Domain Event

Let's create an aggregate instance and see how to add domain event to it.

```ts

export class ProductCreatedEvent implements IHandle<Product>{
	public eventName: string;

	constructor() { 
		this.eventName = 'ProductCreated';
	}
	
	dispatch(event: IDomainEvent<Product>): void {
		// your action here
		const { aggregate } = event;
		console.log(`EVENT DISPATCH: ${aggregate.hashCode().value()}`);
	}
}

export default ProductCreatedEvent;

```

Now let's add the event to a product instance.<br>
Events are stored in memory and are deleted after being triggered.

```ts

const result = Product.create({ name, price });

const product = result.value();

const event = new ProductCreatedEvent();

product.addEvent(event);

```

Now we can dispatch the event whenever we want.

```ts

DomainEvents.dispatch({ id: product.id, eventName: "ProductCreated" });

> "EVENT DISPATCH: [Aggregate@Product]:6039756f-d3bc-452e-932a-ec89ff536dda"

```
---
### Adapter

How to adapt the data from persistence to domain or from domain to persistence.

```ts

// from domain to data layer
class MyAdapterToInfra implements IAdapter<DomainUser, DataUser>{
	build(target: DomainUser): Result<DataUser> {
		// ...
	}
}

// from data layer to domain
class MyAdapterToDomain implements IAdapter<DataUser, DomainUser>{
	build(target: DataUser): Result<DomainUser> {
		// ...
	}
}

// You can use adapter instance in toObject function
const myAdapter = new MyAdapterToInfra();

const dataUser = domainUser.toObject<DataUser>(myAdapter);

```

---

### Utils

Some util tools available

#### Ready to use

- ✔ EmailValueObject
- ✔ UserNameValueObject
- ✔ BirthdayValueObject
- ✔ CurrencyValueObject
- ✔ PasswordValueObject
- ✔ HomePhoneValueObject
- ✔ MobilePhoneValueObject
- ✔ TrackingCodeValueObject
- ✔ RGBColorValueObject
- ✔ HEXColorValueObject
- ✔ PostalCodeValueObject
- ✔ UrlValueObject
- ✔ OrderStatusValueObject
- ✔ PinValueObject
- ✔ CPFValueObject
- ✔ CNPJValueObject
- ✔ CustomStringValueObject
- ✔ CustomNumberValueObject
- ✔ WeightUnitValueObject
- ✔ UnitOfMeasureValueObject
- ✔ DimensionValueObject
- ✔ WeightValueObject
- ✔ DateValueObject
- ✔ getUndefinedKeysAsArray
- ✔ getUndefinedKeysAsObject
- ✔ removeUndefinedKeysFromObject
- ✔ SpecificationComposite
- ✔ FactoryMethod
- ✔ TSProxy

---


#### Password

Just import and use

```ts

const passOrError = PasswordValueObject.create('my-strength-pass');

console.log(passOrError.isOk());

> true

const pass = passOrError.value();

pass.encrypt();

console.log(pass.value());

> "$2a$12$AdLoTarjC5wnc1tAUc3j1.RczGxxImH0mG6dZkS5zPaGrTi/EmPWG"

console.log(pass.isEncrypted());

> true

const passMatch = pass.compare('my-strength-pass');

console.log(passMatch);

> true

console.log(PasswordValueObject.random(12).value());

> "WtS65$@!A6by"

```

you can define a custom range for password length and error message

```ts

Reflect.set(PasswordValueObject, "MIN_LENGTH", 10);
Reflect.set(PasswordValueObject, "MAX_LENGTH", 20);
Reflect.set(PasswordValueObject, "MESSAGE", "Password must be between 10 and 20 characters");

```

#### Date

Just import and use

```ts

const currentDate = new Date();

const myDate = DateValueObject.create(currentDate).value();

console.log(myDate.value());

> "2021-10-11T14:45:04.758Z"

console.log(myDate.format("DD-MM-YYYY"));

> "11-10-2021"

myDate.addDays(3);

console.log(myDate.value());

> "2021-10-14T14:45:04.758Z"

const isWeekend = myDate.isWeekend();

console.log(isWeekend);

> false

myDate.addHours(7);

const isAfter = myDate.isAfter(currentDate);

console.log(isAfter);

> true

```

#### Currency

Just import and use

```ts

const voOrErr = CurrencyValueObject.create({ currency: 'BRL', value: 0.50 });

const myCurrency = voOrErr.value();

console.log(myCurrency.value());

> 0.5

myCurrency.add(0.50); // 1
myCurrency.multiplyBy(50); // 50
myCurrency.divideBy(2); // 25
myCurrency.subtractBy(5); // 20
myCurrency.add(80); // 100
myCurrency.addPercent(2); // 102
myCurrency.subtractBy(2); // 100
myCurrency.subtractPercent(30); // 70

console.log(myCurrency.value());

> 70

console.log(myCurrency.getCoin());

> "R$ 70.00"

// OR chain

const result = myCurrency.add(10).addPercent(21).multiplyBy(3).subtractBy(50);

```


#### Weight units

Just import and use

```ts

const result = WeightValueObject.create({ value: 1000, unit: "TON" });

console.log(result.isOk());

> true

const weight = result.value();

console.log(weight.unit);

> "TON"

console.log(weight.weight.value());

> 1000

// Convert instance value and unit to KG
weight.toKG();

console.log(weight.unit);

> "KG"

console.log(weight.weight.value());
> 1

```

#### Email

Just import and use

```ts

const result = EmailValueObject.create('dany@mailer.com');

console.log(result.isOk());

> true

const email = result.value();

console.log(email.value());

> "dany@mailer.com"

console.log(email.getNick());

> "dany"

console.log(email.getDomain());

> "mailer.com"


```

you can block same domain or define only specific domains

```ts

Reflect.set(EmailValueObject, "BLOCKED_DOMAINS", ["microsoft.com", "leak.com"]);
Reflect.set(EmailValueObject, "VALID_DOMAINS", ["gmail.com", "hotmail.com"]);

// now only two domains are accepted gmail and hotmail

```

#### Name

Just import and use

```ts

const result = UserNameValueObject.create('jannie lan spark');

console.log(result.isOk());

> true

const name = result.value();

console.log(name.value());

> "Jannie Lan Spark"

console.log(name.getLastName());

> "Spark"

console.log(name.getMiddleName());

> "Lan"

console.log(name.getFirstName());

> "Jannie"

console.log(name.getInitials());

> "J.L.S"

```


#### BirthDay

Just import and use

```ts

const year2000 = new Date(2000, 1, 1);

const result = BirthdayValueObject.create(year2000);

console.log(result.isOk());

> true

const birthDay = result.value();

console.log(birthDay.value());

> "2000-02-01T02:00:00.000Z"

console.log(birthDay.isAgeGreaterThan(18));

> true

console.log(birthDay.getAgeAsYearsOld());

> 22


```


#### Custom string

```ts
// my-custom-string.ts

import { CustomStringValueObject } from 'types-ddd';


Reflect.set(CustomStringValueObject, 'VALIDATOR', (value: string) => typeof value === 'string');
Reflect.set(CustomStringValueObject, 'MESSAGE', "my custom error message");

const MyCustomString = CustomStringValueObject;
export MyCustomString;
export default MyCustomString;

```

#### Custom number

```ts
// my-custom-number.ts

import { CustomNumberValueObject } from 'types-ddd';


Reflect.set(CustomNumberValueObject, 'VALIDATOR', (value: string) => typeof value === 'number');
Reflect.set(CustomNumberValueObject, 'MESSAGE', "my custom error message");

const MyCustomNumber = CustomNumberValueObject;
export MyCustomNumber;
export default MyCustomNumber;

```
