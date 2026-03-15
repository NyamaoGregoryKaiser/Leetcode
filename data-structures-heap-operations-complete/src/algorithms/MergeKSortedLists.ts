import { MinHeap } from './MinHeap';

/**
 * Definition for singly-linked list.
 * This is a common structure in linked list problems.
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
 * Problem: Merge k Sorted Lists
 *
 * You are given an array of `k` linked-lists `lists`, each list is sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * Example 1:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 * Explanation: The linked lists are:
 * [1->4->5],
 * [1->3->4],
 * [2->6]
 * merging them into one sorted list:
 * 1->1->2->3->4->4->5->6
 *
 * Example 2:
 * Input: lists = []
 * Output: []
 *
 * Example 3:
 * Input: lists = [[]]
 * Output: []
 */

/**
 * Merges k sorted linked lists into one sorted linked list using a Min-Heap (Priority Queue).
 *
 * Approach:
 * 1. Create a Min-Heap that stores `ListNode` objects. The comparator for the heap
 *    should prioritize nodes with smaller `val`.
 * 2. Iterate through the `k` input lists. For each non-empty list, insert its head node
 *    into the Min-Heap.
 * 3. Initialize a dummy head for the merged list and a pointer `current` to it.
 * 4. While the Min-Heap is not empty:
 *    a. Extract the node with the smallest `val` from the heap (this will be the next node
 *       in our merged list).
 *    b. Append this node to `current.next` and advance `current` to this new node.
 *    c. If the extracted node has a `next` element (i.e., its original list is not exhausted),
 *       insert `node.next` into the heap.
 * 5. Return `dummyHead.next`, which is the head of the completely merged sorted list.
 *
 * Time Complexity: O(N log K)
 * - N is the total number of nodes across all k lists.
 * - K is the number of linked lists.
 * - Initializing the heap: O(K) insertions, each O(log K) -> O(K log K)
 * - In the main loop, we extract N nodes. Each `extractMin` is O(log K).
 * - For each extracted node, we potentially insert its `next` node. Each `insert` is O(log K).
 * - So, N extractions and at most N insertions (total 2N heap operations).
 * - Total: O(N log K).
 *
 * Space Complexity: O(K)
 * - The Min-Heap stores at most `k` nodes (one from each list at any given time).
 *
 * @param lists An array of k sorted linked lists.
 * @returns The head of the merged sorted linked list.
 */
export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (!lists || lists.length === 0) {
        return null;
    }

    // Custom comparator for ListNode: prioritize nodes with smaller 'val'
    const comparator = (a: ListNode, b: ListNode) => a.val - b.val;
    const minHeap = new MinHeap<ListNode>(comparator);

    // Add the head of each non-empty list to the min-heap
    for (const list of lists) {
        if (list !== null) {
            minHeap.insert(list);
        }
    }

    // Dummy head for the merged list
    const dummyHead = new ListNode(0);
    let current = dummyHead;

    // While the heap is not empty, extract the smallest node
    while (!minHeap.isEmpty()) {
        const smallestNode = minHeap.extractMin()!; // We know it's not undefined because heap is not empty

        // Append the smallest node to the merged list
        current.next = smallestNode;
        current = current.next;

        // If the extracted node has a next element, add it to the heap
        if (smallestNode.next !== null) {
            minHeap.insert(smallestNode.next);
        }
    }

    return dummyHead.next;
}

/**
 * Alternative Approach 1: Brute Force (Concatenate and Sort)
 *
 * 1. Traverse all linked lists and collect all node values into a single array.
 * 2. Sort the array.
 * 3. Construct a new sorted linked list from the sorted array.
 *
 * Time Complexity: O(N log N)
 * - N is the total number of nodes.
 * - Traversing all lists: O(N)
 * - Sorting the array: O(N log N)
 * - Creating new list: O(N)
 *
 * Space Complexity: O(N)
 * - To store all N node values in an array.
 *
 * This approach is simpler to implement but generally less efficient than the heap-based one
 * when k is significantly smaller than N (i.e., many lists with few elements).
 * When k is large, and N/K is small, the heap approach tends to be better.
 */
export function mergeKLists_bruteForce(lists: Array<ListNode | null>): ListNode | null {
    if (!lists || lists.length === 0) {
        return null;
    }

    const allValues: number[] = [];
    for (const list of lists) {
        let current = list;
        while (current !== null) {
            allValues.push(current.val);
            current = current.next;
        }
    }

    if (allValues.length === 0) {
        return null;
    }

    allValues.sort((a, b) => a - b);

    const dummyHead = new ListNode(0);
    let current = dummyHead;
    for (const val of allValues) {
        current.next = new ListNode(val);
        current = current.next;
    }

    return dummyHead.next;
}

/**
 * Alternative Approach 2: Divide and Conquer
 *
 * This approach recursively merges two lists at a time.
 * For an array of k lists, it merges `list[0]` with `list[1]`, then the result with `list[2]`, and so on.
 * Or, more efficiently, it can merge `list[0]` and `list[k/2-1]` and `list[k/2]` and `list[k-1]`, then merge
 * the results. This is similar to merge sort.
 *
 * Time Complexity: O(N log K)
 * - Each merge operation of two lists of total length `L` takes O(L) time.
 * - In a divide-and-conquer approach (like merging pairs recursively), there are `log K` levels of merging.
 *   Each level involves processing all `N` nodes once.
 * - So, total is O(N log K).
 *
 * Space Complexity: O(log K) for recursion stack.
 *
 * This approach has the same time complexity as the heap approach and is also very efficient.
 * It's often preferred in functional programming styles or when a heap is not readily available.
 */
export function mergeKLists_divideAndConquer(lists: Array<ListNode | null>): ListNode | null {
    if (!lists || lists.length === 0) {
        return null;
    }
    if (lists.length === 1) {
        return lists[0];
    }

    // Helper function to merge two sorted linked lists
    const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
        const dummyHead = new ListNode(0);
        let current = dummyHead;

        while (l1 !== null && l2 !== null) {
            if (l1.val < l2.val) {
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

        return dummyHead.next;
    };

    // Recursive merging function
    const merge = (listArr: Array<ListNode | null>, start: number, end: number): ListNode | null => {
        if (start === end) {
            return listArr[start];
        }
        if (start + 1 === end) {
            return mergeTwoLists(listArr[start], listArr[end]);
        }

        const mid = Math.floor((start + end) / 2);
        const l1 = merge(listArr, start, mid);
        const l2 = merge(listArr, mid + 1, end);
        return mergeTwoLists(l1, l2);
    };

    return merge(lists, 0, lists.length - 1);
}
```
```typescript