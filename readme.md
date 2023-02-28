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
