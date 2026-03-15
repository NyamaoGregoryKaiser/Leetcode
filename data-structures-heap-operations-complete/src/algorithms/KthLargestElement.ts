import { MinHeap } from './MinHeap';

/**
 * Problem: Kth Largest Element in an Array
 *
 * Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.
 * Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.
 *
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * Explanation: Sorted array is [1,2,3,4,5,6]. The 2nd largest element is 5.
 *
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 * Explanation: Sorted array is [1,2,2,3,3,4,5,5,6]. The 4th largest element is 4.
 */

/**
 * Finds the Kth largest element in an array using a Min-Heap.
 *
 * Approach:
 * 1. Initialize a Min-Heap.
 * 2. Iterate through the `nums` array:
 *    a. Insert the current number into the heap.
 *    b. If the heap's size exceeds `k`, remove the smallest element (root of the Min-Heap).
 * 3. After iterating through all numbers, the root of the Min-Heap will be the `k`th largest element.
 *    This is because the heap always maintains the `k` largest elements encountered so far,
 *    and the smallest among these `k` elements (which is the root) is precisely the `k`th largest overall.
 *
 * Why Min-Heap of size K?
 * If we want the Kth largest element, we need to keep track of the K largest elements seen so far.
 * A Min-Heap naturally helps with this:
 * - When a new number comes in, if it's larger than the smallest of the current K largest (heap's root),
 *   it means this new number should be considered among the K largest. We remove the current smallest
 *   and add the new one.
 * - If the new number is smaller, it's irrelevant to the K largest, so we ignore it.
 * This way, the heap always contains the K largest numbers, and its root is the Kth largest.
 *
 * Time Complexity: O(N log K)
 * - N is the number of elements in `nums`.
 * - For each element, we perform an `insert` or `extractMin` operation on a heap of size at most `k`.
 * - Both operations take O(log K) time.
 *
 * Space Complexity: O(K)
 * - The Min-Heap stores at most `k` elements.
 *
 * @param nums The array of numbers.
 * @param k The desired Kth largest element.
 * @returns The Kth largest element.
 * @throws Error if k is out of bounds or nums is empty.
 */
export function findKthLargest(nums: number[], k: number): number {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        throw new Error("Invalid input: nums array is empty, or k is out of bounds.");
    }

    // Initialize a Min-Heap
    const minHeap = new MinHeap<number>();

    // Iterate through each number in the array
    for (const num of nums) {
        // Always insert the number
        minHeap.insert(num);

        // If the heap size exceeds k, remove the smallest element
        // This ensures the heap always contains the k largest elements encountered so far
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }

    // The root of the Min-Heap is the Kth largest element
    // because it's the smallest among the K largest elements.
    const result = minHeap.peek();
    if (result === undefined) {
        // This case should ideally not be reached if k is valid and nums is not empty.
        // It implies k was valid, but heap ended up empty which should not happen if k > 0.
        throw new Error("Heap is unexpectedly empty. This indicates a logical error or invalid input state.");
    }
    return result;
}

/**
 * Alternative Approach 1: Sorting (Brute Force / Simpler)
 *
 * Sort the array in descending order and return the element at index k-1.
 *
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(N) or O(log N) depending on the sort implementation (e.g., Timsort in JS, QuickSort can be in-place but might use stack space).
 *
 * @param nums The array of numbers.
 * @param k The desired Kth largest element.
 * @returns The Kth largest element.
 */
export function findKthLargest_sorting(nums: number[], k: number): number {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        throw new Error("Invalid input: nums array is empty, or k is out of bounds.");
    }
    // Sort in descending order
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}

/**
 * Alternative Approach 2: Quickselect (Optimized but more complex to implement)
 *
 * Quickselect is an algorithm to find the k-th smallest (or largest) element in an unordered list.
 * It's a variation of QuickSort. It partitions the array around a pivot and then recursively
 * searches in the correct partition.
 *
 * Average Time Complexity: O(N)
 * Worst-Case Time Complexity: O(N^2) (can be avoided with a good pivot selection strategy, like median-of-medians,
 * but typical implementations use random pivot which makes N^2 very rare).
 * Space Complexity: O(1) (in-place partitioning) or O(log N) for recursion stack.
 *
 * This implementation is not provided as it's more involved and less directly related to Heap operations,
 * but it's important to know this is the theoretically most optimal solution for average case.
 *
 * Example outline for Quickselect:
 * function quickSelect(arr, k, left, right):
 *   if left == right: return arr[left]
 *   pivotIndex = partition(arr, left, right) // partitions and returns final pivot index
 *   if k == pivotIndex: return arr[k]
 *   else if k < pivotIndex: return quickSelect(arr, k, left, pivotIndex - 1)
 *   else: return quickSelect(arr, k, pivotIndex + 1, right)
 */
```
```typescript