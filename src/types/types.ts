type OrdersType = 'create' | 'make' | 'do';

export type OrderList = {
    [K in OrdersType]: string[]
}