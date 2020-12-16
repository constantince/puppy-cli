export type OrdersType = 'help' | 'create' | 'install' | 'list';
export type CreateItemsOptions  = 'plugins' | 'generator' | 'test';
export const CreateItemsOptions = ['plugins', 'generator', 'test'];

export type CreatePromiseLike <T, U> = {
    (params: T): Promise<U>
}

export type NativeCommandFunctions = CreatePromiseLike<string, boolean>;

export type NativeFunc = NativeCommandFunctions;

export type CustomFunc = CreatePromiseLike<RegisterFn, boolean>;


export interface OrderItem {
    name: string,
    abbreviation: string,
    description: string,
    path: string,
    type: string,
    params: string
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
    [k in 'abbreviation' | 'params' | 'description']: string
}

type CmdDesctions = {
    name: string,
    path: string,
} & Partial<Cms>;

export type RegisterFn = {
    (customCmd: CmdDesctions, moduleFunction: ModuleFunction, desc: string) : any
}

export type ModuleFunction = {
    (paramsStdin: string): void
}



