import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
sinoval.setAttribute({
    zip: 'zip code',
})
const rules: Rules = {
    address: 'required',
    zip: 'required',
}
test('"zip" to "zip code"', async () => {
    await expect(sinoval.validate(rules, {})).resolves.toEqual({
        pass: false,
        errors: {
            address: 'The address field is required.',
            zip: 'The zip code field is required.',
        },
        data: {},
    })
})
