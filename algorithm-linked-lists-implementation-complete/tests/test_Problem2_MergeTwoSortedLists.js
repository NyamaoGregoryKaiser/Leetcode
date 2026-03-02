```javascript
/**
 * @fileoverview Test cases for Problem 2: Merge Two Sorted Lists.
 */

const { createList, toArray, compareArrays } = require('../src/utils/listUtils');
const { mergeTwoListsIterative, mergeTwoListsRecursive } = require('../src/problems/Problem2_MergeTwoSortedLists');

testSuite('Problem 2: Merge Two Sorted Lists', () => {

    const testCases = [
        { name: 'Both lists empty', l1: [], l2: [], expected: [] },
        { name: 'List1 empty', l1: [], l2: [1, 2, 3], expected: [1, 2, 3] },
        { name: 'List2 empty', l1: [1, 2, 3], l2: [], expected: [1, 2, 3] },
        { name: 'Both lists single node', l1: [1], l2: [2], expected: [1, 2] },
        { name: 'Both lists single node (reversed)', l1: [2], l2: [1], expected: [1, 2] },
        { name: 'Typical case', l1: [1, 2, 4], l2: [1, 3, 4], expected: [1, 1, 2, 3, 4, 4] },
        { name: 'Elements from one list all smaller', l1: [1, 2], l2: [3, 4, 5], expected: [1, 2, 3, 4, 5] },
        { name: 'Elements from one list all larger', l1: [3, 4, 5], l2: [1, 2], expected: [1, 2, 3, 4, 5] },
        { name: 'Alternating elements', l1: [1, 3, 5], l2: [2, 4, 6], expected: [1, 2, 3, 4, 5, 6] },
        { name: 'Lists with duplicate values across lists', l1: [1, 1, 3], l2: [1, 2, 3], expected: [1, 1, 1, 2, 3, 3] },
        { name: 'Lists with negative values', l1: [-5, -2, 0], l2: [-3, -1, 1], expected: [-5, -3, -2, -1, 0, 1] },
        { name: 'Longer lists (even merge)',
            l1: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
            l2: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
            expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        { name: 'Longer lists (uneven merge)',
            l1: [1, 5, 10, 15, 20, 25, 30],
            l2: [2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19],
            expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30]
        }
    ];

    // --- Test mergeTwoListsIterative ---
    console.log("\nTesting mergeTwoListsIterative...");
    for (const { name, l1, l2, expected } of testCases) {
        const head1 = createList(l1);
        const head2 = createList(l2);
        const mergedHead = mergeTwoListsIterative(head1, head2);
        const actual = toArray(mergedHead);
        assert(compareArrays(actual, expected), `Iterative - Test Case: ${name} (L1: [${l1}], L2: [${l2}]) - Expected: [${expected}], Got: [${actual}]`);
    }

    // --- Test mergeTwoListsRecursive ---
    console.log("\nTesting mergeTwoListsRecursive...");
    for (const { name, l1, l2, expected } of testCases) {
        // Create new lists for recursive tests to ensure original lists are not altered by previous tests
        const head1 = createList(l1);
        const head2 = createList(l2);
        const mergedHead = mergeTwoListsRecursive(head1, head2);
        const actual = toArray(mergedHead);
        assert(compareArrays(actual, expected), `Recursive - Test Case: ${name} (L1: [${l1}], L2: [${l2}]) - Expected: [${expected}], Got: [${actual}]`);
    }
});
```