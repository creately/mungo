import { modify } from '../';

describe('modify', () => {
  it('should ignore unknown operators', () => {
    const doc: any = { id: 'i1', x: 10, y: 20 };
    modify(doc, { $set: { z: 30 }, $notAnOp: {} });
    expect(doc).toEqual({ id: 'i1', x: 10, y: 20, z: 30 });
  });

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

  describe('$pull', () => {
    it('should not change the document if the field is missing', () => {
      const doc: any = { id: 'i1', x: 10, y: 20 };
      modify(doc, { $pull: { z: 30 } });
      expect(doc).toEqual({ id: 'i1', x: 10, y: 20 });
    });

    it('should not change the document if the field is not an array', () => {
      const doc: any = { id: 'i1', x: 10, y: 20, z: 35 };
      modify(doc, { $pull: { z: 30 } });
      expect(doc).toEqual({ id: 'i1', x: 10, y: 20, z: 35 });
    });

    it('should remove matching elements when an exact value is given', () => {
      const doc: any = { id: 'i1', x: 10, y: 20, z: [30, 35] };
      modify(doc, { $pull: { z: 30 } });
      expect(doc).toEqual({ id: 'i1', x: 10, y: 20, z: [35] });
    });

    it('should remove matching elements when $elemMatch is used', () => {
      const doc: any = { id: 'i1', x: 10, y: 20, z: [{ a: 30, b: 20 }, { a: 30, b: 15 }, { a: 35, b: 25 }] };
      modify(doc, { $pull: { z: { $elemMatch: { a: 30 } } } });
      expect(doc).toEqual({ id: 'i1', x: 10, y: 20, z: [{ a: 35, b: 25 }] });
    });
  });
});
