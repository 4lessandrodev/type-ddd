# `@type-ddd/username`

> The @type-ddd/username library provides TypeScript type definitions for handling User Name in Domain-Driven Design contexts. It facilitates the validation and manipulation of Person Name standards.

---

## Installation

Install `rich-domain` and `@type-ddd/username` with your favorite package manager

```sh

npm i rich-domain @type-ddd/username

# OR

yarn add rich-domain @type-ddd/username

```

## Usage

```ts

import { UserName } from '@type-ddd/username'

// Instance of name or throws an error if provide an invalid value
const name = UserName.init('jane doe');

// OR

// Result of name (Check Result pattern docs)
const result = UserName.create('jane doe');

result.isOk(); // true

// userName instance or null if provide an invalid value
const name = result.value();

```

## Check string is valid name

```ts

const result = UserName.isValid('jane doe');

// Output: true

```

## Utils

some utils methods

```ts

const fullName = UserName.init('jane doe spencer')

const initials = fullName.initials();
// JDS

const middle = fullName.middleName();
// Doe

const first = fullName.firstName();
// Jane

const firstWithTitle = fullName.title('Sra.').firstName();
// Sra. Jane

const last = fullName.lastName();
// Spencer

const upper = fullName.upperCase();
// JANE DOE SPENCER

```
