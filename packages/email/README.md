# `@type-ddd/email`

> The @type-ddd/email module provides a class Email for handling email addresses in TypeScript. It includes methods for validating email addresses, extracting parts of the email (such as nickname and domain), and creating instances of validated emails.

## Installation

Install `rich-domain` and `@type-ddd/email` with your favorite package manager:

```sh

npm i rich-domain @type-ddd/email

#OR 

yarn add rich-domain @type-ddd/email

```

## Usage

```ts

import { Email } from '@type-ddd/email';

// Check if is valid value 
const isValid = Email.isValid('sample@domain.com');
// true

// Initialize Email instance with a valid email address
const email = Email.init('example@example.com');

// OR

// Create Email instance from provided email address
const result = Email.create('example@example.com');

// Get parts of the email address
const nickname = email.nick();
const domain = email.domain();


```

### Block some domains

If you want to block some specifics domains

```ts

import { Email } from '@type-ddd/email';

const list = ['hack.com'];

Reflect.set(Email, 'BLOCKED_DOMAINS', list);

const isValid = Email.isValid('user@hack.com');
// false

const isValid = Email.isValid('user@gmail.com');
// true

```

### Allowed some domains

If you want to allow only some specifics domains

```ts

import { Email } from '@type-ddd/email';

const list = ['my-company.com'];

Reflect.set(Email, 'VALID_DOMAINS', list);

const isValid = Email.isValid('user@my-company.com');
// true

const isValid = Email.isValid('user@gmail.com');
// false

```
