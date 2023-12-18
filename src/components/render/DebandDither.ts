import { field } from '@lastolivegames/becsy';

export class DebandDither {
  @field.boolean declare enabled: boolean;

  constructor(options?: Partial<DebandDither>) {
    const { enabled = true } = options || {};
    this.enabled = enabled;
  }
}
