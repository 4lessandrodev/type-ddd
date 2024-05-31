# `@types-ddd/zip-code`

> The @types-ddd/cpf library provides TypeScript type definitions for handling ZipCode in Domain-Driven Design contexts. It facilitates the validation and manipulation of ZipCode numbers, ensuring they adhere to the Brazilian legal standards.

---

## Installation

Install `rich-domain` and `@types-ddd/zip-code` with your favorite package manager

```sh

npm i rich-domain @types-ddd/zip-code

# OR

yarn add rich-domain @types-ddd/zip-code

```

## Usage

Don't worry about removing special characters; they are automatically stripped from all instances.

```ts

import { ZipCode } from '@types-ddd/zip-code'

// Instance of zipCode or throws an error if provide an invalid value
const zipCode = ZipCode.init('75520140');

// OR

// Result of zipCode (Check Result pattern docs)
const result = ZipCode.create('75520140');

result.isOk(); // true

// zipCode instance or null if provide an invalid value
const zipCode = result.value();

```

## Check string is valid zipCode

Don't worry about removing special characters; they are automatically stripped from all instances.

```ts

const result = ZipCode.isValid('75520140');
// Output: true

```

## Special chars

If you need the value with the mask, you can use the `toPattern` method:

```ts

zipCode.toPattern();

// Output: 75520-140

```

Or if you need to apply mask from a string value you may use `addMask` method


```ts

ZipCode.addMask('75520140');

// Output: 75520-140

```
