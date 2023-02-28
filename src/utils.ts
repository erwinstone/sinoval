import type { Items } from './types'
/**
* The function checks if the value is "empty".
* A value is "empty" if it meets one of the following criteria:
* The value is null or undefined, an empty string (''), an empty array ([]), an empty object ({}).
*/
export function empty(value: any): boolean {
    if (value === null || value === undefined) {
        return true
    }
    else if (typeof value === 'string' && value.trim() === '') {
        return true
    }
    else if (Array.isArray(value) && value.length === 0) {
        return true
    }
    else if (typeof value === 'object' && Object.keys(value).length === 0) {
        return true
    }
    else {
        return false
    }
}
/**
 * The function retrieves a value from a nested object using a property path represented by a string, and returns undefined if the property does not exist.
 * @example
 * const person = {
    name: "John Doe",
    address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
    }
    cart: [
        {
            name: "Product 1",
            qty: 1,
        },
        {
            name: "Product 2",
            qty: 2,
        },
    ]
}
console.log(getValue("name", person)); // "John Doe"
console.log(getValue("address.street", person)); // "123 Main St"
console.log(getValue("cart.1.qty", person)); // 2
 */
export function getValue(key: string, data: Record<string, any>) {
    let value = data
    for (const part of key.split('.')) {
        if (part in value) {
            value = value[part]
        }
        else {
            return undefined
        }
    }
    return value as unknown
}
/**
 * The function extracts the substring between the first and second dots in a given string, and returns the extracted substring or null if the string does not contain at least two dots.
 * @example
 * getValueBetweenDots('items.1.name') // 1
 * getValueBetweenDots('items.*.name') // *
 */
export function getValueBetweenDots(str: string) {
    const matches = str.match(/^.*?\.(.*?)\..*?$/)
    if (matches && matches.length > 1) {
        return matches[1]
    }
    else {
        return null
    }
}
/**
 * The function returns a boolean indicating whether a given path string matches the path property of at least one object in an array of items.
 */
export function isPathInItems(path: string, items: Items[]) {
    return items.some(item => item.path === path)
}
/**
 * Splits a string by either snake case or camel case.
 */
export function splitStringByCase(str: string): string[] {
    // Split the string by underscores (snake case) or by capital letters (camel case)
    const parts = str.split(/[_]|(?=[A-Z])/)
    // Filter out any empty or null parts
    const filteredParts = parts.filter(part => part !== null && part !== '')
    // Return the array of parts
    return filteredParts
}
/**
 * Converts a field name to a more readable format by splitting it by case and removing the 'id' suffix (if present).
 */
export function convertToReadableFieldNames(fieldName: any): string {
    // Get the last item of items separated by dots (e.g. items.*.name -> name)
    fieldName = fieldName.split('.').slice(-1)[0]
    // Split by case (e.g. userId -> ['user', 'Id'], user_id -> ['user', 'id'])
    fieldName = splitStringByCase(fieldName)
    // Lowercase all (e.g. ['user', 'Id'] -> ['user', 'id'])
    fieldName = fieldName.map((i: any) => i.toLowerCase())
    // Remove 'id' (if present)
    fieldName = fieldName.filter((i: any) => i !== 'id')
    // Join the words with spaces (e.g. ['user', 'name'] -> 'user name')
    fieldName = fieldName.join(' ')
    // Return the more readable version of the field name
    return fieldName
}
/**
 * Retrieving custom attribute values based on a given path
 */
export function getCustomAttribute(path: string, customAttributes: Record<string, string>) {
    const regex = /^.*\.\d+\..*$/
    /**
     * Check if the path parameter contains a substring with a pattern of .{number}., such as "cart.1.qty".
     * If the pattern exists and the customAttributes object does not have a key matching the path parameter,
     * then the path parameter is updated by replacing the .{number}. pattern with .*.
     */
    if (regex.test(path) && !customAttributes[path]) {
        path = path.replace(/\.\d+\./, '.*.')
    }
    return customAttributes[path]
}
/**
 * Defines a new property directly on an object or modifies an existing property on an object,
 */
export function defineProperties(obj: unknown, properties: Record<any, any>) {
    for (const [key, value] of Object.entries(properties)) {
        properties[key] = {
            value,
            writable: true,
            enumerable: true,
        }
    }
    Object.defineProperties(obj, properties)
}
const utils = {
    empty,
    getValue,
    getValueBetweenDots,
    isPathInItems,
    splitStringByCase,
    convertToReadableFieldNames,
    getCustomAttribute,
}
export default utils
