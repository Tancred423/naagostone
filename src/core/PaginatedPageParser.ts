import { PageParser } from "./PageParser.ts";
import type { Context } from "hono";

export abstract class PaginatedPageParser extends PageParser {
  protected abstract getBaseURL(ctx: Context): string;

  protected getURL(ctx: Context): string {
    let query = "";
    const page = ctx.req.query("page");
    if (page) {
      query = `?page=${page}`;
    }
    return `${this.getBaseURL(ctx)}${query}`;
  }

  override async parse(
    ctx: Context,
    columnsPrefix: string = "",
  ): Promise<object> {
    let baseParse = await super.parse(ctx, columnsPrefix) as Record<
      string,
      unknown
    >;
    baseParse = baseParse.entry as Record<string, unknown>;

    try {
      const queryName = ctx.req.query("name")?.toString().toLowerCase();
      if (queryName) {
        baseParse.List = (baseParse.List as Array<Record<string, unknown>>)
          .filter((parses) => {
            const parseName = (parses.name as string)?.toLowerCase();
            return parseName === queryName;
          });
      }

      const queryWorld = ctx.req.query("worldname")?.toString().toLowerCase();
      if (queryWorld) {
        baseParse.List = (baseParse.List as Array<Record<string, unknown>>)
          .filter((parses) => {
            const parseWorld = (parses.World as string)?.toLowerCase();
            return parseWorld === queryWorld;
          });
      }
    } catch (err) {
      console.log(err);
    }

    delete baseParse.ListNextButton;
    const currentPage = baseParse.CurrentPage as number;
    const numPages = baseParse.NumPages as number;
    baseParse.Pagination = {
      Page: +currentPage,
      PageTotal: +numPages,
      PageNext: +currentPage < +numPages ? +currentPage + 1 : null,
      PagePrev: +currentPage < 1 ? null : +currentPage - 1,
    };
    delete baseParse.CurrentPage;
    delete baseParse.NumPages;
    return baseParse;
  }
}
