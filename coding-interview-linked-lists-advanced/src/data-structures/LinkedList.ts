```typescript
/**
 * Definition for singly-linked list.
 */
export class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * Helper function to create a linked list from an array.
 * @param arr The array of numbers to convert into a linked list.
 * @returns The head of the created linked list, or null if the array is empty.
 */
export function createLinkedList(arr: number[]): ListNode | null {
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
 * Helper function to convert a linked list to an array.
 * @param head The head of the linked list.
 * @returns An array of numbers representing the linked list values.
 */
export function linkedListToArray(head: ListNode | null): number[] {
    const arr: number[] = [];
    let current = head;
    while (current !== null) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
}

/**
 * Helper function to find a node by its value in a linked list.
 * Useful for creating cycles or linking specific nodes.
 * @param head The head of the linked list.
 * @param val The value of the node to find.
 * @returns The first ListNode found with the given value, or null if not found.
 */
export function findNodeByValue(head: ListNode | null, val: number): ListNode | null {
    let current = head;
    while (current !== null) {
        if (current.val === val) {
            return current;
        }
        current = current.next;
    }
    return null;
}

/**
 * Helper function to create a linked list with a cycle.
 * @param arr The array of numbers for the list values.
 * @param pos The 0-indexed position where the tail should connect to form a cycle.
 *            -1 indicates no cycle.
 * @returns An object containing the head of the list and the node where the cycle begins (if any).
 */
export function createLinkedListWithCycle(arr: number[], pos: number): ListNode | null {
    if (!arr || arr.length === 0) {
        return null;
    }

    const head = new ListNode(arr[0]);
    let current = head;
    let cycleNode: ListNode | null = null;
    if (pos === 0) {
        cycleNode = head;
    }

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
        if (i === pos) {
            cycleNode = current;
        }
    }

    // Connect the tail to the cycle node
    if (cycleNode !== null) {
        current.next = cycleNode;
    }

    return head;
}

/**
 * Helper function to get the Nth node of a linked list.
 * @param head The head of the linked list.
 * @param n The 0-indexed position of the node to retrieve.
 * @returns The Nth ListNode, or null if N is out of bounds.
 */
export function getNthNode(head: ListNode | null, n: number): ListNode | null {
    let current = head;
    let count = 0;
    while (current !== null) {
        if (count === n) {
            return current;
        }
        current = current.next;
        count++;
    }
    return null;
}
```