import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
sinoval.setConfig({
    convertToReadableFieldNames: false,
})
const rules: Rules = {
    firstName: 'required',
    lastName: 'required',
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
