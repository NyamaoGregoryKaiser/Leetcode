```typescript
import { Heap } from '../data-structures/Heap';
import { defaultCompare } from '../utils/comparator';

/**
 * Represents a node in a singly-linked list.
 */
export class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * Merges k sorted linked lists into one single sorted linked list using a Min-Heap.
 *
 * Algorithm:
 * 1. Create a Min-Heap that stores objects of type `{ val: number, node: ListNode }`.
 *    The comparison should be based on `val`.
 * 2. Iterate through the `lists` array:
 *    For each non-null list head, insert `{ val: head.val, node: head }` into the heap.
 * 3. Initialize a dummy head for the merged list and a `current` pointer to it.
 * 4. While the heap is not empty:
 *    a. Extract the smallest element from the heap (this will be the node with the smallest `val`).
 *    b. Append this node to the merged list (`current.next = extractedNode.node`).
 *    c. Move `current` to the newly added node (`current = current.next`).
 *    d. If the extracted node has a `next` element, insert `{ val: extractedNode.node.next.val, node: extractedNode.node.next }`
 *       into the heap. This ensures we always consider the next element from the list that the extracted element came from.
 * 5. Return `dummyHead.next`, which is the head of the fully merged sorted list.
 *
 * Time Complexity: O(N log K)
 *   - N is the total number of elements across all k lists.
 *   - Each element is inserted into the heap once and extracted once.
 *   - Heap operations (insert, extract) take O(log K) time because the heap size is at most K (number of lists).
 * Space Complexity: O(K)
 *   - The heap stores at most K elements (one from each list).
 *
 * @param lists An array of sorted `ListNode` heads.
 * @returns The head of the merged sorted linked list.
 */
export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (!lists || lists.length === 0) {
        return null;
    }

    // Custom comparator for objects { val: number, node: ListNode }
    // We want a Min-Heap, so compare based on `val` in ascending order.
    const nodeComparator = (a: { val: number, node: ListNode }, b: { val: number, node: ListNode }) => {
        return defaultCompare(a.val, b.val);
    };

    const minHeap = Heap.createMinHeap<{ val: number, node: ListNode }>(nodeComparator);

    // Add the head of each list to the min-heap
    for (const listHead of lists) {
        if (listHead !== null) {
            minHeap.insert({ val: listHead.val, node: listHead });
        }
    }

    const dummyHead = new ListNode(0); // Dummy node to simplify handling the head of the merged list
    let current = dummyHead;

    // While the heap is not empty, extract the smallest element
    while (!minHeap.isEmpty()) {
        const { node: smallestNode } = minHeap.extract()!; // '!' because we know heap is not empty

        // Append the smallest node to the merged list
        current.next = smallestNode;
        current = current.next;

        // If the extracted node has a next element, add it to the heap
        if (smallestNode.next !== null) {
            minHeap.insert({ val: smallestNode.next.val, node: smallestNode.next });
        }
    }

    return dummyHead.next; // The actual head of the merged list
}

/**
 * Merges k sorted linked lists iteratively using a divide and conquer approach (less optimal than heap).
 * This method repeatedly merges two lists until only one remains.
 *
 * Algorithm:
 * 1. If the list of lists is empty, return null.
 * 2. While there is more than one list to merge:
 *    a. Create a new `mergedLists` array.
 *    b. Iterate through `lists` in pairs: `lists[i]` and `lists[i+1]`.
 *    c. Merge each pair using a standard two-pointer list merge function.
 *    d. Add the result to `mergedLists`.
 *    e. If there's an odd number of lists, add the last unmerged list directly to `mergedLists`.
 *    f. Update `lists` to `mergedLists` for the next iteration.
 * 3. The final remaining list in `lists[0]` is the merged list.
 *
 * Time Complexity: O(N * K)
 *   - In each pass, we merge lists. If N is total elements, and K is lists:
 *     - 1st pass: K/2 merges, each merging lists of average N/K elements, taking O(N/K) * 2 = O(N/K) (two lists merged). Total O(N).
 *     - 2nd pass: K/4 merges, each merging lists of average 2N/K elements. Total O(N).
 *     - ...
 *     - There are `log K` passes.
 *     - So it looks like N log K. However, the mergeTwoLists function is linear to the sum of lengths.
 *     - Consider worst case: we merge L1 with L2, then (L1+L2) with L3, etc. This becomes O(N*K) if lists have varied lengths or merging order is not optimized.
 *     - A better iterative approach would be divide and conquer style merging (merge list[0] with list[k-1], list[1] with list[k-2], etc.).
 *     - The simpler `mergeTwoLists` applied sequentially (or iteratively reducing the array) can be worse than O(N log K).
 *     - A simpler analysis: In the worst case, we might merge a list of size `m` with a list of size `p`, resulting in `m+p` operations.
 *       If we have `K` lists, in the first step we might effectively merge two lists, creating one. We do this `K-1` times.
 *       Example: `L1, L2, L3, L4`. Merge (L1, L2) -> L12. Merge (L12, L3) -> L123. Merge (L123, L4) -> L1234.
 *       If all lists are of length `N/K`, then: O(N/K + 2N/K + 3N/K + ... + (K-1)N/K) = O(N/K * K^2) = O(NK).
 * Space Complexity: O(1) (excluding input/output linked list nodes)
 *   - For the recursive/divide-and-conquer version, call stack could be O(log K).
 *
 * @param lists An array of sorted `ListNode` heads.
 * @returns The head of the merged sorted linked list.
 */
export function mergeKListsIterative(lists: Array<ListNode | null>): ListNode | null {
    if (!lists || lists.length === 0) {
        return null;
    }

    /**
     * Helper function to merge two sorted linked lists.
     * Time Complexity: O(M+P), where M and P are lengths of list1 and list2.
     * Space Complexity: O(1)
     */
    function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
        const dummyHead = new ListNode(0);
        let current = dummyHead;

        while (list1 !== null && list2 !== null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }

        if (list1 !== null) {
            current.next = list1;
        } else if (list2 !== null) {
            current.next = list2;
        }

        return dummyHead.next;
    }

    // Use a divide and conquer approach for iterative merging
    let interval = 1;
    while (interval < lists.length) {
        for (let i = 0; i + interval < lists.length; i += interval * 2) {
            lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }

    return lists[0];
}
```