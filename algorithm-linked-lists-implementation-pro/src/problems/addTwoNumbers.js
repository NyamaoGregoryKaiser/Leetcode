```javascript
/**
 * @fileoverview Problem: Add Two Numbers
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Example:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807.
 */

const ListNode = require('../utils/ListNode');

/**
 * Adds two numbers represented by linked lists (digits stored in reverse order).
 *
 * This solution iterates through both linked lists simultaneously, simulating column-wise addition
 * with a carry-over.
 *
 * 1. A `dummyHead` node is created to simplify the construction of the result list.
 * 2. A `current` pointer tracks the tail of the result list.
 * 3. A `carry` variable stores any carry-over to the next digit.
 * 4. The loop continues as long as there are nodes in either `l1` or `l2`, or if there's a `carry`.
 * 5. In each iteration:
 *    a. Get the values from `l1` and `l2` (or 0 if a list is exhausted).
 *    b. Calculate the `sum` of the two values and the `carry`.
 *    c. Update `carry` for the next iteration (`Math.floor(sum / 10)`).
 *    d. Create a new node with the `digit` (`sum % 10`) and append it to the result list.
 *    e. Move `current` and `l1`/`l2` pointers forward.
 * 6. Finally, return `dummyHead.next`, which is the head of the resulting sum linked list.
 *
 * @param {ListNode | null} l1 The head of the first linked list (representing a number in reverse).
 * @param {ListNode | null} l2 The head of the second linked list (representing a number in reverse).
 * @returns {ListNode | null} The head of the linked list representing the sum of the two numbers.
 *
 * Time Complexity: O(max(M, N)) where M and N are the number of nodes in `l1` and `l2` respectively.
 *                  We iterate through the longer of the two lists once.
 * Space Complexity: O(max(M, N)) because a new linked list is created to store the sum.
 *                   In the worst case (e.g., adding 99 + 1), the result list can be one node longer
 *                   than the longer input list.
 */
function addTwoNumbers(l1, l2) {
    // Create a dummy head node for the result list.
    // This simplifies handling the first node and avoids special null checks.
    let dummyHead = new ListNode(0);
    let current = dummyHead; // Pointer to the tail of the result list
    let carry = 0;           // Variable to store the carry-over from previous additions

    // Loop continues as long as there are digits in either list or there's a carry-over.
    while (l1 !== null || l2 !== null || carry !== 0) {
        // Get the value of the current digit from l1, or 0 if l1 is exhausted.
        const val1 = l1 ? l1.val : 0;
        // Get the value of the current digit from l2, or 0 if l2 is exhausted.
        const val2 = l2 ? l2.val : 0;

        // Calculate the sum of current digits and the carry from the previous step.
        const sum = val1 + val2 + carry;

        // Calculate the new carry for the next step (e.g., if sum is 17, carry is 1).
        carry = Math.floor(sum / 10);
        // Calculate the digit to be placed in the current result node (e.g., if sum is 17, digit is 7).
        const digit = sum % 10;

        // Create a new node with the calculated digit and append it to the result list.
        current.next = new ListNode(digit);
        // Move the result list's tail pointer forward.
        current = current.next;

        // Move `l1` and `l2` pointers forward if they are not null.
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }

    // The result linked list starts from `dummyHead.next`.
    return dummyHead.next;
}

module.exports = addTwoNumbers;
```