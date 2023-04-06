import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'

const rules: Rules = {
    value: 'min:3',
}
const passed = [
    { value: 'user' },
    { value: 3 },
    { value: ['one', 'two', 'three'] },
]
const failed = [
    { value: 'aa' },
    { value: 2 },
    { value: ['one', 'two'] },
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
