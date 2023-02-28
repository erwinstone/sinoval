import type { Data, MessageFunction, RuleFunction, Rules, ValidatorConfig } from './types';
export declare const setConfig: (customConfigs: Partial<ValidatorConfig>) => void;
export declare const setRule: (customRules: Record<string, RuleFunction>) => void;
export declare const setMessage: (customMessages: Record<string, MessageFunction>) => void;
export declare const setAttribute: (customAttributes: Record<string, string>) => void;
export default function validate<D extends Data>(rules: Rules, data: D): Promise<{
    pass: boolean;
    errors: Record<string, string>;
    data: D;
}>;
