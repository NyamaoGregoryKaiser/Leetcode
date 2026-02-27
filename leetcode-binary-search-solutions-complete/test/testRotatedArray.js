```javascript
/**
 * test/testRotatedArray.js
 * Test cases for searchRotatedArray.js
 */

const TestRunner = require('./testRunner');
const { searchRotatedArray, searchRotatedArrayBruteForce } = require('../src/problems/searchRotatedArray');
const { generateRotatedSortedArray } = require('../src/utils/arrayUtils');

const test = new TestRunner();

function runTests(searchFn, descriptionSuffix) {
    test.suite(`Search in Rotated Sorted Array - ${descriptionSuffix}`, (assert) => {
        // Standard cases
        assert.assertEqual(searchFn([4, 5, 6, 7, 0, 1, 2], 0), 4, 'Should find target in right segment (rotated)');
        assert.assertEqual(searchFn([4, 5, 6, 7, 0, 1, 2], 3), -1, 'Should not find target (not present)');
        assert.assertEqual(searchFn([4, 5, 6, 7, 0, 1, 2], 6), 2, 'Should find target in left segment (rotated)');
        assert.assertEqual(searchFn([1], 1), 0, 'Should handle single element array (found)');
        assert.assertEqual(searchFn([1], 0), -1, 'Should handle single element array (not found)');
        assert.assertEqual(searchFn([], 0), -1, 'Should handle empty array');
        assert.assertEqual(searchFn([2, 3, 4, 5, 1], 1), 4, 'Should find target at end (rotated)');
        assert.assertEqual(searchFn([5, 1, 2, 3, 4], 5), 0, 'Should find target at beginning (rotated)');
        assert.assertEqual(searchFn([1, 2, 3, 4, 5], 3), 2, 'Should work for non-rotated array');
        assert.assertEqual(searchFn([1, 2, 3, 4, 5], 0), -1, 'Should not find target in non-rotated array');

        // Specific rotations
        assert.assertEqual(searchFn([3, 1, 2], 1), 1, 'Specific rotation 1');
        assert.assertEqual(searchFn([1, 2, 3], 1), 0, 'No rotation, target at start');
        assert.assertEqual(searchFn([3, 4, 5, 1, 2], 3), 0, 'Rotation with target at start of original array');
        assert.assertEqual(searchFn([3, 4, 5, 1, 2], 2), 4, 'Rotation with target at end of original array');

        // Larger arrays with various targets
        const largeArr1 = generateRotatedSortedArray(100, 20); // pivot at 20
        assert.assertEqual(searchFn(largeArr1, largeArr1[0]), 0, 'Large array: target at current start');
        assert.assertEqual(searchFn(largeArr1, largeArr1[99]), 99, 'Large array: target at current end');
        assert.assertEqual(searchFn(largeArr1, largeArr1[45]), 45, 'Large array: target in middle');
        assert.assertEqual(searchFn(largeArr1, largeArr1[20]), 20, 'Large array: target at pivot (first part)');
        assert.assertEqual(searchFn(largeArr1, largeArr1[21]), 21, 'Large array: target after pivot (second part)');
        assert.assertEqual(searchFn(largeArr1, -100), -1, 'Large array: target not present (very small)');
        assert.assertEqual(searchFn(largeArr1, 200), -1, 'Large array: target not present (very large)');

        const largeArr2 = generateRotatedSortedArray(1000, 500); // pivot at 500
        const targetInFirstHalf = largeArr2[100];
        assert.assertEqual(searchFn(largeArr2, targetInFirstHalf), 100, 'Very large array: target in first half');
        const targetInSecondHalf = largeArr2[600];
        assert.assertEqual(searchFn(largeArr2, targetInSecondHalf), 600, 'Very large array: target in second half');
        assert.assertEqual(searchFn(largeArr2, 9999), -1, 'Very large array: target not found');
        assert.assertEqual(searchFn(largeArr2, -5), -1, 'Very large array: target not found (small)');
    });
}

runTests(searchRotatedArray, 'Optimized');
runTests(searchRotatedArrayBruteForce, 'Brute Force');

module.exports = test; // Export the test runner instance for allTests.js
```