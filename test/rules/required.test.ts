import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    value: 'required',
}
const passed = [
    { value: 'the value' },
    { value: ['the value'] },
    { value: { key: 'the value' } },
]
const failed = [
    {},
    { value: '' },
    { value: null },
    { value: [] },
    { value: {} },
]
for (const value of passed) {
    test(JSON.stringify(value), async () => {
        await expect(sinoval.validate(rules, value)).resolves.toMatchObject({ pass: true })
    })
}
for (const value of failed) {
    test(JSON.stringify(value), async () => {
        await expect(sinoval.validate(rules, value)).resolves.toMatchObject({ pass: false })
    })
}
