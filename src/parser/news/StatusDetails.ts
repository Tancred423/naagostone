import type { Context } from "hono";
import { LodestoneParser } from "../../core/LodestoneParser.ts";
import statusDetails from "../../../lib/lodestone-css-selectors/lodestone/status_details.json" with {
  type: "json",
};
import type { CssSelectorRegistry } from "../../interface/CssSelectorRegistry.ts";

export class StatusDetails extends LodestoneParser {
  protected getURL(_ctx: Context): string {
    return "https://eu.finalfantasyxiv.com/lodestone/";
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...statusDetails };
  }
}
