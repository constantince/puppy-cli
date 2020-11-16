export declare type OrdersType = 'plugin' | 'create' | 'do' | 'use' | 'help';
export interface OrderItem {
    abbreviation: string;
    description: string;
    path: string;
    core: boolean;
}
export declare type OrderList = {
    [K in OrdersType]: OrderItem;
};
export declare type BaseOrder = {
    source: {
        native: OrderList;
        plugins: object;
    };
    version: string;
};
export interface Find<T> {
    (name: T): string;
}
