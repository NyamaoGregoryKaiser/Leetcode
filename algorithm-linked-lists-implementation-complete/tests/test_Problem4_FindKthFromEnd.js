```javascript
/**
 * @fileoverview Test cases for Problem 4: Find Kth Node From End of List.
 */

const { createList, toArray } = require('../src/utils/listUtils');
const { findKthFromEndTwoPointers, findKthFromEndWithLength } = require('../src/problems/Problem4_FindKthFromEnd');

testSuite('Problem 4: Find Kth Node From End of List', () => {

    const testCases = [
        { name: 'Single node list, k=1', input: [1], k: 1, expected: 1 },
        { name: 'Two node list, k=1', input: [1, 2], k: 1, expected: 2 },
        { name: 'Two node list, k=2', input: [1, 2], k: 2, expected: 1 },
        { name: 'Standard list, k=1 (last node)', input: [1, 2, 3, 4, 5], k: 1, expected: 5 },
        { name: 'Standard list, k=2', input: [1, 2, 3, 4, 5], k: 2, expected: 4 },
        { name: 'Standard list, k=3 (middle node)', input: [1, 2, 3, 4, 5], k: 3, expected: 3 },
        { name: 'Standard list, k=5 (first node)', input: [1, 2, 3, 4, 5], k: 5, expected: 1 },
        { name: 'Even length list, k=any', input: [10, 20, 30, 40], k: 2, expected: 30 },
        { name: 'Odd length list, k=any', input: [1, 3, 5, 7, 9], k: 3, expected: 5 },
        { name: 'List with duplicate values, k=any', input: [1, 2, 2, 1], k: 2, expected: 2 },
        { name: 'List with negative values, k=any', input: [-1, -2, -3], k: 1, expected: -3 },
        { name: 'Longer list, k=1', input: Array.from({ length: 100 }, (_, i) => i + 1), k: 1, expected: 100 },
        { name: 'Longer list, k=50', input: Array.from({ length: 100 }, (_, i) => i + 1), k: 50, expected: 51 },
        { name: 'Longer list, k=100', input: Array.from({ length: 100 }, (_, i) => i + 1), k: 100, expected: 1 },
    ];

    // --- Test findKthFromEndTwoPointers ---
    console.log("\nTesting findKthFromEndTwoPointers...");
    for (const { name, input, k, expected } of testCases) {
        const head = createList(input);
        const resultNode = findKthFromEndTwoPointers(head, k);
        const actual = resultNode ? resultNode.val : null;
        assert(actual === expected, `Two Pointers - Test Case: ${name} (Input: [${input}], k=${k}) - Expected: ${expected}, Got: ${actual}`);
    }

    // --- Test findKthFromEndWithLength ---
    console.log("\nTesting findKthFromEndWithLength...");
    for (const { name, input, k, expected } of testCases) {
        const head = createList(input);
        const resultNode = findKthFromEndWithLength(head, k);
        const actual = resultNode ? resultNode.val : null;
        assert(actual === expected, `With Length - Test Case: ${name} (Input: [${input}], k=${k}) - Expected: ${expected}, Got: ${actual}`);
    }

    // Edge case: Empty list (though problem says k is valid, implying non-empty list)
    console.log("\nTesting findKthFromEnd on empty list (expecting null for two-pointers and length-based)...");
    let emptyListHead = createList([]);
    assert(findKthFromEndTwoPointers(emptyListHead, 1) === null, 'Two Pointers - Empty list - Expected: null, Got: non-null');
    assert(findKthFromEndWithLength(emptyListHead, 1) === null, 'With Length - Empty list - Expected: null, Got: non-null');

    // Edge case: k > length (handled by problem constraints, but good to check robustness)
    // For this, we'd need to modify the functions or expect a specific error/behavior.
    // Given the constraints, we'll stick to valid k.
});
```