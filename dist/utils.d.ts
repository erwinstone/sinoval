import type { Items } from './types';
/**
* The function checks if the value is "empty".
* A value is "empty" if it meets one of the following criteria:
* The value is null or undefined, an empty string (''), an empty array ([]), an empty object ({}).
*/
export declare function empty(value: any): boolean;
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
export declare function getValue(key: string, data: Record<string, any>): unknown;
/**
 * The function extracts the substring between the first and second dots in a given string, and returns the extracted substring or null if the string does not contain at least two dots.
 * @example
 * getValueBetweenDots('items.1.name') // 1
 * getValueBetweenDots('items.*.name') // *
 */
export declare function getValueBetweenDots(str: string): string;
/**
 * The function returns a boolean indicating whether a given path string matches the path property of at least one object in an array of items.
 */
export declare function isPathInItems(path: string, items: Items[]): boolean;
/**
 * Splits a string by either snake case or camel case.
 */
export declare function splitStringByCase(str: string): string[];
/**
 * Converts a field name to a more readable format by splitting it by case and removing the 'id' suffix (if present).
 */
export declare function convertToReadableFieldNames(fieldName: any): string;
/**
 * Retrieving custom attribute values based on a given path
 */
export declare function getCustomAttribute(path: string, customAttributes: Record<string, string>): string;
/**
 * Defines a new property directly on an object or modifies an existing property on an object,
 */
export declare function defineProperties(obj: unknown, properties: Record<any, any>): void;
declare const utils: {
    empty: typeof empty;
    getValue: typeof getValue;
    getValueBetweenDots: typeof getValueBetweenDots;
    isPathInItems: typeof isPathInItems;
    splitStringByCase: typeof splitStringByCase;
    convertToReadableFieldNames: typeof convertToReadableFieldNames;
    getCustomAttribute: typeof getCustomAttribute;
};
export default utils;
