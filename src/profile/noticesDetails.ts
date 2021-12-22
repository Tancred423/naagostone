import { Request } from 'express'
import { PageParser } from '../core/lodestone-parser'
import * as noticesDetails from '../lib/lodestone-css-selectors/lodestone/notices_details.json'
import { CssSelectorRegistry } from '../core/css-selector-registry'

export class NoticesDetails extends PageParser {
  protected getURL(req: Request): string {
    return 'https://eu.finalfantasyxiv.com/lodestone/'
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...noticesDetails }
  }
}
