import { ListNode } from '@data-structures/ListNode';
import { createCycleList, getNodeAtIndex, arrayToLinkedList } from '@utils/listUtils';
import { detectCycleFloyd, detectCycleHashSet } from '@problems/detectCycle';

describe('detectCycleFloyd', () => {
    it('should return null for an empty list', () => {
        const head = createCycleList([], -1);
        expect(detectCycleFloyd(head)).toBeNull();
    });

    it('should return null for a single node list with no cycle', () => {
        const head = createCycleList([1], -1);
        expect(detectCycleFloyd(head)).toBeNull();
    });

    it('should return the node itself for a single node list with a cycle to itself', () => {
        const head = createCycleList([1], 0);
        expect(detectCycleFloyd(head)).toBe(head);
    });

    it('should return null for a list with no cycle', () => {
        const head = createCycleList([1, 2, 3, 4, 5], -1);
        expect(detectCycleFloyd(head)).toBeNull();
    });

    it('should return the correct node when cycle starts at the head', () => {
        const head = createCycleList([1, 2, 3], 0); // 1->2->3->1 (cycle at 1)
        const cycleStart = getNodeAtIndex(head, 0);
        expect(detectCycleFloyd(head)).toBe(cycleStart);
    });

    it('should return the correct node when cycle starts in the middle', () => {
        const head = createCycleList([3, 2, 0, -4], 1); // 3->2->0->-4->2 (cycle at 2)
        const cycleStart = getNodeAtIndex(head, 1);
        expect(detectCycleFloyd(head)).toBe(cycleStart);
    });

    it('should return the correct node when cycle starts at the second to last node', () => {
        const head = createCycleList([1, 2, 3, 4, 5], 3); // 1->2->3->4->5->4 (cycle at 4)
        const cycleStart = getNodeAtIndex(head, 3);
        expect(detectCycleFloyd(head)).toBe(cycleStart);
    });

    it('should return the correct node for a long list with a cycle', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        const head = createCycleList(arr, 500); // Cycle starts at index 500
        const cycleStart = getNodeAtIndex(head, 500);
        expect(detectCycleFloyd(head)).toBe(cycleStart);
    });

    it('should return null for a long list with no cycle', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        const head = createCycleList(arr, -1);
        expect(detectCycleFloyd(head)).toBeNull();
    });
});

describe('detectCycleHashSet', () => {
    it('should return null for an empty list', () => {
        const head = createCycleList([], -1);
        expect(detectCycleHashSet(head)).toBeNull();
    });

    it('should return null for a single node list with no cycle', () => {
        const head = createCycleList([1], -1);
        expect(detectCycleHashSet(head)).toBeNull();
    });

    it('should return the node itself for a single node list with a cycle to itself', () => {
        const head = createCycleList([1], 0);
        expect(detectCycleHashSet(head)).toBe(head);
    });

    it('should return null for a list with no cycle', () => {
        const head = createCycleList([1, 2, 3, 4, 5], -1);
        expect(detectCycleHashSet(head)).toBeNull();
    });

    it('should return the correct node when cycle starts at the head', () => {
        const head = createCycleList([1, 2, 3], 0); // 1->2->3->1 (cycle at 1)
        const cycleStart = getNodeAtIndex(head, 0);
        expect(detectCycleHashSet(head)).toBe(cycleStart);
    });

    it('should return the correct node when cycle starts in the middle', () => {
        const head = createCycleList([3, 2, 0, -4], 1); // 3->2->0->-4->2 (cycle at 2)
        const cycleStart = getNodeAtIndex(head, 1);
        expect(detectCycleHashSet(head)).toBe(cycleStart);
    });

    it('should return the correct node when cycle starts at the second to last node', () => {
        const head = createCycleList([1, 2, 3, 4, 5], 3); // 1->2->3->4->5->4 (cycle at 4)
        const cycleStart = getNodeAtIndex(head, 3);
        expect(detectCycleHashSet(head)).toBe(cycleStart);
    });

    it('should return the correct node for a long list with a cycle', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        const head = createCycleList(arr, 500); // Cycle starts at index 500
        const cycleStart = getNodeAtIndex(head, 500);
        expect(detectCycleHashSet(head)).toBe(cycleStart);
    });

    it('should return null for a long list with no cycle', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        const head = createCycleList(arr, -1);
        expect(detectCycleHashSet(head)).toBeNull();
    });
});