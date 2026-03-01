/**
 * tests/house-robber.test.ts
 *
 * Test suite for the House Robber implementations.
 * Uses Jest for testing.
 */

import {
    houseRobberRecursive,
    houseRobberMemoization,
    houseRobberTabulation,
    houseRobberSpaceOptimized
} from '../src/algorithms/house-robber';

describe('House Robber', () => {
    // Test cases for all implementations
    const testCases = [
        { nums: [], expected: 0 },
        { nums: [0], expected: 0 },
        { nums: [1], expected: 1 },
        { nums: [2, 1], expected: 2 }, // Rob house 0 (2)
        { nums: [1, 2], expected: 2 }, // Rob house 1 (2)
        { nums: [1, 2, 3, 1], expected: 4 }, // Rob house 1 (2) and house 3 (1) OR house 0 (1) and house 2 (3). Max 4.
        { nums: [2, 7, 9, 3, 1], expected: 12 }, // Rob 2, 9, 1 (2+9+1=12). Alternative: 7, 3 (7+3=10). Max 12.
        { nums: [5, 2, 6, 3, 1, 7], expected: 18 }, // Rob 5, 6, 7 (5+6+7=18)
        { nums: [6, 6, 4, 8, 4, 3, 2, 2, 1], expected: 18 }, // Rob 6, 8, 2, 2 (6+8+2+2 = 18). Or 6,4,3,1 (6+4+3+1 = 14)
        // Larger array for DP methods
        { nums: [1, 3, 1, 3, 100], expected: 103 }, // Rob 3 and 100 (3+100=103)
        { nums: [5, 1, 1, 5, 1, 1, 5, 1, 1, 5], expected: 20 }, // 5, 5, 5, 5
        { nums: Array(50).fill(1), expected: 25 }, // 50 houses, all 1. Rob every other, 25.
    ];

    // Recursive (Brute Force) tests
    describe('houseRobberRecursive', () => {
        // Limiting recursive tests for smaller arrays as it's O(2^N)
        const recursiveTestCases = testCases.filter(tc => tc.nums.length <= 15); // Adjust max length for reasonable runtime
        recursiveTestCases.forEach(({ nums, expected }) => {
            test(`should return ${expected} for nums = [${nums}]`, () => {
                expect(houseRobberRecursive(nums)).toBe(expected);
            });
        });

        // Specific test for a case that might be slow for full recursion but is within limits
        test('should handle [2, 7, 9, 3, 1] correctly (recursive)', () => {
            expect(houseRobberRecursive([2, 7, 9, 3, 1])).toBe(12);
        });

        // Edge cases
        test('should return 0 for empty array (recursive)', () => {
            expect(houseRobberRecursive([])).toBe(0);
        });
        test('should return 0 for array with single 0 (recursive)', () => {
            expect(houseRobberRecursive([0])).toBe(0);
        });
        test('should return value for single house (recursive)', () => {
            expect(houseRobberRecursive([100])).toBe(100);
        });
    });

    // Memoization (Top-Down DP) tests
    describe('houseRobberMemoization', () => {
        testCases.forEach(({ nums, expected }) => {
            test(`should return ${expected} for nums = [${nums}]`, () => {
                const memo = Array(nums.length).fill(-1);
                expect(houseRobberMemoization(nums, 0, memo)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 0 for empty array (memoization)', () => {
            expect(houseRobberMemoization([])).toBe(0);
        });
        test('should return 0 for array with single 0 (memoization)', () => {
            expect(houseRobberMemoization([0])).toBe(0);
        });
        test('should return value for single house (memoization)', () => {
            expect(houseRobberMemoization([100])).toBe(100);
        });
    });

    // Tabulation (Bottom-Up DP) tests
    describe('houseRobberTabulation', () => {
        testCases.forEach(({ nums, expected }) => {
            test(`should return ${expected} for nums = [${nums}]`, () => {
                expect(houseRobberTabulation(nums)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 0 for empty array (tabulation)', () => {
            expect(houseRobberTabulation([])).toBe(0);
        });
        test('should return 0 for array with single 0 (tabulation)', () => {
            expect(houseRobberTabulation([0])).toBe(0);
        });
        test('should return value for single house (tabulation)', () => {
            expect(houseRobberTabulation([100])).toBe(100);
        });
    });

    // Space-Optimized Tabulation tests
    describe('houseRobberSpaceOptimized', () => {
        testCases.forEach(({ nums, expected }) => {
            test(`should return ${expected} for nums = [${nums}]`, () => {
                expect(houseRobberSpaceOptimized(nums)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 0 for empty array (space-optimized)', () => {
            expect(houseRobberSpaceOptimized([])).toBe(0);
        });
        test('should return 0 for array with single 0 (space-optimized)', () => {
            expect(houseRobberSpaceOptimized([0])).toBe(0);
        });
        test('should return value for single house (space-optimized)', () => {
            expect(houseRobberSpaceOptimized([100])).toBe(100);
        });
    });
});