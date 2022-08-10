
# Types-ddd v3

> Now version 3.2.0 available

typescript domain driven design library. All resources tested

---


## Install

```sh
$ npm i types-ddd

#or 

$ yarn add types-ddd

```

<img src="./readme/ddd.jpg" alt="image" width="100%">

## DDD (Domain Driven Design)

- [ 1. Ubiquitous language](#1-ubiquitous-language)
- [ 2. Rich domain model](#2-rich-domain-model)
- [ 3. Thin domain service working on rich domain models](#3-thin-domain-service-working-on-rich-domain-models)
- [ 4. Layers in a DDD application](#4-layers-in-a-ddd-application)
- [ 5. Entities](#5-entities)
- [ 6. Value objects](#6-value-objects)
- [ 7. Factories](#7-factories)
- [ 8. Aggregates](#8-aggregates)
- [ 9. Repositories](#9-repositories)
- [10. Shared kernel](#10-shared-kernel)
- [11. Domain events](#11-domain-events)
- [12. Anti-corruption layer](#12-anti-corruption-layer)
- [13. Folders structure](#13-folders-structure)
- [14. Available resources](#14-avaliable-resourses)

> This package provide utils file and interfaces to assistant build a complex application with domain driving design and typescript

## 1. Ubiquitous language:

- Language and terms agreed upon by both business users and developers, within a bounded context
- Entities with the same name in a different context can have different behavior and data
- Bounded context helps in single responsibility for domain models

## 2. Rich domain model:

- Models (entities, value objects, aggregates) with rich behavior are preferred over anemic domain models (entities without behavior, which only keep data and represent the DB tables)
- Due to single responsibility principle (a class or method should have only one reason to change), non-cohesive behavior should be delegated to other classes (or even handled inside domain services) when necessary
- Model methods can also delegate the task to domain services by raising domain events

## 3. Thin domain service working on rich domain models:

- Domain services should not hold state (application services are not domain services, they are on the outer layer close to the UI layer, and can hold application/task state)
- Domain services have very little behavior and only which does not fit cohesively in any domain model
- Domain services sit in the core domain layer along with entities, value objects, aggregates and domain events, and expose domain models in their interfaces

## 4. Layers in a DDD application:

- Core domain layer (domain services, entities, value objects, aggregates and domain events)
- Core domain layer is surrounded by the UI/Application layer and Infrastructure layer
- UI/Application layer (UI and application service facade with messaging, JSON, XML capabilities, session, etc.)
- Infrastructure layer (persistence, file system, network, mail, logging, etc.)

## 5. Entities:

- Live longer than the application, should endure restarts, and are persisted and read from data sources (DB, file system, network, etc.)
- Have an id (preferably a GUID rather than a DB generated int because business transactions do not rely on persistence, can be persisted after other operations carried out in model's behavior)
- Have entity semantics (equality and `GetHashCode()` defined by class name + id)
- Behavior in an entity mostly orchestrates value objects for a use case
- Entity class should not have public property setters, setting a property should be a behavior method
- Entities should not have bidirectional relations (depending on the bounded context, either an egg can have a chicken or a chicken can have eggs, but not both)
- Entity relations should not reflect the complete set of DB foreign key relationships, should be bare down to the minimum for performing the behavior inside the bounded context
- Entity relations should not hold a reference to another entity class, it can only keep the id of another entity
- If a business transaction needs a reference to other entities in relation, aggregates should be used instead (aggregates can hold a reference to other aggregate roots, which are entity classes by definition)

## 6. Value objects:

- Are only identified by their values, not by their ids (for example money is a value object as long as we are not tracking individual banknotes, if we need to track individual banknotes then it should be a banknote entity)
- Can be used to measure or describe things (name, description, amount, height, date, time, range, address, etc.)
- You can combine other value types that usually go together into a new value object type, like address (city, street, country, postal code) or ...range, or ...type
- Prefer to put the behavior on value objects rather than on entities because value objects are immutable and do not have side effects (like changing their state or changing the state of any entity)
- Can be part of an entity
- Have value semantics (equality and `GetHashCode()` defined by property values)
- Should be immutable, behaviors should not change the state of a value object, but can rather create a new value object (should act similar to C# strings, structs, ints, and other value types)
- Can be persisted but only as part of an entity, not individually

## 7. Factories:

- Create, build aggregates and entities:
- Static Create...() factory method on a model class is used to guard against the construction of an invalid or incomplete model
- The model class should not have a public default constructor (however if it is to be persisted, for Entity Framework to work, it can have a protected or private default constructor)

## 8. Aggregates:

- Encapsulate and are composed of entity classes and value objects that change together in a business transaction
- Aggregates are a transactional graph of model objects
- Aggregate root should be an entity, an aggregate can even be a single entity
- Aggregate can keep a reference to other aggregate roots, but not to other entity classes which are not aggregate roots themselves
- Aggregate should not keep a reference to other aggregate root entity classes if those other entities do not change together with this aggregate root entity
- Aggregate can also keep the id of another entity, but keeping too many foreign key ids is a code smell (why?)
- If deleting an entity has a cascade effect on the other entities referenced by class in the object graph, these entities are part of the same aggregate, if not, they should not be inside this aggregate

## 9. Repositories:

- Persist and read aggregates to/from DB or file system
- Should have an interface close to a collection but should allow only the necessary operations needed for this aggregate (for example an aggregate might not need to be allowed to get updated or deleted)
- Should not be generic (should be specific for the aggregate type)
- Can have specific query methods if needed (like `FindByName()` etc.)
- Do not use lazy loading, instead use eager loading (use Include(...) in Entity Framework), else you can face "N+1 problem"s and excessive number of queries sent to DB
- Can have specific methods that only load some of the columns from a table
- Repository add/update/remove operation should commit to DB by itself (call Entity Framework ...Context.SaveChanges() at the end), because aggregate operations should be ACID transactions
- Repository interface sits inside Core domain layer, but implementations are inside Infrastructure layer
- Repositories are not used inside the domain models (entities, value objects, aggregates)

## 10. Shared kernel:

- Is where cross-cutting concerns or common types shared by all bounded contexts sit (like entity abstract base type, value object abstract base type, common value objects, authorization, etc.)

## 11. Domain events:

- Can be raised when a state change occurs in an entity
- Decouple models from each other
- Only used when an event needs to be handled inside a different model than the one raising this event, or handled inside a domain service or even an application service
- Are immutable classes, that represent past, named in the past tense, and cannot change (...Changed, ...Happened, etc.)
- Should include the time that this event was raised, as well as any other useful info for handling the event, as well as the id of the entity which raised the event
- Should not have behavior
- Domain events are subscribed to with a callback (lambda), or using pub sub interfaces, on a singleton or static event message bus
- Domain events implemented this way can be subscribed to and handled in the aggregate root of the entity which raised the event, or in domain services, or even in UI/Application layer
- Domain events are raised synchronously, if an asynchronous task needs to be carried out, it can be done inside the event handler (async-await pattern)
- Outside applications can also be triggered by using a message queue or an enterprise service bus (ESB) inside the domain event handler

## 12. Anti-corruption layer:

- Used to translate models from outside systems or legacy apps to models inside the bounded context and vice versa, and also to ease the communication with legacy services
- Can use service facades and model adapters

## 13. Folders structure

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
       ├── config
       │    ├── main.ts    
       │    └── env.ts 
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
                  │     ├── repo
                  │     └── services
                  │ 
                  ├── application
                  │     └── use-cases 
                  │ 
                  └── infra
                        ├── models     
                        ├── repo
                        └── mappers 

```


### Value Object

Use value-object as attributes for your entities and aggregates.
Can be used to measure or describe things (name, description, amount, height, date, time, range, address, etc.)

Example:

Use Case: I need a property as number that represents a human age.
The business case: It must be greater than 0 and less than 130.

```ts

import { ValueObject, Result, IResult } from 'types-ddd';

interface Props { value: number };

export class HumanAge extends ValueObject<Props> {
	private constructor(props){
		super(props);
	}

	public static isValidProps({ value }: Props): boolean {
		// validator instance is available on value object instance
		return this.validator.number(value).isBetween(0, 130);
	}

	public static create(props: Props): IResult<HumanAge> {
		
		const message = `${props.value} is an invalid value`;

		// your business validation
		if(!this.isValidProps(props)) return Result.fail(message);

		return Result.Ok(new HumanAge(props));
	}
}

```

### Value Object methods

Success methods

```ts

const result = HumanAge.create({ value: 21 });

console.log(result.isOk());

> true

const age = result.value();

console.log(age.get('value'));

> 21

```

I don't advise you to use state change of a value object. Create a new one instead of changing its state.
however the library will leave that up to you to decide.

To disable the setters of a value object use the parameters below in the super.

```ts

	constructor(props: Props){
		super(props, { disableSetters: true })
	}

```

By default setters are enabled

```ts

age.set('value').to(18);

console.log(age.get('value'));

> 18

console.log(age.history().count());

> 2

// back to old value on history
age.history().back();

console.log(age.get('value'));

> 21

```

Failure methods

```ts

const result = HumanAge.create({ value: 1000 });

console.log(result.isOk());

> false

console.log(result.isFail());

> true

console.log(result.value());

> null 

console.log(result.error());

> "1000 is an invalid value"

```

### Entity

Have an id (preferably a GUID rather than a DB generated int because business transactions do not rely on

```ts

import { Entity, Result, IResult, UID } from 'types-ddd';

// id must be defined on props as optional string or UID. 
// If not provided a new one will be generated.
interface Props { id?: UID; name: Name; age: Age; };

export class User extends Entity<Props> {
	private constructor(props: Props){
		super(props);
	}

	public static create(props: Props): Result<User> {
		
		// your business validation
		return Result.Ok(new User(props));
	}
}

```

How to instantiate an entity

```ts

// create entity attributes

const attrAge = Age.create({ value: 21 });
const attrName = Name.create({ value: 'Jane Doe' });

// validate attributes for all value objects
const result = Result.combine([ attrAge, attrName ]);

console.log(result.isOk());

> true

const age = attrAge.value();
const name = attrName.value();

const user = User.create({ age, name });

console.log(user.value().toObject());

> Object
{ 
	age: 21 ,
	name: "Jane Doe", 
	createdAt: "2022-07-17T18:06:35.986Z",
	updatedAt: "2022-07-17T18:06:35.986Z",
	id: "51ac507e-78e3-433e-8c72-c807d4ee6c4c"
}

```

### Aggregate

Encapsulate and are composed of entity classes and value objects that change together in a business transaction.

```ts

import { Aggregate, Result, IResult, UID } from 'types-ddd';

// id must be defined on props as optional string or UID. 
// If not provided a new one will be generated.
interface Props { id?: UID; name: Name; price: Currency }

export class Product extends Aggregate<Props> {
	private constructor(props: Props){
		super(props);
	}

	public static create(props: Props): IResult<Product> {
		
		// your business validation
		return Result.Ok(new Product(props));
	}
}

```

### Domain Events

You can add event to the aggregates.
Events are stored in memory and deleted after dispatch.

```ts

import { DomainEvents, IHandle } from 'types-ddd';

class ProductCreated implements IHandle<Product> {
	// optional custom name. default is the className

	public eventName: string;

	constructor(){
		this.eventName = 'CustomEventName';
	}

	async dispatch(event: IDomainEvent<Product>): Promise<void> {

		// logic goes here. do something important
		console.log(event);
	}
}

const result = Product.create({ name, price });

const product = result.value();

const event = new ProductCreated();

product.addEvent(event);

// dispatch event
DomainEvents.dispatch({ eventName: 'CustomEventName', id: product.id });

```

### Result

Ensure application never throws

Return success

```ts

Result<Payload, Error, MetaData>

let result: Result<string, string, { foo: string }>;

result = Result.Ok("hello world", { foo: 'bar' });

// Check status
console.log(result.isOk());

> true

console.log(result.value());

> "hello world"

console.log(result.metaData());

> Object { foo: "bar" }

// if success, the error will be null

console.log(result.error());

> null

// You also may return Result void

const voidResult: Result<void> = Result.Ok();

// Check status
console.log(voidResult.isOk());

> true

```

Return failure

```ts


result = Result.fail("something went wrong!", { foo: 'bar' });

// Check status
console.log(result.isFail());

> true

console.log(result.metaData());

> Object { foo: "bar" }

console.log(result.error());

> "something went wrong!"

// if failure, the payload data will be null

console.log(result.value());

> null


```


Hooks on fail or success:

```ts

import { ICommand, Result } from 'types-ddd';

class Logger implements ICommand<string, void> {
	execute(message: string): void {
		console.log(message);
	}
}

const logger = new Logger();

const result = Result.fail('Something went wrong!');

result.execute(logger).withData(result.error()).on('fail');

> "Something went wrong!"


```

### ID

Id use uuid or short uuid. the type of ID is UID

```ts

const id = ID.create();

console.log(id.value());

> "8fbe674f-d31f-4769-850f-2815f485fe89"

// If you provide a value a id will be generated with

const id2 = ID.create(id.value());

console.log(id2.value());

> "8fbe674f-d31f-4769-850f-2815f485fe89"

// Compare

console.log(id.equal(id2))

> true

```

### Short ID

16bytes based on uuid. the type of Short ID is UID

```ts

const id = ID.short();

console.log(id.value());

> "LO123RE3MID0193T"

```

### Adapter

How to adapt the data from persistence to domain or from domain to persistence.

```ts

import { IAdapter, Result } from 'types-ddd';

// from domain to data layer
class MyAdapterA implements IAdapter<DomainUser, DataUser>{
	build(target: DomainUser): Result<DataUser> {
		// ...
	}
}

// from data layer to domain
class MyAdapterB implements IAdapter<DataUser, DomainUser>{
	build(target: DataUser): Result<DomainUser> {
		// ...
	}
}

// you also may use adapter in toObject function.

const myAdapter = new MyAdapterA();

domainUser.toObject<Model>(myAdapter);

```

### Advanced concepts

How to validate props on set value.

```ts

import { ValueObject, IPropsValidation, Result } from 'types-ddd';

interface Props { value: number };

// Here we have a super smart value object
class HumanAge extends ValueObject<Props> {
	private constructor(props: Props){
		super(props);
	}

	// the "set" function automatically will use this method to validate value before set it.
	validation<Key extends keyof Props>(value: Props[Key], key: Key): boolean {

		// validator instance is available on value object instance
		const { isNumber, number } = this.validator;

		const options: IPropsValidation<Props> = {
			value: (value: number) => isNumber(value) && number.isBetween(0, 130),
		} 

		return options[key](value);
	};

	// the "create" function must use this method to validate props before instantiate.
	public static isValidProps({ value }: Props): boolean {

		// validator instance is available on value object instance
		const { isNumber, number } = this.validator;

		return isNumber(value) && number.isBetween(0, 130),
	}

	public static create(props: Props): IResult<HumanAge> {
		
		const message = `${props.value} is an invalid value`;

		// your business validation
		if(!this.isValidProps(props)) return Result.fail(message);

		return Result.Ok(new HumanAge(props));
	}
}

```

Using value objects with advanced validations

```ts

// example how to use.

const failExample = HumanAge.create({ value: 1000 });

console.log(failExample.isFail());

> true

console.log(failExample.value());

> null

const successExample = HumanAge.create({ value: 21 });

console.log(successExample.isOk());

> true

const age = successExample.value();

console.log(age.get('value'));

> 21

// do nothing on try set an invalid value

age.set('value').to(720);

console.log(age.get('value'));

> 21

// change if provide a valid value

age.set('value').to(72);

console.log(age.get('value'));

> 72

```

### How to disable getters and setters

Disable getters for all keys on instance.
On try to get a value for any key the value will be null.

```ts

import { ISettings, ValueObject } from 'types-ddd';

const options: ISettings = {
	disableGetters: true, 
	disableSetters: true
}

class HumanAge extends ValueObject<Props> {
	private constructor(props: Props){
		super(props, options);
	}
}

```

How to disable setter for a specific key.
Just provide false for prop you want to disable on `validation`

```ts

import { IPropsValidation, ValueObject } from 'types-ddd';

interface Props { value: number; birthDay: Date };

class HumanAge extends ValueObject<Props> {
	private constructor(props: Props){
		super(props);
	}

	// the "set" function automatically will use this method to validate value before set it.
	validation<Key extends keyof Props>(value: Props[Key], key: Key): boolean {

		const { isDate } = this.validator;

		const options: IPropsValidation<Props> = {
			// on define false to the prop, It never will be set.
			value: _ => false,
			birthDay: (date) => isDate(date)
		} 

		return options[key](value);
	};

	public static create(props: Props): IResult<HumanAge> {			
		return Result.Ok(new HumanAge(props));
	}
}

```

Example

```ts

const result = HumanAge.create({ value: 21, birthDay: new Date('2001-07-24T14:46:35.808Z') });

const age = result.value();

console.log(age.get('value'));

> 21

console.log(age.get('birthDay'));

> "2001-07-24T14:46:35.808Z"

// if try to change value...

age.set('value').to(55);

console.log(age.get('value'));

> 21 // no changes

// but if you try to change the birthDay attribute...

age.set('birthDay').to(new Date());

console.log(age.get('birthDay'));

> "2022-07-24T14:46:35.808Z" // changes

```



## Utils

We understand that it's a little repetitive to create some "value-objects" and that's why we provide some "value-objects" that are usually always default
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
- ✔ State
- ✔ FactoryMethod
- ✔ TSProxy

> If you have some value object suggestion todo, open an issue on [Github](https://github.com/4lessandrodev/types-ddd/issues)

### Just import and use it - Password

```ts

import { PasswordValueObject } from 'types-ddd';

const passOrError = PasswordValueObject.create('my-strength-pass');
const isValid = passOrError.isOk();

console.log(isValid);
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

### Just import and use it - Date


> Easy date manipulation

```ts

import { DateValueObject } from 'types-ddd';

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

### Just import and use it - Currency

> Safe value object to calculate finance values.
> Each operation return an instance of Result cause It validate safe number

```ts

import { CurrencyValueObject } from 'types-ddd';

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

```


### Just import and use it - Weight units

```ts

import { WeightValueObject } from 'types-ddd';

const voOrErr = WeightValueObject.create({ value: 1000, unit: "TON" });

const isOk = voOrErr.isOk();
console.log(isOK);
> true

const valueObject = voOrErr.value();

console.log(valueObject.unit);
> "TON"

console.log(valueObject.weight.value());
> 1000

// Convert instance value and unit to KG
valueObject.toKG();

console.log(valueObject.unit);
> "KG"

console.log(valueObject.weight.value());
> 1

```
