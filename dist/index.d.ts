import validate from './validate';
export type { Data, Rules } from './types';
declare const sinoval: {
    validate: typeof validate;
    setConfig: (customConfigs: Partial<import("./types").ValidatorConfig>) => void;
    setRule: (customRules: Record<string, import("./types").RuleFunction>) => void;
    setMessage: (customMessages: Record<string, import("./types").MessageFunction>) => void;
    setAttribute: (customAttributes: Record<string, string>) => void;
    rules: {
        required({ value }: import("./types").RuleParams): boolean;
        required_if({ value, data, args }: import("./types").RuleParams): boolean;
        required_unless({ value, data, args }: import("./types").RuleParams): boolean;
        numeric({ value }: import("./types").RuleParams): boolean;
        min({ value, args }: import("./types").RuleParams): boolean;
        max({ value, args }: import("./types").RuleParams): boolean;
        alpha({ value }: import("./types").RuleParams): boolean;
        alpha_num({ value }: import("./types").RuleParams): boolean;
        in({ value, args }: import("./types").RuleParams): boolean;
        not_in({ value, args }: import("./types").RuleParams): boolean;
        email({ value }: import("./types").RuleParams): boolean;
        url({ value }: import("./types").RuleParams): boolean;
        same({ value, data, args }: import("./types").RuleParams): boolean;
        different({ value, data, args }: import("./types").RuleParams): boolean;
        starts_with({ value, args }: import("./types").RuleParams): boolean;
        ends_with({ value, args }: import("./types").RuleParams): boolean;
    };
    utils: {
        empty: typeof import("./utils").empty;
        getValue: typeof import("./utils").getValue;
        getValueBetweenDots: typeof import("./utils").getValueBetweenDots;
        isPathInItems: typeof import("./utils").isPathInItems;
        splitStringByCase: typeof import("./utils").splitStringByCase;
        convertToReadableFieldNames: typeof import("./utils").convertToReadableFieldNames;
        getCustomAttribute: typeof import("./utils").getCustomAttribute;
    };
};
export default sinoval;
