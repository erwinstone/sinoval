import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    password: 'required',
    password_confirmation: 'same:password',
}
const passed = [
    { password: 'secret', password_confirmation: 'secret' },
]
const failed = [
    { password: 'supersecret', password_confirmation: 'secret' },
    { password: '', password_confirmation: '' },
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
