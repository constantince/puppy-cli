export type OrdersType = 'plugin' | 'create' | 'do' | 'use' | 'help';

export interface OrderItem {
    abbreviation: string,
    description: string,
    path: string,
    core: boolean
}

export type OrderList = {
    [K in OrdersType]: OrderItem
}

export type BaseOrder = {
    source: {
        native: OrderList,
        plugins: object
    },
    version: string
}

export type Register = {
    (commander: string, config: OrderItem, excute: () => void) : void
}

export type FindOrder = {
    (rawCmd?: string): OrdersType
}

export type Options<T, K extends keyof T> = {
    (obj: T, key: T): T[K]
}