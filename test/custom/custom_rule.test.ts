import { expect, test } from 'vitest'
import type { Rules } from '../../src/index'
import sinoval from '../../src/index'
sinoval.setRule({
    uppercase: ({ value }) => value === (value as string).toUpperCase(),
    archive: ({ value }) => {
        const extensions = ['.7z', '.rar', '.tar.gz', '.zip']
        for (const ext of extensions) {
            if ((value as string).endsWith(ext)) {
                return true
            }
        }
        return false
    },
})
const rules: Rules = {
    value: 'uppercase',
    file: 'archive',
}
const passed = [
    { value: 'THE VALUE', file: 'invoices.zip' },
    { value: 'THE VALUE', file: 'invoices.tar.gz' },
]
const failed = [
    { value: 'the value' },
    { value: 'The Value' },
    { value: 'THE VALUE', file: 'invoices.pdf' },
    { value: 'THE VALUE', file: 'invoices.xls' },
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
