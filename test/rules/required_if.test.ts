import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
const rules: Rules = {
    attendance_type: 'required',
    location: 'required_if:attendance_type,in-person',
}
const passed = [
    {
        attendance_type: 'in-person',
        location: 'Bali, Indonesia',
    },
    {
        attendance_type: 'online',
        location: '',
    },
]
const failed = [
    {
        attendance_type: 'in-person',
        location: '',
    },
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
