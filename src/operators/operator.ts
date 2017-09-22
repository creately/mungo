import { Path, check, fetch, makep } from '../paths';
import { DataType, getType, getZero } from '../types';

// Operator
// Operator is the base class all operators will extend.
export abstract class Operator {
  // validate
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
  public prepare(doc: any, path: Path, _params: any): void {
    this.prepareParent(doc, path);
    this.prepareValue(doc, path);
  }

  // operate
  public abstract operate(doc: any, path: Path, params: any): void;

  // parentType
  protected get parentType(): DataType {
    return DataType.any;
  }

  // valueType
  protected get valueType(): DataType {
    return DataType.any;
  }

  // getParentPath
  protected getParentPath(path: Path): Path {
    return path.slice(0, path.length - 1);
  }

  // getValueAtPath
  protected getValueAtPath(doc: any, path: Path): any {
    return fetch(doc, path);
  }

  // setValueAtPath
  protected setValueAtPath(doc: any, path: Path, val: any): void {
    const parent = fetch(doc, this.getParentPath(path));
    const lastSegment = path[path.length - 1];
    parent[lastSegment] = val;
  }

  // unsetValueAtPath
  protected unsetValueAtPath(doc: any, path: Path): void {
    const parent = fetch(doc, this.getParentPath(path));
    const lastSegment = path[path.length - 1];
    delete parent[lastSegment];
  }

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
    return this.validateTypeAtPath(doc, this.getParentPath(path), this.parentType);
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
  protected prepareParent(doc: any, path: Path): void {
    makep(doc, path);
  }

  // prepareValue
  protected prepareValue(doc: any, path: Path): void {
    if (this.valueType === DataType.any) {
      return;
    }
    const currentValue = fetch(doc, path);
    if (currentValue) {
      return;
    }
    this.setValueAtPath(doc, path, getZero(this.valueType));
  }
}
