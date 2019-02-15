import { testOperator } from './__testutils';

testOperator('Field Operators: $set', [
  // $set
  {
    document: {},
    modifier: { $set: {} },
    modified: null,
    inverted: {},
  },
  {
    document: {},
    modifier: { $set: { a: 10 } },
    modified: { a: 10 },
    inverted: { $unset: { a: true } },
  },
  {
    document: { a: 0 },
    modifier: { $set: { a: 10 } },
    modified: { a: 10 },
    inverted: { $set: { a: 0 } },
  },
  {
    document: { a: 1 },
    modifier: { $set: { a: 10 } },
    modified: { a: 10 },
    inverted: { $set: { a: 1 } },
  },
  {
    document: {},
    modifier: { $set: { 'a.b': 10 } },
    modified: { a: { b: 10 } },
    inverted: { $unset: { 'a.b': true } },
  },
  {
    document: { a: {} },
    modifier: { $set: { 'a.b': 10 } },
    modified: { a: { b: 10 } },
    inverted: { $unset: { 'a.b': true } },
  },
  {
    document: { a: { b: 0 } },
    modifier: { $set: { 'a.b': 10 } },
    modified: { a: { b: 10 } },
    inverted: { $set: { 'a.b': 0 } },
  },
  {
    document: { a: { b: 1 } },
    modifier: { $set: { 'a.b': 10 } },
    modified: { a: { b: 10 } },
    inverted: { $set: { 'a.b': 1 } },
  },
  {
    document: { 'aa#dd': { b: 1 } },
    modifier: { $set: { 'aa#dd.b': 10 } },
    modified: { 'aa#dd': { b: 10 } },
    inverted: { $set: { 'aa#dd.b': 1 } },
  },
  {
    document: { 'aa-dd': { b: 1 } },
    modifier: { $set: { 'aa-dd.b': 10 } },
    modified: { 'aa-dd': { b: 10 } },
    inverted: { $set: { 'aa-dd.b': 1 } },
  },
  {
    document: { aa_dd: { b: 1 } },
    modifier: { $set: { 'aa_dd.b': 10 } },
    modified: { aa_dd: { b: 10 } },
    inverted: { $set: { 'aa_dd.b': 1 } },
  },
  {
    document: { 'aa:dd': { b: 1 } },
    modifier: { $set: { 'aa:dd.b': 10 } },
    modified: { 'aa:dd': { b: 10 } },
    inverted: { $set: { 'aa:dd.b': 1 } },
  },
  {
    document: { a: null },
    modifier: { $set: { 'a.b': 10 } },
    modified: null,
    inverted: null,
  },
]);
