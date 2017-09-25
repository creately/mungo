import { Path, check, get, set, makep, parent } from '../paths';
import { DataType, getType, getZero } from '../types';

// Operator
// Operator is the base class all operators will extend.
export abstract class Operator {
  // parentType
  // parentType defines the expected type of the field which
  // is available on the document as parent of path value.
  protected get parentType(): DataType {
    return DataType.any;
  }

  // valueType
  // valueType defines the expected type of the field which
  // is available on the document exactly at the path.
  protected get valueType(): DataType {
    return DataType.any;
  }

  // validate
  // validate validates the document, path and modifier params.
  // It will return false if any of these validation fails.
  public validate(doc: any, path: Path, params: any): boolean {
    if (!this.validatePath(doc, path)) {
      return false;
    }
    if (!this.validateParams(doc, path, params)) {
      return false;
    }
    if (!this.validateParent(doc, path)) {
      return false;
    }
    if (!this.validateValue(doc, path)) {
      return false;
    }
    return true;
  }

  // prepare
  // prepare prepares the document before running the operator on it.
  // Example: makes sure the path up to created fields exists, etc.
  public prepare(doc: any, path: Path, _params: any): void {
    this.prepareParent(doc, path);
    this.prepareValue(doc, path);
  }

  // operate
  // operate performs the primary function of the operator.
  public abstract operate(doc: any, path: Path, params: any): void;

  // validatePath
  protected validatePath(doc: any, path: Path): boolean {
    return check(doc, path);
  }

  // validateParams
  protected validateParams(_doc: any, _path: Path, _params: any): boolean {
    return true;
  }

  // validateParent
  protected validateParent(doc: any, path: Path): boolean {
    return this.validateTypeAtPath(doc, parent(path), this.parentType);
  }

  // validateValue
  protected validateValue(doc: any, path: Path): boolean {
    return this.validateTypeAtPath(doc, path, this.valueType);
  }

  // isValidTypeAtPath
  protected validateTypeAtPath(doc: any, path: Path, type: DataType): boolean {
    if (type === DataType.any) {
      return true;
    }
    const value = get(doc, path);
    if (value === undefined) {
      return true;
    }
    if (type === getType(value)) {
      return true;
    }
    return false;
  }

  // prepareParent
  protected prepareParent(doc: any, path: Path): void {
    makep(doc, path);
  }

  // prepareValue
  protected prepareValue(doc: any, path: Path): void {
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
