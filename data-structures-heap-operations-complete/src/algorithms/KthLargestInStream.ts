import { MinHeap } from './MinHeap';

/**
 * Problem: Kth Largest Element in a Data Stream
 *
 * Design a class to find the `k`th largest element in a stream. Note that it is the `k`th
 * largest element in the sorted order, not the `k`th distinct element.
 *
 * Implement the `KthLargestInStream` class:
 * - `KthLargestInStream(int k, int[] nums)`: Initializes the object with the integer `k`
 *   and the stream of integers `nums`.
 * - `int add(int val)`: Appends the integer `val` to the stream and returns the element
 *   representing the `k`th largest element in the stream.
 *
 * Example:
 * KthLargestInStream kthLargest = new KthLargestInStream(3, [4, 5, 8, 2]);
 * kthLargest.add(3);   // arr = [2,3,4,5,8], 3rd largest is 4. Returns 4.
 * kthLargest.add(5);   // arr = [2,3,4,5,5,8], 3rd largest is 5. Returns 5.
 * kthLargest.add(10);  // arr = [2,3,4,5,5,8,10], 3rd largest is 5. Returns 5.
 * kthLargest.add(9);   // arr = [2,3,4,5,5,8,9,10], 3rd largest is 8. Returns 8.
 * kthLargest.add(4);   // arr = [2,3,4,4,5,5,8,9,10], 3rd largest is 8. Returns 8.
 */

/**
 * Implements a class to find the Kth largest element in a data stream.
 *
 * Approach:
 * Similar to finding the Kth largest element in an array, we use a Min-Heap.
 * The heap will always maintain the `k` largest elements encountered so far in the stream.
 *
 * Initialization (`constructor`):
 * 1. Store `k`.
 * 2. Initialize a Min-Heap.
 * 3. Iterate through the initial `nums` array and call `add` for each number.
 *    This populates the heap with the initial `k` largest elements.
 *
 * `add(val)` method:
 * 1. Insert `val` into the Min-Heap.
 * 2. If the heap's size exceeds `k`, remove the smallest element (heap's root).
 *    This ensures that the heap always contains only the `k` largest elements.
 * 3. The `k`th largest element in the current stream is always the smallest element
 *    among these `k` largest, which is the root of the Min-Heap. Return `minHeap.peek()`.
 *
 * Why a Min-Heap of size K?
 * A Min-Heap of size `k` allows us to efficiently keep track of the `k` largest elements.
 * When a new element arrives, we compare it with the smallest element currently in the heap (the root).
 * - If the new element is larger than the root, it means the new element is among the current `k` largest.
 *   We remove the root (the current `k`th largest) and add the new element.
 * - If the new element is smaller than or equal to the root, it's not among the `k` largest, so we ignore it.
 * This ensures that the heap always holds the top `k` elements, and its root is the `k`th largest.
 *
 * Time Complexity:
 * - Constructor: O(N log K), where N is the length of `nums`. Each `add` call is O(log K).
 * - `add` method: O(log K), where K is the target `k`. This is because heap operations (insert, extractMin)
 *   take logarithmic time with respect to the heap's size, which is at most `k`.
 *
 * Space Complexity: O(K)
 * - The Min-Heap stores at most `k` elements.
 */
export class KthLargestInStream {
    private k: number;
    private minHeap: MinHeap<number>;

    /**
     * Initializes the KthLargestInStream object.
     * @param k The desired Kth largest element.
     * @param nums An initial array of numbers to populate the stream.
     */
    constructor(k: number, nums: number[]) {
        if (k <= 0) {
            throw new Error("k must be a positive integer.");
        }
        this.k = k;
        this.minHeap = new MinHeap<number>();

        // Add initial numbers to the stream
        for (const num of nums) {
            this.add(num);
        }
    }

    /**
     * Adds an integer `val` to the stream and returns the `k`th largest element.
     * Time Complexity: O(log K)
     * @param val The integer to add to the stream.
     * @returns The Kth largest element in the current stream.
     * @throws Error if the heap is empty after operations (should not happen if k > 0).
     */
    add(val: number): number {
        // Always insert the new value
        this.minHeap.insert(val);

        // If the heap size exceeds k, remove the smallest element.
        // This ensures the heap always contains only the k largest elements.
        if (this.minHeap.size() > this.k) {
            this.minHeap.extractMin();
        }

        // The Kth largest element is the root of the Min-Heap
        const result = this.minHeap.peek();
        if (result === undefined) {
            throw new Error("Heap is unexpectedly empty. Ensure k is valid and stream has enough elements.");
        }
        return result;
    }
}

/**
 * Alternative Approach: Brute Force (Not suitable for a stream)
 *
 * A naive approach would be to store all numbers in an array, then sort it and pick the k-th largest.
 *
 * `add(val)`: Add `val` to array.
 * `getKthLargest()`: Sort the array, return `arr[arr.length - k]`.
 *
 * Time Complexity:
 * - `add`: O(1)
 * - `getKthLargest`: O(N log N) where N is the current size of the stream.
 *
 * Space Complexity: O(N)
 *
 * This is very inefficient for a data stream where `add` is called frequently.
 * The heap-based solution's O(log K) `add` operation is vastly superior.
 */
```

```typescript