import validate from './validate';
export type { Data, Rules } from './types';
declare const sinoval: {
    validate: typeof validate;
    setConfig: (customConfigs: Partial<import("./types").ValidatorConfig>) => void;
    setRule: (customRules: Record<string, import("./types").RuleFunction>) => void;
    setMessage: (customMessages: Record<string, import("./types").MessageFunction>) => void;
    setAttribute: (customAttributes: Record<string, string>) => void;
};
export default sinoval;
