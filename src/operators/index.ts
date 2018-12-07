import { Operator } from '../framework/operator';
import { operators as fieldOperators } from './fields';
import { operators as arrayOperators } from './arrays';

// operators
// operators ...
export const operators: { [name: string]: Operator } = {
  ...fieldOperators,
  ...arrayOperators,
};
