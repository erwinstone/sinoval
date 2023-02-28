# sinoval
Sinoval (Simple Node.js Validator) is a simple and easy-to-use node.js validator.
## Features
- Easy to use
- Chaining validation rules
- Customizable validation rules
- Customizable error messages
- Customizable attributes
## Installation
```bash
npm install sinoval
```
## Usage/Examples
```javascript
import sinoval from 'sinoval'

const rules = {
    'name': 'required|min:2|alpha_num',
    'email': 'required|email',
    'phone_number': 'starts_with:+62,08',
    'password': 'required|min:6',
    'password_confirmation': 'required|same:password',
    'shipping.method': 'required|is_in:regular,express',
    'shipping.address': 'required',
    'product.*.name': 'required',
    'product.*.qty': 'required|numeric|max:10',
    'attendanceType:': 'required',
    'location:': 'required_if:attendanceType,in-person',
    'sub_domain': 'required|ends_with:.example.com',
    'old_password': 'required',
    'new_password': 'required|different:old_password',
}

const data = {}

const validator = await sinoval.validate(rules, data)
```
## Available rules
 - required

    The field under validation must be present in the input data and not empty. A field is "empty" if it meets one of the following criteria:
    - The value is null or undefined
    - An empty string ('')
    - An empty array ([])
    - An empty object ({}).

 - required_if:anotherfield,value

    The field under validation must be present and not empty if the anotherfield field is equal to any value. Example:

    `location: 'required_if:attendanceType,in-person'`

 - required_unless:anotherfield,value

    The field under validation must be present and not empty unless the anotherfield field is equal to any value. Example:

    `location: 'required_unless:attendance_type,online'`

 - numeric

    The field under validation must be a number or a numeric string.

 - min:value

    The field under validation must have a minimum value.

    For string data, value corresponds to the number of characters.

    For numeric data, value corresponds to a given integer value.

    For an array, size corresponds to the `length` of the array.

 - max:value

    The field under validation must be less than or equal to a maximum value.

    For string data, value corresponds to the number of characters.

    For numeric data, value corresponds to a given integer value.

    For an array, size corresponds to the `length` of the array.

 - alpha

    The field under this rule must be entirely alphabetic characters.

 - alpha_num

    The field under this rule must be entirely alpha-numeric characters.

 - in:value1,value2

    The field under validation must be included in the given list of values.

 - not_in:value1,value2

    The field under validation must not be included in the given list of values.

 - email

    The field under validation must be formatted as an email address.

 - url

    The field under validation must be a valid URL.

 - same:anotherfield

    The given field must match the field under validation.

 - different:anotherfield

    The field under validation must have a different value than field.

 - starts_with:value1,value2

    The field under validation must start with the given value or one of the given values (separated by comma).

 - ends_with:value1,value2

    The field under validation must end with the given value or one of the given values (separated by comma).

## Custom rules
```javascript
sinoval.setRule({
    exists: async ({ value, args }) => {
        const argv = args.split(',')
        const table = argv[0]
        const field = argv[1]
        const exist = await db(table).where(field, value).first()
        return exist !== undefined
    },
    uppercase: ({ value }) => value === value.toUpperCase(),
    archive: ({ value }) => {
        const extensions = ['.7z', '.rar', '.tar.gz', '.zip']
        for (const ext of extensions) {
            if (value.endsWith(ext)) {
                return true
            }
        }
        return false
    },
    exist: async ({ value })
})
const rules = {
    username: 'required|exists:users,username',
    country: 'required|uppercase',
    file: 'archive',
}
```
## Custom messages
```javascript
sinoval.setMessage({
    'required': ({ attribute }) => `The ${attribute} field cannot be empty.`,
    'email.required': 'We need to know your email address!',
})
```
## Custom attributes
```javascript
sinoval.setAttribute({
    zip: 'zip code',
})
```
## Configuration
```javascript
// Example
console.log(await sinoval.validate({ firstName: 'required|min:2'}, {}))
// Will produce:
// {
//     ...
//     errors: {
//         firstName: 'The first name field is required.'
//     },
// }
sinoval.setConfig({
    convertToReadableFieldNames: false,
    ruleSeparator: '&',
})
console.log(await sinoval.validate({ firstName: 'required&min:2'}, {}))
// Will produce:
// {
//     ...
//     errors: {
//         firstName: 'The firstName field is required.'
//     },
// }
```
## License
[MIT](https://github.com/erwinstone/sinoval/blob/main/LICENSE)
