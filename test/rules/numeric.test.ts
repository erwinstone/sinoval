import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    value: 'numeric',
}
const passed = [
    '123',
    '00123',
    '-00123',
    '0',
    '-0',
    '+123',
    '123.123',
    '+000000',
    123,
]
const failed = [
    '.',
    'abc',
    'abc123',
    NaN,
]
for (const value of passed) {
    test(JSON.stringify(value), async () => {
        await expect(sinoval.validate(rules, { value })).resolves.toMatchObject({ pass: true })
    })
}
for (const value of failed) {
    test(JSON.stringify(value), async () => {
        await expect(sinoval.validate(rules, { value })).resolves.toMatchObject({ pass: false })
    })
}
