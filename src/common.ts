import { Promise } from 'es6-promise';

export interface IMcLib {
    listSubscriptions(): Promise<ISubscription[]>;
    executeQuery(entry: IMcQueryEntry): Promise<IMcResultEntry>;
}

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

export interface IDiscoveryResult {
    data: Array<any>;
}

export interface IMcClient {
    get(path: string): Promise<Object>;
}

export interface IMcQueryEntry {
    name: string;
    path: string;
    query?: string;
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