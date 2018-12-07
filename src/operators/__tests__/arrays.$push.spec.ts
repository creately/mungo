import { testOperator } from './__testutils';

testOperator('Array Operators: $push', [
  // $push
  {
    document: {},
    modifier: { $push: {} },
  },
  {
    document: {},
    modifier: { $push: { a: 10 } },
  },
  {
    document: { a: [] },
    modifier: { $push: { a: 10 } },
  },
  {
    document: { a: [0] },
    modifier: { $push: { a: 10 } },
  },
  {
    document: { a: [1] },
    modifier: { $push: { a: 10 } },
  },
  {
    document: { a: {} },
    modifier: { $push: { a: 10 } },
  },
  {
    document: { a: null },
    modifier: { $push: { a: 10 } },
  },
  {
    document: {},
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: [] },
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: [0] },
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: [1] },
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: {} },
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: null },
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: { b: [] } },
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: { b: [0] } },
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: { b: {} } },
    modifier: { $push: { 'a.b': 10 } },
  },
  {
    document: { a: { b: null } },
    modifier: { $push: { 'a.b': 10 } },
  },
]);
