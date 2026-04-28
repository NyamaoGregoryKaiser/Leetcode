/**
 * @fileoverview Test suite for Coin Change problem implementations.
 */

const {
    coinChange_memo,
    coinChange_tab
} = require('../problems/coin_change');

describe('Coin Change Implementations', () => {

    // Define common test cases
    const testCases = [
        // Basic cases
        { coins: [1, 2, 5], amount: 11, expected: 3 }, // 5 + 5 + 1
        { coins: [2], amount: 3, expected: -1 }, // Cannot make 3 with only 2s
        { coins: [1], amount: 0, expected: 0 }, // 0 coins for 0 amount
        { coins: [1], amount: 1, expected: 1 },
        { coins: [1], amount: 10, expected: 10 },

        // Edge cases
        { coins: [100], amount: 99, expected: -1 }, // Amount less than smallest coin
        { coins: [100], amount: 100, expected: 1 },
        { coins: [100], amount: 200, expected: 2 },
        { coins: [100], amount: 1, expected: -1 },
        { coins: [], amount: 10, expected: -1 }, // No coins
        { coins: [], amount: 0, expected: 0 }, // 0 coins, 0 amount (still valid base case)
        { coins: [1, 5, 10, 25], amount: 63, expected: 6 }, // 2x25 + 10 + 2x1 (50+10+2 = 62... wait, 25+25+10+1+1+1 = 6) -> 2x25 + 1x10 + 3x1 = 6 (50+10+3=63)
                                                        // or better: 25+25+5+5+1+1 = 63 (6 coins) => Math.floor(63/25)=2, rem=13. Math.floor(13/10)=1, rem=3. Math.floor(3/5)=0, rem=3. Math.floor(3/1)=3. Total: 2+1+3 = 6. Correct.

        // Larger amounts / more coins
        { coins: [3, 5, 7], amount: 10, expected: 2 }, // 5 + 5
        { coins: [3, 5, 7], amount: 9, expected: 3 }, // 3 + 3 + 3
        { coins: [186, 419, 83, 408], amount: 6249, expected: 20 }, // LeetCode example. Expectation verified manually (not trivial)

        // Duplicate coins (should still work, although usually filtered in real problems)
        { coins: [1, 1, 2, 5], amount: 11, expected: 3 },

        // Negative amount (invalid input)
        { coins: [1, 2, 5], amount: -5, expected: -1 }
    ];

    // Test coinChange_memo
    describe('coinChange_memo (Memoization / Top-Down DP)', () => {
        testCases.forEach(({ coins, amount, expected }) => {
            test(`should return ${expected} for coins = [${coins}] and amount = ${amount}`, () => {
                expect(coinChange_memo(coins, amount)).toBe(expected);
            });
        });
    });

    // Test coinChange_tab
    describe('coinChange_tab (Tabulation / Bottom-Up DP)', () => {
        testCases.forEach(({ coins, amount, expected }) => {
            test(`should return ${expected} for coins = [${coins}] and amount = ${amount}`, () => {
                expect(coinChange_tab(coins, amount)).toBe(expected);
            });
        });
    });
});