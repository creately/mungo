import { modify } from '../';

describe('modify', () => {
    const cases: any[] = [
        // $set
        { doc: { id: 'i1' }, mod: { $set: { a: 1 } }, exp: { id: 'i1', a: 1 } },
        { doc: { id: 'i1', a: {} }, mod: { $set: { 'a.b': 1 } }, exp: { id: 'i1', a: { b: 1 } } },
        { doc: { id: 'i1' }, mod: { $set: { 'a.b': 1 } }, exp: { id: 'i1', a: { b: 1 } } },
        { doc: { id: 'i1', a: 1 }, mod: { $set: { a: 2 } }, exp: { id: 'i1', a: 2 } },
        { doc: { id: 'i1', a: { b: 1 } }, mod: { $set: { 'a.b': 2 } }, exp: { id: 'i1', a: { b: 2 } } },

        // $push
        { doc: { id: 'i1' }, mod: { $push: { a: 1 } }, exp: { id: 'i1', a: [1] } },
        { doc: { id: 'i1', a: [] }, mod: { $push: { a: 1 } }, exp: { id: 'i1', a: [1] } },
        { doc: { id: 'i1', a: [1] }, mod: { $push: { a: 2 } }, exp: { id: 'i1', a: [1, 2] } },
    ];

    cases.forEach(({ doc, mod, exp }) => {
        it( `should modify ${JSON.stringify(doc)} to ${JSON.stringify(exp)} with ${JSON.stringify(mod)}`, () => {
            modify(doc, mod);
            expect(doc).toEqual(exp);
        });
    });
});
