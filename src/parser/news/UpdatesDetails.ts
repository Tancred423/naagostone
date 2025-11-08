import type { Context } from "hono";
import { LodestoneParser } from "../../core/LodestoneParser.ts";
import updatesDetails from "../../../lib/lodestone-css-selectors/lodestone/updates_details.json" with {
  type: "json",
};
import type { CssSelectorRegistry } from "../../interface/CssSelectorRegistry.ts";

export class UpdatesDetails extends LodestoneParser {
  protected getURL(_ctx: Context): string {
    return "https://eu.finalfantasyxiv.com/lodestone/";
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...updatesDetails };
  }
}
