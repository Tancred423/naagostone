import { Request } from 'express'
import { PageParser } from '../core/lodestone-parser'
import * as updatesDetails from '../lib/lodestone-css-selectors/lodestone/updates_details.json'
import { CssSelectorRegistry } from '../core/css-selector-registry'

export class UpdatesDetails extends PageParser {
  protected getURL(req: Request): string {
    return 'https://eu.finalfantasyxiv.com/lodestone/'
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...updatesDetails }
  }
}
