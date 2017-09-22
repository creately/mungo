import { Operator } from './operator';
import { SetOperator } from './fields';
import { PushOperator, PullOperator } from './arrays';

// operators
// operators ...
export const operators: { [name: string]: Operator } = {
  $set: new SetOperator(),
  $push: new PushOperator(),
  $pull: new PullOperator(),
};
