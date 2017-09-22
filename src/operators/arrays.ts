import mingo from 'mingo';
import { Operator } from './operator';
import { DataType, getType } from '../types';
import { Path } from '../paths';

// ArrayOperator
// ArrayOperator is the base class for array operators
export abstract class ArrayOperator extends Operator {
  // valueType
  protected get valueType(): DataType {
    return DataType.array;
  }
}

// $addToSet
// https://docs.mongodb.com/manual/reference/operator/update/addToSet/
// operators.$addToSet = {}

// $pop
// https://docs.mongodb.com/manual/reference/operator/update/pop/
// operators.$pop = {}

// $pull
// https://docs.mongodb.com/manual/reference/operator/update/pull/
export class PullOperator extends ArrayOperator {
  // operate
  public operate(doc: any, path: Path, params: any): void {
    const array = this.getValueAtPath(doc, path);
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

  // prepareValue
  protected prepareValue(_doc: any, _path: Path): void {
    // Do not prepare parent!
  }
}

// $pushAll
// https://docs.mongodb.com/manual/reference/operator/update/pushAll/
// operators.$pushAll = {}

// $push
// https://docs.mongodb.com/manual/reference/operator/update/push/
export class PushOperator extends ArrayOperator {
  // operate
  public operate(doc: any, path: Path, params: any): void {
    const array = this.getValueAtPath(doc, path);
    array.push(params);
  }
}

// $pullAll
// https://docs.mongodb.com/manual/reference/operator/update/pullAll/
// operators.$pullAll = {}
