```javascript
/**
 * @fileoverview Test suite for the Remove Nth Node From End of List problem.
 */

const removeNthFromEnd = require('../src/problems/removeNthFromEnd');
const removeNthFromEndTwoPass = require('../src/alternatives/removeNthFromEnd_twoPass');
const { arrayToLinkedList, linkedListToArray } = require('../src/utils/linkedListHelpers');
const ListNode = require('../src/utils/ListNode');

describe('removeNthFromEnd - Optimal Two-Pointer Solution', () => {
    test('should remove the first node from a multi-node list (n = length)', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const expected = [2, 3, 4, 5];
        expect(linkedListToArray(removeNthFromEnd(head, 5))).toEqual(expected);
    });

    test('should remove the last node from a multi-node list (n = 1)', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const expected = [1, 2, 3, 4];
        expect(linkedListToArray(removeNthFromEnd(head, 1))).toEqual(expected);
    });

    test('should remove a middle node from a multi-node list', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const expected = [1, 2, 4, 5];
        expect(linkedListToArray(removeNthFromEnd(head, 3))).toEqual(expected);
    });

    test('should remove the only node from a single-node list (n = 1)', () => {
        const head = arrayToLinkedList([1]);
        expect(linkedListToArray(removeNthFromEnd(head, 1))).toEqual([]);
    });

    test('should remove the first node from a two-node list (n = 2)', () => {
        const head = arrayToLinkedList([1, 2]);
        const expected = [2];
        expect(linkedListToArray(removeNthFromEnd(head, 2))).toEqual(expected);
    });

    test('should remove the last node from a two-node list (n = 1)', () => {
        const head = arrayToLinkedList([1, 2]);
        const expected = [1];
        expect(linkedListToArray(removeNthFromEnd(head, 1))).toEqual(expected);
    });

    test('should handle a moderately long list', () => {
        const longArray = Array.from({ length: 50 }, (_, i) => i + 1);
        const head = arrayToLinkedList(longArray);
        const expected = [...longArray.slice(0, 24), ...longArray.slice(25)]; // Remove 25th node from end (index 25 from start)
        expect(linkedListToArray(removeNthFromEnd(head, 25))).toEqual(expected);
    });

    test('should return null for an empty list (n=1, although problem says non-empty)', () => {
        expect(linkedListToArray(removeNthFromEnd(null, 1))).toEqual([]);
    });

    // Test for edge case where n is equal to length of list (removes head)
    test('should remove the head when n is equal to list length', () => {
        const head = arrayToLinkedList([1, 2, 3]);
        const expected = [2, 3];
        expect(linkedListToArray(removeNthFromEnd(head, 3))).toEqual(expected);
    });
});


describe('removeNthFromEndTwoPass - Alternative Two-Pass Solution', () => {
    test('should remove the first node from a multi-node list (n = length)', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const expected = [2, 3, 4, 5];
        expect(linkedListToArray(removeNthFromEndTwoPass(head, 5))).toEqual(expected);
    });

    test('should remove the last node from a multi-node list (n = 1)', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const expected = [1, 2, 3, 4];
        expect(linkedListToArray(removeNthFromEndTwoPass(head, 1))).toEqual(expected);
    });

    test('should remove a middle node from a multi-node list', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const expected = [1, 2, 4, 5];
        expect(linkedListToArray(removeNthFromEndTwoPass(head, 3))).toEqual(expected);
    });

    test('should remove the only node from a single-node list (n = 1)', () => {
        const head = arrayToLinkedList([1]);
        expect(linkedListToArray(removeNthFromEndTwoPass(head, 1))).toEqual([]);
    });

    test('should remove the first node from a two-node list (n = 2)', () => {
        const head = arrayToLinkedList([1, 2]);
        const expected = [2];
        expect(linkedListToArray(removeNthFromEndTwoPass(head, 2))).toEqual(expected);
    });

    test('should remove the last node from a two-node list (n = 1)', () => {
        const head = arrayToLinkedList([1, 2]);
        const expected = [1];
        expect(linkedListToArray(removeNthFromEndTwoPass(head, 1))).toEqual(expected);
    });

    test('should handle a moderately long list', () => {
        const longArray = Array.from({ length: 50 }, (_, i) => i + 1);
        const head = arrayToLinkedList(longArray);
        const expected = [...longArray.slice(0, 24), ...longArray.slice(25)]; // Remove 25th node from end (index 25 from start)
        expect(linkedListToArray(removeNthFromEndTwoPass(head, 25))).toEqual(expected);
    });

    test('should return null for an empty list (n=1)', () => {
        expect(linkedListToArray(removeNthFromEndTwoPass(null, 1))).toEqual([]);
    });

    test('should remove the head when n is equal to list length', () => {
        const head = arrayToLinkedList([1, 2, 3]);
        const expected = [2, 3];
        expect(linkedListToArray(removeNthFromEndTwoPass(head, 3))).toEqual(expected);
    });
});
```