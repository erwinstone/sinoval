import type { ValidatorConfig } from './types'
import { convertToReadableFieldNames } from './utils'
const config: ValidatorConfig = {
    convertToReadableFieldNames: true,
    convertToReadableFieldNamesFunction: convertToReadableFieldNames,
    ruleSeparator: '|',
}
export default config
