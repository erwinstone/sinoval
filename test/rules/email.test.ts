import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    value: 'email',
}
const passed = [
    { value: 'user@example.com' },
    { value: 'user@example.co.id' },
    { value: 'user@localhost' },
]
const failed = [
    { value: 'user' },
    { value: 'user@' },
    { value: 'example.com' },
    { value: '@example.com' },
    { value: '@localhost' },
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
