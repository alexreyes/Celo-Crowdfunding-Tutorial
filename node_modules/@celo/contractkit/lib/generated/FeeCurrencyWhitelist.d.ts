/// <reference types="node" />
import { AbiItem, Callback, CeloTxObject, Contract, EventLog } from '@celo/connect';
import { EventEmitter } from 'events';
import Web3 from 'web3';
import { ContractEvent, EventOptions } from './types';
export interface FeeCurrencyWhitelist extends Contract {
    clone(): FeeCurrencyWhitelist;
    methods: {
        initialized(): CeloTxObject<boolean>;
        isOwner(): CeloTxObject<boolean>;
        owner(): CeloTxObject<string>;
        renounceOwnership(): CeloTxObject<void>;
        transferOwnership(newOwner: string): CeloTxObject<void>;
        whitelist(arg0: number | string): CeloTxObject<string>;
        initialize(): CeloTxObject<void>;
        addToken(tokenAddress: string): CeloTxObject<void>;
        getWhitelist(): CeloTxObject<string[]>;
    };
    events: {
        OwnershipTransferred: ContractEvent<{
            previousOwner: string;
            newOwner: string;
            0: string;
            1: string;
        }>;
        allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter;
    };
}
export declare const ABI: AbiItem[];
export declare function newFeeCurrencyWhitelist(web3: Web3, address: string): FeeCurrencyWhitelist;
