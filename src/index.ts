// IParameter
// IParameter ...
export interface IParameters {
  [ field: string ]: any;
}

// IModifier
// IModifier ...
export interface IModifiers {
  [ operatorName: string ]: IParameters;
}

// IOperator
// IOperator is a javascript implementation of a Mongo like
// document modifier. Operators are applied alphabetically
// and for each field one at a time.
export interface IOperator {
  // validate
  // validate checks whether the operator can be applied.
  validate(doc: any, path: string, params: any): boolean;

  // prepare
  // prepare makes any changes required before applying.
  // This function may change the document if needed.
  // This function should not throw any errors.
  // example: makes sure the path to the field is available.
  prepare(doc: any, path: string, params: any): void;

  // operate
  // operate applies the operator to the document with given
  // parameters. This function should not throw any errors.
  operate(doc: any, path: string, params: any): void;
};

// IOperatorsMap
// IOperatorsMap contains a map of all available operators.
export interface IOperatorsMap {
  [ operatorName: string ]: IOperator;
}

// operators
// operators contains all operators implemented in the module.
export const operators: IOperatorsMap = {};

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
// operators.$set = {}

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
// operators.$pull = {}

// $pushAll
// https://docs.mongodb.com/manual/reference/operator/update/pushAll/
// operators.$pushAll = {}

// $push
// https://docs.mongodb.com/manual/reference/operator/update/push/
// operators.$push = {}

// $pullAll
// https://docs.mongodb.com/manual/reference/operator/update/pullAll/
// operators.$pullAll = {}
