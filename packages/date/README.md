# `@types-ddd/date`

> The @types-ddd/date library provides a class Dates for handling date and time operations in TypeScript. It offers various methods for manipulating dates, calculating differences, formatting dates, and checking validity. This library aims to simplify date and time management in Domain-Driven Design contexts.

---

## Installation

Install `rich-domain` and `@types-ddd/date` with your favorite package manager:

```sh

npm i rich-domain @types-ddd/date

# OR

yarn add rich-domain @types-ddd/date

```
 ## Usage

 ```ts


import { Dates } from '@types-ddd/dates';

// Check if is valid value
const isValid = Dates.isValid('2020-02-31');
// false

// Initialize Dates instance with current date and time
const date = Dates.init();

// OR

// Create Dates instance from provided date or timestamp
const result = Dates.create('2024-05-24');

// Add days, months, hours, minutes, weeks, or years
const newDate = date.addDays(5).addMonths(2);

// Format date according to various patterns
const formattedDate = date.format('DD/MM/YYYY hh:mm:ss');

// Check if date is weekday or weekend
const isWeekday = date.isWeekday();
const isWeekend = date.isWeekend();

 ```
