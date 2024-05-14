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

// Result of CNPJ (Check Result docs)
const result = CNPJ.create('54097792000193');

result.isOk(); // true

// cnpj instance or null if provide an invalid value
const cnpj = result.value();

```

## Special chars

Don't worry about removing special characters; they are automatically stripped from all instances.

If you need the value with the mask, you can use the `asPattern` method:

```ts

cnpj.asPattern();

// Output: 54.097.792/0001-93

```
