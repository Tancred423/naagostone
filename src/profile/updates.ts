import { Request } from 'express'
import { PageParser } from '../core/lodestone-parser'
import * as updates from '../lib/lodestone-css-selectors/lodestone/updates.json'
import { CssSelectorRegistry } from '../core/css-selector-registry'

export class Updates extends PageParser {
  protected getURL(req: Request): string {
    return 'https://eu.finalfantasyxiv.com/lodestone/'
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...updates }
  }
}
