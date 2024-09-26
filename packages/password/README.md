# `@type-ddd/password`

> The @type-ddd/password module provides a class Password for handling password in TypeScript. It includes methods for validating password, encrypt and compare.

## Installation

Install `rich-domain`, `@type-ddd/password` and `bcrypt` with your favorite package manager:

```sh

npm i rich-domain @type-ddd/password bcrypt

#OR 

yarn add rich-domain @type-ddd/password bcrypt

```

## Usage

```ts

import { Password } from '@type-ddd/password';

// Initialize Password instance with a valid value
const password = Password.init('Y8237FNB@');

// OR

// Create Password instance from provided value
const result = Password.create('Y8237FNB@');

// Or create a strong password
const pass = Password.random();

```

### Compare password

You may compare password with plain text to check if is equal

```ts

const password = Password.init('#$89ABC_v');

// check if password is encrypted
password.isEncrypted();
// false

const encrypted = password.encrypt();

// compare
encrypted.compare('#$89ABC_v');
// true

```
