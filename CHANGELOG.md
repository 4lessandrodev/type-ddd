# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

---

## Released

---

### [4.0.4] - 2024-09-26

### Fix

- Corrected `"files"` in `package.json` to include `utils.js` and `utils.d.ts`, resolving module not found errors during compilation in email and password.

---

### [4.0.2] - 2024-06-26

### Fix

- update: update rich-domain to v1.23.3

---


### [4.0.0] - 2024-05-31

### Refactor (Break Change)

- refactor: change lib to individual packages

---

### [3.9.0] - 2024-04-28

### Update (Break Change)

- Update core to v1.23.0
- check [Core Changelog](https://github.com/4lessandrodev/rich-domain/blob/main/CHANGELOG.md)

---

## Released

### [3.8.3] - 2024-04-13

### Update

- Update core
- Added support to multi context name
- Details [Commit](https://github.com/4lessandrodev/rich-domain/commit/00db292f0604469c8bf2f2fddf6460901a084cc6)

```ts

// Example Usage
const context = Context.events();

const handler = (event) => console.log(event);

// Subscribing to events under different contexts
context.subscribe('Context-A:SIGNUP', handler);
context.subscribe('Context-B:SIGNUP', handler);
context.subscribe('Context-C:SIGNUP', handler);
context.subscribe('Context-B:NOTIFY', handler);
context.subscribe('Context-B:SEND-EMAIL', handler);

// Dispatching events to specific contexts
// Dispatches the SIGNUP event to Context-B
context.dispatchEvent('Context-B:SIGNUP');
// Dispatches the SIGNUP event to all contexts
context.dispatchEvent('*:SIGNUP');
// Dispatches all events to all contexts. Not recommended
context.dispatchEvent('*:*');
// Dispatches all events under Context-B
context.dispatchEvent('Context-B:*');

```

---

### [3.8.2] - 2024-04-12

### Update

- Update core
- Added support to global events [ChangeLog](https://github.com/4lessandrodev/rich-domain/pull/139)

---

### [3.8.1] - 2024-03-18

### Update

- Update core
- Fix logger messages

---

### [3.8.0] - 2024-03-18

### Update

- update deps core to v1.20.0 see [changes](https://github.com/4lessandrodev/rich-domain/blob/main/CHANGELOG.md)

---

### [3.7.2] - 2024-03-15

### Update

- update deps
- added support to nodejs v21

---

### [3.7.1] - 2023-12-15

### Update

- update deps

---

### [3.7.0] - 2023-09-30

### Update

- Update core
- update deps
- rich-domain: update lib core to 1.19.0
- remove support for deprecated history method
- improve performance and save memory usage

---

### [3.6.4] - 2023-08-24

### Update

- Update core
- update deps
- rich-domain: update lib core to 1.18.4

---

### [3.6.3] - 2023-07-30

### Update

- Update core
- rich-domain: update lib core to 1.18.3 #272 #282

---

### [3.6.2] - 2023-07-09

### Update

- Update core
- rich-domain: update lib core to 1.18.2 #272

---

---
### [3.6.1] - 2023-06-30

### Update

- Update core
- rich-domain: update lib core to 1.18.1

---
### [3.6.0] - 2023-04-21

### Update

- Update core
- rich-domain: update lib core to 1.18.0 [More](https://github.com/4lessandrodev/rich-domain/blob/main/CHANGELOG.md)


---
### [3.5.3] - 2023-02-18

### Update

- Update core
- rich-domain: update lib core to 1.17.3

---

### [3.5.2] - 2023-02-18

### Changed

- validation to `url.value-object` use URL default validation and remove regex. by @ArturHamannRonconi

### Added 

- added separator as optional param to `getInitials`method from `user-name.value-object`

---
### [3.5.1] - 2023-01-27

### Update

- Update core
- rich-domain: update lib core to 1.17.1

---
### [3.5.0] - 2023-01-21

### Update

- Update core

### Breaking Change
- rich-domain: update lib core to 1.17.0 check on [pull request 33](https://github.com/4lessandrodev/rich-domain/pull/33)

```ts

// Example using set now

const changed = user.set("name").to(age);

console.log(changed);

> true

```

```ts

// Example using clone now

const copy = user.clone();

console.log(copy.get("name").get("value"))

> "Jane Doe"

```

---
### [3.4.7] - 2023-01-19

### Update

- rich-domain: update lib core to 1.16.2

---
### [3.4.6] - 2023-01-18

### Update

- rich-domain: update lib core to 1.16.1

---
### [3.4.5] - 2023-01-14

### Changed

- date.value-object: rename method from `isEqual` to `isEqualDate`

### Update

- rich-domain: update lib core to 1.16.0
- Entity: added method isEqual to compare current instance with another one.
- ValueObject: added method isEqual to compare current instance with another one. [Issue 27](https://github.com/4lessandrodev/rich-domain/issues/27)

---

### [3.4.4] - 2023-01-12

### Added

- custom-string.value-object: By: [VinnyLima](https://github.com/VinnyLima)
- removeSpecialChars and onlyNumbers: [Issue 223](https://github.com/4lessandrodev/types-ddd/issues/223)
- email.value-object: added MESSAGE as customizable value

---

### [3.4.3] - 2023-01-05

### Updated

- rich-domain: update lib core to 1.15.2

---

### [3.4.2] - 2023-01-03

### Fix

- node version: update requirements. node version required >=16 and < 19

---

### [3.4.1] - 2023-01-03

### Fix

- user-name.value-object: remove empty spaces. By: [VinnyLima](https://github.com/VinnyLima)

---
### [3.4.0] - 2022-12-25

### Update

- rich-domain: update lib core to 1.15.0
- value-objects: added MESSAGE attribute to instance

Now its possible to customize error message

Example:

```ts

// custom-user-name.ts

import { UserNameValueObject } from 'types-ddd';

Reflect.set(UserNameValueObject, "MIN_LENGTH", 3);
Reflect.set(UserNameValueObject, "MAX_LENGTH", 20);
Reflect.set(UserNameValueObject, "MESSAGE", "Username must be a maximum of 3 and a minimum of 20 characters");

const CustomName = UserNameValueObject;

export CustomName; // > import this to create your user name
export default CustomName;

```

---

### [3.3.7] - 2022-11-27

### Update

- rich-domain: update lib core to 1.14.6

---

### [3.3.6] - 2022-11-25

### Update

- rich-domain: update lib core to 1.14.5

---

### [3.3.5] - 2022-11-22

### Update

- rich-domain: update lib core to 1.14.4

---

### [3.3.4] - 2022-11-22

### Update

- rich-domain: update lib core to 1.14.3

---

### [3.3.3] - 2022-11-17

### Changed

- Ok and Fail: ensure export from lib

---

### [3.3.2] - 2022-11-07

### Changed

- chore: deps - update deps

---

### [3.3.1] - 2022-11-03

### Fixed

- value-objects: calc validation

---
### [3.3.0] - 2022-10-05

### Changed

- value-objects: implement customization for value objects

---
### [3.2.2] - 2022-10-03

### Changed

- result: implement freeze result instance
- password: define protected props as MAX_LENGTH and MIN_LENGTH
- update deps: rich-domain

---
### [3.2.1] - 2022-09-26

### Changed

- update deps: rich-domain


- refactor: Fail
- refactor: Ok
- refactor: Result.Ok
- refactor: Result.fail

Change generic types order for `Result.fail` and `Result.Ok`

Now each method has your own order
Example: 

```ts

// for implementation: 
IResult<Payload, Error, MetaData>;

// before the generic order was the same for both method.
// now for 
Result.Ok

// the generic order is 
Result.Ok<Payload, MetaData, Error>(payload metaData);

// for 
Result.fail 

//the generic order is 
Result.fail<Error, MetaData, Payload>(error, metaData);

```

Changes made on Ok

```ts

import { Ok } from 'rich-domain';

// simple use case for success. no arg required
return Ok();

// arg required 

return Ok<string>('my payload');

// arg and metaData required 

interface MetaData {
  arg: string;
}

return Ok<string, MetaData>('payload', { arg: 'sample' });

```

Changes made on Fail

```ts

import { Fail } from 'rich-domain';

// simple use case for success. no arg required
return Fail();

// arg required 

return Fail<string>('my payload');

// arg and metaData required 

interface MetaData {
  arg: string;
}

return Fail<string, MetaData>('payload', { arg: 'sample' });

```

---
### [3.2.0] - 2022-09-26

### Added

- update deps: rich-domain
- feat: implement function Fail 
- feat: implement function Ok

---
### [3.1.5] - 2022-09-26

### Fixed

- EmailValueObject: remove regex and added function validation

---
### [3.1.4] - 2022-09-20

### Update

deps: update dependencies

- rich-domain to v1.12.0

---
### [3.1.3] - 2022-09-03

### Update

deps: update dependencies

- rich-domain to v1.11.2
- typescript to 4.8.2

---
### [3.1.2] - 2022-08-14

### Update

docs: update readme and documentation
deps: update dependencies 

### Added

ci: install dependabot to check deps

---
### [3.1.1] - 2022-08-14

### Update

docs: update readme and documentation

---
### [3.1.0] - 2022-08-10

### Changed

- deps: update dependencies rich-domain to version 1.11.0

Change order validation args in value objects

```ts

  // from
  validation<Key extends keyof Props>(key: Key, value: Props[Key]): boolean {};

  // to
  validation<Key extends keyof Props>(value: Props[Key], key: Key): boolean {};

```

---

### [3.0.2] - 2022-08-07

### Update

- deps: update dependencies rich-domain to version 1.10.0

---

### [3.0.1-beta.0] - 2022-08-05

### Update

- deps: update dependencies rich-domain to version 1.9.0


---

### [3.0.0-beta.0] - 2022-08-05

### Update

- deps: update dependencies


---

### [3.0.0-beta] - 2022-08-04

### Change

- change core (**breaking changes**). using now rich-domain lib [npm rich-domain](https://www.npmjs.com/package/rich-domain)


---

### [2.12.1] - 2022-07-18

### Update

- deps: update dependencies

---

### [2.12.0] - 2022-04-18

### Changes

- TSProxy: change context param from function to instance of class [pull request](https://github.com/4lessandrodev/types-ddd/pull/144)
- deps: update dependencies

---

### [2.11.0] - 2022-04-02

### Added

- TSProxy: added abstract class as proxy implementation [pull request](https://github.com/4lessandrodev/types-ddd/pull/142)

---

### [2.10.3] - 2022-03-28

### Changes

- logger: make instance a singleton

---

### [2.10.2] - 2022-03-28

### Changes

- logger: update configs
### Update

- deps: update dependencies

---

### [2.10.1] - 2022-03-23

### Update

- deps: update dependencies

---
### [2.10.0] - 2022-02-27

### Fixed

- toObject: return string when there is a domainId as value-object attribute

---
### [2.9.13] - 2022-02-14

### Fixed

- toObject: added support to convert a simple object on entity

---

### [2.9.11] ~ [2.9.12] - 2022-02-13

### Changed

- toObject: added support to convert a value object inside another one

---

### [2.9.9] ~ [2.9.10] - 2022-02-13

### Changed

- update dependencies
- update documentation

---
### [2.9.8] - 2022-02-09

### Fixed

- toObject: fix adding support for string, boolean and numbers to domain entity attributes on call toObject method.
- create: ensure all domain entity implements create method

### Added

- clone: added method to clone a domain entity

---
### [2.9.7] - 2022-01-31

### Added

- logs deactivation: now its possible deactivate all logs;
```sh
NODE_ENV=production # automatically turn off all logs
TYPES_DDD_LOGS=off # manual turn off logs
TYPES_DDD_LOGS=error # show only errors log
TYPES_DDD_LOGS=info # show only info log
TYPES_DDD_LOGS=warn # show only warn log
```
---
### [2.9.6] - 2022-01-30

### Fixed

- toObject: ensure to convert a moderately complex value object

---

### [2.9.5] - 2022-01-30

### Added 

- toObject: update types on entity.toObject method

### Changed

- update and change some documentation and examples
- mark IMapper interface as deprecated tool. Use TMapper instead

---

### [2.9.4] - 2022-01-29

### Added 

- Imports: Create shortcuts for imports : Issue #114

---

### [2.9.3] - 2022-01-21

### Fixed 

- AutoMapper: get string value when prop is DomainId or ShortDomainId

---

### [2.9.1] ~ [2.9.2] - 2022-01-21

### Changed 

- DomainId: added clone method to create a new id from an instance
- ShortDomainId: added clone method to create a new id from an instance

### Added

- Available AutoMapper to convert Entity, Aggregate and ValueObject from domain instance to a persistence model

---

### [2.9.0] - 2022-01-21

### Changed 

- DomainId and ShortDomainId: added property isNew to identify if is a new id
- Entity, Aggregate and ValueObject: added method toObject to convert domain instance to a persistence model

### Added

- Available AutoMapper to convert Entity, Aggregate and ValueObject from domain instance to a persistence model

---

### [2.8.8] - 2021-12-29

---
### Added

- Entity: hasSomeTypes method to validate different types from instance keys

### Changed 

- Entity: isSome method > new accepted type: 'null'
- Entity: isAll method > new accepted type: 'null'


### [2.8.7] - 2021-12-28

---

### Added

- State: addManyState<T, E> method add many results to state and return unique keys
- State: getStateByKeys<T, E> method get many results by keys


### [2.8.6]- 2021-12-26

---

### Added

- Entity: toObject<T, E> method transform instance in persistence object


### [2.8.5]  - 2021-12-25

---

### Added

- Entity: added method checkProps to entity instance

### [2.8.4]  - 2021-12-24

---

### Changed 

- State: define exists method as protected

### Added 

- State: added callback on state

### [2.8.3]  - 2021-12-23

---

### Changed 

- State: define exists method as protected

### [2.8.2]  - 2021-12-22

---

### Changed 

- Mapper: rename to State
- Mapper: added exists method

### [2.8.1]  - 2021-12-22

---

### Changed 

- Mapper: added logger if state key does not exits

### [2.8.0]  - 2021-12-22

---

### Changed 

- static method on domain entities
- buildFromDto > change to build
- buildFromModel > change to build
- buildToModel > change to build
- IMapper2 > change to TMapper

### [2.7.15]  - 2021-12-21

---

### Added 

- static method on domain entities
- buildFromDto
- buildFromModel
- buildToModel

### [2.7.14]  - 2021-12-21

---

### Added 

- abstract class Mapper with state management methods
- IMappers interface with new methods

### [2.7.12] - [2.7.13]  - 2021-12-14

---

### Changed

- DomainId and ShortDomainId: make both compatible

### [2.7.11] - 2021-12-14

---

### Changed

- BaseDomainEntity: ID accept DomainId or ShortDomainId
- Entity: getHashCode - now returns uid value base value added to ID
- Breaking change - Remove methods from DomainId:
- toShort()
- shortUid

### [2.7.10] - 2021-12-14

---
### Fix 

- ShortDomainId: export resource

### [2.7.9] - 2021-12-14

---
### Added 

- ShortDomainId: default short domain id - 16 bit

### [2.7.8] - 2021-11-22

---

### Fixed

- PasswordValueObject: validate if instance value already is encrypted.


### [2.7.7] - 2021-11-22

---

### Changed

- DimensionValueObject: now update methods returns updated instance.
- PasswordValueObject: now encrypt method returns updated instance.
- UserNameValueObject: now capitalize method returns updated instance.
- WeightValueObject: now update methods returns updated instance.

### [2.7.6] - 2021-11-21

---
### Fixed

- util: change regex to validate email (includes dot as valid char).

### [2.7.5] - 2021-10-11

---
### Changed

- entities and aggregates: getHashCode > combination of class name and id. Now using short uid.

### Fixed

- lib: publish only dist to keep lib small

### [2.7.4] - 2021-10-09

---
### Fixed

- removeUndefinedKeysFromObject: do not remove dates

### [2.7.3] - 2021-10-08

---
### Changed

- DateValueObject: added comparators methods

### [2.7.2] - 2021-10-08

---
### Changed

- DateValueObject: added validation on create a new instance

### [2.7.1] - 2021-10-08

---
### Added 

- DateValueObject

### [2.7.0] - 2021-10-06

---
### Changed

- DomainId > change getters method

### [2.6.2] ~ [2.6.4] - 2021-10-06

---
### Changed

- DomainId > added toShort method
- DomainId > toShort method. Now you can choose length

### [2.6.1] - 2021-09-30

---
### Changed

- getUndefinedKeysAsObject > added new option to return as value

### [2.6.0] - 2021-09-29

---
### Changed

- CurrencyValueObject > added functions to compare values
- getUndefinedKeysAsObject > added option to get path as string

### [2.5.7] ~ 2.5.10 - 2021-09-25

---

### Added

- removeUndefinedKeysFromObject

### [2.5.6] - 2021-09-23

---
### Changed

- dist > update build

### [2.5.5] - 2021-09-24

---
### Changed

- getUndefinedKeysAsObject > define value to be applied

### [2.5.4] - 2021-09-24

---
### Changed

- DimensionValueObject > validate unit before create value object
- WeightValueObject > validate unit before create value object

### [2.5.3] - 2021-09-22

---
### Changed

- DimensionEntity > changed to value object: DimensionValueObject
- WeightEntity > changed to value object: WeightValueObject

### [2.5.2] - 2021-09-21

---
### Changed

- dist: remove unused files on dist

### [2.5.1] - 2021-09-20

---
### Changed

- Lib utils: Imports path

### Added

- WeightUnitValueObject
- UnitOfMeasureValueObject
- DimensionEntity
- WeightEntity

### [2.5.0] - 2021-09-18

---
### Changed

- PinValueObject: Define pin props as optional
- Rename folder: from src to lib

### Added

- CPFValueObject
- CNPJValueObject
- CustomStringValueObject
- CustomNumberValueObject
- HEXColorValueObject: Ensure don't generate light color like white
- RGBColorValueObject: Ensure don't generate light color like white

### [2.4.2] ~ [2.4.10] - 2021-09-09

---
### Fixed

- Update dependencies

### [2.4.1] - 2021-09-09

---
### Fixed

- UrlValueObject: export value object

### [2.4.0] - 2021-09-07

---
### Changed

- PinValueObject: util value object

### [2.3.6] - 2021-08-29

---
### Changed

- CurrencyValueObject: docs - identify max safe number

### [2.3.5] - 2021-08-29

---

### Changed

- Result - Change default generic type on `combine` method to `unknown` instead `any`


### [2.3.4] - 2021-08-29

---

### Changed

- ChangesObserver - Fix added possibility to get all added results `getAllAddedResults`

### [2.3.3] - 2021-08-28

---

### Changed

- Result - Fix possibility to return a void instance. Create a specific method `Result.success`

### [2.3.2] - 2021-08-28

---

### Changed

- Result - Fix possibility to return a void instance

### [2.3.1]- 2021-08-28

---

### Changed

- Result - added an internationalization error message

### [2.3.0] - 2021-08-27

---

### Added

- StatusCodeEnum

### Changed

- Result - provide an enum as string declaration instead number

### [2.2.3] - 2021-08-24

---

### Added

- SpecificationComposite

### Changed

- IBaseRepository - rename params and doc comments

### [2.2.2] - 2021-08-19

---

### Fixed

- colorGenerator

### [2.2.1] - 2021-08-17

---

### Fixed

- index (exports)

### [2.2.0] - 2021-08-17

---

### Added

- getUndefinedKeysAsArray
- getUndefinedKeysAsObject

### [2.1.0] - 2021-08-14

---

### Changed

- CurrencyValueObject

### Added

- ChangesObserver

### [2.0.4] - 2021-08-13

---

### Fixed

- Result

### [2.0.3] - 2021-08-13

---

### Fixed

- Result: new approach

### [2.0.2] - 2021-08-12

---

### Changed

- Dynamic types to Filter on IBaseRepository

### [2.0.1] - 2021-08-12

- Entity

### [2.0.0] - 2021-08-12

---

### Changed

- DomainId
- AggregateRoot: new approach
- Entity: new approach
- Filter

### Added

- OrderStatusValueObject

### Fixed

- AggregateRoot

### [1.5.1] - 2021-08-11

---

### Changed

- BirthdayValueObject

### [1.5.0] - 2021-08-11

---

### Added

- colorConverter
- colorGenerator

### Changed

- RGBColorValueObject
- HEXColorValueObject

### [1.4.1] - 2021-08-11

---

### Added

- RGBColorValueObject
- HEXColorValueObject
- PostalCodeValueObject
- UrlValueObject

### Changed

- Result

### [1.3.1] - 2021-08-10

---

### Fixed

- TrackingCodeValueObject

### [1.3.0] - 2021-08-10

---

### Changed

- Result StatusCode

### Added

- Logger
- HomePhoneValueObject
- MobilePhoneValueObject
- DomainId
- TrackingCodeValueObject

### [1.2.0] - 2021-08-09

---

### Added

- PasswordValueObject
- passwordGenerator
- CurrencyValueObject
- EmailValueObject
- UserNameValueObject
- BirthdayValueObject

### [1.1.0] - 2021-07-28

---

### Added

- Dynamic types to Filter
- Types validation to IBaseRepository

### [1.0.3] - 2021-07-16

---

### Fixed

- Define Node crash version on package.json

### [1.0.2] - 2021-07-09

---

### Changed

- Update documentation
