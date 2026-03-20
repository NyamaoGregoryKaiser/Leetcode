```javascript
/**
 * @fileoverview Test suite for combinations algorithm.
 * Uses the global `assert` and `testSuite` functions provided by `testRunner.js`.
 */

const { findCombinations } = require('../src/algorithms/combinations');
const { areSortedArraysOfArraysEqual } = require('../src/utils/arrayUtils');

testSuite('Combinations Algorithm', () => {

    // Helper to compare results for combinations, where order of sub-arrays doesn't matter.
    const expectCombinationsEqual = (actual, expected, message) => {
        const result = areSortedArraysOfArraysEqual(actual, expected);
        assert(result, message);
    };

    assert(typeof findCombinations === 'function', 'findCombinations should be a function');

    // Test Case 1: Standard case n=4, k=2
    expectCombinationsEqual(
        findCombinations(4, 2),
        [
            [1, 2], [1, 3], [1, 4],
            [2, 3], [2, 4],
            [3, 4]
        ],
        'Should correctly find all combinations for n=4, k=2'
    );

    // Test Case 2: n=1, k=1
    expectCombinationsEqual(
        findCombinations(1, 1),
        [
            [1]
        ],
        'Should correctly find all combinations for n=1, k=1'
    );

    // Test Case 3: n=3, k=1
    expectCombinationsEqual(
        findCombinations(3, 1),
        [
            [1],
            [2],
            [3]
        ],
        'Should correctly find all combinations for n=3, k=1'
    );

    // Test Case 4: n=3, k=3
    expectCombinationsEqual(
        findCombinations(3, 3),
        [
            [1, 2, 3]
        ],
        'Should correctly find all combinations for n=3, k=3'
    );

    // Test Case 5: n=5, k=3
    expectCombinationsEqual(
        findCombinations(5, 3),
        [
            [1, 2, 3], [1, 2, 4], [1, 2, 5],
            [1, 3, 4], [1, 3, 5],
            [1, 4, 5],
            [2, 3, 4], [2, 3, 5],
            [2, 4, 5],
            [3, 4, 5]
        ],
        'Should correctly find all combinations for n=5, k=3'
    );

    // Test Case 6: Edge case - k = 0 (mathematically 1 combination, the empty set)
    // Current implementation assumes k >= 1 as per problem constraints.
    // If k=0 was allowed, an adjustment would be needed to add `[[]]` if k=0.
    // Given the constraints (1 <= k <= n), this case is not strictly necessary.
    // However, if it were to produce no combinations, that would also be an "empty set of sets".
    expectCombinationsEqual(
        findCombinations(5, 0),
        [], // The problem implies 1 <= k, so 0 is not expected output
        'Should return empty array for k=0 (outside problem constraints, but testing behavior)'
    );

    // Test Case 7: n=2, k=1
    expectCombinationsEqual(
        findCombinations(2, 1),
        [
            [1],
            [2]
        ],
        'Should correctly find all combinations for n=2, k=1'
    );

    // Test Case 8: n=20, k=1 (large n, small k)
    const expected20_1 = Array.from({ length: 20 }, (_, i) => [i + 1]);
    expectCombinationsEqual(
        findCombinations(20, 1),
        expected20_1,
        'Should correctly find all combinations for n=20, k=1'
    );

    // Test Case 9: n=20, k=20 (large n, k=n)
    const expected20_20 = [Array.from({ length: 20 }, (_, i) => i + 1)];
    expectCombinationsEqual(
        findCombinations(20, 20),
        expected20_20,
        'Should correctly find all combinations for n=20, k=20'
    );
});
```