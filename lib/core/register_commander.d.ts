interface Re {
    abbreviation: string;
    description: string;
    core: boolean;
}
declare type Register<T> = {
    (commander: string, config: T, excute: () => void): void;
};
declare const register: Register<Re>;
export default register;
