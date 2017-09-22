import { DataType, getZero, getType } from '../types';

describe('getType', () => {
  const cases: any[] = [
    { type: DataType.any, value: undefined },
    { type: DataType.any, value: null },
    { type: DataType.array, value: [] },
    { type: DataType.array, value: [1] },
    { type: DataType.object, value: {} },
    { type: DataType.object, value: { x: 1 } },
    { type: DataType.number, value: 0 },
    { type: DataType.number, value: 1 },
    { type: DataType.string, value: '' },
    { type: DataType.string, value: 'a' },
    { type: DataType.string, value: '1' },
    { type: DataType.boolean, value: true },
    { type: DataType.boolean, value: false },
  ];

  cases.forEach(({ type, value }) => {
    it(`should return DataType.${DataType[type]} for "${value}"`, () => {
      expect(getType(value)).toBe(type);
    });
  });
});

describe('getZero', () => {
  const cases: any[] = [
    DataType.any,
    DataType.array,
    DataType.object,
    DataType.number,
    DataType.string,
    DataType.boolean,
  ];

  cases.forEach(c => {
    it(`should return the zero value with correct type for DataType.${DataType[c]}`, () => {
      expect(getType(getZero(c))).toBe(c);
    });
  });
});
