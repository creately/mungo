import { Operator } from './operator';
import { DataType } from '../types';
import { Path } from '../paths';

// FieldOperator
// FieldOperator is the base class for array operators
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
// operators.$rename = {}

// $set
// https://docs.mongodb.com/manual/reference/operator/update/set/
export class SetOperator extends FieldOperator {
  // operate
  public operate(doc: any, path: Path, params: any): void {
    this.setValueAtPath(doc, path, params);
  }
}

// $setOnInsert
// https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
// operators.$setOnInsert = {}

// $unset
// https://docs.mongodb.com/manual/reference/operator/update/unset/
// operators.$unset = {}
