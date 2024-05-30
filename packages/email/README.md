# `@types-ddd/email`

> The @types-ddd/email module provides a class Email for handling email addresses in TypeScript. It includes methods for validating email addresses, extracting parts of the email (such as nickname and domain), and creating instances of validated emails.

## Installation

Install `rich-domain` and `@types-ddd/email` with your favorite package manager:

```sh

npm i rich-domain types-ddd/email

#OR 

yarn add rich-domain types-ddd/email

```

## Usage

```ts

import { Email } from '@types-ddd/email';

// Initialize Email instance with a valid email address
const email = Email.init('example@example.com');

// OR

// Create Email instance from provided email address
const result = Email.create('example@example.com');

// Get parts of the email address
const nickname = email.nick();
const domain = email.domain();


```
