import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'

const rules: Rules = {
    value: 'url',
}
const passed = [
    { value: 'http://example.com' },
    { value: 'http://example.com/user/profile' },
    { value: 'https://example.com' },
    { value: 'https://example.com/user/profile' },
    { value: 'http://localhost' },
]
const failed = [
    { value: 'example.com' },
    { value: 'localhost' },
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
