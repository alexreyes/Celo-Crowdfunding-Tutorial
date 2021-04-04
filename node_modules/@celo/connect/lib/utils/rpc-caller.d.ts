import { Callback, JsonRpcPayload, JsonRpcResponse, Provider } from '../types';
export declare function rpcCallHandler(payload: JsonRpcPayload, handler: (p: JsonRpcPayload) => Promise<any>, callback: Callback<JsonRpcResponse>): void;
export declare function getRandomId(): number;
export interface RpcCaller {
    call: (method: string, params: any[]) => Promise<JsonRpcResponse>;
    send: (payload: JsonRpcPayload, callback: Callback<JsonRpcResponse>) => void;
}
export declare class DefaultRpcCaller implements RpcCaller {
    readonly defaultProvider: Provider;
    readonly jsonrpcVersion: string;
    constructor(defaultProvider: Provider, jsonrpcVersion?: string);
    call(method: string, params: any[]): Promise<JsonRpcResponse>;
    send(payload: JsonRpcPayload, callback: Callback<JsonRpcResponse>): void;
}
