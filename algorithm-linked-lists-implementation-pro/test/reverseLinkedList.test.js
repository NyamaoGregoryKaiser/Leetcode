```javascript
/**
 * @fileoverview Test suite for the Reverse Linked List problem.
 */

const reverseLinkedList = require('../src/problems/reverseLinkedList');
const reverseLinkedListRecursive = require('../src/alternatives/reverseLinkedList_recursive');
const { arrayToLinkedList, linkedListToArray } = require('../src/utils/linkedListHelpers');
const ListNode = require('../src/utils/ListNode');

describe('reverseLinkedList - Optimal Iterative Solution', () => {
    test('should reverse an empty list', () => {
        expect(linkedListToArray(reverseLinkedList(null))).toEqual([]);
    });

    test('should reverse a single-node list', () => {
        const head = arrayToLinkedList([1]);
        const expected = [1];
        expect(linkedListToArray(reverseLinkedList(head))).toEqual(expected);
    });

    test('should reverse a two-node list', () => {
        const head = arrayToLinkedList([1, 2]);
        const expected = [2, 1];
        expect(linkedListToArray(reverseLinkedList(head))).toEqual(expected);
    });

    test('should reverse a multi-node list', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const expected = [5, 4, 3, 2, 1];
        expect(linkedListToArray(reverseLinkedList(head))).toEqual(expected);
    });

    test('should handle list with duplicate values', () => {
        const head = arrayToLinkedList([1, 2, 2, 1]);
        const expected = [1, 2, 2, 1];
        expect(linkedListToArray(reverseLinkedList(head))).toEqual(expected);
    });

    test('should handle long list', () => {
        const longArray = Array.from({ length: 100 }, (_, i) => i + 1);
        const head = arrayToLinkedList(longArray);
        const expected = [...longArray].reverse();
        expect(linkedListToArray(reverseLinkedList(head))).toEqual(expected);
    });
});

describe('reverseLinkedListRecursive - Alternative Recursive Solution', () => {
    test('should reverse an empty list', () => {
        expect(linkedListToArray(reverseLinkedListRecursive(null))).toEqual([]);
    });

    test('should reverse a single-node list', () => {
        const head = arrayToLinkedList([1]);
        const expected = [1];
        expect(linkedListToArray(reverseLinkedListRecursive(head))).toEqual(expected);
    });

    test('should reverse a two-node list', () => {
        const head = arrayToLinkedList([1, 2]);
        const expected = [2, 1];
        expect(linkedListToArray(reverseLinkedListRecursive(head))).toEqual(expected);
    });

    test('should reverse a multi-node list', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const expected = [5, 4, 3, 2, 1];
        expect(linkedListToArray(reverseLinkedListRecursive(head))).toEqual(expected);
    });

    test('should handle list with duplicate values', () => {
        const head = arrayToLinkedList([1, 2, 2, 1]);
        const expected = [1, 2, 2, 1];
        expect(linkedListToArray(reverseLinkedListRecursive(head))).toEqual(expected);
    });

    // Note: Recursive solutions can hit stack limits for very long lists in JS environments.
    // This test might fail on very deep recursion limits, but works for typical competitive programming constraints.
    test('should handle moderately long list (for recursive)', () => {
        const longArray = Array.from({ length: 100 }, (_, i) => i + 1);
        const head = arrayToLinkedList(longArray);
        const expected = [...longArray].reverse();
        expect(linkedListToArray(reverseLinkedListRecursive(head))).toEqual(expected);
    });
});
```