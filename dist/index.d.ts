import validate from './validate';
export type { Data, Rules } from './types';
declare const sinoval: {
    validate: typeof validate;
    setConfig: (customConfigs: Partial<import("./types").ValidatorConfig>) => void;
    setRule: (customRules: Record<string, import("./types").RuleFunction>) => void;
    setMessage: (customMessages: Record<string, import("./types").MessageFunction>) => void;
    setAttribute: (customAttributes: Record<string, string>) => void;
    rules: typeof import("./rules").default;
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
