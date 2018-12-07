import { Operator } from '../framework/operator';
import { DataType } from '../framework/typeutil';
import { Path, get, set, unset } from '../framework/pathutil';

/**
 * FieldOperator
 * FieldOperator is the base class for object operators.
 * These operators perform changes to a particular field.
 * The only requirement for these operators are that the
 * parent of of the given path should be an object.
 */
abstract class FieldOperator extends Operator {
  public get parentType(): DataType {
    return DataType.object;
  }
}

/**
 * $currentDate
 * https://docs.mongodb.com/manual/reference/operator/update/currentDate/
 */

/**
 * $inc
 * https://docs.mongodb.com/manual/reference/operator/update/inc/
 */

/**
 * $min
 * https://docs.mongodb.com/manual/reference/operator/update/min/
 */

/**
 * $max
 * https://docs.mongodb.com/manual/reference/operator/update/max/
 */

/**
 * $mul
 * https://docs.mongodb.com/manual/reference/operator/update/mul/
 */

/**
 * $rename
 * https://docs.mongodb.com/manual/reference/operator/update/rename/
 */

/**
 * $set
 * https://docs.mongodb.com/manual/reference/operator/update/set/
 */
class SetOperator extends FieldOperator {
  public operate(doc: any, path: Path, params: any): void {
    set(doc, path, params);
  }
  public invert(doc: any, path: Path, _params: any): any {
    const currentValue = get(doc, path);
    if (currentValue === undefined) {
      return { $unset: { [path.join('.')]: true } };
    }
    return { $set: { [path.join('.')]: currentValue } };
  }
}

/**
 * $setOnInsert
 * https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
 */
class SetOnInsertOperator extends SetOperator {
  // ...
}

/**
 * $unset
 * https://docs.mongodb.com/manual/reference/operator/update/unset/
 */
class UnSetOperator extends FieldOperator {
  public operate(doc: any, path: Path): void {
    unset(doc, path);
  }
  public invert(doc: any, path: Path, _params: any): any {
    const currentValue = get(doc, path);
    if (currentValue === undefined) {
      return {};
    }
    return { $set: { [path.join('.')]: currentValue } };
  }
}

/**
 * operators
 * operators is a map of operator names to operator class instances
 */
export const operators: { [name: string]: Operator } = {
  $set: new SetOperator(),
  $setOnInsert: new SetOnInsertOperator(),
  $unset: new UnSetOperator(),
};
