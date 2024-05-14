# `@types-ddd/cnpj`

> The @types-ddd/cnpj library provides TypeScript type definitions for handling CNPJ (Cadastro Nacional da Pessoa Jurídica) in Domain-Driven Design contexts. It facilitates the validation and manipulation of CNPJ numbers, ensuring they adhere to the Brazilian legal standards.

## Installation

```sh

npm i rich-domain @types-ddd/cnpj

# OR

yarn add rich-domain @types-ddd/cnpj

```

## Usage

Don't worry about removing special characters; they are automatically stripped from all instances.

```ts

import { CNPJ } from '@types-ddd/cnpj'

// Instance of CNPJ or throws an error if provide an invalid value
const cnpj = CNPJ.init('54097792000193');

// OR

// Result of CNPJ (Check Result pattern docs)
const result = CNPJ.create('54097792000193');

result.isOk(); // true

// cnpj instance or null if provide an invalid value
const cnpj = result.value();

```

## Compare values or instances

Method to compare two instances or values.

```ts

// value as string 
const isEqual = cnpj.compare('54097792000194')

// Output: false

// OR

// value as instance of CNPJ
const isEqual = cnpj.compare(cnpj2)

// Output: false

```

## Check string is valid cnpj

Don't worry about removing special characters; they are automatically stripped from all instances.

```ts

const result = CNPJ.isValid('54097792000193');

// Output: true

```

## Special chars

If you need the value with the mask, you can use the `toPattern` method:

```ts

cnpj.toPattern();

// Output: 54.097.792/0001-93

```
