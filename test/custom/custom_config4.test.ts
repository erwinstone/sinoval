import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
sinoval.setConfig({
    parseNumeric: false,
})
const rules: Rules = {
    value: 'required|numeric',
}
test('disable castNumeric', async () => {
    await expect(sinoval.validate(rules, { value: '123' })).resolves.toEqual({
        pass: true,
        errors: {},
        data: {
            value: '123',
        },
    })
})
