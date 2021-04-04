/// <reference types="node" />
import { AbiItem, Callback, CeloTxObject, Contract, EventLog } from '@celo/connect';
import { EventEmitter } from 'events';
import Web3 from 'web3';
import { ContractEvent, EventOptions } from './types';
export interface StableTokenEur extends Contract {
    clone(): StableTokenEur;
    methods: {
        allowance(accountOwner: string, spender: string): CeloTxObject<string>;
        approve(spender: string, value: number | string): CeloTxObject<boolean>;
        balanceOf(accountOwner: string): CeloTxObject<string>;
        burn(value: number | string): CeloTxObject<boolean>;
        checkProofOfPossession(sender: string, blsKey: string | number[], blsPop: string | number[]): CeloTxObject<boolean>;
        creditGasFees(from: string, feeRecipient: string, gatewayFeeRecipient: string, communityFund: string, refund: number | string, tipTxFee: number | string, gatewayFee: number | string, baseTxFee: number | string): CeloTxObject<void>;
        debitGasFees(from: string, value: number | string): CeloTxObject<void>;
        decimals(): CeloTxObject<string>;
        decreaseAllowance(spender: string, value: number | string): CeloTxObject<boolean>;
        fractionMulExp(aNumerator: number | string, aDenominator: number | string, bNumerator: number | string, bDenominator: number | string, exponent: number | string, _decimals: number | string): CeloTxObject<{
            0: string;
            1: string;
        }>;
        getBlockNumberFromHeader(header: string | number[]): CeloTxObject<string>;
        getEpochNumber(): CeloTxObject<string>;
        getEpochNumberOfBlock(blockNumber: number | string): CeloTxObject<string>;
        getEpochSize(): CeloTxObject<string>;
        getExchangeRegistryId(): CeloTxObject<string>;
        getInflationParameters(): CeloTxObject<{
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
        getParentSealBitmap(blockNumber: number | string): CeloTxObject<string>;
        getVerifiedSealBitmapFromHeader(header: string | number[]): CeloTxObject<string>;
        hashHeader(header: string | number[]): CeloTxObject<string>;
        increaseAllowance(spender: string, value: number | string): CeloTxObject<boolean>;
        initialize(_name: string, _symbol: string, _decimals: number | string, registryAddress: string, inflationRate: number | string, inflationFactorUpdatePeriod: number | string, initialBalanceAddresses: string[], initialBalanceValues: (number | string)[], exchangeIdentifier: string): CeloTxObject<void>;
        initialized(): CeloTxObject<boolean>;
        isOwner(): CeloTxObject<boolean>;
        minQuorumSize(blockNumber: number | string): CeloTxObject<string>;
        minQuorumSizeInCurrentSet(): CeloTxObject<string>;
        mint(to: string, value: number | string): CeloTxObject<boolean>;
        name(): CeloTxObject<string>;
        numberValidatorsInCurrentSet(): CeloTxObject<string>;
        numberValidatorsInSet(blockNumber: number | string): CeloTxObject<string>;
        owner(): CeloTxObject<string>;
        registry(): CeloTxObject<string>;
        renounceOwnership(): CeloTxObject<void>;
        setInflationParameters(rate: number | string, updatePeriod: number | string): CeloTxObject<void>;
        setRegistry(registryAddress: string): CeloTxObject<void>;
        symbol(): CeloTxObject<string>;
        totalSupply(): CeloTxObject<string>;
        transfer(to: string, value: number | string): CeloTxObject<boolean>;
        transferFrom(from: string, to: string, value: number | string): CeloTxObject<boolean>;
        transferOwnership(newOwner: string): CeloTxObject<void>;
        transferWithComment(to: string, value: number | string, comment: string): CeloTxObject<boolean>;
        unitsToValue(units: number | string): CeloTxObject<string>;
        validatorSignerAddressFromCurrentSet(index: number | string): CeloTxObject<string>;
        validatorSignerAddressFromSet(index: number | string, blockNumber: number | string): CeloTxObject<string>;
        valueToUnits(value: number | string): CeloTxObject<string>;
        getVersionNumber(): CeloTxObject<{
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
    };
    events: {
        Approval: ContractEvent<{
            owner: string;
            spender: string;
            value: string;
            0: string;
            1: string;
            2: string;
        }>;
        InflationFactorUpdated: ContractEvent<{
            factor: string;
            lastUpdated: string;
            0: string;
            1: string;
        }>;
        InflationParametersUpdated: ContractEvent<{
            rate: string;
            updatePeriod: string;
            lastUpdated: string;
            0: string;
            1: string;
            2: string;
        }>;
        OwnershipTransferred: ContractEvent<{
            previousOwner: string;
            newOwner: string;
            0: string;
            1: string;
        }>;
        RegistrySet: ContractEvent<string>;
        Transfer: ContractEvent<{
            from: string;
            to: string;
            value: string;
            0: string;
            1: string;
            2: string;
        }>;
        TransferComment: ContractEvent<string>;
        allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter;
    };
}
export declare const ABI: AbiItem[];
export declare function newStableTokenEur(web3: Web3, address: string): StableTokenEur;
