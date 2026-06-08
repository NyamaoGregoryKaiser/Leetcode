```javascript
/**
 * @fileoverview Problem: Merge Two Sorted Lists
 * You are given the heads of two sorted linked lists `list1` and `list2`.
 * Merge the two lists into a single `sorted` list. The list should be made by
 * splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 */

const ListNode = require('../utils/ListNode');

/**
 * Merges two sorted singly linked lists into a single sorted list iteratively.
 *
 * This approach uses a `dummyHead` to simplify the logic of handling the first node
 * of the merged list. A `current` pointer tracks the tail of the merged list,
 * to which new nodes are appended.
 *
 * The loop continues as long as both `list1` and `list2` have nodes. In each iteration,
 * it compares the values of the current nodes of `list1` and `list2`.
 * The node with the smaller value is appended to the `current` node of the merged list,
 * and the pointer for that list is advanced.
 *
 * After the loop, one of the lists might still have remaining nodes (because the other
 * list became null). These remaining nodes are already sorted and can simply be appended
 * to the end of the merged list.
 *
 * @param {ListNode | null} list1 The head of the first sorted linked list.
 * @param {ListNode | null} list2 The head of the second sorted linked list.
 * @returns {ListNode | null} The head of the merged sorted linked list.
 *
 * Time Complexity: O(M + N) where M and N are the number of nodes in `list1` and `list2` respectively.
 *                  In the worst case, we traverse each node from both lists exactly once.
 * Space Complexity: O(1) as we only use a few extra pointers (`dummyHead`, `current`)
 *                   and don't create new nodes, only re-link existing ones.
 */
function mergeTwoSortedLists(list1, list2) {
    // Create a dummy node to simplify handling the head of the merged list.
    // The actual merged list will start from `dummyHead.next`.
    let dummyHead = new ListNode();
    let current = dummyHead; // Pointer to the tail of the merged list

    // Iterate while both lists have nodes
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            // If list1's current node value is smaller or equal, append it
            current.next = list1;
            list1 = list1.next; // Move list1's pointer forward
        } else {
            // Otherwise, append list2's current node
            current.next = list2;
            list2 = list2.next; // Move list2's pointer forward
        }
        current = current.next; // Move the merged list's tail pointer forward
    }

    // After the loop, one of the lists might still have remaining nodes.
    // Since these nodes are already sorted and larger than all nodes merged so far,
    // we can simply append the rest of that list to the merged list.
    if (list1 !== null) {
        current.next = list1;
    } else if (list2 !== null) {
        current.next = list2;
    }

    // The merged list starts from the node after the dummy head.
    return dummyHead.next;
}

module.exports = mergeTwoSortedLists;
```