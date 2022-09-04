# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

---
### 3.1.3 - 2022-09-03

### Update

deps: update dependencies

- rich-domain to v1.11.2
- typescript to 4.8.2

---
### 3.1.2 - 2022-08-14

### Update

docs: update readme and documentation
deps: update dependencies 

### Added

ci: install dependabot to check deps

---
### 3.1.1 - 2022-08-14

### Update

docs: update readme and documentation

---
### 3.1.0 - 2022-08-10

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

### 3.0.2 - 2022-08-07

### Update

- deps: update dependencies rich-domain to version 1.10.0

---

### 3.0.1-beta.0 - 2022-08-05

### Update

- deps: update dependencies rich-domain to version 1.9.0


---

### 3.0.0-beta.0 - 2022-08-05

### Update

- deps: update dependencies


---

### 3.0.0-beta - 2022-08-04

### Change

- change core (**breaking changes**). using now rich-domain lib [npm rich-domain](https://www.npmjs.com/package/rich-domain)


---

### 2.12.1 - 2022-07-18

### Update

- deps: update dependencies

---

### 2.12.0 - 2022-04-18

### Changes

- TSProxy: change context param from function to instance of class [pull request](https://github.com/4lessandrodev/types-ddd/pull/144)
- deps: update dependencies

---

### 2.11.0 - 2022-04-02

### Added

- TSProxy: added abstract class as proxy implementation [pull request](https://github.com/4lessandrodev/types-ddd/pull/142)

---

### 2.10.3 - 2022-03-28

### Changes

- logger: make instance a singleton

---

### 2.10.2 - 2022-03-28

### Changes

- logger: update configs
### Update

- deps: update dependencies

---

### 2.10.1 - 2022-03-23

### Update

- deps: update dependencies

---
### 2.10.0 - 2022-02-27

### Fixed

- toObject: return string when there is a domainId as value-object attribute

---
### 2.9.13 - 2022-02-14

### Fixed

- toObject: added support to convert a simple object on entity

---

### 2.9.11 ~ 2.9.12 - 2022-02-13

### Changed

- toObject: added support to convert a value object inside another one

---

### 2.9.9 ~2.9.10 - 2022-02-13

### Changed

- update dependencies
- update documentation

---
### 2.9.8 - 2022-02-09

### Fixed

- toObject: fix adding support for string, boolean and numbers to domain entity attributes on call toObject method.
- create: ensure all domain entity implements create method

### Added

- clone: added method to clone a domain entity

---
### 2.9.7 - 2022-01-31

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
### 2.9.6 - 2022-01-30

### Fixed

- toObject: ensure to convert a moderately complex value object

---

### 2.9.5 - 2022-01-30

### Added 

- toObject: update types on entity.toObject method

### Changed

- update and change some documentation and examples
- mark IMapper interface as deprecated tool. Use TMapper instead

---

### 2.9.4 - 2022-01-29

### Added 

- Imports: Create shortcuts for imports : Issue #114

---

### 2.9.3 - 2022-01-21

### Fixed 

- AutoMapper: get string value when prop is DomainId or ShortDomainId

---

### 2.9.1 ~ 2.9.2 - 2022-01-21

### Changed 

- DomainId: added clone method to create a new id from an instance
- ShortDomainId: added clone method to create a new id from an instance

### Added

- Available AutoMapper to convert Entity, Aggregate and ValueObject from domain instance to a persistence model

---

### 2.9.0 - 2022-01-21

### Changed 

- DomainId and ShortDomainId: added property isNew to identify if is a new id
- Entity, Aggregate and ValueObject: added method toObject to convert domain instance to a persistence model

### Added

- Available AutoMapper to convert Entity, Aggregate and ValueObject from domain instance to a persistence model

---

### 2.8.8 - 2021-12-29

---
### Added

- Entity: hasSomeTypes method to validate different types from instance keys

### Changed 

- Entity: isSome method > new accepted type: 'null'
- Entity: isAll method > new accepted type: 'null'


### 2.8.7 - 2021-12-28

---

### Added

- State: addManyState<T, E> method add many results to state and return unique keys
- State: getStateByKeys<T, E> method get many results by keys


### 2.8.6 - 2021-12-26

---

### Added

- Entity: toObject<T, E> method transform instance in persistence object


### 2.8.5  - 2021-12-25

---

### Added

- Entity: added method checkProps to entity instance

### 2.8.4  - 2021-12-24

---

### Changed 

- State: define exists method as protected

### Added 

- State: added callback on state

### 2.8.3  - 2021-12-23

---

### Changed 

- State: define exists method as protected

### 2.8.2  - 2021-12-22

---

### Changed 

- Mapper: rename to State
- Mapper: added exists method

### 2.8.1  - 2021-12-22

---

### Changed 

- Mapper: added logger if state key does not exits

### 2.8.0  - 2021-12-22

---

### Changed 

- static method on domain entities
- buildFromDto > change to build
- buildFromModel > change to build
- buildToModel > change to build
- IMapper2 > change to TMapper

### 2.7.15  - 2021-12-21

---

### Added 

- static method on domain entities
- buildFromDto
- buildFromModel
- buildToModel

### 2.7.14  - 2021-12-21

---

### Added 

- abstract class Mapper with state management methods
- IMappers interface with new methods

### 2.7.12 - 2.7.13  - 2021-12-14

---

### Changed

- DomainId and ShortDomainId: make both compatible

### 2.7.11 - 2021-12-14

---

### Changed

- BaseDomainEntity: ID accept DomainId or ShortDomainId
- Entity: getHashCode - now returns uid value base value added to ID
- Breaking change - Remove methods from DomainId:
- toShort()
- shortUid

### 2.7.10 - 2021-12-14

---
### Fix 

- ShortDomainId: export resource

### 2.7.9 - 2021-12-14

---
### Added 

- ShortDomainId: default short domain id - 16 bit

### 2.7.8 - 2021-11-22

---

### Fixed

- PasswordValueObject: validate if instance value already is encrypted.


### 2.7.7 - 2021-11-22

---

### Changed

- DimensionValueObject: now update methods returns updated instance.
- PasswordValueObject: now encrypt method returns updated instance.
- UserNameValueObject: now capitalize method returns updated instance.
- WeightValueObject: now update methods returns updated instance.

### 2.7.6 - 2021-11-21

---
### Fixed

- util: change regex to validate email (includes dot as valid char).

### 2.7.5 - 2021-10-11

---
### Changed

- entities and aggregates: getHashCode > combination of class name and id. Now using short uid.

### Fixed

- lib: publish only dist to keep lib small

### 2.7.4 - 2021-10-09

---
### Fixed

- removeUndefinedKeysFromObject: do not remove dates

### 2.7.3 - 2021-10-08

---
### Changed

- DateValueObject: added comparators methods

### 2.7.2 - 2021-10-08

---
### Changed

- DateValueObject: added validation on create a new instance

### 2.7.1 - 2021-10-08

---
### Added 

- DateValueObject

### 2.7.0 - 2021-10-06

---
### Changed

- DomainId > change getters method

### 2.6.2 ~ 2.6.4 - 2021-10-06

---
### Changed

- DomainId > added toShort method
- DomainId > toShort method. Now you can choose length

### 2.6.1 - 2021-09-30

---
### Changed

- getUndefinedKeysAsObject > added new option to return as value

### 2.6.0 - 2021-09-29

---
### Changed

- CurrencyValueObject > added functions to compare values
- getUndefinedKeysAsObject > added option to get path as string

### 2.5.7 ~ 2.5.10 - 2021-09-25

---

### Added

- removeUndefinedKeysFromObject

### 2.5.6 - 2021-09-23

---
### Changed

- dist > update build

### 2.5.5 - 2021-09-24

---
### Changed

- getUndefinedKeysAsObject > define value to be applied

### 2.5.4 - 2021-09-24

---
### Changed

- DimensionValueObject > validate unit before create value object
- WeightValueObject > validate unit before create value object

### 2.5.3 - 2021-09-22

---
### Changed

- DimensionEntity > changed to value object: DimensionValueObject
- WeightEntity > changed to value object: WeightValueObject

### 2.5.2 - 2021-09-21

---
### Changed

- dist: remove unused files on dist

### 2.5.1 - 2021-09-20

---
### Changed

- Lib utils: Imports path

### Added

- WeightUnitValueObject
- UnitOfMeasureValueObject
- DimensionEntity
- WeightEntity

### 2.5.0 - 2021-09-18

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

### 2.4.2 ~ 2.4.10 - 2021-09-09

---
### Fixed

- Update dependencies

### 2.4.1 - 2021-09-09

---
### Fixed

- UrlValueObject: export value object

### 2.4.0 - 2021-09-07

---
### Changed

- PinValueObject: util value object

### 2.3.6 - 2021-08-29

---
### Changed

- CurrencyValueObject: docs - identify max safe number

### 2.3.5 - 2021-08-29

---

### Changed

- Result - Change default generic type on `combine` method to `unknown` instead `any`


### 2.3.4 - 2021-08-29

---

### Changed

- ChangesObserver - Fix added possibility to get all added results `getAllAddedResults`

### 2.3.3 - 2021-08-28

---

### Changed

- Result - Fix possibility to return a void instance. Create a specific method `Result.success`

### 2.3.2 - 2021-08-28

---

### Changed

- Result - Fix possibility to return a void instance

### 2.3.1 - 2021-08-28

---

### Changed

- Result - added an internationalization error message

### 2.3.0 - 2021-08-27

---

### Added

- StatusCodeEnum

### Changed

- Result - provide an enum as string declaration instead number

### 2.2.3 - 2021-08-24

---

### Added

- SpecificationComposite

### Changed

- IBaseRepository - rename params and doc comments

### 2.2.2 - 2021-08-19

---

### Fixed

- colorGenerator

### 2.2.1 - 2021-08-17

---

### Fixed

- index (exports)

### 2.2.0 - 2021-08-17

---

### Added

- getUndefinedKeysAsArray
- getUndefinedKeysAsObject

### 2.1.0 - 2021-08-14

---

### Changed

- CurrencyValueObject

### Added

- ChangesObserver

### 2.0.4 - 2021-08-13

---

### Fixed

- Result

### 2.0.3 - 2021-08-13

---

### Fixed

- Result: new approach

### 2.0.2 - 2021-08-12

---

### Changed

- Dynamic types to Filter on IBaseRepository

### 2.0.1 - 2021-08-12

- Entity

### 2.0.0 - 2021-08-12

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

### 1.5.1 - 2021-08-11

---

### Changed

- BirthdayValueObject

### 1.5.0 - 2021-08-11

---

### Added

- colorConverter
- colorGenerator

### Changed

- RGBColorValueObject
- HEXColorValueObject

### 1.4.1 - 2021-08-11

---

### Added

- RGBColorValueObject
- HEXColorValueObject
- PostalCodeValueObject
- UrlValueObject

### Changed

- Result

### 1.3.1 - 2021-08-10

---

### Fixed

- TrackingCodeValueObject

### 1.3.0 - 2021-08-10

---

### Changed

- Result StatusCode

### Added

- Logger
- HomePhoneValueObject
- MobilePhoneValueObject
- DomainId
- TrackingCodeValueObject

### 1.2.0 - 2021-08-09

---

### Added

- PasswordValueObject
- passwordGenerator
- CurrencyValueObject
- EmailValueObject
- UserNameValueObject
- BirthdayValueObject

### 1.1.0 - 2021-07-28

---

### Added

- Dynamic types to Filter
- Types validation to IBaseRepository

### 1.0.3 - 2021-07-16

---

### Fixed

- Define Node crash version on package.json

### 1.0.2 - 2021-07-09

---

### Changed

- Update documentation
