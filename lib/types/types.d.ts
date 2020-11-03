declare type OrdersType = 'create' | 'make' | 'do';
export declare type OrderList = {
    [K in OrdersType]: string[];
};
export {};
