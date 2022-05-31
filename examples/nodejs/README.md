Examples of using sdk in different ways - 
- index.cjs => common js, import with require
- index.ts => typescript


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
