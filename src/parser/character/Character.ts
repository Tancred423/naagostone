import type { Context } from "hono";
import { PageParser } from "../../core/PageParser.ts";
import character from "../../../lib/lodestone-css-selectors/profile/character.json" with {
  type: "json",
};
import attributes from "../../../lib/lodestone-css-selectors/profile/attributes.json" with {
  type: "json",
};
import classjob from "../../../lib/lodestone-css-selectors/profile/classjob.json" with {
  type: "json",
};
import gearset from "../../../lib/lodestone-css-selectors/profile/gearset.json" with {
  type: "json",
};
import type { CssSelectorRegistry } from "../../interface/CssSelectorRegistry.ts";

export class Character extends PageParser {
  protected getURL(ctx: Context): string {
    return (
      "https://eu.finalfantasyxiv.com/lodestone/character/" +
      ctx.req.param("characterId")
    );
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...character, ...attributes, ...classjob, ...gearset };
  }
}
