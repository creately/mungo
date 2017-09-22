import { Operator } from './operator';
import { DataType } from '../types';
import { Path } from '../paths';

// FieldOperator
// FieldOperator is the base class for object operators.
// These operators perform changes to a particular field.
// The only requirement for these operators are that the
// parent of of the given path should be an object.
export abstract class FieldOperator extends Operator {
  // parentType
  protected get parentType(): DataType {
    return DataType.object;
  }
}

// $currentDate
// https://docs.mongodb.com/manual/reference/operator/update/currentDate/
// operators.$currentDate = {}

// $inc
// https://docs.mongodb.com/manual/reference/operator/update/inc/
// operators.$inc = {}

// $min
// https://docs.mongodb.com/manual/reference/operator/update/min/
// operators.$min = {}

// $max
// https://docs.mongodb.com/manual/reference/operator/update/max/
// operators.$max = {}

// $mul
// https://docs.mongodb.com/manual/reference/operator/update/mul/
// operators.$mul = {}

// $rename
// https://docs.mongodb.com/manual/reference/operator/update/rename/

// $set
// https://docs.mongodb.com/manual/reference/operator/update/set/
export class SetOperator extends FieldOperator {
  public operate(doc: any, path: Path, params: any): void {
    this.setValueAtPath(doc, path, params);
  }
}

// $setOnInsert
// https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/

// $unset
// https://docs.mongodb.com/manual/reference/operator/update/unset/

// operators
// operators is a map of operator names to operator class instances
export const operators: { [name: string]: Operator } = {
  $set: new SetOperator(),
};
