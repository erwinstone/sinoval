import rules from './rules'
import type { MessageFunction } from './types'

const messages = {
    invalid({ attribute }) {
        return `The ${attribute} field is invalid.`
    },
    required({ attribute }) {
        return `The ${attribute} field is required.`
    },
    required_if({ attribute }) {
        return `The ${attribute} field is required.`
    },
    required_unless({ attribute }) {
        return `The ${attribute} field is required.`
    },
    numeric({ attribute }) {
        return `The ${attribute} field must be a number.`
    },
    min({ attribute, value, args }) {
        if (rules.numeric({ value, data: {} }).pass) {
            return `The ${attribute} field must be at least ${args}.`
        }
        if (Array.isArray(value)) {
            return `The ${attribute} field must have at least ${args} items.`
        }
        return `The ${attribute} field must be at least ${args} characters.`
    },
    max({ attribute, value, args }) {
        if (rules.numeric({ value, data: {} }).pass) {
            return `The ${attribute} field must not be greater than ${args}.`
        }
        if (Array.isArray(value)) {
            return `The ${attribute} field must not have more than ${args} items.`
        }
        return `The ${attribute} field must not be greater than ${args} characters.`
    },
    max_filesize({ attribute, args }) {
        return `The ${attribute} field must not be greater than ${args}.`
    },
    alpha({ attribute }) {
        return `The ${attribute} field must only contain letters.`
    },
    alpha_num({ attribute }) {
        return `The ${attribute} field must only contain letters and numbers.`
    },
    in({ attribute }) {
        return `The selected ${attribute} is invalid.`
    },
    not_in({ attribute }) {
        return `The selected ${attribute} is invalid.`
    },
    email({ attribute }) {
        return `The ${attribute} field must be a valid email address.`
    },
    url({ attribute }) {
        return `The ${attribute} field must be a valid URL.`
    },
    same({ attribute, args }) {
        return `The ${attribute} and ${args} must match.`
    },
    different({ attribute, args }) {
        return `The ${attribute} and ${args} must be different.`
    },
    starts_with({ attribute, args }) {
        const argv = args as string
        return `The ${attribute} must start with ${argv.includes(',') ? `one of the following: ${argv.split(',').join(', ')}` : argv}.`
    },
    ends_with({ attribute, args }) {
        const argv = args as string
        return `The ${attribute} must end with ${argv.includes(',') ? `one of the following: ${argv.split(',').join(', ')}` : argv}.`
    },
    boolean({ attribute }) {
        return `The ${attribute} field must be true or false.`
    },
} satisfies Record<string, MessageFunction>
export default messages
