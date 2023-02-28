declare const rules: {
    /**
    * The field under validation must be present in the input data and not empty.
    * A field is "empty" if it meets one of the following criteria:
    * The value is null or undefined, an empty string (''), an empty array ([]), an empty object ({}).
    */
    required({ value }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must be present and not empty if the anotherfield field is equal to any value.
     */
    required_if({ value, data, args }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must be present and not empty unless the anotherfield field is equal to any value.
     */
    required_unless({ value, data, args }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must be a number or a numeric string.
     */
    numeric({ value }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must have a minimum value.
     * For string data, value corresponds to the number of characters.
     * For numeric data, value corresponds to a given integer value.
     * For an array, size corresponds to the `length` of the array.
     */
    min({ value, args }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must be less than or equal to a maximum value.
     * For string data, value corresponds to the number of characters.
     * For numeric data, value corresponds to a given integer value.
     * For an array, size corresponds to the `length` of the array.
     */
    max({ value, args }: import("./types").RuleParams): boolean;
    /**
     * The field under this rule must be entirely alphabetic characters.
     */
    alpha({ value }: import("./types").RuleParams): boolean;
    /**
     * The field under this rule must be entirely alpha-numeric characters.
     */
    alpha_num({ value }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must be included in the given list of values
     */
    in({ value, args }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must not be included in the given list of values.
     */
    not_in({ value, args }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must be formatted as an email address.
     */
    email({ value }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must be a valid URL.
     */
    url({ value }: import("./types").RuleParams): boolean;
    /**
     * The given field must match the field under validation.
     */
    same({ value, data, args }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must have a different value than field.
     */
    different({ value, data, args }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must start with the given value or one of the given values (separated by comma).
     */
    starts_with({ value, args }: import("./types").RuleParams): boolean;
    /**
     * The field under validation must end with the given value or one of the given values (separated by comma).
     */
    ends_with({ value, args }: import("./types").RuleParams): boolean;
};
export default rules;
