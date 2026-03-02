```javascript
/**
 * @fileoverview Test cases for Problem 1: Reverse Linked List.
 */

const { createList, toArray, compareArrays } = require('../src/utils/listUtils');
const { reverseListIterative, reverseListRecursive, reverseListBruteForce } = require('../src/problems/Problem1_ReverseList');

testSuite('Problem 1: Reverse Linked List', () => {

    const testCases = [
        { name: 'Empty list', input: [], expected: [] },
        { name: 'Single node list', input: [1], expected: [1] },
        { name: 'Two node list', input: [1, 2], expected: [2, 1] },
        { name: 'Multiple node list', input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
        { name: 'Even number of nodes', input: [10, 20, 30, 40], expected: [40, 30, 20, 10] },
        { name: 'Odd number of nodes', input: [1, 3, 5, 7, 9], expected: [9, 7, 5, 3, 1] },
        { name: 'List with duplicate values', input: [1, 2, 2, 1], expected: [1, 2, 2, 1] },
        { name: 'List with negative values', input: [-1, -2, -3], expected: [-3, -2, -1] },
        { name: 'List with zero', input: [0, 1, 2], expected: [2, 1, 0] },
        { name: 'Longer list', input: Array.from({ length: 100 }, (_, i) => i + 1), expected: Array.from({ length: 100 }, (_, i) => 100 - i) }
    ];

    // --- Test reverseListIterative ---
    console.log("\nTesting reverseListIterative...");
    for (const { name, input, expected } of testCases) {
        const head = createList(input);
        const reversedHead = reverseListIterative(head);
        const actual = toArray(reversedHead);
        assert(compareArrays(actual, expected), `Iterative - Test Case: ${name} (Input: [${input}]) - Expected: [${expected}], Got: [${actual}]`);
    }

    // --- Test reverseListRecursive ---
    console.log("\nTesting reverseListRecursive...");
    for (const { name, input, expected } of testCases) {
        const head = createList(input);
        const reversedHead = reverseListRecursive(head);
        const actual = toArray(reversedHead);
        assert(compareArrays(actual, expected), `Recursive - Test Case: ${name} (Input: [${input}]) - Expected: [${expected}], Got: [${actual}]`);
    }

    // --- Test reverseListBruteForce ---
    console.log("\nTesting reverseListBruteForce...");
    for (const { name, input, expected } of testCases) {
        const head = createList(input);
        const reversedHead = reverseListBruteForce(head);
        const actual = toArray(reversedHead);
        assert(compareArrays(actual, expected), `Brute Force - Test Case: ${name} (Input: [${input}]) - Expected: [${expected}], Got: [${actual}]`);
    }
});
```