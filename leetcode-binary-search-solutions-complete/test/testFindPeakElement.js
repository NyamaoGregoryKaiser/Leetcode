```javascript
/**
 * test/testFindPeakElement.js
 * Test cases for findPeakElement.js
 */

const TestRunner = require('./testRunner');
const { findPeakElement, findPeakElementBruteForce } = require('../src/problems/findPeakElement');
const { ArrayUtils } = require('../src/index'); // Using index.js for utils access

const test = new TestRunner();

function runTests(findPeakFn, descriptionSuffix) {
    test.suite(`Find Peak Element - ${descriptionSuffix}`, (assert) => {
        // Standard cases
        assert.assertEqual(findPeakFn([1, 2, 3, 1]), 2, 'Should find peak in increasing then decreasing array');
        assert.assertEqual(findPeakFn([1, 2, 1, 3, 5, 6, 4]), 5, 'Should find any peak in multiple peak array'); // Could be 1 or 5
        assert.assertEqual(findPeakFn([1, 2, 3, 4, 5]), 4, 'Should find peak at end if array is strictly increasing');
        assert.assertEqual(findPeakFn([5, 4, 3, 2, 1]), 0, 'Should find peak at beginning if array is strictly decreasing');
        assert.assertEqual(findPeakFn([1]), 0, 'Should handle single element array');
        assert.assertEqual(findPeakFn([], -1), -1, 'Should handle empty array'); // Assuming -1 for empty
        assert.assertEqual(findPeakFn([1, 2]), 1, 'Should find peak in two-element increasing array');
        assert.assertEqual(findPeakFn([2, 1]), 0, 'Should find peak in two-element decreasing array');
        assert.assertEqual(findPeakFn([3, 1, 2]), 0, 'Should find peak at index 0'); // 3 > 1
        assert.assertEqual(findPeakFn([1, 3, 2]), 1, 'Should find peak at index 1'); // 3 > 1, 3 > 2

        // More complex cases / Larger arrays
        const arr1 = [1, 5, 2, 8, 3, 10, 4]; // Peaks at 5 (idx 1), 8 (idx 3), 10 (idx 5)
        let peakIdx1 = findPeakFn(arr1);
        assert.assertTrue(peakIdx1 === 1 || peakIdx1 === 3 || peakIdx1 === 5, `Should find a peak in ${JSON.stringify(arr1)}`);

        const largeArrInc = ArrayUtils.generateSortedArray(100); // [0, 1, ..., 99]
        assert.assertEqual(findPeakFn(largeArrInc), 99, 'Large increasing array, peak at end');

        const largeArrDec = ArrayUtils.generateSortedArray(100).reverse(); // [99, 98, ..., 0]
        assert.assertEqual(findPeakFn(largeArrDec), 0, 'Large decreasing array, peak at start');

        const mixedArr = [1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5]; // Peaks at 5, 8
        let peakIdxMixed = findPeakFn(mixedArr);
        assert.assertTrue(peakIdxMixed === 4 || peakIdxMixed === 15, `Should find a peak in ${JSON.stringify(mixedArr)}`);

        // Array with all same values (not allowed by problem statement nums[i] != nums[i+1], but good to check robustness)
        // If allowed, any element could be a peak. Our algorithm should technically converge to the last element.
        assert.assertEqual(findPeakFn([7, 7, 7, 7]), 3, 'Should handle all same values (last element considered peak)'); // Note: Problem implies nums[i] != nums[i+1]
    });
}

// Run tests for both optimized and brute-force
runTests(findPeakElement, 'Optimized');
runTests(findPeakElementBruteForce, 'Brute Force');

module.exports = test; // Export the test runner instance for allTests.js
```