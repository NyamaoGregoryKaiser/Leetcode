```javascript
/**
 * @fileoverview Solutions for LeetCode Problem 206: Reverse Linked List.
 * Provides iterative, recursive, and a brute-force approach for comparison.
 */

const { Node } = require('../data-structures/LinkedList');

/**
 * Problem Description:
 * Given the head of a singly linked list, reverse the list, and return the reversed list's head.
 *
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 */

/**
 * --- Solution 1: Iterative Approach (Optimal) ---
 *
 * This approach reverses the links one by one. It uses three pointers:
 * `prev`: Stores the previously processed node. Initially null.
 * `current`: Stores the node currently being processed. Initially `head`.
 * `nextTemp`: Temporarily stores the `next` node of `current` before `current.next` is changed.
 *
 * The loop continues as long as `current` is not null. In each iteration:
 * 1. Store `current.next` in `nextTemp`.
 * 2. Reverse the link: `current.next` is made to point to `prev`.
 * 3. Move `prev` forward: `prev` becomes `current`.
 * 4. Move `current` forward: `current` becomes `nextTemp`.
 *
 * Finally, `prev` will point to the new head of the reversed list.
 *
 * @param {Node|null} head The head of the linked list.
 * @returns {Node|null} The head of the reversed linked list.
 * @complexity
 * Time: O(N) where N is the number of nodes in the list.
 *       We visit each node exactly once.
 * Space: O(1) auxiliary space.
 *        We only use a few pointers, regardless of list size.
 */
function reverseListIterative(head) {
    let prev = null;       // Pointer to the previous node (initially null, as the new tail will point to null)
    let current = head;    // Pointer to the current node being processed

    while (current !== null) {
        let nextTemp = current.next; // Store the next node before modifying current.next
        current.next = prev;         // Reverse the current node's pointer
        prev = current;              // Move prev one step forward
        current = nextTemp;          // Move current one step forward
    }

    return prev; // 'prev' will be the new head of the reversed list
}

/**
 * --- Solution 2: Recursive Approach ---
 *
 * This approach uses recursion to reverse the list.
 * The base case is when the list is empty or has only one node, in which case it's already reversed.
 *
 * For a list like `1 -> 2 -> 3 -> 4 -> 5`:
 * 1. The function calls itself with `head.next` (i.e., `2 -> 3 -> 4 -> 5`).
 * 2. This continues until `5` is reached, which is the base case, and `5` is returned as the new head.
 * 3. When `4` is processed:
 *    - `newHead` will be `5`.
 *    - `head.next` (which is `5`) will have its `next` pointer set to `head` (which is `4`). So `5 -> 4`.
 *    - `head.next` (which is `5`) is then set to `null` to break the original `4 -> 5` link and ensure `4` is the tail of the sub-list `5 -> 4`. (Correction: `head.next` points to current head, and then current head's next should be set to null.)
 *    - Actually, `head.next.next = head` correctly establishes the reverse link. Then `head.next = null` disconnects the original forward link.
 *    - `newHead` (`5`) is returned up the call stack.
 *
 * @param {Node|null} head The head of the linked list.
 * @returns {Node|null} The head of the reversed linked list.
 * @complexity
 * Time: O(N) where N is the number of nodes.
 *       Each node is visited once during the recursion.
 * Space: O(N) due to the recursion stack.
 *        In the worst case (a long list), the depth of the recursion can be N.
 */
function reverseListRecursive(head) {
    // Base case: if head is null or it's the last node, it's the new head
    if (head === null || head.next === null) {
        return head;
    }

    // Recursively reverse the rest of the list
    // newHead will be the ultimate head of the reversed list (e.g., '5' for [1,2,3,4,5])
    const newHead = reverseListRecursive(head.next);

    // After the recursive call returns:
    // 'head' is the current node (e.g., '4')
    // 'head.next' is the node that 'head' originally pointed to (e.g., '5')
    // 'head.next.next' makes '5' point back to '4' (creating '5 -> 4')
    head.next.next = head;

    // Disconnect the original forward link to prevent cycles in the final list
    // (e.g., '4' now points to null, making it the tail of the sub-list '5 -> 4')
    head.next = null;

    return newHead; // The true head of the fully reversed list (e.g., '5')
}

/**
 * --- Solution 3: Brute Force (Convert to Array, Reverse Array, Rebuild List) ---
 *
 * This method involves three steps:
 * 1. Traverse the linked list and store all node values in an array.
 * 2. Reverse the array.
 * 3. Create a new linked list from the reversed array.
 *
 * While it achieves the reversal, it's generally less efficient than the in-place
 * iterative or recursive methods for linked lists because it requires additional
 * storage proportional to the list's size and multiple passes.
 *
 * @param {Node|null} head The head of the linked list.
 * @returns {Node|null} The head of the reversed linked list.
 * @complexity
 * Time: O(N) - O(N) for converting to array, O(N) for reversing array, O(N) for rebuilding list. Total O(N).
 * Space: O(N) - For storing all node values in a new array.
 */
function reverseListBruteForce(head) {
    if (!head || !head.next) {
        return head;
    }

    // Step 1: Convert list to array
    const values = [];
    let current = head;
    while (current) {
        values.push(current.val);
        current = current.next;
    }

    // Step 2: Reverse the array
    values.reverse();

    // Step 3: Rebuild the linked list from the reversed array
    let newHead = null;
    let newCurrent = null;
    for (const val of values) {
        if (!newHead) {
            newHead = new Node(val);
            newCurrent = newHead;
        } else {
            newCurrent.next = new Node(val);
            newCurrent = newCurrent.next;
        }
    }

    return newHead;
}


module.exports = {
    reverseListIterative,
    reverseListRecursive,
    reverseListBruteForce
};
```