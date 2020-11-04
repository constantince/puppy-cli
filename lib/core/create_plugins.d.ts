declare class CreatePlugins {
    name: string;
    constructor(name: string, version?: string);
    entre(): void;
    checkOutVersion(): boolean;
    upgradePlugins(): void;
    executeCommander(): void;
}
