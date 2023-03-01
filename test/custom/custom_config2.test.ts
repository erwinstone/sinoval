import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
sinoval.setConfig({
    convertToReadableFieldNamesFunction: fieldName => (fieldName as string).toUpperCase(),
})
const rules: Rules = {
    firstName: 'required|min:2',
    lastName: 'required|min:2',
}
test('custom convertToReadableFieldNamesFunction', async () => {
    await expect(sinoval.validate(rules, {})).resolves.toEqual({
        pass: false,
        errors: {
            firstName: 'The FIRSTNAME field is required.',
            lastName: 'The LASTNAME field is required.',
        },
        data: {},
    })
})
