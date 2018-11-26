# mungo

[![Greenkeeper badge](https://badges.greenkeeper.io/creately/mungo.svg)](https://greenkeeper.io/)

Javascript implementation of MongoDB update operators.

## Getting Started

Install the package

```
npm install @creately/mungo
```

Import the `modify` function from `mungo` and call it with the document.

```ts
import { modify } from 'mungo'

const doc = { id: 'id', x: 10 }
modify(doc, { $set: { x: 20 } })

console.log(doc)
// { id: 'id', x: 20 }
```

## Supported Operators

### Field Update Operators

 - $set

### Array Update Operators

 - $push
 - $pull

### Bitwise Update Operators
