import { MongoClient, Db, Collection } from 'mongodb';
import { modify } from '..';

describe('modify', () => {
  let mongoUrl = 'mongodb://localhost:27017';
  let mongoClient: MongoClient;
  let mongoDatabase: Db;
  let mongoCollection: Collection;

  beforeAll(async () => {
    mongoClient = await MongoClient.connect(
      mongoUrl,
      { useNewUrlParser: true }
    );
    mongoDatabase = mongoClient.db('testmungo');
    mongoCollection = mongoDatabase.collection('test');
  });

  afterAll(async () => {
    await mongoCollection.remove({});
    mongoClient.close();
  });

  const cases: any[] = [
    // $set
    { doc: {}, mod: { $set: {} } },
    { doc: {}, mod: { $set: { a: 10 } } },
    { doc: { a: 0 }, mod: { $set: { a: 10 } } },
    { doc: { a: 1 }, mod: { $set: { a: 10 } } },
    { doc: {}, mod: { $set: { 'a.b': 10 } } },
    { doc: { a: {} }, mod: { $set: { 'a.b': 10 } } },
    { doc: { a: { b: 0 } }, mod: { $set: { 'a.b': 10 } } },
    { doc: { a: { b: 1 } }, mod: { $set: { 'a.b': 10 } } },
    { doc: { a: null }, mod: { $set: { 'a.b': 10 } } },

    // $push
    { doc: {}, mod: { $push: {} } },
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
    { doc: {}, mod: { $pull: {} } },
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

  function randomId(): string {
    return Math.random()
      .toString(36)
      .slice(2);
  }

  cases.forEach(({ doc, mod }) => {
    it(`should update ${JSON.stringify(doc)} with ${JSON.stringify(mod)}`, async () => {
      doc._id = randomId();
      await mongoCollection.insertOne(doc);
      const updateOnClient = modify(doc, mod);
      try {
        await mongoCollection.updateOne({ _id: doc._id }, mod);
        const result = await mongoCollection.findOne({ _id: doc._id });
        expect(updateOnClient).toBe(true);
        expect(doc).toEqual(result);
      } catch (err) {
        expect(updateOnClient).toBe(false);
      }
    });
  });
});
