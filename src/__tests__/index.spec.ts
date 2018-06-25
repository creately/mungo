import { modify } from '../';

describe('modify', () => {
  const cases: any[] = [
    // $set
    { doc: {}, mod: { $set: { a: 10 } } },
    { doc: { a: 0 }, mod: { $set: { a: 10 } } },
    { doc: { a: 1 }, mod: { $set: { a: 10 } } },
    { doc: {}, mod: { $set: { 'a.b': 10 } } },
    { doc: { a: {} }, mod: { $set: { 'a.b': 10 } } },
    { doc: { a: { b: 0 } }, mod: { $set: { 'a.b': 10 } } },
    { doc: { a: { b: 1 } }, mod: { $set: { 'a.b': 10 } } },
    { doc: { a: null }, mod: { $set: { 'a.b': 10 } } },

    // $push
    { doc: {}, mod: { $push: { a: 10 } } },
    { doc: { a: [] }, mod: { $push: { a: 10 } } },
    { doc: { a: [0] }, mod: { $push: { a: 10 } } },
    { doc: { a: [1] }, mod: { $push: { a: 10 } } },
    { doc: { a: {} }, mod: { $push: { a: 10 } } },
    { doc: { a: null }, mod: { $push: { a: 10 } } },
    { doc: {}, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: [] }, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: [0] }, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: [1] }, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: {} }, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: null }, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: { b: [] } }, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: { b: [0] } }, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: { b: {} } }, mod: { $push: { 'a.b': 10 } } },
    { doc: { a: { b: null } }, mod: { $push: { 'a.b': 10 } } },

    // pull
    { doc: {}, mod: { $pull: { a: 10 } } },
    { doc: { a: {} }, mod: { $pull: { a: 10 } } },
    { doc: { a: [] }, mod: { $pull: { a: 10 } } },
    { doc: { a: null }, mod: { $pull: { a: 10 } } },
    { doc: { a: 0 }, mod: { $pull: { a: 10 } } },
    { doc: { a: 1 }, mod: { $pull: { a: 10 } } },
    { doc: { a: 10 }, mod: { $pull: { a: 10 } } },
    { doc: { a: [10] }, mod: { $pull: { a: 10 } } },
    { doc: { a: [10, 20, 30] }, mod: { $pull: { a: 20 } } },
    {
      doc: { a: [{ x: 30, y: 20 }, { x: 30, y: 15 }, { x: 35, y: 25 }] },
      mod: { $pull: { a: { x: 30 } } },
    },
    { doc: {}, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: [] }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: [0] }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: [1] }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: [10] }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: {} }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: null }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: { b: [] } }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: { b: [0] } }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: { b: [10] } }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: { b: {} } }, mod: { $pull: { 'a.b': 10 } } },
    { doc: { a: { b: null } }, mod: { $pull: { 'a.b': 10 } } },
  ];

  async function request(method: string, body: object) {
    const response = await fetch(`http://localhost:3000/${method}`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  cases.forEach(({ doc, mod }) => {
    it(`should update ${JSON.stringify(doc)} with ${JSON.stringify(mod)}`, async () => {
      doc._id = Math.random()
        .toString(36)
        .slice(2);
      await request('insert', { document: doc });
      const result = await request('update', { selector: { _id: doc._id }, modifier: mod });
      const modified = modify(doc, mod);

      if (result.err) {
        expect(modified).toBe(false, 'expected document not to be modified on client');
      } else {
        expect(modified).toBe(true, 'expected document to be modified on client');
        expect(doc).toEqual(result);
      }
    });
  });

  afterAll(async () => {
    await request('remove', { selector: {} });
  });
});
