import { modify } from '../';

describe('modify', () => {
    const cases: any[] = [
        // $set
        { doc: {}, mod: { $set: { a: 1 } } },
        { doc: { a: {} }, mod: { $set: { 'a.b': 1 } } },
        { doc: {}, mod: { $set: { 'a.b': 1 } } },
        { doc: { a: 1 }, mod: { $set: { a: 2 } } },
        { doc: { a: { b: 1 } }, mod: { $set: { 'a.b': 2 } } },

        // $push
        { doc: {}, mod: { $push: { a: 1 } } },
        { doc: { a: [] }, mod: { $push: { a: 1 } } },
        { doc: { a: [1] }, mod: { $push: { a: 2 } } },

        // pull
        { doc: { a: 1 }, mod: { $pull: { x: 2 } } },
        { doc: { a: 1 }, mod: { $pull: { a: 1 } } },
        { doc: { a: [1] }, mod: { $pull: { a: 1 } } },
        { doc: { a: [1, 2, 3] }, mod: { $pull: { a: 2 } } },
        { doc: { a: [{ a: 30, b: 20 }, { a: 30, b: 15 }, { a: 35, b: 25 }] }, mod: { $pull: { a: { $elemMatch: { a: 30 } } } } },
    ];

    async function request(method: string, body: object) {
        const response = await fetch(`http://localhost:3000/${method}`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    cases.forEach(({ doc, mod }) => {
        it( `should update ${JSON.stringify(doc)} with ${JSON.stringify(mod)}`, async () => {
            doc._id = Math.random().toString(36).slice(2);
            await request('remove', { selector: { _id: doc._id } });
            await request('insert', { document: doc });
            const result = await request('update', { selector: { _id: doc._id }, modifier: mod });
            await request('remove', { selector: { _id: doc._id } });
            const modified = modify(doc, mod);

            if (result.err) {
                expect(modified).toBe(false, 'expected document not to be modified on client');
            } else {
                expect(modified).toBe(true, 'expected document to be modified on client');
                expect(doc).toEqual(result);
            }
        });
    });
});
