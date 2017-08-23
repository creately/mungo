# mungo

Javascript implementation of MongoDB update operators.

```ts
import { modify } from 'mungo';

const doc = { id: 'id', x: 10 };
modify(doc, { $set: { x: 20 } });
console.log(doc) // { id: 'id', x: 20 }
```
