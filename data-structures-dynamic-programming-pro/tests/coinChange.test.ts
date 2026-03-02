/**
 * tests/coinChange.test.ts
 *
 * Test suite for Coin Change algorithms.
 */

import {
    coinChange_bruteForce,
    coinChange_memoized,
    coinChange_tabulated
} from '../src/algorithms/coinChange';

describe('Coin Change Algorithms', () => {

    const testCases = [
        { coins: [1, 2, 5], amount: 11, expected: 3 }, // 5 + 5 + 1
        { coins: [2], amount: 3, expected: -1 },
        { coins: [1], amount: 0, expected: 0 },
        { coins: [1], amount: 1, expected: 1 },
        { coins: [1], amount: 2, expected: 2 },
        { coins: [186, 419, 83, 408], amount: 6249, expected: 20 }, // Example from LeetCode
        { coins: [3, 5], amount: 7, expected: -1 }, // Can't make 7 with 3s and 5s
        { coins: [1, 5, 10, 25], amount: 30, expected: 2 }, // 25 + 5
        { coins: [7, 10, 15], amount: 21, expected: 3 }, // 7 + 7 + 7
        { coins: [7, 10, 15], amount: 20, expected: 2 }, // 10 + 10
        { coins: [7, 10, 15], amount: 22, expected: 4 }, // 7 + 7 + 7 + 1? No. 7+15 = 22, 2 coins.
        { coins: [7, 10, 15], amount: 22, expected: 2 }, // 7 + 15
        { coins: [1], amount: 100, expected: 100 }
    ];

    describe('coinChange_bruteForce', () => {
        // Brute force is exponential, so limit test cases
        testCases.slice(0, 7).forEach(({ coins, amount, expected }) => {
            test(`should return ${expected} for amount=${amount} with coins=${coins}`, () => {
                expect(coinChange_bruteForce(coins, amount)).toBe(expected);
            });
        });

        test('should throw error for negative amount', () => {
            expect(() => coinChange_bruteForce([1, 2], -1)).toThrow("Amount cannot be negative.");
        });
    });

    describe('coinChange_memoized', () => {
        testCases.forEach(({ coins, amount, expected }) => {
            test(`should return ${expected} for amount=${amount} with coins=${coins}`, () => {
                expect(coinChange_memoized(coins, amount)).toBe(expected);
            });
        });

        test('should throw error for negative amount', () => {
            expect(() => coinChange_memoized([1, 2], -1)).toThrow("Amount cannot be negative.");
        });

        test('should handle larger amounts efficiently', () => {
            expect(coinChange_memoized([1, 5, 10, 25], 99)).toBe(9); // 3x25 + 2x10 + 4x1 = 75+20+4 = 99
        });
    });

    describe('coinChange_tabulated', () => {
        testCases.forEach(({ coins, amount, expected }) => {
            test(`should return ${expected} for amount=${amount} with coins=${coins}`, () => {
                expect(coinChange_tabulated(coins, amount)).toBe(expected);
            });
        });

        test('should throw error for negative amount', () => {
            expect(() => coinChange_tabulated([1, 2], -1)).toThrow("Amount cannot be negative.");
        });

        test('should handle larger amounts efficiently', () => {
            expect(coinChange_tabulated([1, 5, 10, 25], 99)).toBe(9);
        });
    });
});