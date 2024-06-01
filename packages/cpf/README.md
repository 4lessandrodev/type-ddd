# `@type-ddd/cpf`

> The @type-ddd/cpf library provides TypeScript type definitions for handling CPF (Cadastro de Pessoa Física) in Domain-Driven Design contexts. It facilitates the validation and manipulation of CPF numbers, ensuring they adhere to the Brazilian legal standards.

---

## Installation

Install `rich-domain` and `@type-ddd/cpf` with your favorite package manager

```sh

npm i rich-domain @type-ddd/cpf

# OR

yarn add rich-domain @type-ddd/cpf

```

## Usage

Don't worry about removing special characters; they are automatically stripped from all instances.

```ts

import { CPF } from '@type-ddd/cpf'

// Instance of cpf or throws an error if provide an invalid value
const cpf = CPF.init('54097792000193');

// OR

// Result of cpf (Check Result pattern docs)
const result = CPF.create('54097792000193');

result.isOk(); // true

// cpf instance or null if provide an invalid value
const cpf = result.value();

```

## Compare values or instances

Method to compare two instances or values.

```ts

// value as string 
const isEqual = cpf.compare('54097792000194')

// Output: false

// OR

// value as instance of cpf
const isEqual = cpf.compare(cpf2)

// Output: false

```

## Check string is valid cpf

Don't worry about removing special characters; they are automatically stripped from all instances.

```ts

const result = CPF.isValid('54097792000193');

// Output: true

```

## Special chars

If you need the value with the mask, you can use the `toPattern` method:

```ts

cpf.toPattern();

// Output: 54.097.792/0001-93

```

Or if you need to apply mask from a string value you may use `addMask` method


```ts

CPF.addMask('54097792000193');

// Output: 54.097.792/0001-93

```
