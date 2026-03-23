```typescript
/**
 * src/data-structures/ListNode.ts
 * 
 * Defines a simple singly-linked list node structure.
 * This is used as a helper data structure for problems involving linked lists,
 * such as "Merge K Sorted Lists".
 */
export class ListNode {
    val: number;
    next: ListNode | null;

    /**
     * Constructs a new ListNode.
     * @param val The value of the node.
     * @param next The next node in the list, or null if it's the last node.
     */
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }

    /**
     * Helper to create a linked list from an array.
     * @param arr The array of numbers to convert into a linked list.
     * @returns The head of the created linked list, or null if the array is empty.
     */
    static fromArray(arr: number[]): ListNode | null {
        if (!arr || arr.length === 0) {
            return null;
        }
        const head = new ListNode(arr[0]);
        let current = head;
        for (let i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }

    /**
     * Helper to convert a linked list to an array.
     * @param head The head of the linked list.
     * @returns An array of numbers representing the linked list.
     */
    static toArray(head: ListNode | null): number[] {
        const arr: number[] = [];
        let current = head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        return arr;
    }
}
```