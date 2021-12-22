import { Request } from 'express'
import { PageParser } from '../core/lodestone-parser'
import * as status from '../lib/lodestone-css-selectors/lodestone/status.json'
import { CssSelectorRegistry } from '../core/css-selector-registry'

export class Status extends PageParser {
  protected getURL(req: Request): string {
    return 'https://eu.finalfantasyxiv.com/lodestone/'
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...status }
  }
}
