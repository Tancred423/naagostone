import { Request } from 'express'
import { PageParser } from '../core/lodestone-parser'
import * as notices from '../lib/lodestone-css-selectors/lodestone/notices.json'
import { CssSelectorRegistry } from '../core/css-selector-registry'

export class Notices extends PageParser {
  protected getURL(req: Request): string {
    return 'https://eu.finalfantasyxiv.com/lodestone/'
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...notices }
  }
}
