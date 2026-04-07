```typescript
/**
 * tests/coin-change.test.ts
 *
 * Test suite for the Greedy Coin Change Problem.
 */

import { greedyCoinChange } from '../src/algorithms/coin-change';

describe('Greedy Coin Change Problem', () => {

    // Test case 1: Standard US currency denominations, valid for greedy
    test('should find minimum coins for a standard US amount (63 cents)', () => {
        const denominations = [1, 5, 10, 25]; // Order shouldn't matter as it's sorted internally
        const amount = 63;
        const expectedUsedCoins = [25, 25, 10, 1, 1, 1]; // Sorted descending by internal logic
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(expectedUsedCoins.length);
        // We expect the specific coins to match, in descending order as chosen by the algorithm
        expect(usedCoins).toEqual(expectedUsedCoins);
    });

    // Test case 2: Another US currency amount
    test('should find minimum coins for another US amount (87 cents)', () => {
        const denominations = [1, 5, 10, 25];
        const amount = 87;
        // 3x25 = 75
        // 1x10 = 10 (total 85)
        // 2x1 = 2 (total 87)
        const expectedUsedCoins = [25, 25, 25, 10, 1, 1];
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(expectedUsedCoins.length);
        expect(usedCoins).toEqual(expectedUsedCoins);
    });

    // Test case 3: European Euro currency, valid for greedy
    test('should find minimum coins for a Euro amount', () => {
        const denominations = [1, 2, 5, 10, 20, 50, 100, 200]; // in cents, representing 1c to 2 euros
        const amount = 173; // 1 euro 73 cents
        // 100, 50, 20, 2, 1
        const expectedUsedCoins = [100, 50, 20, 2, 1];
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(expectedUsedCoins.length);
        expect(usedCoins).toEqual(expectedUsedCoins);
    });

    // Test case 4: Amount is exactly a denomination
    test('should handle amount being exactly one denomination', () => {
        const denominations = [1, 5, 10, 25];
        const amount = 10;
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(1);
        expect(usedCoins).toEqual([10]);
    });

    // Test case 5: Amount is zero
    test('should return 0 coins for amount zero', () => {
        const denominations = [1, 5, 10, 25];
        const amount = 0;
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(0);
        expect(usedCoins).toEqual([]);
    });

    // Test case 6: Amount is negative
    test('should return -1 for negative amount', () => {
        const denominations = [1, 5, 10, 25];
        const amount = -10;
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(-1);
        expect(usedCoins).toEqual([]);
    });

    // Test case 7: Greedy fails (example from problem description)
    test('should fail (return -1) when greedy strategy is not optimal', () => {
        const denominations = [1, 3, 4];
        const amount = 6;
        // Greedy would pick [4, 1, 1] (3 coins).
        // Optimal is [3, 3] (2 coins).
        // Our greedy implementation will return the greedy result, which means
        // it *does* find a solution, just not the optimal one in general.
        // The problem specification for `greedyCoinChange` states it returns numCoins: -1
        // only if it *cannot* make the amount, not if it's suboptimal.
        // This test case should verify what the *greedy* algorithm provides.
        const expectedUsedCoins = [4, 1, 1];
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(expectedUsedCoins.length);
        expect(usedCoins).toEqual(expectedUsedCoins);
        // This highlights that `numCoins: -1` only means *cannot make change at all*,
        // not *cannot make change optimally*. A discussion point for interviews.
    });

    // Test case 8: Cannot make the amount at all (e.g., no 1-cent coin)
    test('should return -1 if amount cannot be made by any means (greedily)', () => {
        const denominations = [5, 10];
        const amount = 12; // Cannot make 12 with only 5s and 10s
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(-1);
        expect(usedCoins).toEqual([]);
    });

    // Test case 9: Cannot make the amount with some denominations, but other denominations exist
    test('should return -1 if specific coins are needed but not available', () => {
        const denominations = [5, 10, 20]; // No 1s, 2s, 3s, etc.
        const amount = 13; // Needs 1, 2, or 3
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(-1);
        expect(usedCoins).toEqual([]);
    });

    // Test case 10: Denominations with duplicates (should be handled by sorting)
    test('should handle denominations with duplicates correctly', () => {
        const denominations = [10, 5, 10, 1]; // Duplicates should not affect logic after sorting
        const amount = 21;
        // Sorted unique-like: [10, 10, 5, 1]
        // [10, 10, 1] -> 3 coins
        const expectedUsedCoins = [10, 10, 1];
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(expectedUsedCoins.length);
        expect(usedCoins).toEqual(expectedUsedCoins);
    });

    // Test case 11: Large amount with standard denominations
    test('should handle large amounts with standard denominations efficiently', () => {
        const denominations = [1, 5, 10, 25, 100]; // US dollars & cents
        const amount = 9999;
        // 99x100 = 9900
        // 3x25 = 75 (total 9975)
        // 2x10 = 20 (total 9995)
        // 4x1 = 4 (total 9999)
        const expectedNumCoins = 99 + 3 + 2 + 4; // 108 coins
        const { numCoins, usedCoins } = greedyCoinChange(denominations, amount);

        expect(numCoins).toBe(expectedNumCoins);
        // Verify a subset of usedCoins for large outputs
        expect(usedCoins.filter(c => c === 100).length).toBe(99);
        expect(usedCoins.filter(c => c === 25).length).toBe(3);
        expect(usedCoins.filter(c => c === 10).length).toBe(2);
        expect(usedCoins.filter(c => c === 1).length).toBe(4);
    });
});
```