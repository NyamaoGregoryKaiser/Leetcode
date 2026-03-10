import { ListNode } from '@data-structures/ListNode';
import { arrayToLinkedList, linkedListToArray } from '@utils/listUtils';
import { mergeTwoSortedListsIterative, mergeTwoSortedListsRecursive } from '@problems/mergeTwoSortedLists';

describe('mergeTwoSortedListsIterative', () => {
    it('should merge two empty lists', () => {
        const l1 = arrayToLinkedList([]);
        const l2 = arrayToLinkedList([]);
        const merged = mergeTwoSortedListsIterative(l1, l2);
        expect(linkedListToArray(merged)).toEqual([]);
    });

    it('should merge one empty list with a non-empty list', () => {
        const l1 = arrayToLinkedList([]);
        const l2 = arrayToLinkedList([1, 2, 3]);
        const merged = mergeTwoSortedListsIterative(l1, l2);
        expect(linkedListToArray(merged)).toEqual([1, 2, 3]);

        const l3 = arrayToLinkedList([4, 5]);
        const l4 = arrayToLinkedList([]);
        const merged2 = mergeTwoSortedListsIterative(l3, l4);
        expect(linkedListToArray(merged2)).toEqual([4, 5]);
    });

    it('should merge two lists of different lengths', () => {
        const l1 = arrayToLinkedList([1, 3, 5]);
        const l2 = arrayToLinkedList([2, 4]);
        const merged = mergeTwoSortedListsIterative(l1, l2);
        expect(linkedListToArray(merged)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should merge two lists of same length', () => {
        const l1 = arrayToLinkedList([1, 2, 4]);
        const l2 = arrayToLinkedList([1, 3, 4]);
        const merged = mergeTwoSortedListsIterative(l1, l2);
        expect(linkedListToArray(merged)).toEqual([1, 1, 2, 3, 4, 4]);
    });

    it('should merge lists where one starts with a larger value', () => {
        const l1 = arrayToLinkedList([5, 6, 7]);
        const l2 = arrayToLinkedList([1, 2, 3]);
        const merged = mergeTwoSortedListsIterative(l1, l2);
        expect(linkedListToArray(merged)).toEqual([1, 2, 3, 5, 6, 7]);
    });

    it('should handle lists with negative numbers', () => {
        const l1 = arrayToLinkedList([-5, -3, 0]);
        const l2 = arrayToLinkedList([-4, -2, 1]);
        const merged = mergeTwoSortedListsIterative(l1, l2);
        expect(linkedListToArray(merged)).toEqual([-5, -4, -3, -2, 0, 1]);
    });

    it('should handle large number of nodes', () => {
        const arr1 = Array.from({ length: 500 }, (_, i) => i * 2); // 0, 2, 4, ... 998
        const arr2 = Array.from({ length: 500 }, (_, i) => i * 2 + 1); // 1, 3, 5, ... 999
        const l1 = arrayToLinkedList(arr1);
        const l2 = arrayToLinkedList(arr2);
        const merged = mergeTwoSortedListsIterative(l1, l2);
        const expected = Array.from({ length: 1000 }, (_, i) => i); // 0, 1, 2, ... 999
        expect(linkedListToArray(merged)).toEqual(expected);
    });
});

describe('mergeTwoSortedListsRecursive', () => {
    it('should merge two empty lists', () => {
        const l1 = arrayToLinkedList([]);
        const l2 = arrayToLinkedList([]);
        const merged = mergeTwoSortedListsRecursive(l1, l2);
        expect(linkedListToArray(merged)).toEqual([]);
    });

    it('should merge one empty list with a non-empty list', () => {
        const l1 = arrayToLinkedList([]);
        const l2 = arrayToLinkedList([1, 2, 3]);
        const merged = mergeTwoSortedListsRecursive(l1, l2);
        expect(linkedListToArray(merged)).toEqual([1, 2, 3]);

        const l3 = arrayToLinkedList([4, 5]);
        const l4 = arrayToLinkedList([]);
        const merged2 = mergeTwoSortedListsRecursive(l3, l4);
        expect(linkedListToArray(merged2)).toEqual([4, 5]);
    });

    it('should merge two lists of different lengths', () => {
        const l1 = arrayToLinkedList([1, 3, 5]);
        const l2 = arrayToLinkedList([2, 4]);
        const merged = mergeTwoSortedListsRecursive(l1, l2);
        expect(linkedListToArray(merged)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should merge two lists of same length', () => {
        const l1 = arrayToLinkedList([1, 2, 4]);
        const l2 = arrayToLinkedList([1, 3, 4]);
        const merged = mergeTwoSortedListsRecursive(l1, l2);
        expect(linkedListToArray(merged)).toEqual([1, 1, 2, 3, 4, 4]);
    });

    it('should merge lists where one starts with a larger value', () => {
        const l1 = arrayToLinkedList([5, 6, 7]);
        const l2 = arrayToLinkedList([1, 2, 3]);
        const merged = mergeTwoSortedListsRecursive(l1, l2);
        expect(linkedListToArray(merged)).toEqual([1, 2, 3, 5, 6, 7]);
    });

    it('should handle lists with negative numbers', () => {
        const l1 = arrayToLinkedList([-5, -3, 0]);
        const l2 = arrayToLinkedList([-4, -2, 1]);
        const merged = mergeTwoSortedListsRecursive(l1, l2);
        expect(linkedListToArray(merged)).toEqual([-5, -4, -3, -2, 0, 1]);
    });

    it('should handle large number of nodes', () => {
        const arr1 = Array.from({ length: 500 }, (_, i) => i * 2); // 0, 2, 4, ... 998
        const arr2 = Array.from({ length: 500 }, (_, i) => i * 2 + 1); // 1, 3, 5, ... 999
        const l1 = arrayToLinkedList(arr1);
        const l2 = arrayToLinkedList(arr2);
        const merged = mergeTwoSortedListsRecursive(l1, l2);
        const expected = Array.from({ length: 1000 }, (_, i) => i); // 0, 1, 2, ... 999
        expect(linkedListToArray(merged)).toEqual(expected);
    });
});