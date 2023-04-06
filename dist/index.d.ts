import validate, { setAttribute, setConfig, setMessage, setRule } from './validate';
export type { Data, Rules } from './types';
declare const sinoval: {
    validate: typeof validate;
    setConfig: typeof setConfig;
    setRule: typeof setRule;
    setMessage: typeof setMessage;
    setAttribute: typeof setAttribute;
    rules: {
        required({ value }: import("./types").RuleParams): {
            pass: boolean;
        };
        required_if({ value, data, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        required_unless({ value, data, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        numeric({ value }: import("./types").RuleParams): {
            pass: boolean;
        };
        min({ value, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        max({ value, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        max_filesize({ value, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        alpha({ value }: import("./types").RuleParams): {
            pass: boolean;
        };
        alpha_num({ value }: import("./types").RuleParams): {
            pass: boolean;
        };
        in({ value, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        not_in({ value, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        email({ value }: import("./types").RuleParams): {
            pass: boolean;
        };
        url({ value }: import("./types").RuleParams): {
            pass: boolean;
        };
        same({ value, data, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        different({ value, data, args }: import("./types").RuleParams): {
            pass: boolean;
        };
        starts_with({ value, args }: import("./types").RuleParams): {
            pass: true;
        } | {
            pass: false;
        };
        ends_with({ value, args }: import("./types").RuleParams): {
            pass: true;
        } | {
            pass: false;
        };
        boolean({ value }: import("./types").RuleParams): {
            pass: boolean;
        };
    };
    utils: {
        empty: typeof import("./utils").empty;
        getValue: typeof import("./utils").getValue;
        getValueBetweenDots: typeof import("./utils").getValueBetweenDots;
        isPathInItems: typeof import("./utils").isPathInItems;
        splitStringByCase: typeof import("./utils").splitStringByCase;
        convertToReadableFieldNames: typeof import("./utils").convertToReadableFieldNames;
        getCustomAttribute: typeof import("./utils").getCustomAttribute;
        transformData: typeof import("./utils").transformData;
        fileSizeToBytes: typeof import("./utils").fileSizeToBytes;
    };
};
export default sinoval;
