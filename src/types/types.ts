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