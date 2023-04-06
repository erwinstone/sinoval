import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'

sinoval.setConfig({
    ruleSeparator: '&',
})
const rules: Rules = {
    firstName: 'required&min:2',
    lastName: 'required&min:2',
}
test('change rule separator to "&"', async () => {
    await expect(sinoval.validate(rules, {
        firstName: 'a',
        lastName: 'b',
    })).resolves.toEqual({
        pass: false,
        errors: {
            firstName: 'The first name field must be at least 2 characters.',
            lastName: 'The last name field must be at least 2 characters.',
        },
        data: {
            firstName: 'a',
            lastName: 'b',
        },
    })
})
