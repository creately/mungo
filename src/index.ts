import { Operator, operators } from './operators';
import { Path, split } from './paths';

// IParameter
// IParameter ...
export interface IParameters {
  [field: string]: any;
}

// IModifier
// IModifier ...
export interface IModifier {
  [operatorName: string]: IParameters;
}

// modify
// modify ...
export function modify(doc: any, modifier: IModifier): boolean {
  const operations: { operator: Operator; path: Path; params: any }[] = [];
  for (let operatorName in modifier) {
    if (!modifier.hasOwnProperty(operatorName)) {
      continue;
    }
    const operator = operators[operatorName];
    if (!operator) {
      return false;
    }
    let operatorModifier = modifier[operatorName];
    for (let pathString in operatorModifier) {
      if (!operatorModifier.hasOwnProperty(pathString)) {
        continue;
      }
      const path = split(pathString);
      if (!path) {
        continue;
      }
      const params = operatorModifier[pathString];
      operations.push({ operator, path, params });
    }
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
