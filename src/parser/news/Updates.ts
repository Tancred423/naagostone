import type { Context } from "hono";
import { LodestoneParser } from "../../core/LodestoneParser.ts";
import updates from "../../../lib/lodestone-css-selectors/lodestone/updates.json" with {
  type: "json",
};
import type { CssSelectorRegistry } from "../../interface/CssSelectorRegistry.ts";

export class Updates extends LodestoneParser {
  protected getURL(_ctx: Context): string {
    return "https://eu.finalfantasyxiv.com/lodestone/";
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...updates };
  }
}
