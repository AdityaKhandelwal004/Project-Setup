/**
 * using ES6 Map
 */
export const uniqueByProp =
  <T extends Record<string, any>, K extends keyof T>(prop: K) =>
  (arr: T[]): T[] =>
    Array.from(
      arr.reduce((acc, item) => {
        if (item?.[prop]) {
          acc.set(item[prop], item);
        }
        return acc;
      }, new Map<T[K], T>())
        .values()
    );

export const uniqueById = uniqueByProp<{ id: string | number }, 'id'>('id');
