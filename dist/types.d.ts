export interface Items {
    path: string;
    value: any;
    rules: string;
}
export interface RuleParams {
    value: unknown;
    data: Data;
    args?: unknown;
}
export type RuleFunction = (params: RuleParams) => Promise<boolean> | boolean;
export interface MessageParams {
    value: unknown;
    data: Data;
    args?: unknown;
    attribute: string;
}
export type MessageFunction = string | ((params: MessageParams) => Promise<string> | string);
export interface ValidatorConfig {
    convertToReadableFieldNames: boolean;
    ruleSeparator: string;
    convertToReadableFieldNamesFunction: (fieldName: any) => string;
}
export type Rules = Record<string, string>;
export type Data = Record<string, any>;
