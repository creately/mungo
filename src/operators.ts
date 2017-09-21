import mingo from 'mingo';
import { Path, check, fetch, makep, isObject } from './paths';
import { DataType, getType, getZero } from './types';

// Operator
// Operator is the base class all operators will extend.
export abstract class Operator {
    // validate
    public validate( doc: any, path: Path, params: any ): boolean {
        if (!this.validatePath( doc, path )) {
            return false;
        }
        if (!this.validateParams( doc, path, params )) {
            return false;
        }
        if (!this.validateParent( doc, path )) {
            return false;
        }
        if (!this.validateValue( doc, path )) {
            return false;
        }
        return true;
    }

    // prepare
    public prepare( doc: any, path: Path, _params: any ): void {
        this.prepareParent( doc, path );
        this.prepareValue( doc, path );
    }

    // operate
    public abstract operate( doc: any, path: Path, params: any ): void;

    // parentType
    protected get parentType(): DataType {
        return DataType.any;
    }

    // valueType
    protected get valueType(): DataType {
        return DataType.any;
    }

    // getParentPath
    protected getParentPath( path: Path ): Path {
        return path.slice(0, path.length - 1);
    }

    // getValueAtPath
    protected getValueAtPath( doc: any, path: Path ): any {
        return fetch(doc, path);
    }

    // setValueAtPath
    protected setValueAtPath( doc: any, path: Path, val: any ): void {
        const parent = fetch(doc, this.getParentPath( path ));
        const lastSegment = path[path.length - 1];
        parent[lastSegment] = val;
    }

    // unsetValueAtPath
    protected unsetValueAtPath( doc: any, path: Path ): void {
        const parent = fetch(doc, this.getParentPath( path ));
        const lastSegment = path[path.length - 1];
        delete parent[lastSegment];
    }

    // validatePath
    protected validatePath( doc: any, path: Path ): boolean {
        return check(doc, path);
    }

    // validateParams
    protected validateParams( _doc: any, _path: Path, _params: any ): boolean {
        return true;
    }

    // validateParent
    protected validateParent( doc: any, path: Path ): boolean {
        return this.validateTypeAtPath( doc, this.getParentPath( path ), this.parentType );
    }

    // validateValue
    protected validateValue( doc: any, path: Path ): boolean {
        return this.validateTypeAtPath( doc, path, this.valueType );
    }

    // isValidTypeAtPath
    protected validateTypeAtPath( doc: any, path: Path, type: DataType ): boolean {
        if (type === DataType.any) {
            return true;
        }
        const value = fetch(doc, path);
        if (value === undefined) {
            return true;
        }
        if (type === getType(value)) {
            return true;
        }
        return false;
    }

    // prepareParent
    protected prepareParent( doc: any, path: Path ): void {
        makep(doc, path);
    }

    // prepareValue
    protected prepareValue( doc: any, path: Path ): void {
        if (this.valueType === DataType.any) {
            return;
        }
        const currentValue = fetch(doc, path);
        if (currentValue) {
            return;
        }
        this.setValueAtPath( doc, path, getZero(this.valueType));
    }
}

// FieldOperator
// FieldOperator is the base class for array operators
export abstract class FieldOperator extends Operator {
    // parentType
    protected get parentType(): DataType {
        return DataType.object;
    }
}

// ArrayOperator
// ArrayOperator is the base class for array operators
export abstract class ArrayOperator extends Operator {
    // valueType
    protected get valueType(): DataType {
        return DataType.array;
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
        this.setValueAtPath( doc, path, params);
    }
}

// $setOnInsert
// https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
// operators.$setOnInsert = {}

// $unset
// https://docs.mongodb.com/manual/reference/operator/update/unset/
// operators.$unset = {}

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
        const array = this.getValueAtPath( doc, path );
        if (!array) {
            return;
        }
        for (let i = 0; i < array.length; ++i) {
            if (isObject(params)) {
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
    protected prepareValue( _doc: any, _path: Path ): void {
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
        const array = this.getValueAtPath( doc, path );
        array.push(params);
    }
}

// $pullAll
// https://docs.mongodb.com/manual/reference/operator/update/pullAll/
// operators.$pullAll = {}

// operators
// operators ...
export const operators: { [ name: string ]: Operator } = {
    $set: new SetOperator(),
    $push: new PushOperator(),
    $pull: new PullOperator(),
};