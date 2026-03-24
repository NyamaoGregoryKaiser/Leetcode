/**
 * @fileoverview Test suite for Coin Change (Minimum Coins) implementations.
 */

const {
    coinChangeBruteForce,
    coinChangeMemoization,
    coinChangeTabulation,
} = require('../src/problems/coinChange');

describe('Coin Change (Minimum Coins)', () => {
    // Test cases for brute force (limited by performance)
    describe('coinChangeBruteForce', () => {
        it('should return 0 for amount 0', () => {
            expect(coinChangeBruteForce([1, 2, 5], 0)).toBe(0);
        });

        it('should return -1 if amount cannot be made', () => {
            expect(coinChangeBruteForce([2], 3)).toBe(-1);
            expect(coinChangeBruteForce([5, 10], 3)).toBe(-1);
        });

        it('should return correct minimum coins for small amounts', () => {
            expect(coinChangeBruteForce([1, 2, 5], 11)).toBe(3); // 5 + 5 + 1
            expect(coinChangeBruteForce([1, 5], 7)).toBe(3);     // 5 + 1 + 1
            expect(coinChangeBruteForce([2, 5, 10, 1], 27)).toBe(4); // 10 + 10 + 5 + 2
        });

        it('should handle single coin denomination', () => {
            expect(coinChangeBruteForce([1], 5)).toBe(5);
            expect(coinChangeBruteForce([10], 30)).toBe(3);
            expect(coinChangeBruteForce([3], 7)).toBe(-1);
        });

        it('should handle cases where coins are larger than amount', () => {
            expect(coinChangeBruteForce([10, 20], 5)).toBe(-1);
        });

        it('should handle empty coins array (returns -1 as per base case)', () => {
            expect(coinChangeBruteForce([], 5)).toBe(-1); // No coins, cannot make amount
            expect(coinChangeBruteForce([], 0)).toBe(0);   // Amount 0 still needs 0 coins
        });
    });

    // Test cases for memoization
    describe('coinChangeMemoization', () => {
        it('should return 0 for amount 0', () => {
            expect(coinChangeMemoization([1, 2, 5], 0)).toBe(0);
        });

        it('should return -1 if amount cannot be made', () => {
            expect(coinChangeMemoization([2], 3)).toBe(-1);
            expect(coinChangeMemoization([5, 10], 3)).toBe(-1);
        });

        it('should return correct minimum coins for various amounts', () => {
            expect(coinChangeMemoization([1, 2, 5], 11)).toBe(3);
            expect(coinChangeMemoization([1, 5], 7)).toBe(3);
            expect(coinChangeMemoization([2, 5, 10, 1], 27)).toBe(4);
            expect(coinChangeMemoization([186, 419, 83, 408], 6249)).toBe(20); // LeetCode example
        });

        it('should handle single coin denomination', () => {
            expect(coinChangeMemoization([1], 5)).toBe(5);
            expect(coinChangeMemoization([10], 30)).toBe(3);
            expect(coinChangeMemoization([3], 7)).toBe(-1);
        });

        it('should handle cases where coins are larger than amount', () => {
            expect(coinChangeMemoization([10, 20], 5)).toBe(-1);
        });

        it('should handle empty coins array (returns -1)', () => {
            expect(coinChangeMemoization([], 5)).toBe(-1);
            expect(coinChangeMemoization([], 0)).toBe(0);
        });

        it('should handle large amounts and small coins efficiently', () => {
            expect(coinChangeMemoization([1], 1000)).toBe(1000);
            expect(coinChangeMemoization([1, 2, 5], 999)).toBe(201); // 199 * 5 + 4 * 1 (203 coins) => 199 * 5 + 2 * 2 (201 coins)
        });
    });

    // Test cases for tabulation
    describe('coinChangeTabulation', () => {
        it('should return 0 for amount 0', () => {
            expect(coinChangeTabulation([1, 2, 5], 0)).toBe(0);
        });

        it('should return -1 if amount cannot be made', () => {
            expect(coinChangeTabulation([2], 3)).toBe(-1);
            expect(coinChangeTabulation([5, 10], 3)).toBe(-1);
        });

        it('should return correct minimum coins for various amounts', () => {
            expect(coinChangeTabulation([1, 2, 5], 11)).toBe(3);
            expect(coinChangeTabulation([1, 5], 7)).toBe(3);
            expect(coinChangeTabulation([2, 5, 10, 1], 27)).toBe(4);
            expect(coinChangeTabulation([186, 419, 83, 408], 6249)).toBe(20);
        });

        it('should handle single coin denomination', () => {
            expect(coinChangeTabulation([1], 5)).toBe(5);
            expect(coinChangeTabulation([10], 30)).toBe(3);
            expect(coinChangeTabulation([3], 7)).toBe(-1);
        });

        it('should handle cases where coins are larger than amount', () => {
            expect(coinChangeTabulation([10, 20], 5)).toBe(-1);
        });

        it('should handle empty coins array (returns -1)', () => {
            expect(coinChangeTabulation([], 5)).toBe(-1);
            expect(coinChangeTabulation([], 0)).toBe(0);
        });

        it('should handle large amounts and small coins efficiently', () => {
            expect(coinChangeTabulation([1], 1000)).toBe(1000);
            expect(coinChangeTabulation([1, 2, 5], 999)).toBe(201);
        });
    });
});