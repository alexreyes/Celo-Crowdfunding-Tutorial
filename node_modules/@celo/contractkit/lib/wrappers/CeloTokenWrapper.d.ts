import 'bignumber.js';
import { ICeloToken } from '../generated/ICeloToken';
import { Ierc20 } from '../generated/IERC20';
import { Erc20Wrapper } from './Erc20Wrapper';
/**
 * Contract for Celo native currency that adheres to the ICeloToken and IERC20 interfaces.
 */
export declare class CeloTokenWrapper<T extends Ierc20 & ICeloToken> extends Erc20Wrapper<T> {
    /**
     * Returns the name of the token.
     * @returns Name of the token.
     */
    name: () => Promise<string>;
    /**
     * Returns the three letter symbol of the token.
     * @returns Symbol of the token.
     */
    symbol: () => Promise<string>;
    /**
     * Returns the number of decimals used in the token.
     * @returns Number of decimals.
     */
    decimals: () => Promise<number>;
    /**
     * Transfers the token from one address to another with a comment.
     * @param to The address to transfer the token to.
     * @param value The amount of the token to transfer.
     * @param comment The transfer comment
     * @return True if the transaction succeeds.
     */
    transferWithComment: (arg0: string, arg1: string | number, arg2: string) => import("@celo/connect").CeloTransactionObject<boolean>;
}
