import { testOperator } from './__testutils';

testOperator('Array Operators: $push', [
  // $push
  {
    document: {},
    modifier: { $push: {} },
    modified: null,
    inverted: {},
  },
  {
    document: {},
    modifier: { $push: { a: 10 } },
    modified: { a: [10]},
    inverted: {},
  },
  {
    document: { a: [] },
    modifier: { $push: { a: 10 } },
    modified: { a: [10] },
    inverted: {},
  },
  {
    document: { a: [0] },
    modifier: { $push: { a: 10 } },
    modified: { a: [0, 10] },
    inverted: {},
  },
  {
    document: { a: [1] },
    modifier: { $push: { a: 10 } },
    modified: { a: [1, 10] },
    inverted: {},
  },
  {
    document: { a: {} },
    modifier: { $push: { a: 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: null },
    modifier: { $push: { a: 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: {},
    modifier: { $push: { 'a.b': 10 } },
    modified: { a: { b: [10]}},
    inverted: {},
  },
  {
    document: { a: [] },
    modifier: { $push: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: [0] },
    modifier: { $push: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: [1] },
    modifier: { $push: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: {} },
    modifier: { $push: { 'a.b': 10 } },
    modified: { a: { b: [10]} },
    inverted: {},
  },
  {
    document: { a: null },
    modifier: { $push: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: { b: [] } },
    modifier: { $push: { 'a.b': 10 } },
    modified: { a: { b: [10] } },
    inverted: {},
  },
  {
    document: { a: { b: [0] } },
    modifier: { $push: { 'a.b': 10 } },
    modified: { a: { b: [0, 10] } },
    inverted: {},
  },
  {
    document: { a: { b: {} } },
    modifier: { $push: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: { b: null } },
    modifier: { $push: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
]);
