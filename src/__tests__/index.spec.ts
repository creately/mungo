import { modify } from '../';

describe('modify', () => {
  describe('$set', () => {
    it('should add the field if it was missing', () => {
      const doc: any = { id: 'i1', x: 10, y: 20 };
      modify(doc, { $set: { z: 30 } });
      expect(doc).toEqual({ id: 'i1', x: 10, y: 20, z: 30 });
    });

    it('should replace the field with the new value', () => {
      const doc: any = { id: 'i1', x: 10, y: 20, z: 35 };
      modify(doc, { $set: { z: 30 } });
      expect(doc).toEqual({ id: 'i1', x: 10, y: 20, z: 30 });
    });
  });

  describe('$push', () => {
    it('should create a new array if the field is not set', () => {
      const doc: any = { id: 'i1', x: 10, y: 20 };
      modify(doc, { $push: { z: 30 } });
      expect(doc).toEqual({ id: 'i1', x: 10, y: 20, z: [30] });
    });

    it('should push the element to the end of the field', () => {
      const doc: any = { id: 'i1', x: 10, y: 20, z: [30] };
      modify(doc, { $push: { z: 35 } });
      expect(doc).toEqual({ id: 'i1', x: 10, y: 20, z: [30, 35] });
    });
  });
});