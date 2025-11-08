import { PaginatedPageParser } from "../../core/PaginatedPageParser.ts";
import type { CssSelectorRegistry } from "../../interface/CssSelectorRegistry.ts";
import characterSearch from "../../../lib/lodestone-css-selectors/search/character.json" with {
  type: "json",
};
import type { Context } from "hono";

export class CharacterSearch extends PaginatedPageParser {
  protected getBaseURL(ctx: Context): string {
    const name = ctx.req.query("name");
    let query = `?q=${name?.toString()?.replace(" ", "+")}`;

    const dc = ctx.req.query("dc");
    const worldname = ctx.req.query("worldname");

    if (dc) {
      query += `&worldname=_dc_${dc}`;
    } else if (worldname) {
      query += `&worldname=${this.formatWorldname(worldname.toString())}`;
    }
    return `https://eu.finalfantasyxiv.com/lodestone/character/${query}`;
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return characterSearch;
  }

  private formatWorldname(worldname: string) {
    return (
      worldname.substring(0, 1).toUpperCase() +
      worldname.substring(1).toLowerCase()
    );
  }
}
