import { Address } from '@celo/utils/lib/address';
import { Wallet, WalletBase } from '@celo/wallet-base';
import { LocalSigner } from './local-signer';
export declare class LocalWallet extends WalletBase<LocalSigner> implements Wallet {
    /**
     * Register the private key as signer account
     * @param privateKey account private key
     */
    addAccount(privateKey: string): void;
    /**
     * Remove the account
     * @param address Adddress of the account to remove
     */
    removeAccount(address: Address): void;
}
