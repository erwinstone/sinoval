export interface Items {
    path: string
    value: any
    rules: string
}
export interface RuleParams {
    value: unknown
    data: Data
    args?: unknown
}
export interface RuleReturn {
    pass: boolean
    extra?: Record<string, any>
}
export type RuleFunction = (params: RuleParams) => Promise<RuleReturn> | RuleReturn
export interface MessageParams {
    value: unknown
    data: Data
    args?: unknown
    attribute: string
    extra?: Record<string, any>
}
export type MessageFunction = string | ((params: MessageParams) => Promise<string> | string)
export interface ValidatorConfig {
    convertToReadableFieldNames: boolean
    ruleSeparator: string
    convertToReadableFieldNamesFunction: (fieldName: any) => string
    parseNumeric: boolean
}
export type Rules = Record<string, string>
export type Data = Record<string, any>
