import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
sinoval.setConfig({
    convertToReadableFieldNames: false,
    ruleSeparator: '&',
})
const rules: Rules = {
    firstName: 'required&min:2',
    lastName: 'required&min:2',
}
test('disable convertToReadableFieldNames', async () => {
    await expect(sinoval.validate(rules, {})).resolves.toEqual({
        pass: false,
        errors: {
            firstName: 'The firstName field is required.',
            lastName: 'The lastName field is required.',
        },
        data: {},
    })
})
test('change rule separator to "&"', async () => {
    await expect(sinoval.validate(rules, {
        firstName: 'a',
        lastName: 'b',
    })).resolves.toEqual({
        pass: false,
        errors: {
            firstName: 'The firstName field must be at least 2 characters.',
            lastName: 'The lastName field must be at least 2 characters.',
        },
        data: {
            firstName: 'a',
            lastName: 'b',
        },
    })
})
