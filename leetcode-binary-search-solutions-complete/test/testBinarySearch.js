```javascript
/**
 * test/testBinarySearch.js
 * Test cases for binarySearch.js
 */

const TestRunner = require('./testRunner');
const {
    binarySearchIterative,
    binarySearchRecursive,
    findFirstOccurrence,
    findLastOccurrence
} = require('../src/problems/binarySearch');
const { generateSortedArray, generateSortedArrayWithDuplicates } = require('../src/utils/arrayUtils');

const test = new TestRunner();

test.suite('Binary Search - Standard (Iterative)', (assert) => {
    const arr1 = generateSortedArray(10); // [0, 1, ..., 9]
    const arr2 = [];
    const arr3 = [5];
    const arr4 = [1, 3, 5, 7, 9, 11, 13, 15];

    assert.assertEqual(binarySearchIterative(arr1, 5), 5, 'Should find target in middle');
    assert.assertEqual(binarySearchIterative(arr1, 0), 0, 'Should find target at beginning');
    assert.assertEqual(binarySearchIterative(arr1, 9), 9, 'Should find target at end');
    assert.assertEqual(binarySearchIterative(arr1, 10), -1, 'Should return -1 for target not present (greater)');
    assert.assertEqual(binarySearchIterative(arr1, -1), -1, 'Should return -1 for target not present (smaller)');
    assert.assertEqual(binarySearchIterative(arr1, 4.5), -1, 'Should return -1 for non-integer target');
    assert.assertEqual(binarySearchIterative(arr2, 5), -1, 'Should handle empty array');
    assert.assertEqual(binarySearchIterative(arr3, 5), 0, 'Should handle single element array (found)');
    assert.assertEqual(binarySearchIterative(arr3, 10), -1, 'Should handle single element array (not found)');
    assert.assertEqual(binarySearchIterative(arr4, 7), 3, 'Should find target in odd length array');
    assert.assertEqual(binarySearchIterative(arr4, 8), -1, 'Should return -1 for target not present in odd length array');
    assert.assertEqual(binarySearchIterative([1,2], 1), 0, 'Should work for two elements (first)');
    assert.assertEqual(binarySearchIterative([1,2], 2), 1, 'Should work for two elements (second)');
    assert.assertEqual(binarySearchIterative([1,2], 3), -1, 'Should work for two elements (not found)');
});

test.suite('Binary Search - Standard (Recursive)', (assert) => {
    const arr1 = generateSortedArray(10); // [0, 1, ..., 9]
    const arr2 = [];
    const arr3 = [5];
    const arr4 = [1, 3, 5, 7, 9, 11, 13, 15];

    assert.assertEqual(binarySearchRecursive(arr1, 5), 5, 'Should find target in middle');
    assert.assertEqual(binarySearchRecursive(arr1, 0), 0, 'Should find target at beginning');
    assert.assertEqual(binarySearchRecursive(arr1, 9), 9, 'Should find target at end');
    assert.assertEqual(binarySearchRecursive(arr1, 10), -1, 'Should return -1 for target not present (greater)');
    assert.assertEqual(binarySearchRecursive(arr1, -1), -1, 'Should return -1 for target not present (smaller)');
    assert.assertEqual(binarySearchRecursive(arr2, 5), -1, 'Should handle empty array');
    assert.assertEqual(binarySearchRecursive(arr3, 5), 0, 'Should handle single element array (found)');
    assert.assertEqual(binarySearchRecursive(arr3, 10), -1, 'Should handle single element array (not found)');
    assert.assertEqual(binarySearchRecursive(arr4, 7), 3, 'Should find target in odd length array');
    assert.assertEqual(binarySearchRecursive(arr4, 8), -1, 'Should return -1 for target not present in odd length array');
    assert.assertEqual(binarySearchRecursive([1,2], 1), 0, 'Should work for two elements (first)');
    assert.assertEqual(binarySearchRecursive([1,2], 2), 1, 'Should work for two elements (second)');
    assert.assertEqual(binarySearchRecursive([1,2], 3), -1, 'Should work for two elements (not found)');
});

test.suite('Binary Search - Find First Occurrence', (assert) => {
    const arr1 = [1, 2, 3, 3, 3, 4, 5];
    const arr2 = [1, 1, 1, 1, 1];
    const arr3 = [1, 2, 3, 4, 5];
    const arr4 = [];
    const arr5 = [7];
    const arr6 = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]; // 10 threes

    assert.assertEqual(findFirstOccurrence(arr1, 3), 2, 'Should find first occurrence in a mixed array');
    assert.assertEqual(findFirstOccurrence(arr1, 1), 0, 'Should find first occurrence at beginning');
    assert.assertEqual(findFirstOccurrence(arr1, 5), 6, 'Should find first occurrence at end');
    assert.assertEqual(findFirstOccurrence(arr1, 2), 1, 'Should find unique element');
    assert.assertEqual(findFirstOccurrence(arr1, 0), -1, 'Should return -1 for target not present (smaller)');
    assert.assertEqual(findFirstOccurrence(arr1, 6), -1, 'Should return -1 for target not present (greater)');

    assert.assertEqual(findFirstOccurrence(arr2, 1), 0, 'Should find first occurrence in all duplicates array');
    assert.assertEqual(findFirstOccurrence(arr2, 2), -1, 'Should return -1 in all duplicates array (not found)');

    assert.assertEqual(findFirstOccurrence(arr3, 3), 2, 'Should work for array with no duplicates');
    assert.assertEqual(findFirstOccurrence(arr3, 0), -1, 'Should work for array with no duplicates (not found)');

    assert.assertEqual(findFirstOccurrence(arr4, 5), -1, 'Should handle empty array');

    assert.assertEqual(findFirstOccurrence(arr5, 7), 0, 'Should handle single element array (found)');
    assert.assertEqual(findFirstOccurrence(arr5, 1), -1, 'Should handle single element array (not found)');

    assert.assertEqual(findFirstOccurrence(arr6, 3), 0, 'Should find first in large duplicate array');
    assert.assertEqual(findFirstOccurrence(arr6, 4), -1, 'Should not find in large duplicate array');
});

test.suite('Binary Search - Find Last Occurrence', (assert) => {
    const arr1 = [1, 2, 3, 3, 3, 4, 5];
    const arr2 = [1, 1, 1, 1, 1];
    const arr3 = [1, 2, 3, 4, 5];
    const arr4 = [];
    const arr5 = [7];
    const arr6 = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]; // 10 threes

    assert.assertEqual(findLastOccurrence(arr1, 3), 4, 'Should find last occurrence in a mixed array');
    assert.assertEqual(findLastOccurrence(arr1, 1), 0, 'Should find last occurrence at beginning');
    assert.assertEqual(findLastOccurrence(arr1, 5), 6, 'Should find last occurrence at end');
    assert.assertEqual(findLastOccurrence(arr1, 2), 1, 'Should find unique element');
    assert.assertEqual(findLastOccurrence(arr1, 0), -1, 'Should return -1 for target not present (smaller)');
    assert.assertEqual(findLastOccurrence(arr1, 6), -1, 'Should return -1 for target not present (greater)');

    assert.assertEqual(findLastOccurrence(arr2, 1), 4, 'Should find last occurrence in all duplicates array');
    assert.assertEqual(findLastOccurrence(arr2, 2), -1, 'Should return -1 in all duplicates array (not found)');

    assert.assertEqual(findLastOccurrence(arr3, 3), 2, 'Should work for array with no duplicates');
    assert.assertEqual(findLastOccurrence(arr3, 0), -1, 'Should work for array with no duplicates (not found)');

    assert.assertEqual(findLastOccurrence(arr4, 5), -1, 'Should handle empty array');

    assert.assertEqual(findLastOccurrence(arr5, 7), 0, 'Should handle single element array (found)');
    assert.assertEqual(findLastOccurrence(arr5, 1), -1, 'Should handle single element array (not found)');

    assert.assertEqual(findLastOccurrence(arr6, 3), 9, 'Should find last in large duplicate array');
    assert.assertEqual(findLastOccurrence(arr6, 4), -1, 'Should not find in large duplicate array');
});

module.exports = test; // Export the test runner instance for allTests.js
```