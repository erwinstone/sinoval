import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'

sinoval.setMessage({
    'required': ({ attribute }) => `The ${attribute} field cannot be empty.`,
    'email.required': 'We need to know your email address!',
})
const rules: Rules = {
    name: 'required',
    username: 'required',
    email: 'required|email',
}
test('required message', async () => {
    await expect(sinoval.validate(rules, {})).resolves.toEqual({
        pass: false,
        errors: {
            name: 'The name field cannot be empty.',
            username: 'The username field cannot be empty.',
            email: 'We need to know your email address!',
        },
        data: {
            name: null,
            username: null,
            email: null,
        },
    })
})
