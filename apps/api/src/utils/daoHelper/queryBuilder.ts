import StringBuilder from './stringBuilder.ts';

interface BuiltQuery {
  sql: string;
  args: any[];
}

class QueryBuilder {
  static placeholder = '?';

  private query: StringBuilder;
  private args: any[];

  constructor(query: string, args?: any[]) {
    this.query = new StringBuilder();
    this.args = [];
    this.append(query, args);
  }

  /**
   * Appends a SQL fragment and its arguments.
   */
  append(sql: string, args?: any[]): this {
    this.appendSql(sql);
    this.appendArgs(args);
    return this;
  }

  /**
   * Appends raw SQL to the internal query.
   */
  appendSql(sql: string): this {
    this.query.append(sql);
    return this;
  }

  /**
   * Appends arguments to be used in the final query.
   */
  appendArgs(args: any[] = []): this {
    this.args.push(...args);
    return this;
  }

  /**
   * Appends N placeholders (?, ?, ?) for parameterized inserts.
   */
  appendPlaceholders(count: number): this {
    if (count <= 0) throw new Error(`count must be positive, but was: ${count}`);
    this.query.append('?');
    for (let i = 1; i < count; i++) {
      this.query.append(',?');
    }
    return this;
  }

  /**
   * Checks if the SQL string is currently empty.
   */
  isEmpty(): boolean {
    return this.query.length() === 0;
  }

  /**
   * Checks if the query has any arguments.
   */
  hasArguments(): boolean {
    return this.args.length > 0;
  }

  /**
   * Finalizes the query and replaces placeholders with PostgreSQL-style $1, $2, etc.
   */
  build(): BuiltQuery {
    if (this.query.length() === 0) throw new Error('empty query');

    let query = this.query.toString();
    for (let i = 1; i <= this.args.length; i++) {
      query = query.replace('?', `$${i}`);
    }

    if (query.includes('?')) {
      throw new Error('placeholder arguments mismatched');
    }

    return {
      sql: query,
      args: [...this.args],
    };
  }

  /**
   * Replaces `{s}` placeholders with string arguments — used for debug/trace logs.
   */
  static formatQuery(queryString: string, ...args: string[]): string {
    return args.reduce((acc, arg) => acc.replace('{s}', arg), queryString);
  }
}

export default QueryBuilder;
