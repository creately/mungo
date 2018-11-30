import { Path, get, set, makep, parent } from '../paths';
import { DataType, getZero } from '../types';
import { Validator } from './validator';

/**
 * Operator
 * Operator is the base class all operators will extend.
 */
export abstract class Operator {
  /**
   * parentType
   * parentType defines the expected type of the field which
   * is available on the document as parent of path value.
   */
  public get parentType(): DataType {
    return DataType.any;
  }

  /**
   * valueType
   * valueType defines the expected type of the field which
   * is available on the document exactly at the path.
   */
  public get valueType(): DataType {
    return DataType.any;
  }

  /**
   * shouldPrepareParent
   * shouldPrepareParent indicates the parent value should be prepared.
   */
  public get shouldPrepareParent(): boolean {
    return true;
  }

  /**
   * shouldPrepareValue
   * shouldPrepareValue indicates the target value should be prepared.
   */
  public get shouldPrepareValue(): boolean {
    return true;
  }

  /**
   * operate
   * operate modifies the given document using given parameters.
   */
  public abstract operate(doc: any, path: Path, params: any): void;

  /**
   * validate
   * validate validates the document, path and modifier params.
   * It will return false if any of these validation rules fail.
   */
  public validate(doc: any, path: Path, _params: any): boolean {
    if (!Validator.checkPath(doc, path)) {
      return false;
    }
    if (!Validator.checkType(doc, parent(path), this.parentType)) {
      return false;
    }
    if (!Validator.checkType(doc, path, this.valueType)) {
      return false;
    }
    return true;
  }

  /**
   * prepare
   * prepare prepares the document before running the operator on it.
   * Example: makes sure the path up to created fields exists, etc.
   */
  public prepare(doc: any, path: Path, _params: any): void {
    if (this.shouldPrepareParent) {
      makep(doc, path);
    }
    if (this.shouldPrepareValue) {
      if (this.valueType === DataType.any) {
        return;
      }
      const currentValue = get(doc, path);
      if (currentValue) {
        return;
      }
      set(doc, path, getZero(this.valueType));
    }
  }
}
