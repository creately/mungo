import { testOperator } from './__testutils';

testOperator('Array Operators: $pull', [
  {
    document: {},
    modifier: { $pull: {} },
    modified: null,
    inverted: {},
  },
  {
    document: {},
    modifier: { $pull: { a: 10 } },
    modified: {},
    inverted: {},
  },
  {
    document: { a: {} },
    modifier: { $pull: { a: 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: [] },
    modifier: { $pull: { a: 10 } },
    modified: { a: [] },
    inverted: {},
  },
  {
    document: { a: null },
    modifier: { $pull: { a: 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: 0 },
    modifier: { $pull: { a: 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: 1 },
    modifier: { $pull: { a: 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: 10 },
    modifier: { $pull: { a: 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: [10] },
    modifier: { $pull: { a: 10 } },
    modified: { a: [] },
    inverted: {},
  },
  {
    document: { a: [10, 20, 30] },
    modifier: { $pull: { a: 20 } },
    modified: { a: [10, 30] },
    inverted: {},
  },
  {
    document: {
      a: [
        { x: 30, y: 20 },
        { x: 30, y: 15 },
        { x: 35, y: 25 },
      ],
    },
    modifier: { $pull: { a: { x: 30 } } },
    modified: { a: [{ x: 35, y: 25 }] },
    inverted: {},
  },
  {
    document: {},
    modifier: { $pull: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: [] },
    modifier: { $pull: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: [0] },
    modifier: { $pull: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: [1] },
    modifier: { $pull: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: [10] },
    modifier: { $pull: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: {} },
    modifier: { $pull: { 'a.b': 10 } },
    modified: { a: {} },
    inverted: {},
  },
  {
    document: { a: null },
    modifier: { $pull: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: { b: [] } },
    modifier: { $pull: { 'a.b': 10 } },
    modified: { a: { b: [] } },
    inverted: {},
  },
  {
    document: { a: { b: [0] } },
    modifier: { $pull: { 'a.b': 10 } },
    modified: { a: { b: [0] } },
    inverted: {},
  },
  {
    document: { a: { b: [10] } },
    modifier: { $pull: { 'a.b': 10 } },
    modified: { a: { b: [] } },
    inverted: {},
  },
  {
    document: { a: { b: {} } },
    modifier: { $pull: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
  {
    document: { a: { b: null } },
    modifier: { $pull: { 'a.b': 10 } },
    modified: null,
    inverted: {},
  },
]);
