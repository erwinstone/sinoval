import type { RuleFunction, RuleReturn } from './types'
import { empty, fileSizeToBytes, getValue } from './utils'

const rules = {
    /**
    * The field under validation must be present in the input data and not empty.
    * A field is "empty" if it meets one of the following criteria:
    * The value is null or undefined, an empty string (''), an empty array ([]), an empty object ({}).
    */
    required({ value }) {
        const pass = !empty(value)
        return { pass }
    },
    /**
     * The field under validation must be present and not empty if the anotherfield field is equal to any value.
     */
    required_if({ value, data, args }) {
        if (!empty(value)) {
            return { pass: true }
        }
        const field = (args as string).split(',')
        const key = field[0]
        const val = field[1]
        const pass = getValue(key, data) !== val
        return { pass }
    },
    /**
     * The field under validation must be present and not empty unless the anotherfield field is equal to any value.
     */
    required_unless({ value, data, args }) {
        const field = (args as string).split(',')
        const key = field[0]
        const val = field[1]
        if (getValue(key, data) === val) {
            return { pass: true }
        }
        const pass = !empty(value)
        return { pass }
    },
    /**
     * The field under validation must be a number or a numeric string.
     */
    numeric({ value }) {
        const pass = /^[+-]?([0-9]*[.])?[0-9]+$/.test(value as string)
        return { pass }
    },
    /**
     * The field under validation must have a minimum value.
     * For string data, value corresponds to the number of characters.
     * For numeric data, value corresponds to a given integer value.
     * For an array, size corresponds to the `length` of the array.
     */
    min({ value, args }) {
        const minLength = args as number
        if (typeof value === 'string') {
            const isNumeric = this.numeric({ value, data: {} }) as RuleReturn
            return { pass: isNumeric.pass ? value as unknown as number >= minLength : value.length >= minLength }
        }
        else if (typeof value === 'number') {
            return { pass: value >= minLength }
        }
        else if (Array.isArray(value)) {
            return { pass: value.length >= minLength }
        }
        else {
            return { pass: false }
        }
    },
    /**
     * The field under validation must be less than or equal to a maximum value.
     * For string data, value corresponds to the number of characters.
     * For numeric data, value corresponds to a given integer value.
     * For an array, size corresponds to the `length` of the array.
     */
    max({ value, args }) {
        const maxLength = args as number
        if (typeof value === 'string') {
            const isNumeric = this.numeric({ value, data: {} }) as RuleReturn
            return { pass: isNumeric.pass ? value as unknown as number <= maxLength : value.length <= maxLength }
        }
        else if (typeof value === 'number') {
            return { pass: value <= maxLength }
        }
        else if (Array.isArray(value)) {
            return { pass: value.length <= maxLength }
        }
        else {
            return { pass: false }
        }
    },
    /**
     * The field under validation must be less than or equal to a maximum file size.
     */
    max_filesize({ value, args }) {
        const maxLength = fileSizeToBytes(args as string)
        return { pass: value as unknown as number <= maxLength }
    },
    /**
     * The field under this rule must be entirely alphabetic characters.
     */
    alpha({ value }) {
        if (typeof value !== 'string') {
            return { pass: false }
        }
        const pass = /^[a-zA-Z]+$/.test(value)
        return { pass }
    },
    /**
     * The field under this rule must be entirely alpha-numeric characters.
     */
    alpha_num({ value }) {
        if (typeof value !== 'string') {
            return { pass: false }
        }
        const pass = /^[a-zA-Z0-9]+$/.test(value)
        return { pass }
    },
    /**
     * The field under validation must be included in the given list of values
     */
    in({ value, args }) {
        const array = (args as string).split(',')
        const index = array.indexOf(`${value}`)
        const pass = index !== -1
        return { pass }
    },
    /**
     * The field under validation must not be included in the given list of values.
     */
    not_in({ value, args }) {
        const array = (args as string).split(',')
        const index = array.indexOf(`${value}`)
        const pass = index === -1
        return { pass }
    },
    /**
     * The field under validation must be formatted as an email address.
     */
    email({ value }) {
        const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
        const pass = emailRegex.test(value as string)
        return { pass }
    },
    /**
     * The field under validation must be a valid URL.
     */
    url({ value }) {
        const urlRegex = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}|localhost)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i
        const pass = urlRegex.test(value as string)
        return { pass }
    },
    /**
     * The given field must match the field under validation.
     */
    same({ value, data, args }) {
        const pass = getValue(args as string, data) === value
        return { pass }
    },
    /**
     * The field under validation must have a different value than field.
     */
    different({ value, data, args }) {
        const pass = getValue(args as string, data) !== value
        return { pass }
    },
    /**
     * The field under validation must start with the given value or one of the given values (separated by comma).
     */
    starts_with({ value, args }) {
        for (const arg of (args as string).split(',')) {
            if ((value as string).startsWith(arg)) {
                return { pass: true }
            }
        }
        return { pass: false }
    },
    /**
     * The field under validation must end with the given value or one of the given values (separated by comma).
     */
    ends_with({ value, args }) {
        for (const arg of (args as string).split(',')) {
            if ((value as string).endsWith(arg)) {
                return { pass: true }
            }
        }
        return { pass: false }
    },
    /**
     * The field under validation must be a valid boolean representation.
     * Accepted input are true, false, 1, 0, "1", and "0".
     */
    boolean({ value }) {
        const type = typeof value
        switch (type) {
            case 'boolean':
                return { pass: true }
            case 'number':
                return { pass: [0, 1].includes(value as number) }
            case 'string':
                return { pass: ['0', '1'].includes(value as string) }
            default:
                return { pass: false }
        }
    },
} satisfies Record<string, RuleFunction>
export default rules
