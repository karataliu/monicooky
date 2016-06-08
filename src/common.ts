import { Promise } from 'es6-promise';

export interface McClientOptions {
    endpoint?:  string;
    tenantId?:  string;
    clientId?:  string;
    secret?:    string;
    logFile?:   string;
}

export interface ISubscription {
    id:     string;
    name:   string;
}

export interface IMcClient {
    get(path: string): Promise<Object>;
    getWithQuery(path: string, query: string): Promise<string|number>;
    listSubscriptions(): Promise<ISubscription[]>;
}

export interface IMcQueryEntry {
    name: string;
    path: string;
}

export interface IMcResultEntry {
    name: string;
    value: number | string;
}

export interface IMcResult {
    list: IMcResultEntry[];
}

export interface IMcLogger {
    log(message: string): void;
}