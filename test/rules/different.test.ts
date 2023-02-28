import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    old_password: 'required',
    new_password: 'different:old_password',
}
const passed = [
    { old_password: 'secret', new_password: 'supersecret' },
]
const failed = [
    { old_password: 'secret', new_password: 'secret' },
    { old_password: '', new_password: '' },
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
