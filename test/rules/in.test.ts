import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    value: 'in:red,green,blue',
}
const passed = [
    { value: 'red' },
    { value: 'green' },
    { value: 'blue' },
]
const failed = [
    { value: 'yellow' },
    { value: 'cyan' },
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
