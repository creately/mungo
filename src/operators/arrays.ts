import * as mingo from 'mingo';
import { Operator } from '../framework/operator';
import { DataType, getType } from '../framework/typeutil';
import { Path, get } from '../framework/pathutil';

/**
 * ArrayOperator
 * ArrayOperator is the base class for array operators.
 * These operators expects an array on the document at
 * given path. Some of these operators will create an
 * array at the path if it's not already available.
 */
abstract class ArrayOperator extends Operator {
  public get valueType(): DataType {
    return DataType.array;
  }
}

/**
 * ArrayElementRemovingOperator
 * ArrayElementRemovingOperator is a base class for operators which
 * remove elements from arrays available in existing arrays. These
 * operators will not add an array at expected position if it's not
 * there. And validation will fail if a value exists in the document
 * at given path which is not an array.
 */
abstract class ArrayElementRemovingOperator extends ArrayOperator {
  public get shouldPrepareParent(): boolean {
    return false;
  }
  public get shouldPrepareValue(): boolean {
    return false;
  }
}

/**
 * $addToSet
 * https://docs.mongodb.com/manual/reference/operator/update/addToSet/
 */

/**
 * $pop
 * https://docs.mongodb.com/manual/reference/operator/update/pop/
 */

/**
 * $pull
 * https://docs.mongodb.com/manual/reference/operator/update/pull/
 */
class PullOperator extends ArrayElementRemovingOperator {
  public operate(doc: any, path: Path, params: any): void {
    const array = get(doc, path);
    if (!array) {
      return;
    }
    for (let i = 0; i < array.length; ++i) {
      if (getType(params) === DataType.object) {
        const mq = new mingo.Query(params);
        for (let i = 0; i < array.length; ++i) {
          if (mq.test(array[i])) {
            array.splice(i, 1);
            --i;
          }
        }
      } else if (array[i] === params) {
        array.splice(i, 1);
        --i;
      }
    }
  }
  public invert(_doc: any, _path: Path, _params: any): any {
    // FIXME: implement inverting the pull operator
    return {};
  }
}

/**
 * $pullAll
 * https://docs.mongodb.com/manual/reference/operator/update/pullAll/
 */

/**
 * $push
 * https://docs.mongodb.com/manual/reference/operator/update/push/
 */
class PushOperator extends ArrayOperator {
  public operate(doc: any, path: Path, params: any): void {
    const array = get(doc, path);
    array.push(params);
  }
  public invert(_doc: any, _path: Path, _params: any): any {
    // FIXME: implement inverting the pull operator
    return {};
  }
}

/**
 * $pushAll
 * https://docs.mongodb.com/manual/reference/operator/update/pushAll/
 */

/**
 * operators
 * operators is a map of operator names to operator class instances
 */
export const operators: { [name: string]: Operator } = {
  $pull: new PullOperator(),
  $push: new PushOperator(),
};
