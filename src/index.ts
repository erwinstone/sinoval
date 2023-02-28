import rules from './rules'
import utils from './utils'
import validate, { setAttribute, setConfig, setMessage, setRule } from './validate'
export type { Data, Rules } from './types'
const sinoval = {
    validate,
    setConfig,
    setRule,
    setMessage,
    setAttribute,
    rules,
    utils,
}
export default sinoval
