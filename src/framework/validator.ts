import { Path, check, get } from './pathutil';
import { DataType, getType } from './typeutil';

/**
 * Validator
 * Validator class contains methods to validate values in the document.
 * It will be used by the base Operator class and other operator classes.
 */
export class Validator {
  /**
   * checkPath
   * checkPath checks whether the given path is valid for given document.
   */
  public static checkPath(doc: any, path: Path): boolean {
    return check(doc, path);
  }

  /**
   * checkType
   * checkType checks whether the value at given path matches given type.
   */
  public static checkType(doc: any, path: Path, type: DataType): boolean {
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
}
