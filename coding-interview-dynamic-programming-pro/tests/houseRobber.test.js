/**
 * @fileoverview Test suite for House Robber implementations.
 */

const {
    houseRobberBruteForce,
    houseRobberMemoization,
    houseRobberTabulation,
    houseRobberSpaceOptimized,
} = require('../src/problems/houseRobber');

describe('House Robber', () => {

    // Test cases for brute force (limited by performance)
    describe('houseRobberBruteForce', () => {
        it('should return 0 for an empty array', () => {
            expect(houseRobberBruteForce([])).toBe(0);
        });

        it('should return the single amount for a single house', () => {
            expect(houseRobberBruteForce([1])).toBe(1);
            expect(houseRobberBruteForce([100])).toBe(100);
        });

        it('should return the maximum of two amounts for two houses', () => {
            expect(houseRobberBruteForce([1, 2])).toBe(2);
            expect(houseRobberBruteForce([2, 1])).toBe(2);
        });

        it('should return correct max amount for small arrays', () => {
            expect(houseRobberBruteForce([1, 2, 3, 1])).toBe(4); // 1 + 3
            expect(houseRobberBruteForce([2, 7, 9, 3, 1])).toBe(12); // 2 + 9 + 1
        });
    });

    // Test cases for memoization
    describe('houseRobberMemoization', () => {
        it('should return 0 for an empty array', () => {
            expect(houseRobberMemoization([])).toBe(0);
        });

        it('should return the single amount for a single house', () => {
            expect(houseRobberMemoization([1])).toBe(1);
            expect(houseRobberMemoization([100])).toBe(100);
        });

        it('should return the maximum of two amounts for two houses', () => {
            expect(houseRobberMemoization([1, 2])).toBe(2);
            expect(houseRobberMemoization([2, 1])).toBe(2);
        });

        it('should return correct max amount for various arrays', () => {
            expect(houseRobberMemoization([1, 2, 3, 1])).toBe(4);
            expect(houseRobberMemoization([2, 7, 9, 3, 1])).toBe(12);
            expect(houseRobberMemoization([10, 0, 0, 10])).toBe(20);
            expect(houseRobberMemoization([0])).toBe(0);
        });

        it('should handle arrays with zeros', () => {
            expect(houseRobberMemoization([0, 0, 0, 0])).toBe(0);
            expect(houseRobberMemoization([5, 0, 5, 0, 5])).toBe(15);
            expect(houseRobberMemoization([0, 5, 0, 5, 0])).toBe(10);
        });

        it('should handle longer arrays efficiently', () => {
            const longArray = Array(100).fill(1).map((_, i) => (i % 2 === 0 ? 10 : 0)); // [10,0,10,0,...]
            expect(houseRobberMemoization(longArray)).toBe(500); // 50 houses of 10
            const randomLongArray = Array(50).fill(0).map(() => Math.floor(Math.random() * 100));
            // Just ensure it runs without stack overflow or excessive time. Correctness can be harder to test randomly.
            expect(houseRobberMemoization(randomLongArray)).toBeGreaterThanOrEqual(0);
        });
    });

    // Test cases for tabulation
    describe('houseRobberTabulation', () => {
        it('should return 0 for an empty array', () => {
            expect(houseRobberTabulation([])).toBe(0);
        });

        it('should return the single amount for a single house', () => {
            expect(houseRobberTabulation([1])).toBe(1);
            expect(houseRobberTabulation([100])).toBe(100);
        });

        it('should return the maximum of two amounts for two houses', () => {
            expect(houseRobberTabulation([1, 2])).toBe(2);
            expect(houseRobberTabulation([2, 1])).toBe(2);
        });

        it('should return correct max amount for various arrays', () => {
            expect(houseRobberTabulation([1, 2, 3, 1])).toBe(4);
            expect(houseRobberTabulation([2, 7, 9, 3, 1])).toBe(12);
            expect(houseRobberTabulation([10, 0, 0, 10])).toBe(20);
            expect(houseRobberTabulation([0])).toBe(0);
        });

        it('should handle arrays with zeros', () => {
            expect(houseRobberTabulation([0, 0, 0, 0])).toBe(0);
            expect(houseRobberTabulation([5, 0, 5, 0, 5])).toBe(15);
            expect(houseRobberTabulation([0, 5, 0, 5, 0])).toBe(10);
        });

        it('should handle longer arrays efficiently', () => {
            const longArray = Array(100).fill(1).map((_, i) => (i % 2 === 0 ? 10 : 0));
            expect(houseRobberTabulation(longArray)).toBe(500);
            const randomLongArray = Array(50).fill(0).map(() => Math.floor(Math.random() * 100));
            expect(houseRobberTabulation(randomLongArray)).toBeGreaterThanOrEqual(0);
        });
    });

    // Test cases for space-optimized tabulation
    describe('houseRobberSpaceOptimized', () => {
        it('should return 0 for an empty array', () => {
            expect(houseRobberSpaceOptimized([])).toBe(0);
        });

        it('should return the single amount for a single house', () => {
            expect(houseRobberSpaceOptimized([1])).toBe(1);
            expect(houseRobberSpaceOptimized([100])).toBe(100);
        });

        it('should return the maximum of two amounts for two houses', () => {
            expect(houseRobberSpaceOptimized([1, 2])).toBe(2);
            expect(houseRobberSpaceOptimized([2, 1])).toBe(2);
        });

        it('should return correct max amount for various arrays', () => {
            expect(houseRobberSpaceOptimized([1, 2, 3, 1])).toBe(4);
            expect(houseRobberSpaceOptimized([2, 7, 9, 3, 1])).toBe(12);
            expect(houseRobberSpaceOptimized([10, 0, 0, 10])).toBe(20);
            expect(houseRobberSpaceOptimized([0])).toBe(0);
        });

        it('should handle arrays with zeros', () => {
            expect(houseRobberSpaceOptimized([0, 0, 0, 0])).toBe(0);
            expect(houseRobberSpaceOptimized([5, 0, 5, 0, 5])).toBe(15);
            expect(houseRobberSpaceOptimized([0, 5, 0, 5, 0])).toBe(10);
        });

        it('should handle longer arrays efficiently', () => {
            const longArray = Array(100).fill(1).map((_, i) => (i % 2 === 0 ? 10 : 0));
            expect(houseRobberSpaceOptimized(longArray)).toBe(500);
            const randomLongArray = Array(50).fill(0).map(() => Math.floor(Math.random() * 100));
            expect(houseRobberSpaceOptimized(randomLongArray)).toBeGreaterThanOrEqual(0);
        });
    });
});