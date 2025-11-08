import type { CssSelectorDefinition } from "./CssSelectorDefinition.ts";

export interface CssSelectorRegistry {
  [key: string]: CssSelectorDefinition | CssSelectorRegistry;
}
