# `@types-ddd/phone`

> The @types-ddd/phone library provides TypeScript type definitions for handling phone (Brazilian) in Domain-Driven Design contexts. It facilitates the validation and manipulation of phone numbers, ensuring they adhere to the Brazilian legal standards.

---

## Installation

Install `rich-domain` and `@types-ddd/phone` with your favorite package manager

```sh

npm i rich-domain @types-ddd/phone

# OR

yarn add rich-domain @types-ddd/phone

```

## Usage

Don't worry about removing special characters; they are automatically stripped from all instances.

```ts

import { Phone } from '@types-ddd/phone'

// Instance of phone or throws an error if provide an invalid value
const phone = Phone.init('11994882021');

// OR

// Result of phone (Check Result pattern docs)
const result = Phone.create('11994882021');

result.isOk(); // true

// phone instance or null if provide an invalid value
const phone = result.value();

```

## Check phone type

Method to verify instance type.

```ts

// value as string 
const isMobile = Phone.isMobile('11994882021');
// Output: true

// OR

// value as string 
const isMobile = Phone.isHome('11994882021');
// Output: false

```

## Special Chars

Don't worry about removing special characters; they are automatically stripped from all instances.

```ts

const result = Phone.isValid('(11) 99488-2021');
// Output: true

```

## Special chars

If you need the value with the mask, you can use the `toPattern` method:

```ts

phone.toPattern();

// Output: '(11) 99488-2021'

```

Or if you need to apply mask from a string value you may use `addMask` method


```ts

Phone.addMask('11994882021');

// Output: (11) 99488-2021

```

Or if you need to remove mask from a string value you may use `removeSpecialChars` method


```ts

Phone.removeSpecialChars('(11) 99488-2021');

// Output: 11994882021

```

If you need to identify uf from a phone number

```ts

const phone = Phone.init('(11) 99488-2021');

phone.uf();
// Output: "São Paulo"

phone.code();
// 11

phone.number();
// 994882021

phone.toCall();
// 011994882021

```
