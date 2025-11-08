import type { Context } from "hono";
import { LodestoneParser } from "../../core/LodestoneParser.ts";
import maintenance from "../../../lib/lodestone-css-selectors/lodestone/maintenance.json" with {
  type: "json",
};
import type { CssSelectorRegistry } from "../../interface/CssSelectorRegistry.ts";

export class Maintenances extends LodestoneParser {
  protected getURL(_ctx: Context): string {
    return "https://eu.finalfantasyxiv.com/lodestone/";
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...maintenance };
  }
}
