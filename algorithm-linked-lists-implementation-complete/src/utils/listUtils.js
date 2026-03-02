```javascript
/**
 * @fileoverview Utility functions for working with Linked Lists in testing and problem solving.
 */

const { LinkedList, Node } = require('../data-structures/LinkedList');

/**
 * Creates a linked list from an array of values.
 * This is a convenient wrapper around LinkedList.fromArray.
 * @param {Array<*>} arr The array of values.
 * @returns {Node|null} The head node of the created linked list, or null if array is empty.
 * @complexity Time: O(N)
 *             Space: O(N)
 */
function createList(arr) {
    return LinkedList.fromArray(arr);
}

/**
 * Compares two linked lists (by their head nodes) for equality.
 * Two lists are equal if they have the same values in the same order.
 * @param {Node|null} head1 The head node of the first list.
 * @param {Node|null} head2 The head node of the second list.
 * @returns {boolean} True if the lists are equal, false otherwise.
 * @complexity Time: O(min(N1, N2)) where N1 and N2 are lengths of lists.
 *             Space: O(1)
 */
function compareLists(head1, head2) {
    let curr1 = head1;
    let curr2 = head2;

    while (curr1 && curr2) {
        if (curr1.val !== curr2.val) {
            return false;
        }
        curr1 = curr1.next;
        curr2 = curr2.next;
    }

    // If one list is longer than the other, they are not equal
    return curr1 === null && curr2 === null;
}

/**
 * Compares two arrays for equality.
 * @param {Array<*>} arr1 The first array.
 * @param {Array<*>} arr2 The second array.
 * @returns {boolean} True if arrays are equal (same length, same elements in order), false otherwise.
 * @complexity Time: O(min(N1, N2))
 *             Space: O(1)
 */
function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Converts a linked list (from its head node) to an array.
 * @param {Node|null} head The head node of the list.
 * @returns {Array<*>} An array of the list's values.
 * @complexity Time: O(N)
 *             Space: O(N)
 */
function toArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

/**
 * Prints a linked list (from its head node) to the console in a human-readable format.
 * @param {Node|null} head The head node of the list.
 * @complexity Time: O(N)
 *             Space: O(N) (for the string representation)
 */
function printList(head) {
    console.log(toArray(head).join(' -> ') || 'Empty List');
}

module.exports = {
    createList,
    compareLists,
    compareArrays,
    toArray,
    printList
};
```