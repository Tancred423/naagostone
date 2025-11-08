import type { Context } from "hono";

export class InputValidator {
  static validateCharacterId(characterId: string | undefined): boolean {
    if (!characterId) return false;
    const id = parseInt(characterId, 10);
    return !isNaN(id) && id > 0 && id < Number.MAX_SAFE_INTEGER;
  }

  static validateCharacterName(name: string | undefined): boolean {
    if (!name || name.length === 0) return false;
    if (name.length > 100) return false;
    return /^[\p{L}\p{N}\s'-]+$/u.test(name);
  }

  static sanitizeWorldName(worldname: string | undefined): string | null {
    if (!worldname) return null;
    const sanitized = worldname.replace(/[^a-zA-Z]/g, "");
    if (sanitized.length === 0 || sanitized.length > 50) return null;
    return sanitized;
  }

  static sanitizeDataCenter(dc: string | undefined): string | null {
    if (!dc) return null;
    const sanitized = dc.replace(/[^a-zA-Z]/g, "");
    if (sanitized.length === 0 || sanitized.length > 50) return null;
    return sanitized;
  }

  static validatePageNumber(page: string | undefined): boolean {
    if (!page) return true;
    const pageNum = parseInt(page, 10);
    return !isNaN(pageNum) && pageNum > 0 && pageNum <= 10000;
  }

  static escapeHtml(text: string): string {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  static createValidationError(c: Context, message: string) {
    return c.json({ error: `Validation error: ${message}` }, 400);
  }
}
