import { MongoClient, Db, Collection } from 'mongodb';
import { modify } from '../../modify';
import { invert } from '../../invert';

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

    cases.forEach(({ document, modifier, modified, inverted }, idx ) => {
      it(`#${idx}: should modify ${JSON.stringify(document)} with ${JSON.stringify(modifier)}`, async () => {
        // NOTE: create and insert the document
        document._id = `doc-${Math.random()}`;
        await collection.insertOne(document);

        // NOTE: modify the document on the client
        const updated = JSON.parse( JSON.stringify( document ));
        const isModified = modify(updated, modifier);

        // NOTE: try to update the document on server and check errors
        try {
          await collection.updateOne({ _id: document._id }, modifier);
          expect(isModified).toBe(true);
        } catch (err) {
          expect( modified ).toEqual( null );
          expect(isModified).toBe(false);
          return;
        }

        // NOTE: fetch the updated document from server and compare
        const result = await collection.findOne({ _id: document._id });
        expect(updated).toEqual(result);
        expect(updated).toEqual({ _id: document._id, ...modified });

        // NOTE: create the inverter and make sure they match
        expect( inverted ).toEqual( invert( document, modifier ) );
      });
    });
  });
}
