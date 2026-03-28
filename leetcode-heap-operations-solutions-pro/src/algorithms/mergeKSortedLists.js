```javascript
/**
 * mergeKSortedLists.js
 *
 * Problem: Merge K Sorted Lists.
 *
 * Problem Description:
 * You are given an array of `k` linked-lists, each sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * Example 1:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 * Explanation: The linked lists are:
 * [1->4->5],
 * [1->3->4],
 * [2->6]
 * merging them into one sorted list: 1->1->2->3->4->4->5->6
 *
 * Example 2:
 * Input: lists = []
 * Output: []
 *
 * Example 3:
 * Input: lists = [[]]
 * Output: []
 */

const MinHeap = require('./minHeap');
const ListNode = require('../utils/listNode'); // Assuming a simple ListNode class is available

/**
 * Merges K sorted linked lists into one sorted linked list using a Min-Heap.
 *
 * Approach:
 * 1. Initialize a Min-Heap. The heap will store the *current nodes* from each list.
 *    The comparator for the heap will compare the `val` property of the `ListNode` objects.
 * 2. Iterate through the array of linked lists (`lists`). For each non-empty list,
 *    insert its head node into the min-heap.
 * 3. Initialize a dummy head for the merged list and a `current` pointer to it.
 * 4. While the min-heap is not empty:
 *    a. Extract the node with the smallest value from the heap. This is the next node for our merged list.
 *    b. Append this node to the `current` pointer of the merged list.
 *    c. Advance the `current` pointer to the newly added node.
 *    d. If the extracted node has a `next` node (i.e., it's not the end of its original list),
 *       insert its `next` node into the heap.
 * 5. Return the `next` node of the dummy head (which is the actual head of the merged list).
 *
 * Why a Min-Heap?
 * At any point, we need to know which of the `k` lists has the smallest next element to add to our merged list.
 * A Min-Heap naturally stores these `k` (or fewer) "next available" elements and allows us to extract the
 * smallest one in O(log K) time.
 *
 * Time Complexity: O(N log K)
 *   - N is the total number of nodes across all linked lists.
 *   - K is the number of linked lists.
 *   - Initializing the heap: O(K log K) (inserting K heads).
 *   - Main loop: Each of the N nodes is inserted into the heap once and extracted once.
 *     Each operation takes O(log K) time. So, N * O(log K) = O(N log K).
 * Space Complexity: O(K)
 *   - The heap stores at most K nodes (one from each list).
 *
 * @param {ListNode[]} lists - An array of sorted linked list heads.
 * @returns {ListNode | null} The head of the merged sorted linked list.
 */
function mergeKLists(lists) {
    if (!lists || lists.length === 0) {
        return null;
    }

    // Custom comparator for ListNode objects based on their 'val' property.
    // 'a' comes before 'b' if 'a.val' is smaller than 'b.val'.
    const minHeap = new MinHeap(); // Use the standard MinHeap and configure its comparator if needed, or define a custom one here.
                                   // For simplicity with our current MinHeap, we assume it works with primitive numbers.
                                   // Let's create a specialized heap for ListNode if comparator is not passed to base.
                                   // Or modify MinHeap to take a comparator. (Done in base Heap, so we can use it).
    
    // For MinHeap, comparator is (a, b) => a < b.
    // For NodeHeap, comparator would be (a, b) => a.val < b.val.
    // Let's create a specialized one for this problem.
    class ListNodeMinHeap extends MinHeap {
        constructor() {
            super(); // This calls Heap's constructor with (a, b) => a < b
            // We need to override the comparator for ListNode objects
            this.comparator = (nodeA, nodeB) => nodeA.val < nodeB.val;
        }
    }
    const nodeHeap = new ListNodeMinHeap();

    // Add the head of each non-empty list to the heap
    for (const listHead of lists) {
        if (listHead !== null) {
            nodeHeap.insert(listHead);
        }
    }

    const dummyHead = new ListNode(0); // Dummy node to simplify merged list construction
    let current = dummyHead;

    // While there are nodes in the heap, extract the smallest and add its next to the heap
    while (!nodeHeap.isEmpty()) {
        const smallestNode = nodeHeap.extractMin();

        // Append the smallest node to the merged list
        current.next = smallestNode;
        current = current.next;

        // If the extracted node has a next element, add it to the heap
        if (smallestNode.next !== null) {
            nodeHeap.insert(smallestNode.next);
        }
    }

    return dummyHead.next; // The actual head of the merged list
}

/**
 * Alternative Approach: Brute Force / Pairwise Merging
 *
 * 1. Initialize an empty `mergedList`.
 * 2. Iterate through the `lists` array. For each list, merge it with `mergedList`.
 *    The `mergeTwoLists` function (like in LeetCode 21) merges two sorted lists.
 *
 * Time Complexity: O(N * K)
 *   - N is the total number of nodes across all lists.
 *   - K is the number of lists.
 *   - Merging two lists of total length M takes O(M) time.
 *   - In the worst case, we repeatedly merge a list of length 1 with a list of length (N-1), or
 *     merge lists of roughly N/K length repeatedly.
 *     For example, merging lists[0] and lists[1] takes O(L1+L2).
 *     Then merging (L1+L2) with lists[2] takes O(L1+L2+L3).
 *     ...until O(L1+...+LK) = O(N).
 *     Total operations: Sum of lengths of lists merged at each step.
 *     Sum(i=1 to K-1) (length of current merged list + length of list_i+1)
 *     Worst case, this adds up to O(N*K).
 * Space Complexity: O(1) auxiliary space, or O(N) if building new nodes.
 *
 * This approach is generally less efficient than the heap approach for large K.
 */
function mergeKLists_BruteForce(lists) {
    if (!lists || lists.length === 0) {
        return null;
    }

    let mergedList = null;

    // Helper function to merge two sorted linked lists
    const mergeTwoLists = (l1, l2) => {
        const dummy = new ListNode(0);
        let current = dummy;

        while (l1 !== null && l2 !== null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        if (l1 !== null) {
            current.next = l1;
        } else if (l2 !== null) {
            current.next = l2;
        }

        return dummy.next;
    };

    for (const list of lists) {
        mergedList = mergeTwoLists(mergedList, list);
    }

    return mergedList;
}

module.exports = {
    mergeKLists,
    mergeKLists_BruteForce // For comparison
};
```