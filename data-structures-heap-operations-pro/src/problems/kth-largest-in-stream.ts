```typescript
/**
 * src/problems/kth-largest-in-stream.ts
 * 
 * Problem: Kth Largest Element in a Stream
 * LeetCode: 703
 * 
 * Design a class to find the k-th largest element in a stream. Note that it is the k-th largest element
 * in the sorted order, not the k-th distinct element.
 * 
 * Implement the KthLargest class:
 * - `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.
 * - `int add(int val)` Appends the integer `val` to the stream and returns the element representing the k-th largest element in the stream.
 * 
 * Example:
 * KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3);   // return 4
 * kthLargest.add(5);   // return 5
 * kthLargest.add(10);  // return 5
 * kthLargest.add(9);   // return 8
 * kthLargest.add(4);   // return 8
 */

import { MinHeap } from '../data-structures/MinMaxHeap';

/**
 * KthLargest class uses a MinHeap to efficiently find the k-th largest element.
 * The MinHeap stores the `k` largest elements seen so far. The root of this MinHeap
 * will always be the k-th largest element.
 * 
 * Rationale:
 * If we want the Kth largest element, we only care about the K largest elements.
 * A MinHeap of size K will automatically keep track of these.
 * - When a new element comes:
 *   - If the heap has less than K elements, add it.
 *   - If the heap has K elements:
 *     - If the new element is smaller than the current smallest (heap.peek()), it's not among the K largest, so ignore.
 *     - If the new element is larger than the current smallest (heap.peek()), then this new element is one of the K largest.
 *       Remove the current smallest (heap.extractMin()) and insert the new element.
 * - After these operations, the root of the MinHeap (heap.peek()) will always be the Kth largest element.
 */
export class KthLargest {
    private k: number;
    // A MinHeap stores the 'k' largest elements seen so far.
    // The smallest element in this heap (the root) is the k-th largest overall.
    private minHeap: MinHeap<number>;

    /**
     * Initializes the KthLargest object.
     * @param k The 'k' for the k-th largest element.
     * @param nums An array of initial numbers in the stream.
     * 
     * Time Complexity: O(N log k) where N is the length of `nums`.
     *                  Each `add` operation takes O(log k).
     * Space Complexity: O(k) to store the elements in the MinHeap.
     */
    constructor(k: number, nums: number[]) {
        this.k = k;
        // Initialize the min-heap. No custom comparator needed for numbers.
        this.minHeap = new MinHeap<number>();

        // Add initial numbers to the heap
        for (const num of nums) {
            this.add(num);
        }
    }

    /**
     * Adds a new value to the stream and returns the k-th largest element.
     * @param val The new integer to add to the stream.
     * @returns The k-th largest element in the updated stream.
     * 
     * Time Complexity: O(log k) - due to heap insertion/extraction.
     * Space Complexity: O(1) - modifies existing heap.
     */
    add(val: number): number {
        // If the heap has less than k elements, just add the new value.
        // It will eventually become one of the k largest.
        if (this.minHeap.size() < this.k) {
            this.minHeap.insert(val);
        } else if (val > this.minHeap.peek()!) { // If heap is full (size k) and new value is larger than the current smallest of k
            // Remove the current smallest (which is the k-th largest element up to this point)
            this.minHeap.extractMin();
            // Insert the new, larger value
            this.minHeap.insert(val);
        }

        // After potentially adding/removing, the root of the MinHeap is the k-th largest element.
        // We can assert non-null because the problem guarantees `k` is at least 1 and `add` is called.
        // If `nums` is empty and `k` is 1, `add` might be called. `minHeap.size()` will be 1 after the first `add`.
        // The problem description implies `k` is positive and stream will have at least `k` elements eventually to ask for `k`-th largest.
        return this.minHeap.peek()!;
    }
}

/*
// --- Alternative Approaches (for discussion, not implemented in full) ---

// 1. Brute-Force (Array and Sort)
// Maintain an array of all numbers. On each 'add', sort the array and return nums[nums.length - k].
// Time Complexity: O(N log N) for each add (N is current stream size). Very inefficient for large streams.
// Space Complexity: O(N)

// 2. Sorted List (Linked List / Balanced BST)
// Maintain a sorted data structure (like a balanced BST or a sorted linked list).
// Insertion is O(log N) for BST or O(N) for linked list (to find position).
// Then find k-th element. BST provides O(log N) for finding k-th if augmented.
// Still less efficient than heap for this specific problem due to overhead or complexity.
// Heap leverages the fact we only need the k-th, not a fully sorted structure.
*/
```