```typescript
/**
 * src/problems/merge-k-sorted-lists.ts
 * 
 * Problem: Merge K Sorted Lists
 * LeetCode: 23
 * 
 * You are given an array of k linked-lists lists, each list is sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 * 
 * Example:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 * Explanation: The linked-lists are:
 * [
 *   1->4->5,
 *   1->3->4,
 *   2->6
 * ]
 * merging them into one sorted list:
 * 1->1->2->3->4->4->5->6
 */

import { MinHeap, Comparator } from '../data-structures/MinMaxHeap';
import { ListNode } from '../data-structures/ListNode';

/**
 * Merges k sorted linked lists into one sorted linked list.
 * 
 * Solution Approach: Using a MinHeap (Priority Queue)
 * 
 * 1. Initialize a MinHeap. This heap will store the *current* smallest node from each of the k lists.
 *    The comparator for the heap should compare ListNode objects based on their `val` property.
 * 2. Add the head of each non-empty list into the MinHeap.
 * 3. Create a dummy head for the merged list and a pointer `current` to build the new list.
 * 4. While the MinHeap is not empty:
 *    a. Extract the node with the smallest value (the root of the MinHeap).
 *    b. Append this node to the merged list (`current.next = extractedNode`).
 *    c. Move the `current` pointer to the newly added node (`current = current.next`).
 *    d. If the extracted node has a `next` element (i.e., it's not the end of its original list),
 *       add that `next` element to the MinHeap.
 * 5. Return the `next` of the dummy head, which is the actual head of the merged list.
 * 
 * Time Complexity: O(N log k)
 *   - N is the total number of nodes across all linked lists.
 *   - k is the number of linked lists.
 *   - Initial heap population: O(k log k) (k insertions)
 *   - For each of the N nodes: one extraction (O(log k)) and one potential insertion (O(log k)).
 *   - Total: O(k log k + N log k) = O(N log k) since N is typically much larger than k.
 * Space Complexity: O(k)
 *   - The MinHeap will store at most k nodes (one from each list) at any given time.
 */
export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    // Edge case: if no lists are provided or all lists are null, return null.
    if (!lists || lists.length === 0) {
        return null;
    }

    // Custom comparator for ListNode objects: compares their 'val' property.
    const listNodeComparator: Comparator<ListNode> = (a, b) => a.val - b.val;
    const minHeap = new MinHeap<ListNode>(listNodeComparator);

    // Add the head of each non-empty list to the min-heap.
    // We only add nodes that actually exist.
    for (const listHead of lists) {
        if (listHead !== null) {
            minHeap.insert(listHead);
        }
    }

    // Create a dummy node to simplify the construction of the merged list.
    // The actual head will be dummy.next.
    const dummyHead = new ListNode(0);
    let current = dummyHead;

    // While there are nodes in the heap, extract the smallest one.
    while (!minHeap.isEmpty()) {
        // Get the node with the smallest value from the heap.
        const smallestNode = minHeap.extractMin()!; // We know it's not undefined because heap is not empty.

        // Append this node to our merged list.
        current.next = smallestNode;
        current = current.next;

        // If the extracted node has a next element, add it to the heap.
        // This ensures we always consider the next smallest available element from that list.
        if (smallestNode.next !== null) {
            minHeap.insert(smallestNode.next);
        }
    }

    // The merged list starts from dummyHead.next.
    return dummyHead.next;
}

/*
// --- Alternative Approaches (for discussion, not implemented in full) ---

// 1. Brute-Force: Collect All Values and Sort
//   - Iterate through all lists and collect all node values into a single array. O(N)
//   - Sort the array. O(N log N)
//   - Create a new linked list from the sorted array. O(N)
//   - Total Time: O(N log N)
//   - Total Space: O(N) for the array.
//   - This approach is simpler to implement but generally less efficient than the heap-based approach
//     when k is relatively small compared to N, because it requires a full sort.

// 2. Pairwise Merging
//   - Merge list1 and list2 into mergedList1_2.
//   - Merge mergedList1_2 and list3 into mergedList1_2_3.
//   - Repeat k-1 times.
//   - If merging two lists of lengths L1 and L2 takes O(L1 + L2),
//     the total time complexity would be roughly O(k*N) in the worst case (e.g., if lists are very uneven).
//     A slightly better pairwise merge approach could be to use divide and conquer:
//     merge lists in pairs, then merge the results of those merges, and so on, recursively.
//     This divide and conquer approach would achieve O(N log k) time complexity, similar to the heap.
//     It avoids the extra space of the heap by modifying pointers directly, but can be more complex to implement correctly.
//     Example: lists = [L1, L2, L3, L4] -> merge(L1, L2) -> A; merge(L3, L4) -> B; merge(A, B).
//     This is essentially what the heap does implicitly, as the heap structure ensures we are always merging
//     the "smallest" available lists (by their head nodes).
*/
```