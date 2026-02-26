```javascript
/**
 * @fileoverview Test suite for Problem 4: Largest Rectangle in Histogram.
 * Uses Node.js's built-in `node:test` module.
 */

import { test, assert } from 'node:test';
import {
    largestRectangleAreaOptimal,
    largestRectangleAreaBruteForce
} from '../src/problems/problem4_largest_rectangle_in_histogram.js';

test('Problem 4: Largest Rectangle in Histogram - Optimal Solution', (t) => {
    // Test Case 1: Example from problem description
    assert.strictEqual(largestRectangleAreaOptimal([2, 1, 5, 6, 2, 3]), 10, "Test Case 1: [2,1,5,6,2,3] -> 10");

    // Test Case 2: Monotonically increasing heights
    assert.strictEqual(largestRectangleAreaOptimal([1, 2, 3, 4, 5]), 9, "Test Case 2: [1,2,3,4,5] -> 9 (height 3, width 3 => 9)");

    // Test Case 3: Monotonically decreasing heights
    assert.strictEqual(largestRectangleAreaOptimal([5, 4, 3, 2, 1]), 9, "Test Case 3: [5,4,3,2,1] -> 9 (height 3, width 3 => 9)");

    // Test Case 4: All same height
    assert.strictEqual(largestRectangleAreaOptimal([2, 2, 2, 2, 2]), 10, "Test Case 4: [2,2,2,2,2] -> 10");

    // Test Case 5: Single bar
    assert.strictEqual(largestRectangleAreaOptimal([5]), 5, "Test Case 5: [5] -> 5");

    // Test Case 6: Empty array
    assert.strictEqual(largestRectangleAreaOptimal([]), 0, "Test Case 6: [] -> 0");

    // Test Case 7: Contains zero height bars
    assert.strictEqual(largestRectangleAreaOptimal([0, 1, 0, 1]), 1, "Test Case 7: [0,1,0,1] -> 1");
    assert.strictEqual(largestRectangleAreaOptimal([2, 0, 2]), 2, "Test Case 8: [2,0,2] -> 2");

    // Test Case 9: Complex mixed heights
    assert.strictEqual(largestRectangleAreaOptimal([6, 2, 5, 4, 5, 1, 6]), 12, "Test Case 9: [6,2,5,4,5,1,6] -> 12 (5x2, 4x3)");

    // Test Case 10: Another complex case
    assert.strictEqual(largestRectangleAreaOptimal([2, 4]), 4, "Test Case 10: [2,4] -> 4 (height 2, width 2)");

    // Test Case 11: Long example
    assert.strictEqual(largestRectangleAreaOptimal([1, 8, 5, 7, 0, 9, 9, 9, 8, 7, 6]), 27, "Test Case 11: Long mixed heights -> 27"); // (9x3 from index 5 to 7)
});

test('Problem 4: Largest Rectangle in Histogram - Brute Force Solution', (t) => {
    // Test Case 1: Example from problem description
    assert.strictEqual(largestRectangleAreaBruteForce([2, 1, 5, 6, 2, 3]), 10, "Test Case 1: [2,1,5,6,2,3] -> 10");

    // Test Case 2: Monotonically increasing heights
    assert.strictEqual(largestRectangleAreaBruteForce([1, 2, 3, 4, 5]), 9, "Test Case 2: [1,2,3,4,5] -> 9 (height 3, width 3 => 9)");

    // Test Case 3: Monotonically decreasing heights
    assert.strictEqual(largestRectangleAreaBruteForce([5, 4, 3, 2, 1]), 9, "Test Case 3: [5,4,3,2,1] -> 9 (height 3, width 3 => 9)");

    // Test Case 4: All same height
    assert.strictEqual(largestRectangleAreaBruteForce([2, 2, 2, 2, 2]), 10, "Test Case 4: [2,2,2,2,2] -> 10");

    // Test Case 5: Single bar
    assert.strictEqual(largestRectangleAreaBruteForce([5]), 5, "Test Case 5: [5] -> 5");

    // Test Case 6: Empty array
    assert.strictEqual(largestRectangleAreaBruteForce([]), 0, "Test Case 6: [] -> 0");

    // Test Case 7: Contains zero height bars
    assert.strictEqual(largestRectangleAreaBruteForce([0, 1, 0, 1]), 1, "Test Case 7: [0,1,0,1] -> 1");
    assert.strictEqual(largestRectangleAreaBruteForce([2, 0, 2]), 2, "Test Case 8: [2,0,2] -> 2");

    // Test Case 9: Complex mixed heights
    assert.strictEqual(largestRectangleAreaBruteForce([6, 2, 5, 4, 5, 1, 6]), 12, "Test Case 9: [6,2,5,4,5,1,6] -> 12 (5x2, 4x3)");

    // Test Case 10: Another complex case
    assert.strictEqual(largestRectangleAreaBruteForce([2, 4]), 4, "Test Case 10: [2,4] -> 4 (height 2, width 2)");
});
```