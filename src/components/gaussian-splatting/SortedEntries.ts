import { field } from '@lastolivegames/becsy';

export class SortEntry {
  @field.uint32 declare key: number;
  @field.uint32 declare index: number;

  constructor(
    options: Partial<{
      key: number;
      index: number;
    }> = {},
  ) {
    this.key = options.key || 0;
    this.index = options.index || 0;
  }
}

export class SortedEntries {
  @field.object declare sorted: SortEntry[];

  constructor(options: Partial<{ sorted: SortEntry[] }> = {}) {
    this.sorted = options.sorted || [];
  }
}
