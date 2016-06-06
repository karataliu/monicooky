import { Promise } from 'es6-promise';

export interface McClientOptions {
    endpoint?: string;
    tenantId?: string;
    clientId?: string;
    secret?: string;
}

export interface IMcClient {
    get(path: string): Promise<Object>;
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