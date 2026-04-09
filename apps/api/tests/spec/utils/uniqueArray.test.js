import { uniqueById, uniqueByProp } from '../../../src/utils';

describe('uniqueByProp', () => {
  it('should return unique items based on the given property', () => {
    const testData = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    const uniqueItems = uniqueByProp('id')(testData);

    expect(uniqueItems).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  it('should return an empty array when the input array is empty', () => {
    const testData = [];

    const uniqueItems = uniqueByProp('id')(testData);

    expect(uniqueItems).toEqual([]);
  });

  it('should return the same array when all items are unique', () => {
    const testData = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];

    const uniqueItems = uniqueByProp('id')(testData);

    expect(uniqueItems).toEqual(testData);
  });
});

describe('uniqueById', () => {
  it('should return unique items based on the given property', () => {
    const testData = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    const uniqueItems = uniqueById(testData);

    expect(uniqueItems).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  it('should return an empty array when the input array is empty', () => {
    const testData = [];

    const uniqueItems = uniqueById(testData);

    expect(uniqueItems).toEqual([]);
  });

  it('should return the same array when all items are unique', () => {
    const testData = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];

    const uniqueItems = uniqueById(testData);

    expect(uniqueItems).toEqual(testData);
  });
});
