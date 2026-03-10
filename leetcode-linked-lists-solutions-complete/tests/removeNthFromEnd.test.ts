import { ListNode } from '@data-structures/ListNode';
import { arrayToLinkedList, linkedListToArray } from '@utils/listUtils';
import { removeNthFromEndOnePass, removeNthFromEndTwoPass } from '@problems/removeNthFromEnd';

describe('removeNthFromEndOnePass', () => {
    it('should remove the Nth node from the end of a long list', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const modified = removeNthFromEndOnePass(head, 2);
        expect(linkedListToArray(modified)).toEqual([1, 2, 3, 5]);
    });

    it('should remove the head node when n equals list length', () => {
        const head = arrayToLinkedList([1, 2, 3]);
        const modified = removeNthFromEndOnePass(head, 3);
        expect(linkedListToArray(modified)).toEqual([2, 3]);
    });

    it('should remove the last node when n is 1', () => {
        const head = arrayToLinkedList([1, 2, 3]);
        const modified = removeNthFromEndOnePass(head, 1);
        expect(linkedListToArray(modified)).toEqual([1, 2]);
    });

    it('should handle a single node list', () => {
        const head = arrayToLinkedList([1]);
        const modified = removeNthFromEndOnePass(head, 1);
        expect(linkedListToArray(modified)).toEqual([]);
    });

    it('should handle a two node list removing the first node', () => {
        const head = arrayToLinkedList([1, 2]);
        const modified = removeNthFromEndOnePass(head, 2);
        expect(linkedListToArray(modified)).toEqual([2]);
    });

    it('should handle a two node list removing the second node', () => {
        const head = arrayToLinkedList([1, 2]);
        const modified = removeNthFromEndOnePass(head, 1);
        expect(linkedListToArray(modified)).toEqual([1]);
    });

    it('should return null for an empty list (although constraints say length >= 1)', () => {
        const head = arrayToLinkedList([]);
        const modified = removeNthFromEndOnePass(head, 1);
        expect(modified).toBeNull();
    });

    it('should correctly remove from a list with duplicate values', () => {
        const head = arrayToLinkedList([1, 2, 3, 2, 1]);
        const modified = removeNthFromEndOnePass(head, 3); // remove the middle '3'
        expect(linkedListToArray(modified)).toEqual([1, 2, 2, 1]);
    });
});

describe('removeNthFromEndTwoPass', () => {
    it('should remove the Nth node from the end of a long list', () => {
        const head = arrayToLinkedList([1, 2, 3, 4, 5]);
        const modified = removeNthFromEndTwoPass(head, 2);
        expect(linkedListToArray(modified)).toEqual([1, 2, 3, 5]);
    });

    it('should remove the head node when n equals list length', () => {
        const head = arrayToLinkedList([1, 2, 3]);
        const modified = removeNthFromEndTwoPass(head, 3);
        expect(linkedListToArray(modified)).toEqual([2, 3]);
    });

    it('should remove the last node when n is 1', () => {
        const head = arrayToLinkedList([1, 2, 3]);
        const modified = removeNthFromEndTwoPass(head, 1);
        expect(linkedListToArray(modified)).toEqual([1, 2]);
    });

    it('should handle a single node list', () => {
        const head = arrayToLinkedList([1]);
        const modified = removeNthFromEndTwoPass(head, 1);
        expect(linkedListToArray(modified)).toEqual([]);
    });

    it('should handle a two node list removing the first node', () => {
        const head = arrayToLinkedList([1, 2]);
        const modified = removeNthFromEndTwoPass(head, 2);
        expect(linkedListToArray(modified)).toEqual([2]);
    });

    it('should handle a two node list removing the second node', () => {
        const head = arrayToLinkedList([1, 2]);
        const modified = removeNthFromEndTwoPass(head, 1);
        expect(linkedListToArray(modified)).toEqual([1]);
    });

    it('should return null for an empty list (although constraints say length >= 1)', () => {
        const head = arrayToLinkedList([]);
        const modified = removeNthFromEndTwoPass(head, 1);
        expect(modified).toBeNull();
    });

    it('should correctly remove from a list with duplicate values', () => {
        const head = arrayToLinkedList([1, 2, 3, 2, 1]);
        const modified = removeNthFromEndTwoPass(head, 3); // remove the middle '3'
        expect(linkedListToArray(modified)).toEqual([1, 2, 2, 1]);
    });
});