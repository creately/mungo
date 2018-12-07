import { MongoClient, Db, Collection } from 'mongodb';
import { modify } from '../../modify';

export function testOperator(description: string, cases: any[]) {
  describe(description, () => {
    let mongoClient: MongoClient;
    let database: Db;
    let collection: Collection;

    beforeAll(async () => {
      mongoClient = await MongoClient.connect(
        process.env.MONGO_URL as string,
        { useNewUrlParser: true }
      );
      database = mongoClient.db('testmungo');
      collection = database.collection(`col-${Math.random()}`);
    });

    afterAll(async () => {
      await collection.drop();
      await mongoClient.close();
    });

    cases.forEach(({ document, modifier }) => {
      it(`should modify ${JSON.stringify(document)} with ${JSON.stringify(modifier)}`, async () => {
        document._id = `doc-${Math.random()}`;
        await collection.insertOne(document);
        const isModified = modify(document, modifier);
        try {
          await collection.updateOne({ _id: document._id }, modifier);
          const result = await collection.findOne({ _id: document._id });
          expect(isModified).toBe(true);
          expect(document).toEqual(result);
        } catch (err) {
          expect(isModified).toBe(false);
        }
      });
    });
  });
}
