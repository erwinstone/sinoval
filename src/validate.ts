/* eslint-disable no-case-declarations */
import config from './config'
import rules from './rules'
import messages from './messages'
import attributes from './attributes'
import { defineProperties, empty, getCustomAttribute, getValue, getValueBetweenDots, isPathInItems, transformData } from './utils'
import type { Data, Items, MessageFunction, RuleFunction, RuleReturn, Rules, ValidatorConfig } from './types'
export const setConfig = (customConfigs: Partial<ValidatorConfig>) => {
    defineProperties(config, customConfigs)
}
export const setRule = (customRules: Record<string, RuleFunction>) => {
    defineProperties(rules, customRules)
}
export const setMessage = (customMessages: Record<string, MessageFunction>) => {
    defineProperties(messages, customMessages)
}
export const setAttribute = (customAttributes: Record<string, string>) => {
    defineProperties(attributes, customAttributes)
}
const validator = rules
export default async function validate<D extends Data>(rules: Rules, data: D) {
    const items = [] as Items[]
    for (const [key, rule] of Object.entries(rules)) {
        let type = '' as 'string' | 'object' | 'arrayOfObject'
        type = key.includes('.') ? /\..*\./.test(key) ? 'arrayOfObject' : 'object' : 'string'
        switch (type) {
            case 'string':
                items.push({
                    path: key,
                    value: data[key],
                    rules: rule,
                })
                break
            case 'object':
                items.push({
                    path: key,
                    value: getValue(key, data),
                    rules: rule,
                })
                break
            case 'arrayOfObject':
                const index = getValueBetweenDots(key) as string
                if (index !== '*') {
                    items.push({
                        path: key,
                        value: getValue(key, data),
                        rules: rule,
                    })
                }
                else {
                    const keys = key.split('.')
                    const firstKey = keys[0]
                    const lastKey = keys[2]
                    const dataItems = (firstKey in data && data[firstKey].length) ? data[firstKey] : [{}]
                    for (const [index, val] of Object.entries(dataItems)) {
                        const item = val as Record<string, any>
                        const path = `${firstKey}.${index}.${lastKey}`
                        if (!isPathInItems(path, items)) {
                            items.push({
                                path,
                                value: item[lastKey],
                                rules: rule.replace('.*.', `.${index}.`),
                            })
                        }
                    }
                }
                break
        }
    }
    const errors = {} as Record<string, string>
    for (const item of items) {
        const { path, rules, value } = item
        for (const rule of rules.split(config.ruleSeparator)) {
            const [ruleName, ruleArgs] = rule.split(':')
            if (!(path in errors) && ruleName in validator) {
                let valid: RuleReturn = { pass: false }
                if (!ruleName.startsWith('required') && empty(value)) {
                    valid = { pass: true }
                }
                else {
                    valid = await validator[ruleName]({
                        data,
                        value,
                        args: ruleArgs,
                    })
                }
                if (!valid.pass) {
                    let getMessage = messages.invalid
                    const customMessagePath = `${path}.${ruleName}`
                    const customMessagePathAsterisk = `${path.replace(/\.\d+\./, '.*.')}.${ruleName}`
                    if (customMessagePath in messages) {
                        getMessage = messages[customMessagePath]
                    }
                    else if (customMessagePathAsterisk in messages) {
                        getMessage = messages[customMessagePathAsterisk]
                    }
                    else if (ruleName in messages) {
                        getMessage = messages[ruleName]
                    }
                    errors[path] = typeof getMessage === 'string'
                        ? getMessage
                        : await getMessage({
                            attribute: getCustomAttribute(path, attributes) || (config.convertToReadableFieldNames ? config.convertToReadableFieldNamesFunction(path) : path),
                            value,
                            args: ruleArgs,
                            data,
                            extra: valid.extra,
                        })
                }
            }
        }
    }
    const pass = Object.keys(errors).length === 0
    return { pass, errors, data: transformData(items) }
}
