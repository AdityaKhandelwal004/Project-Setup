import QueryBuilder from './queryBuilder.ts';

type UpdateMapper<T> = (_entity: T) => Record<string, any>;
type Transformer<T> = (_elem: T) => any[];

class Queries {
  static updaterFor<T extends Record<string, any>>(
    tableName: string,
    updateMapper: UpdateMapper<T>,
    entity: T,
    uniqueKey: keyof T = 'id'
  ): { sql: string; args: any[] } {
    const qb = new QueryBuilder('UPDATE ')
      .append(tableName)
      .append(' SET ');

    const updateMap = updateMapper(entity);

    if (Object.keys(updateMap).length === 0) {
      return qb
        .append(`id = id WHERE ${String(uniqueKey)} = ?`, [entity[uniqueKey]])
        .build();
    }

    Object.entries(updateMap).forEach(([key, value], i, arr) => {
      qb.append(`${key}=?`, [value]);
      if (i + 1 !== arr.length) qb.append(',');
    });

    return qb
      .append(` WHERE ${String(uniqueKey)} = ?`, [entity[uniqueKey]])
      .build();
  }

  static batchInsert<T>(
    baseSql: string,
    elems: T[],
    transformer: Transformer<T>
  ): { sql: string; args: any[] } {
    const qb = new QueryBuilder(baseSql);
    qb.append(' VALUES ');

    elems.forEach((elem, i) => {
      const args = transformer(elem);
      const placeholders = Array(args.length)
        .fill(QueryBuilder.placeholder)
        .join(',');
      qb.append(`(${placeholders})`, args);
      if (i + 1 !== elems.length) qb.append(',');
    });

    return qb.build();
  }
}

export default Queries;
