// src/utils.ts
function empty(value) {
  if (value === null || value === void 0) {
    return true;
  } else if (typeof value === "string" && value.trim() === "") {
    return true;
  } else if (Array.isArray(value) && value.length === 0) {
    return true;
  } else if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  } else {
    return false;
  }
}
function getValue(key, data) {
  let value = data;
  for (const part of key.split(".")) {
    if (part in value) {
      value = value[part];
    } else {
      return void 0;
    }
  }
  return value;
}
function getValueBetweenDots(str) {
  const matches = str.match(/^.*?\.(.*?)\..*?$/);
  if (matches && matches.length > 1) {
    return matches[1];
  } else {
    return null;
  }
}
function isPathInItems(path, items) {
  return items.some((item) => item.path === path);
}
function splitStringByCase(str) {
  const parts = str.split(/[_]|(?=[A-Z])/);
  const filteredParts = parts.filter((part) => part !== null && part !== "");
  return filteredParts;
}
function convertToReadableFieldNames(fieldName) {
  fieldName = fieldName.split(".").slice(-1)[0];
  fieldName = splitStringByCase(fieldName);
  fieldName = fieldName.map((i) => i.toLowerCase());
  fieldName = fieldName.filter((i) => i !== "id");
  fieldName = fieldName.join(" ");
  return fieldName;
}
function getCustomAttribute(path, customAttributes) {
  const regex = /^.*\.\d+\..*$/;
  if (regex.test(path) && !customAttributes[path]) {
    path = path.replace(/\.\d+\./, ".*.");
  }
  return customAttributes[path];
}
function defineProperties(obj, properties) {
  for (const [key, value] of Object.entries(properties)) {
    properties[key] = {
      value,
      writable: true,
      enumerable: true
    };
  }
  Object.defineProperties(obj, properties);
}
var utils = {
  empty,
  getValue,
  getValueBetweenDots,
  isPathInItems,
  splitStringByCase,
  convertToReadableFieldNames,
  getCustomAttribute
};
var utils_default = utils;

// src/rules.ts
var rules = {
  /**
  * The field under validation must be present in the input data and not empty.
  * A field is "empty" if it meets one of the following criteria:
  * The value is null or undefined, an empty string (''), an empty array ([]), an empty object ({}).
  */
  required({ value }) {
    return !empty(value);
  },
  /**
   * The field under validation must be present and not empty if the anotherfield field is equal to any value.
   */
  required_if({ value, data, args }) {
    if (!empty(value)) {
      return true;
    }
    const field = args.split(",");
    const key = field[0];
    const val = field[1];
    return getValue(key, data) !== val;
  },
  /**
   * The field under validation must be present and not empty unless the anotherfield field is equal to any value.
   */
  required_unless({ value, data, args }) {
    const field = args.split(",");
    const key = field[0];
    const val = field[1];
    if (getValue(key, data) === val) {
      return true;
    }
    return !empty(value);
  },
  /**
   * The field under validation must be a number or a numeric string.
   */
  numeric({ value }) {
    return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
  },
  /**
   * The field under validation must have a minimum value.
   * For string data, value corresponds to the number of characters.
   * For numeric data, value corresponds to a given integer value.
   * For an array, size corresponds to the `length` of the array.
   */
  min({ value, args }) {
    const minLength = args;
    if (typeof value === "string") {
      return this.numeric({ value, data: {} }) ? value >= minLength : value.length >= minLength;
    } else if (typeof value === "number") {
      return value >= minLength;
    } else if (Array.isArray(value)) {
      return value.length >= minLength;
    } else {
      return false;
    }
  },
  /**
   * The field under validation must be less than or equal to a maximum value.
   * For string data, value corresponds to the number of characters.
   * For numeric data, value corresponds to a given integer value.
   * For an array, size corresponds to the `length` of the array.
   */
  max({ value, args }) {
    const maxLength = args;
    if (typeof value === "string") {
      return this.numeric({ value, data: {} }) ? value <= maxLength : value.length <= maxLength;
    } else if (typeof value === "number") {
      return value <= maxLength;
    } else if (Array.isArray(value)) {
      return value.length <= maxLength;
    } else {
      return false;
    }
  },
  /**
   * The field under this rule must be entirely alphabetic characters.
   */
  alpha({ value }) {
    if (typeof value !== "string") {
      return false;
    }
    const lettersOnly = /^[a-zA-Z]+$/.test(value);
    return lettersOnly;
  },
  /**
   * The field under this rule must be entirely alpha-numeric characters.
   */
  alpha_num({ value }) {
    if (typeof value !== "string") {
      return false;
    }
    const alphaNumeric = /^[a-zA-Z0-9]+$/.test(value);
    return alphaNumeric;
  },
  /**
   * The field under validation must be included in the given list of values
   */
  in({ value, args }) {
    const array = args.split(",");
    const index = array.indexOf(`${value}`);
    return index !== -1;
  },
  /**
   * The field under validation must not be included in the given list of values.
   */
  not_in({ value, args }) {
    const array = args.split(",");
    const index = array.indexOf(`${value}`);
    return index === -1;
  },
  /**
   * The field under validation must be formatted as an email address.
   */
  email({ value }) {
    const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    return emailRegex.test(value);
  },
  /**
   * The field under validation must be a valid URL.
   */
  url({ value }) {
    const urlRegex = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}|localhost)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i;
    return urlRegex.test(value);
  },
  /**
   * The given field must match the field under validation.
   */
  same({ value, data, args }) {
    return getValue(args, data) === value;
  },
  /**
   * The field under validation must have a different value than field.
   */
  different({ value, data, args }) {
    return getValue(args, data) !== value;
  },
  /**
   * The field under validation must start with the given value or one of the given values (separated by comma).
   */
  starts_with({ value, args }) {
    for (const arg of args.split(",")) {
      if (value.startsWith(arg)) {
        return true;
      }
    }
    return false;
  },
  /**
   * The field under validation must end with the given value or one of the given values (separated by comma).
   */
  ends_with({ value, args }) {
    for (const arg of args.split(",")) {
      if (value.endsWith(arg)) {
        return true;
      }
    }
    return false;
  },
  /**
   * The field under validation must be a valid boolean representation.
   * Accepted input are true, false, 1, 0, "1", and "0".
   */
  boolean({ value }) {
    const type = typeof value;
    switch (type) {
      case "boolean":
        return true;
      case "number":
        return [0, 1].includes(value);
      case "string":
        return ["0", "1"].includes(value);
      default:
        return false;
    }
  }
};
var rules_default = rules;

// src/config.ts
var config = {
  convertToReadableFieldNames: true,
  convertToReadableFieldNamesFunction: convertToReadableFieldNames,
  ruleSeparator: "|"
};
var config_default = config;

// src/messages.ts
var messages = {
  invalid({ attribute }) {
    return `The ${attribute} field is invalid.`;
  },
  required({ attribute }) {
    return `The ${attribute} field is required.`;
  },
  required_if({ attribute }) {
    return `The ${attribute} field is required.`;
  },
  required_unless({ attribute }) {
    return `The ${attribute} field is required.`;
  },
  numeric({ attribute }) {
    return `The ${attribute} field must be a number.`;
  },
  min({ attribute, value, args }) {
    if (rules_default.numeric({ value, data: {} })) {
      return `The ${attribute} field must be at least ${args}.`;
    }
    if (Array.isArray(value)) {
      return `The ${attribute} field must have at least ${args} items.`;
    }
    return `The ${attribute} field must be at least ${args} characters.`;
  },
  max({ attribute, value, args }) {
    if (rules_default.numeric({ value, data: {} })) {
      return `The ${attribute} field must not be greater than ${args}.`;
    }
    if (Array.isArray(value)) {
      return `The ${attribute} field must not have more than ${args} items.`;
    }
    return `The ${attribute} field must not be greater than ${args} characters.`;
  },
  alpha({ attribute }) {
    return `The ${attribute} field must only contain letters.`;
  },
  alpha_num({ attribute }) {
    return `The ${attribute} field must only contain letters and numbers.`;
  },
  in({ attribute }) {
    return `The selected ${attribute} is invalid.`;
  },
  not_in({ attribute }) {
    return `The selected ${attribute} is invalid.`;
  },
  email({ attribute }) {
    return `The ${attribute} field must be a valid email address.`;
  },
  url({ attribute }) {
    return `The ${attribute} field must be a valid URL.`;
  },
  same({ attribute, args }) {
    return `The ${attribute} and ${args} must match.`;
  },
  different({ attribute, args }) {
    return `The ${attribute} and ${args} must be different.`;
  },
  starts_with({ attribute, args }) {
    const argv = args;
    return `The ${attribute} must start with ${argv.includes(",") ? `one of the following: ${argv.split(",").join(", ")}` : argv}.`;
  },
  ends_with({ attribute, args }) {
    const argv = args;
    return `The ${attribute} must end with ${argv.includes(",") ? `one of the following: ${argv.split(",").join(", ")}` : argv}.`;
  },
  boolean({ attribute }) {
    return `The ${attribute} field must be true or false.`;
  }
};
var messages_default = messages;

// src/attributes.ts
var attributes = {
  email: "email address"
};
var attributes_default = attributes;

// src/validate.ts
var setConfig = (customConfigs) => {
  defineProperties(config_default, customConfigs);
};
var setRule = (customRules) => {
  defineProperties(rules_default, customRules);
};
var setMessage = (customMessages) => {
  defineProperties(messages_default, customMessages);
};
var setAttribute = (customAttributes) => {
  defineProperties(attributes_default, customAttributes);
};
var validator = rules_default;
async function validate(rules2, data) {
  const items = [];
  for (const [key, rule] of Object.entries(rules2)) {
    let type = "";
    type = key.includes(".") ? /\..*\./.test(key) ? "arrayOfObject" : "object" : "string";
    switch (type) {
      case "string":
        items.push({
          path: key,
          value: data[key],
          rules: rule
        });
        break;
      case "object":
        items.push({
          path: key,
          value: getValue(key, data),
          rules: rule
        });
        break;
      case "arrayOfObject":
        const index = getValueBetweenDots(key);
        if (index !== "*") {
          items.push({
            path: key,
            value: getValue(key, data),
            rules: rule
          });
        } else {
          const keys = key.split(".");
          const firstKey = keys[0];
          const lastKey = keys[2];
          const dataItems = firstKey in data && data[firstKey].length ? data[firstKey] : [{}];
          for (const [index2, val] of Object.entries(dataItems)) {
            const item = val;
            const path = `${firstKey}.${index2}.${lastKey}`;
            if (!isPathInItems(path, items)) {
              items.push({
                path,
                value: item[lastKey],
                rules: rule.replace(".*.", `.${index2}.`)
              });
            }
          }
        }
        break;
    }
  }
  const errors = {};
  for (const item of items) {
    const { path, rules: rules3, value } = item;
    for (const rule of rules3.split(config_default.ruleSeparator)) {
      const [ruleName, ruleArgs] = rule.split(":");
      if (!(path in errors) && ruleName in validator) {
        let valid = false;
        if (!ruleName.startsWith("required") && empty(value)) {
          valid = true;
        } else {
          valid = await validator[ruleName]({
            data,
            value,
            args: ruleArgs
          });
        }
        if (!valid) {
          let getMessage = messages_default.invalid;
          const customMessagePath = `${path}.${ruleName}`;
          const customMessagePathAsterisk = `${path.replace(/\.\d+\./, ".*.")}.${ruleName}`;
          if (customMessagePath in messages_default) {
            getMessage = messages_default[customMessagePath];
          } else if (customMessagePathAsterisk in messages_default) {
            getMessage = messages_default[customMessagePathAsterisk];
          } else if (ruleName in messages_default) {
            getMessage = messages_default[ruleName];
          }
          errors[path] = typeof getMessage === "string" ? getMessage : await getMessage({
            attribute: getCustomAttribute(path, attributes_default) || (config_default.convertToReadableFieldNames ? config_default.convertToReadableFieldNamesFunction(path) : path),
            value,
            args: ruleArgs
          });
        }
      }
    }
  }
  const pass = Object.keys(errors).length === 0;
  return { pass, errors, data };
}

// src/index.ts
var sinoval = {
  validate,
  setConfig,
  setRule,
  setMessage,
  setAttribute,
  rules: rules_default,
  utils: utils_default
};
var src_default = sinoval;
export {
  src_default as default
};
