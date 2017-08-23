import { OPERATORS } from './modifier';

// Modifier
// Modifier is a mongo like modifier used to modify documents.
export type Modifier = any;

// modify
export function modify<T>(doc: T, modifier: Modifier): void {
  Object.keys(modifier).forEach(key => {
    const fn = OPERATORS[key];
    if (fn) {
      fn(doc, modifier[key]);
    }
  });
}
