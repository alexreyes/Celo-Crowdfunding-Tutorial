/// <reference types="node" />
import { AbiItem, Callback, CeloTxObject, Contract, EventLog } from '@celo/connect';
import { EventEmitter } from 'events';
import Web3 from 'web3';
import { ContractEvent, EventOptions } from './types';
export interface Validators extends Contract {
    clone(): Validators;
    methods: {
        checkProofOfPossession(sender: string, blsKey: string | number[], blsPop: string | number[]): CeloTxObject<boolean>;
        commissionUpdateDelay(): CeloTxObject<string>;
        downtimeGracePeriod(): CeloTxObject<string>;
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
        groupLockedGoldRequirements(): CeloTxObject<{
            value: string;
            duration: string;
            0: string;
            1: string;
        }>;
        hashHeader(header: string | number[]): CeloTxObject<string>;
        initialized(): CeloTxObject<boolean>;
        isOwner(): CeloTxObject<boolean>;
        maxGroupSize(): CeloTxObject<string>;
        membershipHistoryLength(): CeloTxObject<string>;
        minQuorumSize(blockNumber: number | string): CeloTxObject<string>;
        minQuorumSizeInCurrentSet(): CeloTxObject<string>;
        numberValidatorsInCurrentSet(): CeloTxObject<string>;
        numberValidatorsInSet(blockNumber: number | string): CeloTxObject<string>;
        owner(): CeloTxObject<string>;
        registry(): CeloTxObject<string>;
        renounceOwnership(): CeloTxObject<void>;
        setRegistry(registryAddress: string): CeloTxObject<void>;
        slashingMultiplierResetPeriod(): CeloTxObject<string>;
        transferOwnership(newOwner: string): CeloTxObject<void>;
        validatorLockedGoldRequirements(): CeloTxObject<{
            value: string;
            duration: string;
            0: string;
            1: string;
        }>;
        validatorSignerAddressFromCurrentSet(index: number | string): CeloTxObject<string>;
        validatorSignerAddressFromSet(index: number | string, blockNumber: number | string): CeloTxObject<string>;
        getVersionNumber(): CeloTxObject<{
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
        initialize(registryAddress: string, groupRequirementValue: number | string, groupRequirementDuration: number | string, validatorRequirementValue: number | string, validatorRequirementDuration: number | string, validatorScoreExponent: number | string, validatorScoreAdjustmentSpeed: number | string, _membershipHistoryLength: number | string, _slashingMultiplierResetPeriod: number | string, _maxGroupSize: number | string, _commissionUpdateDelay: number | string, _downtimeGracePeriod: number | string): CeloTxObject<void>;
        setCommissionUpdateDelay(delay: number | string): CeloTxObject<void>;
        setMaxGroupSize(size: number | string): CeloTxObject<boolean>;
        setMembershipHistoryLength(length: number | string): CeloTxObject<boolean>;
        setValidatorScoreParameters(exponent: number | string, adjustmentSpeed: number | string): CeloTxObject<boolean>;
        getMaxGroupSize(): CeloTxObject<string>;
        getCommissionUpdateDelay(): CeloTxObject<string>;
        setGroupLockedGoldRequirements(value: number | string, duration: number | string): CeloTxObject<boolean>;
        setValidatorLockedGoldRequirements(value: number | string, duration: number | string): CeloTxObject<boolean>;
        registerValidator(ecdsaPublicKey: string | number[], blsPublicKey: string | number[], blsPop: string | number[]): CeloTxObject<boolean>;
        getValidatorScoreParameters(): CeloTxObject<{
            0: string;
            1: string;
        }>;
        getMembershipHistory(account: string): CeloTxObject<{
            0: string[];
            1: string[];
            2: string;
            3: string;
        }>;
        calculateEpochScore(uptime: number | string): CeloTxObject<string>;
        calculateGroupEpochScore(uptimes: (number | string)[]): CeloTxObject<string>;
        updateValidatorScoreFromSigner(signer: string, uptime: number | string): CeloTxObject<void>;
        distributeEpochPaymentsFromSigner(signer: string, maxPayment: number | string): CeloTxObject<string>;
        deregisterValidator(index: number | string): CeloTxObject<boolean>;
        affiliate(group: string): CeloTxObject<boolean>;
        deaffiliate(): CeloTxObject<boolean>;
        updateBlsPublicKey(blsPublicKey: string | number[], blsPop: string | number[]): CeloTxObject<boolean>;
        updateEcdsaPublicKey(account: string, signer: string, ecdsaPublicKey: string | number[]): CeloTxObject<boolean>;
        updatePublicKeys(account: string, signer: string, ecdsaPublicKey: string | number[], blsPublicKey: string | number[], blsPop: string | number[]): CeloTxObject<boolean>;
        registerValidatorGroup(commission: number | string): CeloTxObject<boolean>;
        deregisterValidatorGroup(index: number | string): CeloTxObject<boolean>;
        addMember(validator: string): CeloTxObject<boolean>;
        addFirstMember(validator: string, lesser: string, greater: string): CeloTxObject<boolean>;
        removeMember(validator: string): CeloTxObject<boolean>;
        reorderMember(validator: string, lesserMember: string, greaterMember: string): CeloTxObject<boolean>;
        setNextCommissionUpdate(commission: number | string): CeloTxObject<void>;
        updateCommission(): CeloTxObject<void>;
        getAccountLockedGoldRequirement(account: string): CeloTxObject<string>;
        meetsAccountLockedGoldRequirements(account: string): CeloTxObject<boolean>;
        getValidatorBlsPublicKeyFromSigner(signer: string): CeloTxObject<string>;
        getValidator(account: string): CeloTxObject<{
            ecdsaPublicKey: string;
            blsPublicKey: string;
            affiliation: string;
            score: string;
            signer: string;
            0: string;
            1: string;
            2: string;
            3: string;
            4: string;
        }>;
        getValidatorGroup(account: string): CeloTxObject<{
            0: string[];
            1: string;
            2: string;
            3: string;
            4: string[];
            5: string;
            6: string;
        }>;
        getGroupNumMembers(account: string): CeloTxObject<string>;
        getTopGroupValidators(account: string, n: number | string): CeloTxObject<string[]>;
        getGroupsNumMembers(accounts: string[]): CeloTxObject<string[]>;
        getNumRegisteredValidators(): CeloTxObject<string>;
        getValidatorLockedGoldRequirements(): CeloTxObject<{
            0: string;
            1: string;
        }>;
        getGroupLockedGoldRequirements(): CeloTxObject<{
            0: string;
            1: string;
        }>;
        getRegisteredValidators(): CeloTxObject<string[]>;
        getRegisteredValidatorSigners(): CeloTxObject<string[]>;
        getRegisteredValidatorGroups(): CeloTxObject<string[]>;
        isValidatorGroup(account: string): CeloTxObject<boolean>;
        isValidator(account: string): CeloTxObject<boolean>;
        getMembershipInLastEpochFromSigner(signer: string): CeloTxObject<string>;
        getMembershipInLastEpoch(account: string): CeloTxObject<string>;
        forceDeaffiliateIfValidator(validatorAccount: string): CeloTxObject<void>;
        setSlashingMultiplierResetPeriod(value: number | string): CeloTxObject<void>;
        setDowntimeGracePeriod(value: number | string): CeloTxObject<void>;
        resetSlashingMultiplier(): CeloTxObject<void>;
        halveSlashingMultiplier(account: string): CeloTxObject<void>;
        getValidatorGroupSlashingMultiplier(account: string): CeloTxObject<string>;
        groupMembershipInEpoch(account: string, epochNumber: number | string, index: number | string): CeloTxObject<string>;
    };
    events: {
        CommissionUpdateDelaySet: ContractEvent<string>;
        GroupLockedGoldRequirementsSet: ContractEvent<{
            value: string;
            duration: string;
            0: string;
            1: string;
        }>;
        MaxGroupSizeSet: ContractEvent<string>;
        MembershipHistoryLengthSet: ContractEvent<string>;
        OwnershipTransferred: ContractEvent<{
            previousOwner: string;
            newOwner: string;
            0: string;
            1: string;
        }>;
        RegistrySet: ContractEvent<string>;
        ValidatorAffiliated: ContractEvent<{
            validator: string;
            group: string;
            0: string;
            1: string;
        }>;
        ValidatorBlsPublicKeyUpdated: ContractEvent<{
            validator: string;
            blsPublicKey: string;
            0: string;
            1: string;
        }>;
        ValidatorDeaffiliated: ContractEvent<{
            validator: string;
            group: string;
            0: string;
            1: string;
        }>;
        ValidatorDeregistered: ContractEvent<string>;
        ValidatorEcdsaPublicKeyUpdated: ContractEvent<{
            validator: string;
            ecdsaPublicKey: string;
            0: string;
            1: string;
        }>;
        ValidatorEpochPaymentDistributed: ContractEvent<{
            validator: string;
            validatorPayment: string;
            group: string;
            groupPayment: string;
            0: string;
            1: string;
            2: string;
            3: string;
        }>;
        ValidatorGroupCommissionUpdateQueued: ContractEvent<{
            group: string;
            commission: string;
            activationBlock: string;
            0: string;
            1: string;
            2: string;
        }>;
        ValidatorGroupCommissionUpdated: ContractEvent<{
            group: string;
            commission: string;
            0: string;
            1: string;
        }>;
        ValidatorGroupDeregistered: ContractEvent<string>;
        ValidatorGroupMemberAdded: ContractEvent<{
            group: string;
            validator: string;
            0: string;
            1: string;
        }>;
        ValidatorGroupMemberRemoved: ContractEvent<{
            group: string;
            validator: string;
            0: string;
            1: string;
        }>;
        ValidatorGroupMemberReordered: ContractEvent<{
            group: string;
            validator: string;
            0: string;
            1: string;
        }>;
        ValidatorGroupRegistered: ContractEvent<{
            group: string;
            commission: string;
            0: string;
            1: string;
        }>;
        ValidatorLockedGoldRequirementsSet: ContractEvent<{
            value: string;
            duration: string;
            0: string;
            1: string;
        }>;
        ValidatorRegistered: ContractEvent<string>;
        ValidatorScoreParametersSet: ContractEvent<{
            exponent: string;
            adjustmentSpeed: string;
            0: string;
            1: string;
        }>;
        ValidatorScoreUpdated: ContractEvent<{
            validator: string;
            score: string;
            epochScore: string;
            0: string;
            1: string;
            2: string;
        }>;
        allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter;
    };
}
export declare const ABI: AbiItem[];
export declare function newValidators(web3: Web3, address: string): Validators;
