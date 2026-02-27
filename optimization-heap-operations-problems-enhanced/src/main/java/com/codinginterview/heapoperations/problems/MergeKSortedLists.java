```java
package com.codinginterview.heapoperations.problems;

import com.codinginterview.heapoperations.utils.ListNode;

import java.util.PriorityQueue;

/**
 * Problem: Merge K Sorted Lists
 *
 * You are given an array of k linked-lists lists, each sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * Example 1:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 * Explanation: The linked-lists are:
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
 *
 * Constraints:
 * k == lists.length
 * 0 <= k <= 10^4
 * 0 <= lists[i].length <= 500
 * -10^4 <= lists[i][j] <= 10^4
 * lists[i] is sorted in ascending order.
 * The total number of nodes in all linked lists will not exceed 10^4.
 */
public class MergeKSortedLists {

    /**
     * Approach 1: Optimal Solution using a Min-Heap (PriorityQueue)
     *
     * Algorithm:
     * 1. Create a min-heap (PriorityQueue) that stores ListNode objects.
     *    The heap should order nodes based on their `val` attribute.
     * 2. Iterate through the array of linked lists (`lists`). For each list,
     *    if its head node is not null, add it to the min-heap.
     * 3. Create a dummy head node for the merged list and a `tail` pointer
     *    initialized to the dummy head. This simplifies appending nodes.
     * 4. While the min-heap is not empty:
     *    a. Extract the node with the smallest value from the heap (`heap.poll()`).
     *       Let this be `currentNode`.
     *    b. Append `currentNode` to the merged list: `tail.next = currentNode`.
     *    c. Move the `tail` pointer to `currentNode`: `tail = currentNode`.
     *    d. If `currentNode` has a next node (`currentNode.next != null`),
     *       add `currentNode.next` to the min-heap. This ensures that the next
     *       smallest element from that list is considered.
     * 5. Return `dummyHead.next`, which is the head of the truly merged list.
     *
     * Time Complexity: O(N log K)
     *   - `N` is the total number of nodes across all `k` lists.
     *   - Initial population of the heap: O(K log K) for adding `k` elements.
     *   - Each time we extract a node (N times), we perform a `poll()` (O(log K))
     *     and potentially an `add()` (O(log K)) operation.
     *   - Total: O(K log K + N log K) which simplifies to O(N log K) since `N` is generally much larger than `K`.
     * Space Complexity: O(K)
     *   - The heap stores at most `k` `ListNode` references (one from each list).
     *
     * @param lists An array of k sorted linked lists.
     * @return The head of the merged sorted linked list.
     */
    public ListNode mergeKListsHeap(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        // Create a min-heap to store the head nodes of the k lists.
        // The comparator ensures nodes are ordered by their 'val'.
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);

        // Add the head of each list to the min-heap.
        for (ListNode list : lists) {
            if (list != null) {
                minHeap.add(list);
            }
        }

        // Dummy head to simplify the creation of the merged list.
        ListNode dummyHead = new ListNode(0);
        ListNode tail = dummyHead;

        // While the heap is not empty, extract the smallest node.
        while (!minHeap.isEmpty()) {
            ListNode smallest = minHeap.poll();
            tail.next = smallest; // Append to the merged list
            tail = smallest;      // Move tail pointer

            // If the extracted node has a next node, add it to the heap.
            if (smallest.next != null) {
                minHeap.add(smallest.next);
            }
        }

        return dummyHead.next;
    }


    /**
     * Approach 2: Divide and Conquer (Merging two lists at a time)
     *
     * Algorithm:
     * 1. If `lists` is empty or null, return null.
     * 2. Repeatedly merge pairs of lists until only one list remains.
     *    - Start with `lists[0]` and `lists[1]`, merge them into a new list.
     *    - Then merge `lists[2]` and `lists[3]`, and so on.
     *    - Replace the original pairs with their merged results.
     *    - Continue this process until only one list remains.
     *
     * Helper function `mergeTwoLists(l1, l2)`: Merges two sorted linked lists.
     * This is a standard linked list problem solved iteratively or recursively.
     *
     * Time Complexity: O(N log K)
     *   - Each merge operation combines two lists into one. In total, N elements
     *     are processed across all merges at each "level" of the divide and conquer.
     *   - There are `log K` levels of merging (similar to merge sort).
     *   - Example: 8 lists -> 4 lists -> 2 lists -> 1 list (3 levels).
     *   - Each level processes N nodes. Total time = N * log K.
     * Space Complexity: O(1) or O(log K) for recursion stack if `mergeTwoLists` is recursive.
     *   - If `mergeTwoLists` is iterative, then O(1) auxiliary space (excluding output list).
     *
     * @param lists An array of k sorted linked lists.
     * @return The head of the merged sorted linked list.
     */
    public ListNode mergeKListsDivideAndConquer(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }
        return merge(lists, 0, lists.length - 1);
    }

    private ListNode merge(ListNode[] lists, int start, int end) {
        if (start == end) {
            return lists[start];
        }
        if (start > end) {
            return null;
        }
        int mid = start + (end - start) / 2;
        ListNode l1 = merge(lists, start, mid);
        ListNode l2 = merge(lists, mid + 1, end);
        return mergeTwoLists(l1, l2);
    }

    /**
     * Helper function to merge two sorted linked lists.
     * Time: O(L1 + L2) where L1 and L2 are lengths of the lists.
     * Space: O(1)
     */
    private ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;

        ListNode dummy = new ListNode(0);
        ListNode current = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        if (l1 != null) {
            current.next = l1;
        } else if (l2 != null) {
            current.next = l2;
        }

        return dummy.next;
    }


    /**
     * Approach 3: Brute Force (Collect all, sort, then rebuild)
     *
     * Algorithm:
     * 1. Create an ArrayList to store all node values.
     * 2. Iterate through each linked list and add all its node values to the ArrayList.
     * 3. Sort the ArrayList.
     * 4. Create a new sorted linked list from the elements in the sorted ArrayList.
     *
     * Time Complexity: O(N log N)
     *   - `N` is the total number of nodes.
     *   - O(N) to collect all nodes.
     *   - O(N log N) to sort the ArrayList.
     *   - O(N) to build the new linked list.
     * Space Complexity: O(N)
     *   - For storing all node values in the ArrayList.
     *
     * This approach is simpler to implement but generally less efficient than heap or divide-and-conquer
     * for larger K, as it sorts all N elements regardless of K.
     *
     * @param lists An array of k sorted linked lists.
     * @return The head of the merged sorted linked list.
     */
    public ListNode mergeKListsBruteForce(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        java.util.List<Integer> allValues = new java.util.ArrayList<>();
        for (ListNode list : lists) {
            ListNode current = list;
            while (current != null) {
                allValues.add(current.val);
                current = current.next;
            }
        }

        if (allValues.isEmpty()) {
            return null;
        }

        // Sort all values
        java.util.Collections.sort(allValues);

        // Build new linked list
        ListNode dummyHead = new ListNode(0);
        ListNode current = dummyHead;
        for (int val : allValues) {
            current.next = new ListNode(val);
            current = current.next;
        }

        return dummyHead.next;
    }
}
```