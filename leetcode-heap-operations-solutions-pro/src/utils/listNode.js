```javascript
/**
 * listNode.js
 *
 * Defines a simple ListNode class for linked list problems.
 */

class ListNode {
    /**
     * Constructs a new ListNode.
     * @param {*} val - The value of the node.
     * @param {ListNode | null} next - The next node in the list.
     */
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Helper function to create a linked list from an array.
 * @param {Array} arr - An array of values.
 * @returns {ListNode | null} The head of the linked list.
 */
function createLinkedList(arr) {
    if (!arr || arr.length === 0) {
        return null;
    }
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

/**
 * Helper function to convert a linked list to an array.
 * @param {ListNode | null} head - The head of the linked list.
 * @returns {Array} An array of values from the linked list.
 */
function linkedListToArray(head) {
    const arr = [];
    let current = head;
    while (current !== null) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
}

module.exports = ListNode;
module.exports.createLinkedList = createLinkedList;
module.exports.linkedListToArray = linkedListToArray;
```