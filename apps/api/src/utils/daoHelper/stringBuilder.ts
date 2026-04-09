class StringBuilder {
  private strings: string[] = [];

  constructor(value?: string) {
    this.append(value);
  }

  append(value?: string): this {
    if (value) {
      this.strings.push(value);
    }
    return this;
  }

  length(): number {
    return this.strings.join('').length;
  }

  toString(): string {
    return this.strings.join('');
  }
}

export default StringBuilder;
