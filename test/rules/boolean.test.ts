import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'

const rules: Rules = {
    value: 'boolean',
}
const passed = [
    { value: true },
    { value: false },
    { value: 1 },
    { value: 0 },
    { value: '1' },
    { value: '0' },
]
const failed = [
    { value: 'yes' },
    { value: 'no' },
    { value: 3 },
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
