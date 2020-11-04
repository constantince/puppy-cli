declare type OrdersType = 'create' | 'make' | 'do' | 'use';
export declare type OrderList = {
    [K in OrdersType]: string[];
};
export {};
