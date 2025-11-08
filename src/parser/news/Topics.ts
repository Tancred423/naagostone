import type { Context } from "hono";
import { LodestoneParser } from "../../core/LodestoneParser.ts";
import topics from "../../../lib/lodestone-css-selectors/lodestone/topics.json" with {
  type: "json",
};
import type { CssSelectorRegistry } from "../../interface/CssSelectorRegistry.ts";

export class Topics extends LodestoneParser {
  protected getURL(_ctx: Context): string {
    return "https://eu.finalfantasyxiv.com/lodestone/";
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...topics };
  }
}
