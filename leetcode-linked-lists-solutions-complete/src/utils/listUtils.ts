import { ListNode } from '@data-structures/ListNode';

/**
 * Converts an array of numbers into a singly linked list.
 * @param arr The array of numbers to convert.
 * @returns The head of the created linked list, or null if the array is empty.
 *
 * Time Complexity: O(N) where N is the number of elements in the array.
 * Space Complexity: O(N) for creating N new ListNode objects.
 */
export function arrayToLinkedList(arr: number[]): ListNode | null {
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
 * Converts a singly linked list into an array of numbers.
 * @param head The head of the linked list.
 * @returns An array containing the values of the linked list, or an empty array if the list is null.
 *
 * Time Complexity: O(N) where N is the number of nodes in the linked list.
 * Space Complexity: O(N) for storing N values in the new array.
 */
export function linkedListToArray(head: ListNode | null): number[] {
    const arr: number[] = [];
    let current: ListNode | null = head;
    while (current !== null) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
}

/**
 * Prints the values of a singly linked list to the console.
 * @param head The head of the linked list.
 * @param label An optional label to print before the list.
 *
 * Time Complexity: O(N) where N is the number of nodes in the linked list.
 * Space Complexity: O(1) auxiliary space (excluding recursion stack for deep lists, but typically iterative).
 */
export function printLinkedList(head: ListNode | null, label: string = "List"): void {
    const values: number[] = linkedListToArray(head);
    console.log(`${label}: [${values.join(' -> ')}]`);
}

/**
 * Creates a linked list with a cycle for testing purposes.
 * @param arr An array of numbers to form the list's values.
 * @param pos The 0-indexed position where the tail's next pointer should connect to form a cycle.
 *            If pos is -1, no cycle is formed.
 * @returns The head of the linked list (with or without a cycle).
 *
 * Time Complexity: O(N) where N is the number of elements in the array.
 * Space Complexity: O(N) for creating N new ListNode objects.
 */
export function createCycleList(arr: number[], pos: number): ListNode | null {
    if (!arr || arr.length === 0) {
        return null;
    }

    const nodes: ListNode[] = [];
    const head = new ListNode(arr[0]);
    nodes.push(head);
    let current = head;

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
        nodes.push(current);
    }

    if (pos !== -1 && pos >= 0 && pos < arr.length) {
        // Form the cycle: tail connects to the node at 'pos'
        current.next = nodes[pos];
    }

    return head;
}

/**
 * Finds the node at a specific index in a linked list.
 * Useful for verifying cycle start points.
 * @param head The head of the linked list.
 * @param index The 0-indexed position of the node to find.
 * @returns The ListNode at the specified index, or null if not found.
 *
 * Time Complexity: O(index) in the worst case, O(N) if index is close to N.
 * Space Complexity: O(1).
 */
export function getNodeAtIndex(head: ListNode | null, index: number): ListNode | null {
    if (index < 0) return null;
    let current = head;
    let count = 0;
    while (current && count < index) {
        current = current.next;
        count++;
    }
    return current;
}