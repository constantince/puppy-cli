export declare type OrdersType = 'help' | 'create' | 'install' | 'list';
export interface OrderItem {
    name: string;
    abbreviation: string;
    description: string;
    path: string;
    type: string;
}
export declare type OrderList = {
    [K in OrdersType]: OrderItem;
};
export declare type BaseOrder = {
    source: {
        native: OrderList;
        custom: {
            [k in string]: OrderItem;
        };
    };
    version: string;
};
export declare type Register = {
    (commander: string, config: OrderItem, desc: string): void;
};
export declare type FindOrder = {
    (rawCmd?: string): OrdersType;
};
export declare type Options<T, K extends keyof T> = {
    (obj: T, key: T): T[K];
};
export declare type CreateCmdList = 'plugins' | 'generator' | 'test';
