import { split, check } from '../paths';

describe( 'split', () => {
    const cases: any[] = [
        // invalid input
        { str: undefined, out: null },
        { str: null, out: null },
        { str: 0, out: null },
        { str: 1, out: null },
        { str: {}, out: null },
        { str: [], out: null },
        { str: 'a b', out: null },
        { str: 'a.b c', out: null },
        { str: 'a. b.c', out: null },
        { str: 'a.[0]', out: null },

        // single level
        { str: '', out: [] },
        { str: 'a', out: ['a'] },
        { str: 'aa', out: ['aa'] },
        { str: 'a1', out: ['a1'] },
        { str: '1a', out: ['1a'] },
        { str: '[1]', out: [1] },
        { str: '["a"]', out: ['a'] },
        { str: '[\'a\']', out: ['a'] },
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
    ]

    cases.forEach(c => {
        it(`should return '${JSON.stringify(c.out)}' if input is '${c.str}'`, () => {
            expect(split(c.str)).toEqual(c.out);
        });
    });
});

describe( 'check', () => {
    const cases: any[] = [
        // empty segments
        { out: true, doc: undefined, segments: [] },
        { out: true, doc: null, segments: [] },
        { out: true, doc: 0, segments: [] },
        { out: true, doc: 1, segments: [] },
        { out: true, doc: {}, segments: [] },
        { out: true, doc: [], segments: [] },
        { out: true, doc: '', segments: [] },

        // empty document (object)
        { out: true, doc: {}, segments: [] },
        { out: true, doc: {}, segments: ['a'] },
        { out: true, doc: {}, segments: ['a', 'b'] },
        { out: true, doc: {}, segments: ['a', 1] },
        { out: false, doc: {}, segments: [1] },
        { out: false, doc: {}, segments: [1, 'a'] },

        // empty document (array)
        { out: true, doc: [], segments: [] },
        { out: true, doc: [], segments: [1] },
        { out: true, doc: [], segments: [1, 2] },
        { out: true, doc: [], segments: [1, 'a'] },
        { out: false, doc: [], segments: ['a'] },
        { out: false, doc: [], segments: ['a', 1] },

        // documents starting with an object
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: [] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['a'] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['b'] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['c'] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['e'] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['x'] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['c', 'd'] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['c', 'x'] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['c', 'x', 'y'] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['e', 0] },
        { out: true, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['e', 99] },
        { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['a', 'x'] },
        { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['a', 1] },
        { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['b', 'x'] },
        { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['b', 1] },
        { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['c', 1] },
        { out: false, doc: { a: 1, b: 'b', c: { d: 'd' }, e: [ 'e' ] }, segments: ['e', 'x'] },

        // documents starting with an array
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [0] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [1] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [99] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [0, 'a'] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [0, 'b'] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [0, 'x'] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [1, 0] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [1, 1] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [1, 99] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [99, 'x'] },
        { out: true, doc: [{ a: 1, b: 'b' }, [2, 'c']], segments: [99, 99] },

        // invalid parameters
        { out: false, doc: {}, segments: undefined },
        { out: false, doc: {}, segments: null },
        { out: false, doc: {}, segments: 0 },
        { out: false, doc: {}, segments: 1 },
        { out: false, doc: {}, segments: [null] },
    ];

    cases.forEach(c => {
        it(`should return '${JSON.stringify(c.out)}' if input is '${JSON.stringify(c.segments)}'`, () => {
            expect(check(c.doc, c.segments)).toEqual(c.out);
        });
    });
});