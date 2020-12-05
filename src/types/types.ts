export type OrdersType = 'help' | 'create' | 'install' | 'list';


export interface OrderItem {
    name: string,
    abbreviation: string,
    description: string,
    path: string,
    type: string,
    params: string
}

export type NativeFunc = {
    (params: string): Promise<boolean>
}

export type CustomFunc = {
    (f: RegisterFn): Promise<boolean>
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

export type InstallModuleType = 'plugins' | 'generator' | 'test';
export const InstallModuleType = ['plugins', 'generator', 'test'];

export type CreateCmdList  = 'plugins' | 'generator' | 'test';