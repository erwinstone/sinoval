import type { Data, MessageFunction, RuleFunction, Rules, ValidatorConfig } from './types';
export declare function setConfig(customConfigs: Partial<ValidatorConfig>): void;
export declare function setRule(customRules: Record<string, RuleFunction>): void;
export declare function setMessage(customMessages: Record<string, MessageFunction>): void;
export declare function setAttribute(customAttributes: Record<string, string>): void;
export default function validate<D extends Data>(rules: Rules, data: D): Promise<{
    pass: boolean;
    errors: Record<string, string>;
    data: any;
}>;
