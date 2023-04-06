import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'

const rules: Rules = {
    value: 'max_filesize:2MB',
}
const passed = [
    { value: 2000000 },
    { value: 1000000 },
]
const failed = [
    { value: 2000001 },
    { value: 3000000 },
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
