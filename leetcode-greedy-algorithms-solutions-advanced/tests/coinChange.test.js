```javascript
/**
 * @fileoverview Test suite for the Greedy Coin Change Problem.
 *
 * IMPORTANT: Remember that the greedy coin change algorithm is NOT optimal
 * for all coin systems. The tests below are designed for scenarios where
 * the greedy approach *does* yield the optimal solution (canonical systems),
 * or to illustrate its behavior/failure where appropriate.
 * For a general solution, Dynamic Programming is needed.
 */

import coinChangeGreedy from '../src/problems/coinChange';

describe('coinChangeGreedy', () => {
  // Test Case 1: Canonical US currency system (optimal for greedy)
  test('should correctly make change for a canonical coin system (US currency)', () => {
    const denominations = [1, 5, 10, 25]; // US cents
    const amount = 67;
    // Expected: 2 quarters (50), 1 dime (10), 1 nickel (5), 2 pennies (2) = 4+1+1+2 = 8 coins
    const expected = {
      minCoins: 8,
      coinsUsed: [
        { denomination: 25, count: 2 },
        { denomination: 10, count: 1 },
        { denomination: 5, count: 1 },
        { denomination: 1, count: 2 }
      ]
    };
    const result = coinChangeGreedy(denominations, amount);
    expect(result.minCoins).toBe(expected.minCoins);
    expect(result.coinsUsed.sort((a, b) => b.denomination - a.denomination))
      .toEqual(expected.coinsUsed.sort((a, b) => b.denomination - a.denomination));
  });

  // Test Case 2: Amount is zero
  test('should return 0 coins for an amount of 0', () => {
    const denominations = [1, 5, 10];
    const amount = 0;
    const expected = { minCoins: 0, coinsUsed: [] };
    expect(coinChangeGreedy(denominations, amount)).toEqual(expected);
  });

  // Test Case 3: Empty denominations array
  test('should return -1 for no denominations', () => {
    const denominations = [];
    const amount = 50;
    const expected = { minCoins: -1, coinsUsed: [] };
    expect(coinChangeGreedy(denominations, amount)).toEqual(expected);
  });

  // Test Case 4: Amount cannot be made (even by greedy)
  test('should return -1 if amount cannot be made (e.g., only even coins for odd amount)', () => {
    const denominations = [2, 4, 6];
    const amount = 7;
    const expected = { minCoins: -1, coinsUsed: [] };
    expect(coinChangeGreedy(denominations, amount)).toEqual(expected);
  });

  // Test Case 5: Large amount
  test('should handle large amounts correctly', () => {
    const denominations = [1, 5, 10, 25];
    const amount = 999;
    // 999 = 39 * 25 + 24
    // 24 = 2 * 10 + 4
    // 4 = 4 * 1
    // Total: 39 + 2 + 4 = 45 coins
    const expected = {
      minCoins: 45,
      coinsUsed: [
        { denomination: 25, count: 39 },
        { denomination: 10, count: 2 },
        { denomination: 1, count: 4 }
      ]
    };
    const result = coinChangeGreedy(denominations, amount);
    expect(result.minCoins).toBe(expected.minCoins);
    expect(result.coinsUsed.sort((a, b) => b.denomination - a.denomination))
      .toEqual(expected.coinsUsed.sort((a, b) => b.denomination - a.denomination));
  });

  // Test Case 6: Denominations not sorted (should handle internally)
  test('should work correctly with unsorted denominations', () => {
    const denominations = [10, 1, 25, 5];
    const amount = 67;
    const expected = {
      minCoins: 8,
      coinsUsed: [
        { denomination: 25, count: 2 },
        { denomination: 10, count: 1 },
        { denomination: 5, count: 1 },
        { denomination: 1, count: 2 }
      ]
    };
    const result = coinChangeGreedy(denominations, amount);
    expect(result.minCoins).toBe(expected.minCoins);
    expect(result.coinsUsed.sort((a, b) => b.denomination - a.denomination))
      .toEqual(expected.coinsUsed.sort((a, b) => b.denomination - a.denomination));
  });

  // Test Case 7: System where greedy FAILS (e.g., [1, 3, 4] for amount 6)
  test('should return 3 coins for [1,3,4] and amount 6 (greedy failure case)', () => {
    const denominations = [1, 3, 4];
    const amount = 6;
    // Greedy: 4 (rem 2), 1 (rem 1), 1 (rem 0). Total 3 coins.
    // Optimal (DP): 3 (rem 3), 3 (rem 0). Total 2 coins.
    const expectedGreedy = {
      minCoins: 3,
      coinsUsed: [
        { denomination: 4, count: 1 },
        { denomination: 1, count: 2 }
      ]
    };
    const result = coinChangeGreedy(denominations, amount);
    expect(result.minCoins).toBe(expectedGreedy.minCoins);
    expect(result.coinsUsed.sort((a, b) => b.denomination - a.denomination))
      .toEqual(expectedGreedy.coinsUsed.sort((a, b) => b.denomination - a.denomination));
  });

  // Test Case 8: Another system where greedy FAILS (e.g., [1, 2, 5, 10, 20, 25] amount 40)
  test('should demonstrate greedy behavior for a system where it can fail for specific amounts', () => {
    const denominations = [1, 2, 5, 10, 20, 25];
    const amount = 40;
    // Greedy: 25 (rem 15), 10 (rem 5), 5 (rem 0). Total 3 coins. (25, 10, 5)
    // Optimal: 20 (rem 20), 20 (rem 0). Total 2 coins. (20, 20)
    const expectedGreedy = {
      minCoins: 3,
      coinsUsed: [
        { denomination: 25, count: 1 },
        { denomination: 10, count: 1 },
        { denomination: 5, count: 1 }
      ]
    };
    const result = coinChangeGreedy(denominations, amount);
    expect(result.minCoins).toBe(expectedGreedy.minCoins);
    expect(result.coinsUsed.sort((a, b) => b.denomination - a.denomination))
      .toEqual(expectedGreedy.coinsUsed.sort((a, b) => b.denomination - a.denomination));
  });

  // Test Case 9: Denominations with 1 available (guarantees a solution exists for any amount >= 0)
  test('should always find a solution if denomination 1 is available', () => {
    const denominations = [10, 7, 1];
    const amount = 15;
    // Greedy: 10 (rem 5), 1 (rem 4), 1 (rem 3), 1 (rem 2), 1 (rem 1), 1 (rem 0). Total 6 coins. (10, 1, 1, 1, 1, 1)
    // Optimal: 7 (rem 8), 7 (rem 1), 1 (rem 0). Total 3 coins. (7, 7, 1) -- Greedy fails here!
    const expectedGreedy = {
      minCoins: 6,
      coinsUsed: [
        { denomination: 10, count: 1 },
        { denomination: 1, count: 5 }
      ]
    };
    const result = coinChangeGreedy(denominations, amount);
    expect(result.minCoins).toBe(expectedGreedy.minCoins);
    expect(result.coinsUsed.sort((a, b) => b.denomination - a.denomination))
      .toEqual(expectedGreedy.coinsUsed.sort((a, b) => b.denomination - a.denomination));
  });

  // Test Case 10: Amount is less than smallest coin (but not zero)
  test('should return -1 if amount is positive but less than smallest coin', () => {
    const denominations = [5, 10, 25];
    const amount = 3;
    const expected = { minCoins: -1, coinsUsed: [] };
    expect(coinChangeGreedy(denominations, amount)).toEqual(expected);
  });

  // Test Case 11: Single denomination
  test('should handle single denomination correctly', () => {
    const denominations = [7];
    const amount = 21;
    const expected = { minCoins: 3, coinsUsed: [{ denomination: 7, count: 3 }] };
    expect(coinChangeGreedy(denominations, amount)).toEqual(expected);
  });

  // Test Case 12: Single denomination, not possible
  test('should return -1 for single denomination if amount is not a multiple', () => {
    const denominations = [7];
    const amount = 20;
    const expected = { minCoins: -1, coinsUsed: [] };
    expect(coinChangeGreedy(denominations, amount)).toEqual(expected);
  });

  // Test Case 13: Negative amount
  test('should return -1 for negative amount', () => {
    const denominations = [1, 5, 10];
    const amount = -10;
    const expected = { minCoins: -1, coinsUsed: [] };
    expect(coinChangeGreedy(denominations, amount)).toEqual(expected);
  });
});
```