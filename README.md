
# types-ddd
> Now version 3.x available

This package provide utils file and interfaces to assistant build a complex application as domain driving design and nodeJS with typescript.

---

<a href="https://www.npmjs.com/package/types-ddd" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/checks/4lessandrodev/types-ddd/main" 
 alt="checks" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/types-ddd" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/stars/4lessandrodev/types-ddd" 
 alt="stars" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/types-ddd" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/commits/4lessandrodev/types-ddd/main" 
 alt="commits" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/types-ddd" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/last-commit/4lessandrodev/types-ddd/main" 
 alt="last commit" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/types-ddd" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/license/4lessandrodev/types-ddd" 
 alt="license" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/types-ddd" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/dependabot/4lessandrodev/types-ddd" 
 alt="dependabot" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/types-ddd" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/tag/4lessandrodev/types-ddd" 
 alt="tags" 
 style="max-width: 100%;">
</a>
<a href="https://www.npmjs.com/package/types-ddd" rel="nofollow" class="keychainify-checked">
 <img src="https://badgen.net/github/closed-issues/4lessandrodev/types-ddd" 
 alt="issues" 
 style="max-width: 100%;">
</a>

---
## Install

```sh
$ npm i types-ddd

#or 

$ yarn add types-ddd

```
---

## Lib Full Documentation

Check lib documentation on link [Here](https://github.com/4lessandrodev/types-ddd/tree/main/docs)

---

<img src="./readme/cover.png" alt="image" width="100%">

---

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



---

## 13 - Summary - Basic Usage

Check full documentation on link [Here](https://github.com/4lessandrodev/types-ddd/tree/main/docs)

### Value Object

> A value object is a small, simple object that represents a single value or characteristic, such as a monetary amount or a date. It is characterized by having no identity of its own, meaning it is equal to another value object if its values are equal, regardless of its reference. Value objects are often used in domain-driven design to represent simple entities in the system.

#### Create a value object with business rules.

```ts

import { ValueObject, Ok, Fail, Result } from 'types-ddd';

interface Props {
    amount: number;
}

// simple example as monetary value object business behavior
export default class Money extends ValueObject<Props> {
    
    // private constructor. Avoid public new.
    private constructor(props: Props) {
        super(props);
    }

    // any business rule behavior. Check.
    public isGt(x: Money): boolean {
        const { number: Check } = this.validator;
        const xValue = x.get('amount');
        const currentValue = this.get('amount');
        return Check(xValue).isGreaterThan(currentValue);
    }

    // any business rule behavior. Calc.
    public sum(x: Money): Money {
        const { number: Calc } = this.util;
        const value = x.get('amount');
        const current = this.get('amount');
        const amount = Calc(current).sum(value);
        return new Money({ amount });
    }

    // any business rule behavior. Calc.
    public subtract(x: Money): Money {
        const { number: Calc } = this.util;
        const value = x.get('amount');
        const current = this.get('amount');
        const amount = Calc(current).subtract(value);
        return new Money({ amount });
    }

    // any business rule to validate state.
    public static isValidProps({ amount }: Props): boolean {
        const { number: Check } = this.validator;
        return Check(amount).isPositive();
    }

    // shortcut to create a zero value
    public static zero(): Money {
        return new Money({ amount: 0 });
    }

    // factory method to create an instance and validate value.
    public static create(amount: number): Result<Money> {

        const isValid = this.isValidProps({ amount });
        if(!isValid) return Fail("Invalid amount for money");

        return Ok(new Money({ amount }));
    }
}

```

How to use value object instance

```ts

// operation result
const resA = Money.create(500);

// check if provided a valid value
console.log(resA.isOk());

// > true


// money instance
const moneyA = resA.value();

moneyA.get("amount"); 

// 500

// using methods 
moneyA.isGt(Money.zero());

// > true

const moneyB = Money.create(100).value();

const moneyC = moneyA.sum(moneyB);

const value = moneyC.get('amount');

console.log(value); 

// > 600


```

---

### Entity

> An entity in domain-driven design is an object that represents a concept in the real world and has a unique identity and attributes. It is a fundamental building block used to model complex business domains.

#### Create an entity with business rules.

```ts

import { Entity, Ok, Fail, Result, UID } from 'types-ddd';

interface Props {
    id?: UID;
    total: Money;
    discount: Money;
    fees: Money;
}

// simple example as payment entity using money value object
export default class Payment extends Entity<Props> {

    // private constructor
    private constructor(props: Props){
        super(props);
    }

    // any business rule behavior. Update total.
    public applyFees(fees: Money): Payment {
        const props = this.props;
        const total = props.total.sum(fees);
        return new Payment({ ...props, total, fees });
    }

    // any business rule behavior. Discount must be less or equal total.
    public applyDiscount(discount: Money): Payment {
        const props = this.props;
        const total = props.total.subtract(discount);
        return new Payment({ ...props, total, discount });
    }

    // factory method to create a instance. Value must be positive.
    public static create(props: Props): Result<Payment> {
        return Ok(new Payment(props));
    }
}

```

How to use entity instance

```ts

// operation result
const total = Money.create(500).value();
const discount = Money.zero();
const fees = Money.zero();

// create a payment
const payment = Payment.create({ total, discount, fees }).value();

// create fee and discount
const fee = Money.create(17.50).value();
const disc = Money.create(170.50).value();

// apply fee and discount
const result = payment.applyFees(fee).applyDiscount(disc);

// get object from domain entity
console.log(result.toObject());

{
    "id": "d7fc98f5-9711-4ad8-aa16-70cb8a52244a",
    "total": 347,
    "discount": 170.50,
    "fees": 17.50,
    "createdAt":"2023-01-30T23:11:17.815Z",
    "updatedAt":"2023-01-30T23:11:17.815Z"
}

```


### Aggregate

Encapsulate and are composed of entity classes and value objects that change together in a business transaction

#### Create an aggregate to compose your context.

In my example, let's use the context of payment. All payment transactions are encapsulated by an order (payment order) that represents a user's purchasing context.

```ts

import { Aggregate, Ok, Fail, Result, UID, EventHandler } from 'types-ddd';

// Entities and VO that encapsulate context.
interface Props {
    id?: UID;
    payment: Payment;
    items: List<Item>;
    status: OrderStatus;
    customer: Customer;
}

// Simple example of an order aggregate encapsulating entities and 
// value objects for context.
export default class Order extends Aggregate<Props> {

    // Private constructor to ensure instances creation through static methods.
    private constructor(props: Props){
        super(props);
    }

    // Static method to begin a new order. 
    // Takes a customer as parameter and returns an instance of Order.
    public static begin(customer: Customer): Order {
        // Initialize the status of the order as "begin".
        const status = OrderStatus.begin();
        // Initialize the list of items as empty.
        const items: List<Item> = List.empty();
        // Initialize the payment as zero, since the order hasn't been paid yet.
        const payment = Payment.none();
        // Create a new instance of Order with the provided parameters.
        const order = new Order({ status, payment, items, customer });

        // Add an event to indicate that the order has begun.
        order.addEvent('ORDER_HAS_BEGUN', (order) => {
        // Perform some important operation when the order begins.
            console.log('Do something important...');
        });

        // Alternatively, add an event by creating an
        // instance of a class that extends EventHandler.
        order.addEvent(new OrderBeganEventHandler());

        // Return the created order instance.
        return order;
    }

    // Method to add an item to the order. 
    // Takes an item as parameter and returns the Order instance.
    addItem(item: Item): Order {
        // Add the item to the order's items list.
        this.props.items.add(item);
        // Sum item price to payment amount
        this.props.payment.sum(item.price);
        // Return the Order instance itself to allow chained calls.
        return this;
    }

    // Method to perform the payment of the order. 
    // Takes a payment object as parameter.
    pay(payment: Payment): Order {
        // Set the status of the order to "paid".
        this.props.status = OrderStatus.paid();
        // Set the provided payment object.
        this.props.payment = payment;
        // Add an event to indicate that the order has been paid.
        // Assuming OrderPaidEvent is a class representing 
        // the event of order payment.
        this.addEvent(new OrderPaidEventHandler());
        return this; 
    }

    // Static method to create an instance of Order.
    // Returns a Result, which can be Ok (success) or Fail (failure).
    // The value of the Result is an instance of Order, 
    // if creation is successful.
    public static create(props: Props): Result<Order> {
        return Ok(new Order(props));
    }
}

```

How to use events

```ts

order.addEvent('OTHER_EVENT', (...args) => {
    console.log(args);
});

// Or add an EventHandler instance
order.addEvent(new GenerateInvoiceEvent());

order.dispatchEvent('ORDER_HAS_BEGUN');

// dispatch with args
order.dispatchEvent('OTHER_EVENT', { info: 'custom_args' });

// OR call all added events
await order.dispatchAll();


```

---

## Lib Full Documentation

Check lib documentation on link [Here](https://github.com/4lessandrodev/types-ddd/tree/main/docs)
