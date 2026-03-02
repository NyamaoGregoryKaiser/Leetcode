/**
 * tests/knapsack01.test.ts
 *
 * Test suite for 0/1 Knapsack problem algorithms.
 */

import {
    knapsack01_bruteForce,
    knapsack01_memoized,
    knapsack01_tabulated,
    knapsack01_spaceOptimized
} from '../src/algorithms/knapsack01';
import { KnapsackItem } from '../src/types';

describe('0/1 Knapsack Problem Algorithms', () => {

    const testCases = [
        {
            items: [
                { weight: 1, value: 1 },
                { weight: 2, value: 6 },
                { weight: 5, value: 18 },
                { weight: 6, value: 22 },
                { weight: 7, value: 28 }
            ],
            capacity: 11,
            expected: 40 // (5,18) + (6,22) = 40. Capacity used: 11
        },
        {
            items: [
                { weight: 6, value: 30 },
                { weight: 3, value: 14 },
                { weight: 4, value: 16 },
                { weight: 2, value: 9 }
            ],
            capacity: 10,
            expected: 46 // (6,30) + (4,16)
        },
        {
            items: [
                { weight: 10, value: 60 },
                { weight: 20, value: 100 },
                { weight: 30, value: 120 }
            ],
            capacity: 50,
            expected: 220 // (20,100) + (30,120)
        },
        {
            items: [
                { weight: 1, value: 10 },
                { weight: 3, value: 40 },
                { weight: 4, value: 50 },
                { weight: 5, value: 70 }
            ],
            capacity: 7,
            expected: 90 // (3,40) + (4,50)
        },
        {
            items: [],
            capacity: 10,
            expected: 0
        },
        {
            items: [{ weight: 5, value: 10 }],
            capacity: 4,
            expected: 0
        },
        {
            items: [{ weight: 5, value: 10 }],
            capacity: 5,
            expected: 10
        },
        {
            items: [{ weight: 5, value: 10 }],
            capacity: 6,
            expected: 10
        }
    ];

    describe('knapsack01_bruteForce', () => {
        // Brute force is exponential, limit tests to small number of items
        testCases.slice(0, 4).forEach(({ items, capacity, expected }) => {
            test(`should return ${expected} for capacity=${capacity} with ${items.length} items`, () => {
                expect(knapsack01_bruteForce(items, capacity)).toBe(expected);
            });
        });

        test('should return 0 for empty items array', () => {
            expect(knapsack01_bruteForce([], 10)).toBe(0);
        });

        test('should return 0 for zero capacity', () => {
            const items: KnapsackItem[] = [{ weight: 1, value: 1 }];
            expect(knapsack01_bruteForce(items, 0)).toBe(0);
        });
    });

    describe('knapsack01_memoized', () => {
        testCases.forEach(({ items, capacity, expected }) => {
            test(`should return ${expected} for capacity=${capacity} with ${items.length} items`, () => {
                expect(knapsack01_memoized(items, capacity)).toBe(expected);
            });
        });

        test('should handle larger inputs efficiently', () => {
            const largeItems: KnapsackItem[] = Array.from({ length: 20 }, (_, i) => ({
                weight: i + 1,
                value: (i + 1) * 10
            }));
            const largeCapacity = 100;
            // Expected value for these items and capacity:
            // Maximize (sum i*10) s.t. (sum i) <= 100, where i are distinct items from 1..20
            // Greedy by value/weight ratio (which is constant 10 for all here) would be to take largest items first.
            // Sum of 1-20 is 210.
            // We want to remove items summing to 210-100 = 110. Smallest items first.
            // 1+2+...+14 = 105. 1+2+...+15 = 120.
            // Items to take: 6+7+...+20 = sum(1-20) - sum(1-5) = 210 - 15 = 195. No, that's wrong.
            // Smallest items to exclude summing to 110:
            // 1+2+...+13 = 91. 1+2+...+14 = 105. So we exclude items 1..14 and part of 15.
            // This is 0/1 knapsack.
            // The optimal sum of weights for capacity 100 would be to select items 11 through 20.
            // Sum of weights 11..20 = (20*21/2) - (10*11/2) = 210 - 55 = 155 (too much)
            // Need to calculate it properly:
            // dp[100] for these items should be 600.
            // For capacity 100, we want to maximize sum(i*10) given sum(i) <= 100.
            // This means we want sum(i) to be as close to 100 as possible.
            // The items that sum to 100 with highest values are 20,19,18,17,16,10 (sum 100, value 1000)
            // Sum of 1 to 13 = 91. Values are sum(10...130).
            // Sum of 1 to 14 = 105.
            // The maximum value would be taking items 20, 19, 18, 17, 16, 15, 14, 13, 12, 11 (sum 155, value 1550) - over capacity.
            // For capacity 100, items (10,19), (20,29), etc.
            // Max for sum(W) <= 100: take largest items: 20, 19, 18, 17, 16, 10. (sum 100) -> 10*(20+19+18+17+16+10) = 10*100 = 1000.
            // This seems incorrect as the weights and values are (i, i*10).
            // Let's re-calculate. Items: (1,10), (2,20), ..., (20,200). Capacity 100.
            // Items: {w:20,v:200}, {w:19,v:190}, {w:18,v:180}, {w:17,v:170}, {w:16,v:160}, {w:15,v:150}, {w:14,v:140}, {w:13,v:130}, {w:12,v:120}, {w:11,v:110}, {w:10,v:100}, {w:9,v:90}, {w:8,v:80}, {w:7,v:70}, {w:6,v:60}, {w:5,v:50}, {w:4,v:40}, {w:3,v:30}, {w:2,v:20}, {w:1,v:10}
            // If we take items 1-13, total weight = 91, total value = 910. Remaining capacity 9. No other item fits.
            // What if we don't take 1,2,3... but larger ones?
            // Take 11, 12, 13, 14, 15, 16, 17, 18. Weight = 11+12+...+18 = (18*19/2) - (10*11/2) = 171 - 55 = 116 (too high)
            // Let's take 12,13,14,15,16,17,18,19,20 sum = 144 (too high)
            // It's the sum of values of items whose weights sum up to 100.
            // Example: items (6,30), (3,14), (4,16), (2,9) for cap 10. Result is 46.
            // This means sum (value) for the chosen weights.
            // If we have items (1,10), (2,20), (3,30), (4,40), (5,50), (6,60), (7,70), (8,80), (9,90), (10,100). Cap 10.
            // Should be (3,30)+(7,70) = 100 (W=10, V=100) OR (4,40)+(6,60) = 100 (W=10, V=100) OR (10,100) = 100 (W=10, V=100)
            // What if items are 1 to 20, capacity 100.
            // The solution is 100 * (1+2+...+13 + remaining_capacity_item).
            // With capacity 100, the best way to get sum 100 is with items 1-13 (sum 91, value 910) + no other small item
            // OR 1,2,3,4,5,6,7,8,9,10,11,12,13 = 91 (value 910) + nothing else fits exactly
            // Or {20,19,18,17,16,10} gives weight 100, value 1000. This is the optimal.
            // Correct logic: we need to find maximum `value` by taking items that sum to `capacity` (or less).
            // For items {w_i, v_i=10*w_i}, max value for capacity C is 10 * (max sum of weights <= C).
            // Max sum of distinct positive integers that is <= 100?
            // This is actually sum(1..13) = 91. Sum(1..14) = 105. So taking 1 to 13 is one option. Value 910.
            // What if we take a different set? Say 20,19,18,17,16,10. Sum = 100. Value = 1000.
            expect(knapsack01_memoized(largeItems, largeCapacity)).toBe(1000);
        });
    });

    describe('knapsack01_tabulated', () => {
        testCases.forEach(({ items, capacity, expected }) => {
            test(`should return ${expected} for capacity=${capacity} with ${items.length} items`, () => {
                expect(knapsack01_tabulated(items, capacity)).toBe(expected);
            });
        });

        test('should handle larger inputs efficiently', () => {
            const largeItems: KnapsackItem[] = Array.from({ length: 20 }, (_, i) => ({
                weight: i + 1,
                value: (i + 1) * 10
            }));
            const largeCapacity = 100;
            expect(knapsack01_tabulated(largeItems, largeCapacity)).toBe(1000);
        });
    });

    describe('knapsack01_spaceOptimized', () => {
        testCases.forEach(({ items, capacity, expected }) => {
            test(`should return ${expected} for capacity=${capacity} with ${items.length} items`, () => {
                expect(knapsack01_spaceOptimized(items, capacity)).toBe(expected);
            });
        });

        test('should handle larger inputs efficiently', () => {
            const largeItems: KnapsackItem[] = Array.from({ length: 20 }, (_, i) => ({
                weight: i + 1,
                value: (i + 1) * 10
            }));
            const largeCapacity = 100;
            expect(knapsack01_spaceOptimized(largeItems, largeCapacity)).toBe(1000);
        });
    });
});