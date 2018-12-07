import { testOperator } from './__testutils';

testOperator('Array Operators: $pull', [
  {
    document: {},
    modifier: { $pull: {} },
  },
  {
    document: {},
    modifier: { $pull: { a: 10 } },
  },
  {
    document: { a: {} },
    modifier: { $pull: { a: 10 } },
  },
  {
    document: { a: [] },
    modifier: { $pull: { a: 10 } },
  },
  {
    document: { a: null },
    modifier: { $pull: { a: 10 } },
  },
  {
    document: { a: 0 },
    modifier: { $pull: { a: 10 } },
  },
  {
    document: { a: 1 },
    modifier: { $pull: { a: 10 } },
  },
  {
    document: { a: 10 },
    modifier: { $pull: { a: 10 } },
  },
  {
    document: { a: [10] },
    modifier: { $pull: { a: 10 } },
  },
  {
    document: { a: [10, 20, 30] },
    modifier: { $pull: { a: 20 } },
  },
  {
    document: { a: [{ x: 30, y: 20 }, { x: 30, y: 15 }, { x: 35, y: 25 }] },
    modifier: { $pull: { a: { x: 30 } } },
  },
  {
    document: {},
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: [] },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: [0] },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: [1] },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: [10] },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: {} },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: null },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: { b: [] } },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: { b: [0] } },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: { b: [10] } },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: { b: {} } },
    modifier: { $pull: { 'a.b': 10 } },
  },
  {
    document: { a: { b: null } },
    modifier: { $pull: { 'a.b': 10 } },
  },
]);
