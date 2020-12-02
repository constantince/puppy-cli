export type OrdersType = 'help' | 'create' | 'install' | 'list';


export interface OrderItem {
    name: string,
    abbreviation: string,
    description: string,
    path: string,
    type: string
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

export type RegisterFn = {
    (cmd: string[], log: Require, desc: string) : void
}

export type Require = {
    (cmd: string[]): void
}

export type CreateCmdList  = 'plugins' | 'generator' | 'test';