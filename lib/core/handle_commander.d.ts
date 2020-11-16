interface Re {
    abbreviation: string;
    description: string;
    path: string;
    core: boolean;
}
declare type Register<T> = {
    (commander: string, config: T, excute: () => void): void;
};
declare const _default: {
    initialOrders: () => void;
    register: Register<Re>;
};
export default _default;
