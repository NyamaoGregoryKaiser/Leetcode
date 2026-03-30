```typescript
import { ListNode, createLinkedList, linkedListToArray, findNodeByValue, createLinkedListWithCycle, getNthNode } from '../../src/data-structures/LinkedList';

describe('LinkedList Utilities', () => {

    describe('createLinkedList', () => {
        it('should create a linked list from an array', () => {
            const arr = [1, 2, 3, 4, 5];
            const head = createLinkedList(arr);
            expect(head?.val).toBe(1);
            expect(head?.next?.val).toBe(2);
            expect(head?.next?.next?.next?.next?.val).toBe(5);
            expect(head?.next?.next?.next?.next?.next).toBeNull();
        });

        it('should return null for an empty array', () => {
            const arr: number[] = [];
            const head = createLinkedList(arr);
            expect(head).toBeNull();
        });

        it('should create a single node list for a single element array', () => {
            const arr = [10];
            const head = createLinkedList(arr);
            expect(head?.val).toBe(10);
            expect(head?.next).toBeNull();
        });
    });

    describe('linkedListToArray', () => {
        it('should convert a linked list to an array', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            const arr = linkedListToArray(head);
            expect(arr).toEqual([1, 2, 3, 4, 5]);
        });

        it('should return an empty array for a null list', () => {
            const arr = linkedListToArray(null);
            expect(arr).toEqual([]);
        });

        it('should convert a single node list to an array', () => {
            const head = createLinkedList([100]);
            const arr = linkedListToArray(head);
            expect(arr).toEqual([100]);
        });
    });

    describe('findNodeByValue', () => {
        it('should find a node by its value', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            const node = findNodeByValue(head, 3);
            expect(node?.val).toBe(3);
            expect(node?.next?.val).toBe(4);
        });

        it('should return null if value not found', () => {
            const head = createLinkedList([1, 2, 3]);
            const node = findNodeByValue(head, 99);
            expect(node).toBeNull();
        });

        it('should return null for an empty list', () => {
            const node = findNodeByValue(null, 5);
            expect(node).toBeNull();
        });

        it('should find the first occurrence if duplicates exist', () => {
            const head = createLinkedList([1, 2, 3, 2, 4]);
            const node = findNodeByValue(head, 2);
            expect(node?.val).toBe(2);
            expect(node?.next?.val).toBe(3); // Should be the first 2
        });
    });

    describe('createLinkedListWithCycle', () => {
        it('should create a linked list with a cycle at the specified position', () => {
            const arr = [3, 2, 0, -4];
            const head = createLinkedListWithCycle(arr, 1); // Cycle at node with value 2

            expect(head?.val).toBe(3);
            expect(head?.next?.val).toBe(2);
            expect(head?.next?.next?.val).toBe(0);
            expect(head?.next?.next?.next?.val).toBe(-4);
            
            // The tail (-4) should point back to the node with value 2
            expect(head?.next?.next?.next?.next).toBe(head?.next);
        });

        it('should create a linked list with a cycle at the head', () => {
            const arr = [1, 2, 3];
            const head = createLinkedListWithCycle(arr, 0); // Cycle at node with value 1

            expect(head?.val).toBe(1);
            expect(head?.next?.val).toBe(2);
            expect(head?.next?.next?.val).toBe(3);
            expect(head?.next?.next?.next).toBe(head); // Tail (3) points to head (1)
        });

        it('should create a linked list without a cycle if pos is -1', () => {
            const arr = [1, 2, 3];
            const head = createLinkedListWithCycle(arr, -1);
            expect(head?.val).toBe(1);
            expect(head?.next?.val).toBe(2);
            expect(head?.next?.next?.val).toBe(3);
            expect(head?.next?.next?.next).toBeNull();
        });

        it('should create a linked list without a cycle if pos is out of bounds', () => {
            const arr = [1, 2, 3];
            const head = createLinkedListWithCycle(arr, 5); // pos > length - 1
            expect(head?.next?.next?.next).toBeNull();
        });

        it('should handle single node list with cycle at head', () => {
            const arr = [1];
            const head = createLinkedListWithCycle(arr, 0);
            expect(head?.val).toBe(1);
            expect(head?.next).toBe(head);
        });

        it('should handle single node list without cycle', () => {
            const arr = [1];
            const head = createLinkedListWithCycle(arr, -1);
            expect(head?.val).toBe(1);
            expect(head?.next).toBeNull();
        });

        it('should return null for empty array', () => {
            const head = createLinkedListWithCycle([], 0);
            expect(head).toBeNull();
        });
    });

    describe('getNthNode', () => {
        it('should return the Nth node (0-indexed)', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            expect(getNthNode(head, 0)?.val).toBe(1);
            expect(getNthNode(head, 2)?.val).toBe(3);
            expect(getNthNode(head, 4)?.val).toBe(5);
        });

        it('should return null if N is out of bounds (too large)', () => {
            const head = createLinkedList([1, 2, 3]);
            expect(getNthNode(head, 3)).toBeNull();
            expect(getNthNode(head, 5)).toBeNull();
        });

        it('should return null for an empty list', () => {
            expect(getNthNode(null, 0)).toBeNull();
        });

        it('should return null if N is negative', () => {
            const head = createLinkedList([1, 2, 3]);
            expect(getNthNode(head, -1)).toBeNull();
        });

        it('should handle a single-node list', () => {
            const head = createLinkedList([10]);
            expect(getNthNode(head, 0)?.val).toBe(10);
            expect(getNthNode(head, 1)).toBeNull();
        });
    });
});
```