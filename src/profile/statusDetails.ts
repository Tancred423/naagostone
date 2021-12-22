import { Request } from 'express'
import { PageParser } from '../core/lodestone-parser'
import * as statusDetails from '../lib/lodestone-css-selectors/lodestone/status_details.json'
import { CssSelectorRegistry } from '../core/css-selector-registry'

export class StatusDetails extends PageParser {
  protected getURL(req: Request): string {
    return 'https://eu.finalfantasyxiv.com/lodestone/'
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...statusDetails }
  }
}
