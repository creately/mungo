// DataType
// DataType is a custom data type enum which can be used
// instead of default data types in javascript. It can be
// to used specify required types, validate and to get zero
// values. It can be used with getType and getZero functions.
export enum DataType {
  any,
  array,
  object,
  number,
  string,
  boolean,
}

// getType
// getType identifies the data type of given value. Returns null
// if it was unable to identify the type. Never returns 'any' type.
export function getType(val: any) {
  if (Array.isArray(val)) {
    return DataType.array;
  }
  if (typeof val === 'object' && val !== null) {
    return DataType.object;
  }
  if (typeof val === 'number') {
    return DataType.number;
  }
  if (typeof val === 'string') {
    return DataType.string;
  }
  if (typeof val === 'boolean') {
    return DataType.boolean;
  }
  return DataType.any;
}

// getZero
// getZero returns the zero value of given type. Returns null
// if the type is not valid or for the 'any' data type.
export function getZero(type: DataType): any {
  if (type === DataType.array) {
    return [];
  }
  if (type === DataType.object) {
    return {};
  }
  if (type === DataType.number) {
    return 0;
  }
  if (type === DataType.string) {
    return '';
  }
  if (type === DataType.boolean) {
    return false;
  }
  return null;
}
