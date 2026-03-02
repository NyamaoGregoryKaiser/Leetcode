```javascript
/**
 * @fileoverview Test cases for Problem 5: Remove Nth Node From End of List.
 */

const { createList, toArray, compareArrays } = require('../src/utils/listUtils');
const { removeNthFromEnd } = require('../src/problems/Problem5_RemoveNthFromEnd');

testSuite('Problem 5: Remove Nth Node From End of List', () => {

    const testCases = [
        { name: 'Remove 1st node from 1-node list', input: [1], n: 1, expected: [] },
        { name: 'Remove 1st node from 2-node list', input: [1, 2], n: 2, expected: [2] },
        { name: 'Remove 2nd node from 2-node list', input: [1, 2], n: 1, expected: [1] },
        { name: 'Remove 1st node from 5-node list', input: [1, 2, 3, 4, 5], n: 5, expected: [2, 3, 4, 5] }, // Removing head
        { name: 'Remove middle node (2nd from end) from 5-node list', input: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5] },
        { name: 'Remove last node (1st from end) from 5-node list', input: [1, 2, 3, 4, 5], n: 1, expected: [1, 2, 3, 4] },
        { name: 'Remove middle node (3rd from end) from 5-node list', input: [1, 2, 3, 4, 5], n: 3, expected: [1, 2, 4, 5] },
        { name: 'Even length list, remove middle', input: [10, 20, 30, 40], n: 2, expected: [10, 20, 40] },
        { name: 'Longer list, remove from beginning', input: Array.from({ length: 10 }, (_, i) => i + 1), n: 10, expected: Array.from({ length: 9 }, (_, i) => i + 2) },
        { name: 'Longer list, remove from middle', input: Array.from({ length: 10 }, (_, i) => i + 1), n: 5, expected: [1, 2, 3, 4, 6, 7, 8, 9, 10] },
        { name: 'Longer list, remove from end', input: Array.from({ length: 10 }, (_, i) => i + 1), n: 1, expected: Array.from({ length: 9 }, (_, i) => i + 1) },
    ];

    console.log("\nTesting removeNthFromEnd...");
    for (const { name, input, n, expected } of testCases) {
        const head = createList(input);
        const modifiedHead = removeNthFromEnd(head, n);
        const actual = toArray(modifiedHead);
        assert(compareArrays(actual, expected), `Test Case: ${name} (Input: [${input}], n=${n}) - Expected: [${expected}], Got: [${actual}]`);
    }

    // Edge case: An empty list (though problem says n is valid implying non-empty)
    console.log("\nTesting removeNthFromEnd on empty list (expecting null)...");
    let emptyListHead = createList([]);
    const result = removeNthFromEnd(emptyListHead, 1); // If n=1, and list is empty, should return null
    assert(result === null, 'Test Case: Empty list - Expected: null, Got: non-null');
});
```