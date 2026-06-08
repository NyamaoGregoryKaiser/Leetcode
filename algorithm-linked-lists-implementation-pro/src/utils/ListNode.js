```javascript
/**
 * @fileoverview Defines the ListNode class for singly linked lists.
 */

/**
 * Represents a node in a singly linked list.
 *
 * Each node has a `val` (value) and a `next` pointer to the next node in the list.
 * If `next` is null, it signifies the end of the list.
 */
class ListNode {
    /**
     * Creates an instance of ListNode.
     * @param {*} val The value to store in the node. Defaults to 0.
     * @param {ListNode | null} next A pointer to the next node. Defaults to null.
     */
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

module.exports = ListNode;
```