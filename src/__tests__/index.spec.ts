import { modify } from '../';

describe('modify', () => {
    const cases: any[] = [
        // $set
        {
            doc: { id: 'i1' },
            mod: { $set: { a: 1 } },
            exp: { id: 'i1', a: 1 },
        },
        {
            doc: { id: 'i1', a: {} },
            mod: { $set: { 'a.b': 1 } },
            exp: { id: 'i1', a: { b: 1 } },
        },
        {
            doc: { id: 'i1' },
            mod: { $set: { 'a.b': 1 } },
            exp: { id: 'i1', a: { b: 1 } },
        },
        {
            doc: { id: 'i1', a: 1 },
            mod: { $set: { a: 2 } },
            exp: { id: 'i1', a: 2 },
        },
        {
            doc: { id: 'i1', a: { b: 1 } },
            mod: { $set: { 'a.b': 2 } },
            exp: { id: 'i1', a: { b: 2 } },
        },

        // $push
        {
            doc: { id: 'i1' },
            mod: { $push: { a: 1 } },
            exp: { id: 'i1', a: [1] },
        },
        {
            doc: { id: 'i1', a: [] },
            mod: { $push: { a: 1 } },
            exp: { id: 'i1', a: [1] },
        },
        {
            doc: { id: 'i1', a: [1] },
            mod: { $push: { a: 2 } },
            exp: { id: 'i1', a: [1, 2] },
        },

        // pull
        {
            doc: { id: 'i1', a: 1 },
            mod: { $pull: { x: 2 } },
            exp: { id: 'i1', a: 1, x: [] },
        },
        {
            doc: { id: 'i1', a: 1 },
            mod: { $pull: { a: 1 } },
            exp: { id: 'i1', a: 1 },
        },
        {
            doc: { id: 'i1', a: [1] },
            mod: { $pull: { a: 1 } },
            exp: { id: 'i1', a: [] },
        },
        {
            doc: { id: 'i1', a: [1, 2, 3] },
            mod: { $pull: { a: 2 } },
            exp: { id: 'i1', a: [1, 3] },
        },
        {
            doc: { id: 'i1', a: [{ a: 30, b: 20 }, { a: 30, b: 15 }, { a: 35, b: 25 }] },
            mod: { $pull: { a: { $elemMatch: { a: 30 } } } },
            exp: { id: 'i1', a: [{ a: 35, b: 25 }] },
        },
    ];

    cases.forEach(({ doc, mod, exp }) => {
        it( `should modify ${JSON.stringify(doc)} to ${JSON.stringify(exp)} with ${JSON.stringify(mod)}`, () => {
            modify(doc, mod);
            expect(doc).toEqual(exp);
        });
    });
});
