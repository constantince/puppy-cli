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
        plugins: {
            [k in string]: OrderItem;
        };
    };
    version: string;
};
export declare type Register = {
    (commander: string, config: OrderItem, excute: () => void): void;
};
export declare type FindOrder = {
    (rawCmd?: string): OrdersType;
};
export declare type Options<T, K extends keyof T> = {
    (obj: T, key: T): T[K];
};
