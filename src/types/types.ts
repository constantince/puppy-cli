export type OrdersType = 'help' | 'create' | 'install' | 'list' | 'update';
export const OrdersType = ['help', 'create', 'install', 'list', 'update'];
export type CreateItemsOptions  = 'plugins' | 'generator' | 'test';
export const CreateItemsOptions = ['plugins', 'generator', 'test'];

export type CreatePromiseLike <T, U> = {
    (...params: T[]): Promise<U>
}

export type NativeCommandFunctions = CreatePromiseLike<string, boolean>;

export type NativeFunc = NativeCommandFunctions;

export type CustomFunc = CreatePromiseLike<RegisterFn, boolean>;

export type ComParams = Partial<{
    name: string,
    abbr: string,
    desc: string
}>

export interface OrderItem {
    description: string,
    path: string,
    type: string,
    params: ComParams[]
}

export type OrderList = {
    [K in OrdersType]: OrderItem
}

export type BaseOrder<T = OrderList> = {
    source: {
        native: T,
        custom: {
            [k in string]: OrderItem
        }
    },
    version: string
}

export type Register = {
    (commander: string, config: OrderItem, desc: string) : void
}

export type FindOrder = {
    (rawCmd?: string): string
}

export type Options<T, K extends keyof T> = {
    (obj: T, key: T): T[K]
}

type Cms = {
    [k in | 'params' | 'description']: string
}

export type CmdDesctions = {
    name: string,
    path: string,
    params: [],
    type: string,
    description: string
}

export type RegisterFn = {
    (customCmd: CmdDesctions, moduleFunction: ModuleFunction, desc: string) : any
}

export type ModuleFunction = {
    (...args: Array<string>): void
}



