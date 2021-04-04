/// <reference types="node" />
import { AbiItem, Callback, CeloTxObject, Contract, EventLog } from '@celo/connect';
import { EventEmitter } from 'events';
import Web3 from 'web3';
import { ContractEvent, EventOptions } from './types';
export interface MetaTransactionWalletDeployer extends Contract {
    clone(): MetaTransactionWalletDeployer;
    methods: {
        getVersionNumber(): CeloTxObject<{
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
        deploy(owner: string, implementation: string, initCallData: string | number[]): CeloTxObject<void>;
    };
    events: {
        WalletDeployed: ContractEvent<{
            owner: string;
            wallet: string;
            implementation: string;
            0: string;
            1: string;
            2: string;
        }>;
        allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter;
    };
}
export declare const ABI: AbiItem[];
export declare function newMetaTransactionWalletDeployer(web3: Web3, address: string): MetaTransactionWalletDeployer;
