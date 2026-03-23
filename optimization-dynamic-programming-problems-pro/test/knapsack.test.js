```javascript
/**
 * test/knapsack.test.js
 *
 * Test cases for the 0/1 Knapsack Problem implementations.
 */

const {
    knapsackRecursive,
    knapsackMemoization,
    knapsackTabulation,
    knapsackSpaceOptimized
} = require('../src/dp_problems');

module.exports = function(assert) {
    // Helper to run all knapsack versions against a single test case
    function testKnapsack(weights, values, capacity, expected, description) {
        console.log(`  Testing capacity=${capacity}, items=${weights.length}, expected=${expected} (${description})`);
        const n = weights.length; // Number of items

        assert.strictEqual(knapsackRecursive(weights, values, capacity, n), expected, `Recursive: Knapsack should be ${expected}`);
        assert.strictEqual(knapsackMemoization(weights, values, capacity, n), expected, `Memoization: Knapsack should be ${expected}`);
        assert.strictEqual(knapsackTabulation(weights, values, capacity), expected, `Tabulation: Knapsack should be ${expected}`);
        assert.strictEqual(knapsackSpaceOptimized(weights, values, capacity), expected, `Space-Optimized: Knapsack should be ${expected}`);
    }

    // Test Cases
    // Example 1: Basic
    testKnapsack(
        [10, 20, 30],
        [60, 100, 120],
        50,
        220, // Items 20 (100) + 30 (120) = 220, capacity 50
        'Standard case (items: [10,20,30], vals: [60,100,120], cap: 50)'
    );

    // Example 2: No items
    testKnapsack(
        [],
        [],
        10,
        0,
        'No items'
    );

    // Example 3: Zero capacity
    testKnapsack(
        [1, 2, 3],
        [10, 20, 30],
        0,
        0,
        'Zero capacity'
    );

    // Example 4: Items too heavy
    testKnapsack(
        [100, 200],
        [10, 20],
        50,
        0,
        'All items too heavy'
    );

    // Example 5: Only one item fits
    testKnapsack(
        [10, 20, 30],
        [100, 50, 10],
        15,
        100, // Only item with weight 10 fits
        'Only one item fits'
    );

    // Example 6: Max value comes from combination, not individual max value item
    testKnapsack(
        [3, 4, 5],
        [30, 50, 60],
        8,
        90, // Items w=3,v=30 and w=5,v=60 sum to 90. Not w=4,v=50 and something else.
        'Optimal combination'
    );

    // Example 7: Different weights and values, larger capacity
    testKnapsack(
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        5,
        7, // Either (2,3) + (3,4) = 7, cap 5. Or (5,6), cap 5. Take (2,3) + (3,4) for capacity 5
        'Larger capacity with various items'
    );

    // Example 8: All items fit
    testKnapsack(
        [1, 2, 3],
        [10, 20, 30],
        6,
        60, // All items fit
        'All items fit'
    );

    // Example 9: Non-obvious choice (from a leetcode problem)
    testKnapsack(
        [3, 2, 4],
        [5, 4, 8],
        6,
        13, // Take (3,5) and (2,4) = 5+4 = 9? No. (2,4) and (4,8) = 4+8=12. Max is 13?
            // Items: (3,5), (2,4), (4,8) Cap: 6
            // (3,5) taken: remaining cap 3. Can't take (2,4) or (4,8). Val=5
            // (2,4) taken: remaining cap 4. Can take (4,8). Total val=4+8=12.
            // (4,8) taken: remaining cap 2. Can take nothing. Total val=8.
            // Oh, wait, the problem definition is 0-indexed for items in our solution, but inputs are for N items.
            // Let's re-verify:
            // Weights = [3,2,4], Values = [5,4,8], Capacity = 6
            // Item 0: w=3, v=5
            // Item 1: w=2, v=4
            // Item 2: w=4, v=8
            //
            // Correct for (3,5) (item 0) and (4,8) (item 2) with capacity 6, cannot fit.
            // (3,5) and (2,4) -> total weight 5, total value 9. Fits.
            // (2,4) and (4,8) -> total weight 6, total value 12. Fits.
            // My earlier comment for Example 1 was incorrect. (10,60) (20,100) (30,120) Cap 50.
            // Optimal is (20,100) + (30,120) = 220.
            // Ah, the problem in KnapsackRecursive and Memo has 'n' as number of *items to consider*.
            // So weights[n-1] is correct.
            // The problem statement for KnapsackRecursive/Memo uses `n` as the count of items to *consider* starting from the end.
            // So `n` goes from `weights.length` down to `0`.
            // For example 9:
            // Items: (3,5), (2,4), (4,8) Cap: 6
            // Take (2,4) & (4,8) -> weight 2+4=6, value 4+8=12. (This is max if we consider the set of 3 items)
            // What if we try to achieve 13?
            // If item 0 (3,5) taken: rem_cap=3, rem_items=[(2,4),(4,8)]. Max of rem_items for cap 3 is (2,4) val 4. Total val = 5+4=9.
            // If item 1 (2,4) taken: rem_cap=4, rem_items=[(3,5),(4,8)]. Max of rem_items for cap 4 is (4,8) val 8. Total val = 4+8=12.
            // If item 2 (4,8) taken: rem_cap=2, rem_items=[(3,5),(2,4)]. Max of rem_items for cap 2 is nothing or (2,4) if it's available. Max is (2,4) val 4. Total val = 8+4=12.
            // The value 13 is from a 0/1 Knapsack where (weights = [1, 3, 4, 5], values = [1, 4, 5, 7], capacity = 7).
            // Let's adjust this test case to reflect 12 as the correct answer.
        12,
        'Complex combination for (w=[3,2,4], v=[5,4,8], cap=6)' // items (2,4) and (4,8) gives 12
    );
};
```