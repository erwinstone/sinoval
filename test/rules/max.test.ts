import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'

const rules: Rules = {
    value: 'max:5',
}
const passed = [
    { value: 'user' },
    { value: 5 },
    { value: ['one', 'two', 'three'] },
]
const failed = [
    { value: 'superuser' },
    { value: 6 },
    { value: ['one', 'two', 'three', 'four', 'five', 'six'] },
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
