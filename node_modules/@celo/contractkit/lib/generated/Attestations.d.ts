/// <reference types="node" />
import { AbiItem, Callback, CeloTxObject, Contract, EventLog } from '@celo/connect';
import { EventEmitter } from 'events';
import Web3 from 'web3';
import { ContractEvent, EventOptions } from './types';
export interface Attestations extends Contract {
    clone(): Attestations;
    methods: {
        attestationExpiryBlocks(): CeloTxObject<string>;
        attestationRequestFees(arg0: string): CeloTxObject<string>;
        checkProofOfPossession(sender: string, blsKey: string | number[], blsPop: string | number[]): CeloTxObject<boolean>;
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
        maxAttestations(): CeloTxObject<string>;
        minQuorumSize(blockNumber: number | string): CeloTxObject<string>;
        minQuorumSizeInCurrentSet(): CeloTxObject<string>;
        numberValidatorsInCurrentSet(): CeloTxObject<string>;
        numberValidatorsInSet(blockNumber: number | string): CeloTxObject<string>;
        owner(): CeloTxObject<string>;
        pendingWithdrawals(arg0: string, arg1: string): CeloTxObject<string>;
        registry(): CeloTxObject<string>;
        renounceOwnership(): CeloTxObject<void>;
        selectIssuersWaitBlocks(): CeloTxObject<string>;
        setRegistry(registryAddress: string): CeloTxObject<void>;
        transferApprovals(arg0: string, arg1: string | number[]): CeloTxObject<boolean>;
        transferOwnership(newOwner: string): CeloTxObject<void>;
        validatorSignerAddressFromCurrentSet(index: number | string): CeloTxObject<string>;
        validatorSignerAddressFromSet(index: number | string, blockNumber: number | string): CeloTxObject<string>;
        initialize(registryAddress: string, _attestationExpiryBlocks: number | string, _selectIssuersWaitBlocks: number | string, _maxAttestations: number | string, attestationRequestFeeTokens: string[], attestationRequestFeeValues: (number | string)[]): CeloTxObject<void>;
        getVersionNumber(): CeloTxObject<{
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
        request(identifier: string | number[], attestationsRequested: number | string, attestationRequestFeeToken: string): CeloTxObject<void>;
        selectIssuers(identifier: string | number[]): CeloTxObject<void>;
        complete(identifier: string | number[], v: number | string, r: string | number[], s: string | number[]): CeloTxObject<void>;
        revoke(identifier: string | number[], index: number | string): CeloTxObject<void>;
        withdraw(token: string): CeloTxObject<void>;
        getUnselectedRequest(identifier: string | number[], account: string): CeloTxObject<{
            0: string;
            1: string;
            2: string;
        }>;
        getAttestationIssuers(identifier: string | number[], account: string): CeloTxObject<string[]>;
        getAttestationStats(identifier: string | number[], account: string): CeloTxObject<{
            0: string;
            1: string;
        }>;
        batchGetAttestationStats(identifiersToLookup: (string | number[])[]): CeloTxObject<{
            0: string[];
            1: string[];
            2: string[];
            3: string[];
        }>;
        getAttestationState(identifier: string | number[], account: string, issuer: string): CeloTxObject<{
            0: string;
            1: string;
            2: string;
        }>;
        getCompletableAttestations(identifier: string | number[], account: string): CeloTxObject<{
            0: string[];
            1: string[];
            2: string[];
            3: string;
        }>;
        getAttestationRequestFee(token: string): CeloTxObject<string>;
        setAttestationRequestFee(token: string, fee: number | string): CeloTxObject<void>;
        setAttestationExpiryBlocks(_attestationExpiryBlocks: number | string): CeloTxObject<void>;
        setSelectIssuersWaitBlocks(_selectIssuersWaitBlocks: number | string): CeloTxObject<void>;
        setMaxAttestations(_maxAttestations: number | string): CeloTxObject<void>;
        getMaxAttestations(): CeloTxObject<string>;
        validateAttestationCode(identifier: string | number[], account: string, v: number | string, r: string | number[], s: string | number[]): CeloTxObject<string>;
        lookupAccountsForIdentifier(identifier: string | number[]): CeloTxObject<string[]>;
        requireNAttestationsRequested(identifier: string | number[], account: string, expected: number | string): CeloTxObject<void>;
        approveTransfer(identifier: string | number[], index: number | string, from: string, to: string, status: boolean): CeloTxObject<void>;
    };
    events: {
        AttestationCompleted: ContractEvent<{
            identifier: string;
            account: string;
            issuer: string;
            0: string;
            1: string;
            2: string;
        }>;
        AttestationExpiryBlocksSet: ContractEvent<string>;
        AttestationIssuerSelected: ContractEvent<{
            identifier: string;
            account: string;
            issuer: string;
            attestationRequestFeeToken: string;
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
        AttestationRequestFeeSet: ContractEvent<{
            token: string;
            value: string;
            0: string;
            1: string;
        }>;
        AttestationsRequested: ContractEvent<{
            identifier: string;
            account: string;
            attestationsRequested: string;
            attestationRequestFeeToken: string;
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
        AttestationsTransferred: ContractEvent<{
            identifier: string;
            fromAccount: string;
            toAccount: string;
            0: string;
            1: string;
            2: string;
        }>;
        MaxAttestationsSet: ContractEvent<string>;
        OwnershipTransferred: ContractEvent<{
            previousOwner: string;
            newOwner: string;
            0: string;
            1: string;
        }>;
        RegistrySet: ContractEvent<string>;
        SelectIssuersWaitBlocksSet: ContractEvent<string>;
        TransferApproval: ContractEvent<{
            approver: string;
            indentifier: string;
            from: string;
            to: string;
            approved: boolean;
            0: string;
            1: string;
            2: string;
            3: string;
            4: boolean;
        }>;
        Withdrawal: ContractEvent<{
            account: string;
            token: string;
            amount: string;
            0: string;
            1: string;
            2: string;
        }>;
        allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter;
    };
}
export declare const ABI: AbiItem[];
export declare function newAttestations(web3: Web3, address: string): Attestations;
