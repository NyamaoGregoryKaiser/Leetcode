// Node for linked list (for problem 3)
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// Merge Sort for Linked List (Problem 3) -  Implementation omitted for brevity
function mergeSortLinkedList(head: ListNode | null): ListNode | null {
    throw new Error("Merge Sort for Linked List not yet implemented");
}

export {ListNode, mergeSortLinkedList};