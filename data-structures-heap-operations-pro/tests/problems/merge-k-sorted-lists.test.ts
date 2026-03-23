```typescript
/**
 * tests/problems/merge-k-sorted-lists.test.ts
 * 
 * Test suite for the mergeKLists function (Problem 2: Merge K Sorted Lists).
 * Verifies the correctness of merging various combinations of sorted linked lists,
 * including empty lists, single-node lists, and multiple lists with duplicates.
 */

import { mergeKLists } from '../../src/problems/merge-k-sorted-lists';
import { ListNode } from '../../src/data-structures/ListNode';

// Helper function to convert an array of numbers to a linked list
const arrToLinkedList = (arr: number[]): ListNode | null => {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
};

// Helper function to convert a linked list to an array of numbers
const linkedListToArray = (head: ListNode | null): number[] => {
    const result: number[] = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
};

describe('mergeKLists', () => {
    test('should merge k sorted lists correctly (LeetCode example)', () => {
        const lists = [
            arrToLinkedList([1, 4, 5]),
            arrToLinkedList([1, 3, 4]),
            arrToLinkedList([2, 6]),
        ];
        const mergedList = mergeKLists(lists);
        expect(linkedListToArray(mergedList)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
    });

    test('should return null for an empty array of lists', () => {
        const lists: Array<ListNode | null> = [];
        const mergedList = mergeKLists(lists);
        expect(mergedList).toBeNull();
    });

    test('should return null for an array containing only null lists', () => {
        const lists = [null, null, null];
        const mergedList = mergeKLists(lists);
        expect(mergedList).toBeNull();
    });

    test('should return the single list if only one list is provided', () => {
        const lists = [arrToLinkedList([1, 2, 3])];
        const mergedList = mergeKLists(lists);
        expect(linkedListToArray(mergedList)).toEqual([1, 2, 3]);
    });

    test('should handle lists with single nodes', () => {
        const lists = [
            arrToLinkedList([5]),
            arrToLinkedList([1]),
            arrToLinkedList([3]),
        ];
        const mergedList = mergeKLists(lists);
        expect(linkedListToArray(mergedList)).toEqual([1, 3, 5]);
    });

    test('should handle lists with duplicate values across lists', () => {
        const lists = [
            arrToLinkedList([1, 1, 3]),
            arrToLinkedList([1, 2, 2]),
            arrToLinkedList([3, 4]),
        ];
        const mergedList = mergeKLists(lists);
        expect(linkedListToArray(mergedList)).toEqual([1, 1, 1, 2, 2, 3, 3, 4]);
    });

    test('should handle lists with varying lengths, including empty ones', () => {
        const lists = [
            arrToLinkedList([1, 7]),
            null,
            arrToLinkedList([2, 3, 4]),
            arrToLinkedList([5, 6]),
            null,
            arrToLinkedList([0]),
        ];
        const mergedList = mergeKLists(lists);
        expect(linkedListToArray(mergedList)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });

    test('should handle two lists', () => {
        const lists = [
            arrToLinkedList([1, 2, 3]),
            arrToLinkedList([4, 5, 6]),
        ];
        const mergedList = mergeKLists(lists);
        expect(linkedListToArray(mergedList)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('should handle all elements being identical', () => {
        const lists = [
            arrToLinkedList([7, 7]),
            arrToLinkedList([7]),
            arrToLinkedList([7, 7, 7]),
        ];
        const mergedList = mergeKLists(lists);
        expect(linkedListToArray(mergedList)).toEqual([7, 7, 7, 7, 7, 7]);
    });

    test('should handle lists with negative numbers', () => {
        const lists = [
            arrToLinkedList([-5, -3, 0]),
            arrToLinkedList([-10, -8, -1]),
            arrToLinkedList([-7, -4, -2]),
        ];
        const mergedList = mergeKLists(lists);
        expect(linkedListToArray(mergedList)).toEqual([-10, -8, -7, -5, -4, -3, -2, -1, 0]);
    });

    test('should handle a large number of lists (conceptual)', () => {
        const numLists = 100;
        const lists: Array<ListNode | null> = [];
        for (let i = 0; i < numLists; i++) {
            lists.push(arrToLinkedList([i, i + numLists]));
        }
        const mergedList = mergeKLists(lists);
        const expected = [];
        for (let i = 0; i < numLists; i++) {
            expected.push(i);
        }
        for (let i = 0; i < numLists; i++) {
            expected.push(i + numLists);
        }
        expect(linkedListToArray(mergedList)).toEqual(expected.sort((a, b) => a - b));
    });
});
```