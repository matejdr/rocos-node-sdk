import log from 'loglevel';
export declare class PrefixLogger {
    static getInstance(name?: string): log.Logger;
    static enableAll(): void;
    static disableAll(): void;
}
