# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- ValueObject Decorator
- ItemDimensionsValueObject
- ShippingWeightValueObject
- EANCodeValueObject
- ISBNCodeValueObject
- UPCCodeValueObject

### 2.5.0 - 2021-09-16

---
### Changed

- PinValueObject: Define pin props as optional

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

- Result

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
- AggregateRoot
- Entity
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
