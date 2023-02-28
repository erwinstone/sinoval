import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    value: 'ends_with:.jpg,.png',
}
const passed = [
    { value: 'user.jpg' },
    { value: 'user.png' },
]
const failed = [
    { value: 'user.bmp' },
    { value: 'user.gif' },
    { value: 'userjpg' },
    { value: 'userpng' },
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
