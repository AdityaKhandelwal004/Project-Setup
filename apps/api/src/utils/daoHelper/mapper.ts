import type {
  Filter,
  MetaData,
  PaginatedResponse,
  ResultSet,
  Row,
  RowMapper,
} from "../../models/genericTypes.ts";
import Joins from "./joins.ts";

type Label = {
  languageCode: string;
  label: string;
};

class Mapper {
  static getTotalCount(res: ResultSet, column?: string): number {
    const count = res.rows[0]?.[column || "full_count"] ?? 0;
    return parseInt(count, 10);
  }

  static flatResultMapper(res: ResultSet, rowMapper: RowMapper<any>) {
    return res.rows.map((row) => rowMapper(row));
  }

  static getUnique<T>(res: ResultSet, rowMapper: RowMapper<T>): T | null {
    return Joins.flatResultMapper(res, rowMapper)[0];
  }

  static getId(res: ResultSet): number {
    const id = res.rows[0]?.id ?? 0;
    return parseInt(id, 10);
  }

  static getNewMetaData(filter: Filter, total: number): Filter {
    return {
      ...filter,
      page: filter.page + 1,
      total,
      limit: filter.allResults ? total : filter.limit,
    };
  }

  static getPaginatedResponse<T>(
    filter: Filter,
    searchResults: T[],
    extraMetaData: Partial<MetaData> = {}
  ): PaginatedResponse<T> {
    return {
      metadata: {
        order: filter.order || null,
        direction: filter.direction!,
        page: filter.page,
        limit: filter.limit,
        total: filter.total!,
        ...extraMetaData,
        filters: { ...filter.filters },
        allowedFilters: [...filter.allowedFilters],
      },
      records: searchResults,
    };
  }

  static getLabels(rows: Row[] = []): Label[] {
    const labelsMap = new Map<string, Label>();

    rows.forEach((row) => {
      if (row.language_code) {
        labelsMap.set(row.language_code, {
          languageCode: row.language_code,
          label: row.label,
        });
      }
    });

    return Array.from(labelsMap.values());
  }
}

export default Mapper;
