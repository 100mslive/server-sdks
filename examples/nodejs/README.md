Examples of using sdk in different ways -

- index.cjs => Common js, import with require
- index.js => ES Modules Javascript
- index.ts => Typescript

Check out the TypeScript file for a detailed usage example.

## To Run

### `index.js` => esm module, import with modern syntax

> yarn esm

### `index.cjs` => common js, import with older require syntax

> yarn cjs

### `index.ts` => typescript

First make sure ts-node is installed globally

> npm install -g ts-node typescript '@types/node'

To run -

> yarn ts
