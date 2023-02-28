export interface Items {
    path: string;
    value: any;
    rules: string;
}
export interface RuleParams {
    value: unknown;
    data: Record<string, unknown>;
    args?: unknown;
}
export type RuleFunction = (params: RuleParams) => Promise<boolean> | boolean;
export interface MessageParams {
    attribute: string;
    value: unknown;
    args?: unknown;
}
export type MessageFunction = string | ((params: MessageParams) => Promise<string> | string);
export interface ValidatorConfig {
    convertToReadableFieldNames: boolean;
    ruleSeparator: string;
}
export type Rules = Record<string, string>;
export type Data = Record<string, any>;
