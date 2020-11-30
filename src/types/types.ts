export type OrdersType = 'help' | 'create' | 'install' | 'list';


export interface OrderItem {
    abbreviation: string,
    description: string,
    path: string,
    type: string
}

export type OrderList = {
    [K in OrdersType]: OrderItem
}

export type BaseOrder = {
    source: {
        native: OrderList,
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
    (rawCmd?: string): OrdersType
}

export type Options<T, K extends keyof T> = {
    (obj: T, key: T): T[K]
}

export type CreateCmdList  = 'plugins' | 'generator' | 'test';