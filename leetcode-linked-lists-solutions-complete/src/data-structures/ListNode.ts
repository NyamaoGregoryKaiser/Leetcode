/**
 * Definition for singly-linked list.
 * Represents a node in a singly linked list.
 */
export class ListNode {
    val: number
    next: ListNode | null

    /**
     * Constructs a new ListNode.
     * @param val The value to store in the node.
     * @param next The next node in the list, or null if this is the last node.
     */
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}