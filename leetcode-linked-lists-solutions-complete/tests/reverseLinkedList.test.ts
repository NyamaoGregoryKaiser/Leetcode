import { ListNode } from '@data-structures/ListNode';
import { arrayToLinkedList, linkedListToArray } from '@utils/listUtils';
import { reverseLinkedListIterative, reverseLinkedListRecursive } from '@problems/reverseLinkedList';

describe('reverseLinkedListIterative', () => {
    it('should reverse an empty list', () => {
        const head = arrayToLinkedList([]);
        const reversed = reverseLinkedListIterative(head);
        expect(linkedListToArray(reversed)).toEqual([]);
    });

    it('should reverse a single node list', () => {
        const head = arrayToLinkedList([1]);
        const reversed = reverseLinkedListIterative(head);
        expect(linkedListToArray(reversed)).toEqual([1]);
    });

    it('should reverse a two node list', () => {
        const head = arrayToLinkedList([1, 2]);
        const reversed = reverseLinkedListIterative(head);
        expect(linkedListToArray(reversed)).toEqual([2, 1]);
    });

    it('should reverse a multiple node list', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const reversed = reverseLinkedListIterative(head);
        expect(linkedListToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
    });

    it('should handle a list with duplicate values', () => {
        const head = arrayToLinkedList([1, 2, 1, 3]);
        const reversed = reverseLinkedListIterative(head);
        expect(linkedListToArray(reversed)).toEqual([3, 1, 2, 1]);
    });

    it('should not modify the original list if it is null', () => {
        const head: ListNode | null = null;
        const reversed = reverseLinkedListIterative(head);
        expect(reversed).toBeNull();
    });
});

describe('reverseLinkedListRecursive', () => {
    it('should reverse an empty list', () => {
        const head = arrayToLinkedList([]);
        const reversed = reverseLinkedListRecursive(head);
        expect(linkedListToArray(reversed)).toEqual([]);
    });

    it('should reverse a single node list', () => {
        const head = arrayToLinkedList([1]);
        const reversed = reverseLinkedListRecursive(head);
        expect(linkedListToArray(reversed)).toEqual([1]);
    });

    it('should reverse a two node list', () => {
        const head = arrayToLinkedList([1, 2]);
        const reversed = reverseLinkedListRecursive(head);
        expect(linkedListToArray(reversed)).toEqual([2, 1]);
    });

    it('should reverse a multiple node list', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const reversed = reverseLinkedListRecursive(head);
        expect(linkedListToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
    });

    it('should handle a list with duplicate values', () => {
        const head = arrayToLinkedList([1, 2, 1, 3]);
        const reversed = reverseLinkedListRecursive(head);
        expect(linkedListToArray(reversed)).toEqual([3, 1, 2, 1]);
    });

    it('should not modify the original list if it is null', () => {
        const head: ListNode | null = null;
        const reversed = reverseLinkedListRecursive(head);
        expect(reversed).toBeNull();
    });
});