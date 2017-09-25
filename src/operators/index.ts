import { Operator } from './operator';
import { operators as fieldOperators } from './fields';
import { operators as arrayOperators } from './arrays';
export { Operator } from './operator';

// operators
// operators ...
export const operators: { [name: string]: Operator } = {
  ...fieldOperators,
  ...arrayOperators,
};
