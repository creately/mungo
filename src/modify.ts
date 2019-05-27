import { IModifier, getOperations } from './framework/modifier';

// modify
// modify ...
export function modify(doc: any, modifier: IModifier): boolean {
  const operations = getOperations(modifier);
  if (!operations) {
    return false;
  }
  for (let i = 0, l = operations.length; i < l; ++i) {
    const operation = operations[i];
    if (!operation.operator.validate(doc, operation.path, operation.params)) {
      return false;
    }
  }
  for (let i = 0, l = operations.length; i < l; ++i) {
    const operation = operations[i];
    operation.operator.prepare(doc, operation.path, operation.params);
    operation.operator.operate(doc, operation.path, operation.params);
  }
  return true;
}
