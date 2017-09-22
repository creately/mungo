import mingo from 'mingo';
import { Operator } from './operator';
import { DataType, getType } from '../types';
import { Path, fetch } from '../paths';

// ArrayOperator
// ArrayOperator is the base class for array operators.
// These operators expects an array on the document at
// given path. Some of these operators will create an
// array at the path if it's not already available.
export abstract class ArrayOperator extends Operator {
  protected get valueType(): DataType {
    return DataType.array;
  }
}

// ArrayElementRemovingOperator
// ArrayElementRemovingOperator is a base class for operators which
// remove elements from arrays available in existing arrays. These
// operators will not add an array at expected position if it's not
// there. And validation will fail if a value exists in the document
// at given path which is not an array.
export abstract class ArrayElementRemovingOperator extends ArrayOperator {
  // prepareValue
  // prepareValue usually prepares the value but for these operators
  // it should not do it. Override the method and do nothing inside it.
  protected prepareValue(_doc: any, _path: Path): void {
    // Do not prepare value!
  }
}

// $addToSet
// https://docs.mongodb.com/manual/reference/operator/update/addToSet/

// $pop
// https://docs.mongodb.com/manual/reference/operator/update/pop/

// $pull
// https://docs.mongodb.com/manual/reference/operator/update/pull/
export class PullOperator extends ArrayElementRemovingOperator {
  public operate(doc: any, path: Path, params: any): void {
    const array = fetch(doc, path);
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
}

// $pullAll
// https://docs.mongodb.com/manual/reference/operator/update/pullAll/

// $push
// https://docs.mongodb.com/manual/reference/operator/update/push/
export class PushOperator extends ArrayOperator {
  public operate(doc: any, path: Path, params: any): void {
    const array = fetch(doc, path);
    array.push(params);
  }
}

// $pushAll
// https://docs.mongodb.com/manual/reference/operator/update/pushAll/

// operators
// operators is a map of operator names to operator class instances
export const operators: { [name: string]: Operator } = {
  $pull: new PullOperator(),
  $push: new PushOperator(),
};
