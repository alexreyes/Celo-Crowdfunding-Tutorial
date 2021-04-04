/// <reference types="node" />
import { AbiItem, Callback, CeloTxObject, Contract, EventLog } from '@celo/connect';
import { EventEmitter } from 'events';
import Web3 from 'web3';
import { ContractEvent, EventOptions } from './types';
export interface Random extends Contract {
    clone(): Random;
    methods: {
        checkProofOfPossession(sender: string, blsKey: string | number[], blsPop: string | number[]): CeloTxObject<boolean>;
        commitments(arg0: string): CeloTxObject<string>;
        fractionMulExp(aNumerator: number | string, aDenominator: number | string, bNumerator: number | string, bDenominator: number | string, exponent: number | string, _decimals: number | string): CeloTxObject<{
            0: string;
            1: string;
        }>;
        getBlockNumberFromHeader(header: string | number[]): CeloTxObject<string>;
        getEpochNumber(): CeloTxObject<string>;
        getEpochNumberOfBlock(blockNumber: number | string): CeloTxObject<string>;
        getEpochSize(): CeloTxObject<string>;
        getParentSealBitmap(blockNumber: number | string): CeloTxObject<string>;
        getVerifiedSealBitmapFromHeader(header: string | number[]): CeloTxObject<string>;
        hashHeader(header: string | number[]): CeloTxObject<string>;
        initialized(): CeloTxObject<boolean>;
        isOwner(): CeloTxObject<boolean>;
        minQuorumSize(blockNumber: number | string): CeloTxObject<string>;
        minQuorumSizeInCurrentSet(): CeloTxObject<string>;
        numberValidatorsInCurrentSet(): CeloTxObject<string>;
        numberValidatorsInSet(blockNumber: number | string): CeloTxObject<string>;
        owner(): CeloTxObject<string>;
        randomnessBlockRetentionWindow(): CeloTxObject<string>;
        renounceOwnership(): CeloTxObject<void>;
        transferOwnership(newOwner: string): CeloTxObject<void>;
        validatorSignerAddressFromCurrentSet(index: number | string): CeloTxObject<string>;
        validatorSignerAddressFromSet(index: number | string, blockNumber: number | string): CeloTxObject<string>;
        getVersionNumber(): CeloTxObject<{
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
        initialize(_randomnessBlockRetentionWindow: number | string): CeloTxObject<void>;
        setRandomnessBlockRetentionWindow(value: number | string): CeloTxObject<void>;
        revealAndCommit(randomness: string | number[], newCommitment: string | number[], proposer: string): CeloTxObject<void>;
        computeCommitment(randomness: string | number[]): CeloTxObject<string>;
        random(): CeloTxObject<string>;
        getBlockRandomness(blockNumber: number | string): CeloTxObject<string>;
    };
    events: {
        OwnershipTransferred: ContractEvent<{
            previousOwner: string;
            newOwner: string;
            0: string;
            1: string;
        }>;
        RandomnessBlockRetentionWindowSet: ContractEvent<string>;
        allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter;
    };
}
export declare const ABI: AbiItem[];
export declare function newRandom(web3: Web3, address: string): Random;
