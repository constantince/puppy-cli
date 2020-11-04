type OrdersType = 'create' | 'make' | 'do' | 'use';

export type OrderList = {
    [K in OrdersType]: string[]
}