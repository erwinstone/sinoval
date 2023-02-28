import type { RuleFunction } from './types'
import { empty, getValue } from './utils'
const rules = {
    /**
    * The field under validation must be present in the input data and not empty.
    * A field is "empty" if it meets one of the following criteria:
    * The value is null or undefined, an empty string (''), an empty array ([]), an empty object ({}).
    */
    required({ value }) {
        return !empty(value)
    },
    /**
     * The field under validation must be present and not empty if the anotherfield field is equal to any value.
     */
    required_if({ value, data, args }) {
        if (!empty(value)) {
            return true
        }
        const field = (args as string).split(',')
        const key = field[0]
        const val = field[1]
        return getValue(key, data) !== val
    },
    /**
     * The field under validation must be present and not empty unless the anotherfield field is equal to any value.
     */
    required_unless({ value, data, args }) {
        const field = (args as string).split(',')
        const key = field[0]
        const val = field[1]
        if (getValue(key, data) === val) {
            return true
        }
        return !empty(value)
    },
    /**
     * The field under validation must be a number or a numeric string.
     */
    numeric({ value }) {
        return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value as string)
        // if (typeof value === 'number' && !isNaN(value)) {
        //     return true
        // }
        // else if (typeof value === 'string' && !isNaN(parseFloat(value)) && parseFloat(value).toString() === value) {
        //     return true
        // }
        // else {
        //     return false
        // }
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
            return this.numeric({ value, data: {} }) ? value as unknown as number >= minLength : value.length >= minLength
        }
        else if (typeof value === 'number') {
            return value >= minLength
        }
        else if (Array.isArray(value)) {
            return value.length >= minLength
        }
        else {
            return false
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
            return this.numeric({ value, data: {} }) ? value as unknown as number <= maxLength : value.length <= maxLength
        }
        else if (typeof value === 'number') {
            return value <= maxLength
        }
        else if (Array.isArray(value)) {
            return value.length <= maxLength
        }
        else {
            return false
        }
    },
    /**
     * The field under this rule must be entirely alphabetic characters.
     */
    alpha({ value }) {
        if (typeof value !== 'string') {
            return false
        }
        const lettersOnly = /^[a-zA-Z]+$/.test(value)
        return lettersOnly
    },
    /**
     * The field under this rule must be entirely alpha-numeric characters.
     */
    alpha_num({ value }) {
        if (typeof value !== 'string') {
            return false
        }
        const alphaNumeric = /^[a-zA-Z0-9]+$/.test(value)
        return alphaNumeric
    },
    /**
     * The field under validation must be included in the given list of values
     */
    in({ value, args }) {
        const array = (args as string).split(',')
        const index = array.indexOf(`${value}`)
        return index !== -1
    },
    /**
     * The field under validation must not be included in the given list of values.
     */
    not_in({ value, args }) {
        const array = (args as string).split(',')
        const index = array.indexOf(`${value}`)
        return index === -1
    },
    /**
     * The field under validation must be formatted as an email address.
     */
    email({ value }) {
        const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
        return emailRegex.test(value as string)
    },
    /**
     * The field under validation must be a valid URL.
     */
    url({ value }) {
        const urlRegex = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}|localhost)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i
        return urlRegex.test(value as string)
    },
    /**
     * The given field must match the field under validation.
     */
    same({ value, data, args }) {
        return getValue(args as string, data) === value
    },
    /**
     * The field under validation must have a different value than field.
     */
    different({ value, data, args }) {
        return getValue(args as string, data) !== value
    },
    /**
     * The field under validation must start with the given value or one of the given values (separated by comma).
     */
    starts_with({ value, args }) {
        for (const arg of (args as string).split(',')) {
            if ((value as string).startsWith(arg)) {
                return true
            }
        }
        return false
    },
    /**
     * The field under validation must end with the given value or one of the given values (separated by comma).
     */
    ends_with({ value, args }) {
        for (const arg of (args as string).split(',')) {
            if ((value as string).endsWith(arg)) {
                return true
            }
        }
        return false
    },
} satisfies Record<string, RuleFunction>
export default rules
