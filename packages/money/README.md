# `@type-ddd/money`

> The @type-ddd/money library provides TypeScript type definitions for handling Money in Domain-Driven Design contexts. It facilitates the validation, formatting, and manipulation of monetary values, adhering to DDD principles.

---

## Installation

Install `rich-domain` and `@type-ddd/money` with your favorite package manager

---

```sh

npm i rich-domain @type-ddd/money

# OR

yarn add rich-domain @type-ddd/money

```

## Usage

```ts


import { Money } from '@type-ddd/money'

// Initialize a Money object with the provided value
const amount = Money.init(100);

// OR

const result = Money.create(100);

// Check if a value is a valid monetary amount
const isValid = Money.isValid(100);

// Sum two monetary values or Money objects
const total = Money.sum(amount, 50);

// Subtract one monetary value or Money object from another
const difference = Money.subtract(total, 25);

// Multiply two monetary values or Money objects
const product = Money.multiply(difference, 2);

// Divide one monetary value or Money object by another
const quotient = Money.divide(product, 4);

// Round down the monetary value to the nearest integer
const floorValue = quotient.floor();

// Round up the monetary value to the nearest integer
const ceilValue = quotient.ceil();

// Calculate compound interest based on the provided rate and periods
const interest = Money.compoundInterest(5, 10);

// Generate a random monetary value within the specified range
const randomAmount = Money.random(10, 100);

// Calculate the average value among the provided Money objects
const average = Money.average([amount, total, difference]);

// Convert the current Money value to another currency using the provided exchange rate
const convertedAmount = amount.convertTo(2);

// Generate a formatted string representing the monetary value in a specific currency and locale
const formattedAmount = amount.coin('USD', 'en-US');

console.log(formattedAmount);
// Output: $100.00 (assuming 100 is the amount in USD)

```
