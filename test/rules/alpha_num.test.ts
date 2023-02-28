import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    value: 'alpha_num',
}
const passed = [
    { value: 'user' },
    { value: 'user2' },
    { value: '123' },
]
const failed = [
    { value: 'user_' },
    { value: '@user' },
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
