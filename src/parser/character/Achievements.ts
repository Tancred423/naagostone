import type { Context } from "hono";
import type { CssSelectorRegistry } from "../../interface/CssSelectorRegistry.ts";
import achievements from "../../../lib/lodestone-css-selectors/profile/achievements.json" with {
  type: "json",
};
import { PaginatedPageParser } from "../../core/PaginatedPageParser.ts";

export class Achievements extends PaginatedPageParser {
  protected getCSSSelectors(): CssSelectorRegistry {
    return achievements;
  }

  protected getBaseURL(ctx: Context): string {
    return (
      "https://eu.finalfantasyxiv.com/lodestone/character/" +
      ctx.req.param("characterId") +
      "/achievement?order=2"
    );
  }

  override async parse(
    ctx: Context,
    columnsPrefix: string = "",
  ): Promise<object> {
    const fromSuper = await super.parse(ctx, columnsPrefix) as Record<
      string,
      unknown
    >;
    const pagination = fromSuper.Pagination as Record<string, unknown>;
    const totalAchievements = fromSuper.TotalAchievements as number;
    pagination.ResultsTotal = +totalAchievements;
    pagination.ResultsPerPage = Math.ceil(
      +totalAchievements / (pagination.PageTotal as number),
    );
    delete fromSuper.TotalAchievements;
    return fromSuper;
  }
}
