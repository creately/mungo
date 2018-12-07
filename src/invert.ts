import { IModifier, getOperations } from './framework/modifier';

/**
 * invert will use the original document and it will generate a
 * modifier which will invert changes done by the given modifier.
 */
export function invert(doc: any, modifier: IModifier): IModifier | null {
  const inverted: IModifier = {};
  const operations = getOperations( modifier );
  if (!operations) {
    return null;
  }
  for (let i = 0, l = operations.length; i < l; ++i) {
    const operation = operations[i];
    if (!operation.operator.validate(doc, operation.path, operation.params)) {
      return null;
    }
  }
  for (let i = 0, l = operations.length; i < l; ++i) {
    const operation = operations[i];
    const invertedOp = operation.operator.invert(doc, operation.path, operation.params);
    for ( const key in invertedOp ) {
      if ( !( key in inverted )) {
        inverted[key] = {};
      }
      Object.assign( inverted[key], invertedOp[key] );
    }
  }
  return inverted;
}
