import { split, check, makep, get, set, parent, unset } from '../pathutil';

describe('split', () => {
  const cases: any[] = [
    // invalid input
    { str: undefined, out: null },
    { str: null, out: null },
    { str: 0, out: null },
    { str: 1, out: null },
    { str: {}, out: null },
    { str: [], out: null },
    // { str: 'a b', out: null },
    // { str: 'a.b c', out: null },
    // { str: 'a. b.c', out: null },
    // { str: 'a.[0]', out: null },

    // single level
    { str: '', out: [] },
    { str: 'a', out: ['a'] },
    { str: 'aa', out: ['aa'] },
    { str: 'a1', out: ['a1'] },
    { str: '1a', out: ['1a'] },
    { str: '[1]', out: [1] },
    { str: '["a"]', out: ['a'] },
    { str: "['a']", out: ['a'] },
    { str: '["a-b"]', out: ['a-b'] },
    { str: '["a.b"]', out: ['a.b'] },

    // two segments
    { str: 'a.b', out: ['a', 'b'] },
    { str: 'aa.b', out: ['aa', 'b'] },
    { str: 'a.bb', out: ['a', 'bb'] },
    { str: 'a[1]', out: ['a', 1] },
    { str: '[1].a', out: [1, 'a'] },

    // three segments
    { str: 'a.b.c', out: ['a', 'b', 'c'] },
    { str: '[1].a.b', out: [1, 'a', 'b'] },
    { str: 'a[1].b', out: ['a', 1, 'b'] },
    { str: 'a.b[1]', out: ['a', 'b', 1] },
  ];

  cases.forEach(({ str, out }) => {
    it(`should return '${JSON.stringify(out)}' if input is '${str}'`, () => {
      expect(split(str)).toEqual(out);
    });
  });
});

describe('check', () => {
  const cases: any[] = [
    // empty path
    { out: true, doc: undefined, path: [] },
    { out: true, doc: null, path: [] },
    { out: true, doc: 0, path: [] },
    { out: true, doc: 1, path: [] },
    { out: true, doc: {}, path: [] },
    { out: true, doc: [], path: [] },
    { out: true, doc: '', path: [] },

    // empty document (object)
    { out: true, doc: {}, path: [] },
    { out: true, doc: {}, path: ['a'] },
    { out: true, doc: {}, path: ['a', 'b'] },
    { out: true, doc: {}, path: ['a', 1] },
    { out: false, doc: {}, path: [1] },
    { out: false, doc: {}, path: [1, 'a'] },

    // empty document (array)
    { out: true, doc: [], path: [] },
    { out: true, doc: [], path: [1] },
    { out: true, doc: [], path: [1, 2] },
    { out: true, doc: [], path: [1, 'a'] },
    { out: false, doc: [], path: ['a'] },
    { out: false, doc: [], path: ['a', 1] },

    // documents starting with an object
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: [] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['a'] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['b'] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['c'] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['e'] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['x'] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['c', 'd'] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['c', 'x'] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['c', 'x', 'y'] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['e', 0] },
    { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['e', 99] },
    { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['a', 'x'] },
    { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['a', 1] },
    { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['b', 'x'] },
    { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['b', 1] },
    { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['c', 1] },
    { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: ['e'] }, path: ['e', 'x'] },

    // documents starting with an array
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [0] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [1] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [99] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [0, 'a'] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [0, 'b'] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [0, 'x'] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [1, 0] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [1, 1] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [1, 99] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [99, 'x'] },
    { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], path: [99, 99] },

    // invalid parameters
    { out: false, doc: {}, path: undefined },
    { out: false, doc: {}, path: null },
    { out: false, doc: {}, path: 0 },
    { out: false, doc: {}, path: 1 },
    { out: false, doc: {}, path: [null] },
  ];

  cases.forEach(({ doc, out, path }) => {
    it(`should return '${JSON.stringify(out)}' if input is '${JSON.stringify(path)}'`, () => {
      expect(check(doc, path)).toEqual(out);
    });
  });
});

describe('makep', () => {
  const cases: any[] = [
    // empty path
    { doc: {}, path: [], exp: {} },
    { doc: [], path: [], exp: [] },

    // empty input object
    { doc: {}, path: ['a'], exp: {} },
    { doc: {}, path: ['a', 'b'], exp: { a: {} } },
    { doc: {}, path: ['a', 0], exp: { a: [] } },

    // empty input array
    { doc: [], path: [0], exp: [] },
    { doc: [], path: [1], exp: [] },
    { doc: [], path: [0, 1], exp: [[]] },
    { doc: [], path: [0, 'a'], exp: [{}] },

    // path to existing fields
    { doc: { a: {}, b: [] }, path: ['a'], exp: { a: {}, b: [] } },
    { doc: { a: {}, b: [] }, path: ['b'], exp: { a: {}, b: [] } },
    { doc: { a: {}, b: [] }, path: ['x'], exp: { a: {}, b: [] } },
    { doc: { a: {}, b: [] }, path: ['a', 'x'], exp: { a: {}, b: [] } },
    { doc: { a: {}, b: [] }, path: ['b', 0], exp: { a: {}, b: [] } },
    { doc: { a: {}, b: [] }, path: ['x', 'y'], exp: { a: {}, b: [], x: {} } },
    { doc: { a: {}, b: [] }, path: ['x', 'y', 'z'], exp: { a: {}, b: [], x: { y: {} } } },
    { doc: { a: {}, b: [] }, path: ['x', 0], exp: { a: {}, b: [], x: [] } },
    { doc: { a: {}, b: [] }, path: ['x', 0, 1], exp: { a: {}, b: [], x: [[]] } },
  ];

  cases.forEach(({ doc, path, exp }) => {
    it(`should change the document to '${JSON.stringify(exp)}' if input is '${JSON.stringify(doc)}'`, () => {
      makep(doc, path);
      expect(doc).toEqual(exp);
    });
  });

  it('should throw an error if the path is invalid', () => {
    expect(() => makep({}, ['a', null] as any)).toThrow();
  });
});

describe('get', () => {
  const cases: any[] = [
    // empty path
    { doc: {}, path: [], exp: {} },

    // path to existing field
    { doc: { a: 1 }, path: ['a'], exp: 1 },
    { doc: { a: { b: 1 } }, path: ['a', 'b'], exp: 1 },
    { doc: [1], path: [0], exp: 1 },
    { doc: [[1]], path: [0, 0], exp: 1 },

    // path to missing field
    { doc: {}, path: ['a'], exp: undefined },
    { doc: {}, path: ['a', 'b'], exp: undefined },
    { doc: [], path: [0], exp: undefined },
    { doc: [], path: [0, 1], exp: undefined },
  ];

  cases.forEach(({ doc, path, exp }) => {
    it(`should return "${exp}" if the document is ${JSON.stringify(doc)} and path is "${JSON.stringify(path)}"`, () => {
      expect(get(doc, path)).toEqual(exp);
    });
  });
});

describe('set', () => {
  const cases: any[] = [
    { doc: {}, path: ['a'], val: 'v', exp: { a: 'v' } },
    { doc: [], path: [0], val: 'v', exp: ['v'] },
  ];

  cases.forEach(({ doc, path, val, exp }) => {
    it(`should return "${exp}" if the document is ${JSON.stringify(doc)} and path is "${JSON.stringify(path)}"`, () => {
      set(doc, path, val);
      expect(doc).toEqual(exp);
    });
  });
});

describe('unset', () => {
  const cases: any[] = [
    { doc: { a: 1, b: { c: '1', d: '2' } }, path: ['b', 'c'], exp: { a: 1, b: { d: '2' } } },
    { doc: { a: 1, b: '1' }, path: ['b'], exp: { a: 1 } },
    { doc: { a: 1 }, path: ['a'], exp: {} },
  ];

  cases.forEach(({ doc, path, exp }) => {
    it(`should return "${exp}" if the document is ${JSON.stringify(doc)} and path is "${JSON.stringify(path)}"`, () => {
      unset(doc, path);
      expect(doc).toEqual(exp);
    });
  });
});

describe('parent', () => {
  const cases: any[] = [{ path: [], exp: [] }];

  cases.forEach(({ path, exp }) => {
    it(`should return "${JSON.stringify(exp)}" for ${JSON.stringify(path)}`, () => {
      expect(parent(path)).toEqual(exp);
    });
  });
});
