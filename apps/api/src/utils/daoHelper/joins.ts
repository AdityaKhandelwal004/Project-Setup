import type { ResultSet, RowMapper } from "../../models/genericTypes.ts";

class Joins {
  static flatResultMapper<T>(res: ResultSet, rowMapper: RowMapper<T>): T[] {
    return res.rows.map((row) => rowMapper(row));
  }

  static resultMapper<T>(res: ResultSet, rowMapper: RowMapper<T>): T[] {
    return Joins.resultMapperByKey<T>('id', res, rowMapper);
  }

  static resultMapperByKey<T>(
    key: string,
    res: ResultSet,
    rowMapper: RowMapper<T>
  ): T[] {
    const grouped = res.rows.reduce<Map<any, any[]>>((map, row) => {
      const groupKey = row[key];
      if (map.has(groupKey)) {
        map.get(groupKey)!.push(row);
      } else {
        map.set(groupKey, [row]);
      }
      return map;
    }, new Map());

    return Array.from(grouped.values()).map((group) => rowMapper(group));
  }
}

export default Joins;
