/// <reference types="node" />
import { AbiItem, Callback, CeloTxObject, Contract, EventLog } from '@celo/connect';
import { EventEmitter } from 'events';
import Web3 from 'web3';
import { ContractEvent, EventOptions } from './types';
export interface Registry extends Contract {
    clone(): Registry;
    methods: {
        initialized(): CeloTxObject<boolean>;
        isOwner(): CeloTxObject<boolean>;
        owner(): CeloTxObject<string>;
        registry(arg0: string | number[]): CeloTxObject<string>;
        renounceOwnership(): CeloTxObject<void>;
        transferOwnership(newOwner: string): CeloTxObject<void>;
        initialize(): CeloTxObject<void>;
        setAddressFor(identifier: string, addr: string): CeloTxObject<void>;
        getAddressForOrDie(identifierHash: string | number[]): CeloTxObject<string>;
        getAddressFor(identifierHash: string | number[]): CeloTxObject<string>;
        getAddressForStringOrDie(identifier: string): CeloTxObject<string>;
        getAddressForString(identifier: string): CeloTxObject<string>;
        isOneOf(identifierHashes: (string | number[])[], sender: string): CeloTxObject<boolean>;
    };
    events: {
        OwnershipTransferred: ContractEvent<{
            previousOwner: string;
            newOwner: string;
            0: string;
            1: string;
        }>;
        RegistryUpdated: ContractEvent<{
            identifier: string;
            identifierHash: string;
            addr: string;
            0: string;
            1: string;
            2: string;
        }>;
        allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter;
    };
}
export declare const ABI: AbiItem[];
export declare function newRegistry(web3: Web3, address: string): Registry;
