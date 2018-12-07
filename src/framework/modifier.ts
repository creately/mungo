import { Path, split } from './pathutil';
import { Operator } from "./operator";
import { operators } from '../operators';

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

// IOperation
// IOperation ...
export interface IOperation {
  operator: Operator;
  path: Path;
  params: any;
}

// getOperations
// getOperations ...
export function getOperations( modifier: IModifier ): IOperation[] | null {
  const operations: { operator: Operator; path: Path; params: any }[] = [];
  for (const operatorName in modifier) {
    if (!modifier.hasOwnProperty(operatorName)) {
      continue;
    }
    const operator = operators[operatorName];
    if (!operator) {
      return null;
    }
    const operatorModifier = modifier[operatorName];
    let operatorHasChange = false;
    for (const pathString in operatorModifier) {
      if (!operatorModifier.hasOwnProperty(pathString)) {
        continue;
      }
      const path = split(pathString);
      if (!path) {
        continue;
      }
      const params = operatorModifier[pathString];
      operations.push({ operator, path, params });
      operatorHasChange = true;
    }
    if (!operatorHasChange) {
      return null;
    }
  }
  return operations;
}
