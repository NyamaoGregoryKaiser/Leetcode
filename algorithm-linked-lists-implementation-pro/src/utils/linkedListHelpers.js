```javascript
/**
 * @fileoverview Utility functions for creating, converting, and manipulating linked lists.
 */

const ListNode = require('./ListNode');

/**
 * Converts an array of values into a singly linked list.
 *
 * @param {Array<*>} arr The array of values to convert.
 * @returns {ListNode | null} The head of the constructed linked list, or null if the array is empty.
 */
function arrayToLinkedList(arr) {
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
 * Converts a singly linked list into an array of its values.
 * Handles cycles by stopping after a certain number of nodes to prevent infinite loops.
 *
 * @param {ListNode | null} head The head of the linked list.
 * @param {number} [maxNodes=100] Maximum number of nodes to traverse to prevent infinite loops on cyclic lists.
 * @returns {Array<*>} An array containing the values of the linked list.
 */
function linkedListToArray(head, maxNodes = 100) {
    const arr = [];
    let current = head;
    let count = 0;

    // Use a Set to detect cycles more robustly, in case maxNodes is not enough
    // This is primarily for debugging/testing utility and not an optimal cycle detection for problem solving.
    const visited = new Set(); 

    while (current !== null && count < maxNodes) {
        if (visited.has(current)) {
            arr.push('CYCLE DETECTED'); // Indicate a cycle was found
            break;
        }
        visited.add(current);
        arr.push(current.val);
        current = current.next;
        count++;
    }
    if (count === maxNodes && current !== null && !visited.has(current)) {
         arr.push('MAX_NODES_REACHED'); // Indicate potential cycle or very long list
    }
    return arr;
}

/**
 * Creates a cycle in a linked list at a specified position.
 *
 * @param {ListNode | null} head The head of the linked list.
 * @param {number} pos The 0-indexed position where the cycle should begin.
 *                     If pos is -1, no cycle is created.
 * @returns {ListNode | null} The head of the linked list with a cycle.
 * @throws {Error} If the specified position `pos` is out of bounds for the list.
 */
function createCycle(head, pos) {
    if (!head || pos < -1) {
        return head;
    }

    if (pos === -1) {
        return head; // No cycle
    }

    let cycleStartNode = null;
    let tail = null;
    let current = head;
    let i = 0;

    // Traverse to find the node where the cycle should start (cycleStartNode)
    // and the tail of the list.
    while (current) {
        if (i === pos) {
            cycleStartNode = current;
        }
        if (current.next === null) {
            tail = current;
        }
        current = current.next;
        i++;
    }

    if (!tail || !cycleStartNode) {
        throw new Error(`Position ${pos} is out of bounds for the linked list.`);
    }

    // Point the tail to the cycleStartNode
    tail.next = cycleStartNode;

    return head;
}

module.exports = {
    arrayToLinkedList,
    linkedListToArray,
    createCycle
};
```