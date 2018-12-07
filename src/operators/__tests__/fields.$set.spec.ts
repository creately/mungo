import { testOperator } from './__testutils';

testOperator('Field Operators: $set', [
  // $set
  {
    document: {},
    modifier: { $set: {} },
  },
  {
    document: {},
    modifier: { $set: { a: 10 } },
  },
  {
    document: { a: 0 },
    modifier: { $set: { a: 10 } },
  },
  {
    document: { a: 1 },
    modifier: { $set: { a: 10 } },
  },
  {
    document: {},
    modifier: { $set: { 'a.b': 10 } },
  },
  {
    document: { a: {} },
    modifier: { $set: { 'a.b': 10 } },
  },
  {
    document: { a: { b: 0 } },
    modifier: { $set: { 'a.b': 10 } },
  },
  {
    document: { a: { b: 1 } },
    modifier: { $set: { 'a.b': 10 } },
  },
  {
    document: { a: null },
    modifier: { $set: { 'a.b': 10 } },
  },
]);
